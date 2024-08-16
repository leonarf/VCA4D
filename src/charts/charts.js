import { formatNumber, formatPercent } from '@utils/format.js'
import { getColor } from '@utils/colors.js'
const RADIUSES_MINI_PIE = ['20%', '40%']
const RIADUSES_PIE = ['50%', '75%']
const SELECTED_COLOR = "#F7E9EB"
const SELECTED_COLOR_HOVER = "#f7d9de"

/*
* RING CHART
*/
export const getRingChart = (items, tooltip, title) => {
    return {
        title: {
            text: title,
            left: 'center',
            top: 0
        },
        tooltip: {
            trigger: 'item',
            formatter: function (info) {
                return tooltip[info.name]
            }
        },
        series: [
            {
                label: {
                    position: 'outer',
                    //alignTo: 'labelLine',
                    overflow: 'break',
                    bleedMargin: 0,
                    ellipsis: '..',
                    formatter: params => params.data.label || params.data.name
                },
                type: 'pie',
                data: items,
                radius: RIADUSES_PIE,
                itemStyle: {
                    color: function (info) {
                        return getColor(info.name)
                    }
                }
            }
        ]
    };
}

/*
*  STACKED BAR CHART
*/
export const getStackedBarChart = (label, data, maxValue, prettyAmount, convertAmount) => {
    const seriesData = data.map(({ value, name, color }) => ({
        name,
        type: 'bar',
        stack: 'stack',
        label: {
            show: true,
            position: 'right',
            formatter: () => name,
        },
        labelLayout: {
          hideOverlap: true,
        },
        data: [convertAmount(value)],
        itemStyle: {
            color
        }
    }))
    const totalText = prettyAmount(convertAmount(data.reduce((total, item) => total + item.value, 0)))

    return {
        title: {
            text: totalText,
            top: '5%',
            left: '40%'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
            },
            formatter: (params) => {
                return params.map(({ seriesName, value }) => `${seriesName}: ${prettyAmount(value)}`).join('<br />')
            },
        },
        xAxis: {
            type: 'category',
            data: [label],
            axisLabel: {
                interval: 0,
                fontSize: 20,
                textColor: '#8A8A8A',
                fontWeight: 'bold'
            },
        },
        yAxis: {
            show: false,
            max: convertAmount(maxValue)
        },
        series: seriesData,
    }
}

/*
* SELECTABLE BAR CHART
*/
export const getSelectableBarChart = (items, currentItem, tooltip, formatLabel, isEnvironment = false) => {
    let labels = []
    let values = []
    items.map(item => {
        labels.push(item.name)
        // const color = currentItem === item.name ? SELECTED_COLOR : getColor(item.name)
        // const emphasisColor = currentItem === item.name ? SELECTED_COLOR_HOVER : getColor(item.name) + "B3"
        const color = getColor(item.name, isEnvironment)
        const emphasisColor = color + "B3"
        values.push({
            value: item.value,
            emphasisColor,
            itemStyle: {
                color,
                ... (
                    currentItem === item.name
                        ? {
                            borderColor: "black",
                            borderWidth: 2,
                            borderRadius: 5
                        } : {})
            }
        })
    })
    return {
        xAxis: {
            data: labels,
            type: 'category',
            left: 0,
            axisLabel: {
                hideOverlap: false,
                align: 'center',
                fontSize: 15,
                fontWeight: 500,
                overflow: 'break',
                /*TODO : il faut calculer la largeur max des labels (width) du graph bar en fonction de la taille de la fenêtre
                pour que la propriété 'overflow' fonctionne et que le label soit renvoyé à la ligne automatiquement
                width: 100,*/
                interval: 0,
            },
            axisTick: {
                alignWithLabel: true
            },
        },
        label: {
            show: true,
            position: 'top',
            formatter: function (d) {
                if (!d.data) {
                    return ""
                }
                return formatLabel ? formatLabel(d.data.value) : formatNumber(d.data.value)
            },
            textStyle: {
                fontSize: 22,
                fontWeight: 500,
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: function (info) {
                return tooltip[info.name]
            }
        },
        yAxis: {
            show: false
        },
        series: [
            {
                type: 'bar',
                data: values,
                barCategoryGap: "20%"
            }
        ]
    };
}

export const getNumberOfActorsData = (stages, actors, currentStage) => {
    let tooltip = {}
    const items = stages.value.map(stage => {
        const stageActors = actors.value.filter(actor => actor.stage === stage.name)

        const subTotal = stageActors
            .reduce((res, actor) => res + actor.numberOfActors || 0, 0)
        if (subTotal !== 0) {
            let toolTipValue = ""
            for (const actor of stageActors) {
                toolTipValue += `${actor.name}: ${formatNumber(actor.numberOfActors)}<br>`
            }

            tooltip[stage.name] = toolTipValue
            return {
                name: stage.name,
                value: subTotal
            }
        }
    }).filter(item => !!item)

    return getSelectableBarChart(items, currentStage.value, tooltip)
}

export const getNumberOfJobsData = (stages, actors, currentStage) => {
    let tooltip = {}
    const items = stages.value.map(stage => {
        const stageActors = actors.value.filter(actor => actor.stage === stage.name && actor.employment)
        const subTotal = stageActors.map(actor => actor.employment.total)
            .reduce((res, curr) => res + curr, 0)

        if (subTotal !== 0) {
            let toolTipValue = "";
            toolTipValue += `<b>Male temporary</b>: ${formatNumber(stageActors.map(actor => actor.employment?.tempMale || 0)
                .reduce((res, curr) => res + curr, 0))}<br>`
            toolTipValue += `<b>Female temporary</b>: ${formatNumber(stageActors.map(actor => actor.employment?.tempFemale || 0)
                .reduce((res, curr) => res + curr, 0))}<br>`
            toolTipValue += `<b>Male unskilled</b>: ${formatNumber(stageActors.map(actor => actor.employment?.unskilledMale || 0)
                .reduce((res, curr) => res + curr, 0))}<br>`
            toolTipValue += `<b>Female unskilled</b>: ${formatNumber(stageActors.map(actor => actor.employment?.unskilledFemale || 0)
                .reduce((res, curr) => res + curr, 0))}<br>`
            toolTipValue += `<b>Male skilled</b>: ${formatNumber(stageActors.map(actor => actor.employment?.skilledMale || 0)
                .reduce((res, curr) => res + curr, 0))}<br>`
            toolTipValue += `<b>Female skilled</b>: ${formatNumber(stageActors.map(actor => actor.employment?.skilledFemale || 0)
                .reduce((res, curr) => res + curr, 0))}<br>`
            tooltip[stage.name] = toolTipValue
            return {
                name: stage.name,
                value: subTotal
            }
        }
    })
    .filter(item => !!item)

    return getSelectableBarChart(items, currentStage.value, tooltip)
}

export const getNetOperatingProfitData = (stages, actors, convertAmount, prettyAmount, currentStage) => {
    let tooltip = {}

    let total = 0
    const items = stages.value.map(stage => {
        const stageActors = actors.value.filter(actor => actor.stage === stage.name)
        const subTotal = convertAmount.value(stageActors
            .reduce((res, actor) => res + actor.netOperatingProfit || 0, 0))
        if (subTotal !== 0) {
            total += subTotal
            let toolTipValue = "";
            for (const actor of stageActors) {
                var convertedActorProfit = convertAmount.value(actor.netOperatingProfit)
                toolTipValue += `${actor.name}: ${prettyAmount.value(convertedActorProfit)} (${formatPercent(convertedActorProfit / subTotal)})<br>`
            }
            tooltip[stage.name] = toolTipValue
            return {
                name: stage.name,
                value: subTotal
            }
        }
    }).filter(item => !!item)
    return getSelectableBarChart(items, currentStage.value, tooltip, (value) => `${prettyAmount.value(value)} (${formatPercent(value / total)})`)
}

export const getNetOperatingProfitByNumberActorsData = (stages, actors, convertAmount, prettyAmount, currentStage) => {
    let tooltip = {}

    const items = stages.value.map(stage => {
        const stageActors = actors.value.filter(actor => actor.stage === stage.name)
        const subTotalOperatingProfit = convertAmount.value(stageActors
            .reduce((res, actor) => res + actor.netOperatingProfit || 0, 0))
        const subTotalNumberOfActors = stageActors
            .reduce((res, actor) => res + actor.numberOfActors || 0, 0)
        if (subTotalOperatingProfit !== 0 && subTotalNumberOfActors !== 0) {
            let toolTipValue = ""
            for (const actor of stageActors) {
                toolTipValue += `${actor.name}: net operating profit= ${prettyAmount.value(convertAmount.value(actor.netOperatingProfit))} -- #actors= ${formatNumber(actor.numberOfActors)}<br>`
            }
            tooltip[stage.name] = toolTipValue
            return {
                name: stage.name,
                value: subTotalOperatingProfit / subTotalNumberOfActors
            }
        }
    }).filter(item => !!item)
    return getSelectableBarChart(items, currentStage.value, tooltip, prettyAmount.value, currentStage)
}

export const getPublicFinancesData = (stages, actors, convertAmount, prettyAmount, currentStage) => {

    let tooltip = {}
    const items = stages.value.map(({ name: stageName }) => {
        const stageActors = actors.value.filter(actor => actor.stage === stageName)

        const subTotal = convertAmount.value(stageActors.reduce((res, actor) => res + actor.publicFundsBalance, 0))
        tooltip[stageName] = `${prettyAmount.value(subTotal)}`
        return {
            name: stageName,
            value: subTotal
        }
    }).filter(item => !!item && item.value > 0)
    return getSelectableBarChart(items, currentStage.value, tooltip, prettyAmount.value)
}


/*
* MINI BAR CHART
*/

export const getMiniBarChart = (items, tooltip, formatLabel, color) => {
    let labels = []
    let values = []
    items.map(item => {
        labels.push(item.name)
        // code temporaire pour récupérer une couleur, il faudra récupérer la couleur du stage quand pertinent à l'avenir
        if (!color) {
            color = getColor(item.name)
        }
        const emphasisColor = color + "B3"
        values.push({
            value: item.value,
            emphasisColor,
            itemStyle: {
                color,
            }
        })
    })
    return {
        xAxis: {
            data: labels,
            left: 0,
            axisLabel: {
                fontSize: 15,
                fontWeight: 500,
                //color: '#e2e0e0',
                interval: 0,
                rotate: -10,
                margin: 20
            }
        },
        label: {
            show: true,
            position: 'top',
            formatter: function (d) {
                if (!d.data) {
                    return ""
                }
                return formatLabel ? formatLabel(d.data.value) : formatNumber(d.data.value)
            },
            textStyle: {
                fontSize: 22,
                fontWeight: 500,
            },
            //color: '#e2e0e0'
        },
        tooltip: {
            trigger: 'item',
            formatter: function (info) {
                return tooltip[info.name]
            }
        },
        yAxis: {
            show: false
        },
        series: [
            {
                type: 'bar',
                data: values,
                barCategoryGap: "5%"
            }
        ]
    };
}

/*
*  MINI PIE CHART
*/
const getMiniPieChart = (data, title, valueFormatter) => {
    const titleItem = {
        text: title,
        left: 'center',
        top: 0
    }
    let tooltip = {}
    data.map(item => tooltip[item.name] = `<strong>${item.name}</strong>: ${valueFormatter ? valueFormatter(item.value) : formatNumber(item.value)}`)
    data = data.filter(item => item.value !== 0)

    return {
        titleItem,
        tooltip: {
            trigger: 'item',
            formatter: function (info) {
                return tooltip[info.name]
            }
        },
        series: [
            {
                type: 'pie',
                data,
                radius: RADIUSES_MINI_PIE,
                label: {
                    width: 120,
                    overflow: 'break',
                    //color: "#e2e0e0",
                    fontSize: 15
                },
                labelLine: {
                    length: 20,
                    length2: 10,
                    smooth: true,
                },
            }
        ]
    };
}

export const getEmploymentByTypeOfActorData = (actors) => {

    if (actors.some(actor => !actor.employment?.total)) {
        return null
    }
    let data = actors.map(actor => {
        return {
            value: actor.employment.total,
            name: actor.name
        }
    })
    return getMiniPieChart(data, 'By type of actor')
}

export const getNetOperatingProfitByTypeOfActorData = (actors, convertAmount, prettyAmount) => {
    let data = actors.map(actor => {
        return {
            value: convertAmount(actor.netOperatingProfit || 0),
            name: actor.name
        }
    })
    return getMiniPieChart(data, 'By type of actor', prettyAmount)
}

export const getEmploymentByQualificationData = (actors) => {
    let data = [
        {
            value: actors.map(actor => actor.employment?.totalSkilled).reduce((res, curr) => res + curr, 0),
            name: 'Permanent qualified'
        },
        {
            value: actors.map(actor => actor.employment?.totalUnskilled).reduce((res, curr) => res + curr, 0),
            name: 'Permanent unqualified'
        },
        {
            value: actors.map(actor => actor.employment?.totalTemp).reduce((res, curr) => res + curr, 0),
            name: 'Temporary'
        }
    ]
    if (data.some(item => !item.value)) {
        return null
    }
    return getMiniPieChart(data, 'By qualification')
}

export const getEmploymentByGenderData = (actors) => {
    let data = [
        {
            value: actors.map(actor => actor.employment?.totalMale).reduce((res, curr) => res + curr, 0),
            name: 'Male'
        },
        {
            value: actors.map(actor => actor.employment?.totalFemale).reduce((res, curr) => res + curr, 0),
            name: 'Female'
        }
    ]
    if (data.some(item => !item.value)) {
        return null
    }
    return getMiniPieChart(data, 'By gender')
}

export const getNumberOfActorsByTypeOfActorData = (actors) => {
    let data = actors.map(actor => ({
        value: actor.numberOfActors || 10,
        name: actor.name
    }))
    return getMiniPieChart(data, 'By actor')
}
