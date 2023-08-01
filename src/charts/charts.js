import { formatNumber, formatPercent, getStageColor } from '@/utils/utils.js'
const RADIUSES_MINI_PIE = ['20%', '40%']
const RIADUSES_PIE = ['50%', '75%']
const SELECTED_COLOR = "#F7E9EB"
const SELECTED_COLOR_HOVER = "#f7d9de"

export const getReturnOnInvestmentData = (stages, actors, convertAmount, prettyAmount) => {
    let tooltip = {}
    let labels = []
    let values = []
    stages.value.map(stage => {
        const stageActors = actors.value.filter(actor => actor.stage === stage.name)

        labels.push(stage.name)
        const netOperatingProfits = convertAmount.value(stageActors.map(actor => actor.netOperatingProfit || 0).reduce((res, item) => res + item, 0))
        let totalCosts = stageActors.map(actor => actor.totalCosts || 0).reduce((res, item) => res + item, 0)
        if (stage.name === 'Producers') {
            totalCosts += netOperatingProfits
        }
        totalCosts = convertAmount.value(totalCosts)
        values.push(((100 * netOperatingProfits) / totalCosts).toFixed(0))
        tooltip[stage.name] = `Net operating profit = ${prettyAmount.value(netOperatingProfits)}<br>
            Total costs = ${prettyAmount.value(totalCosts)}<br>
            Return on investment = ${formatPercent(
            (100 * netOperatingProfits) / totalCosts
        )}`
    })

    return {
        xAxis: {
            type: 'category',
            boundaryGap: true,
            axisTick: {
                alignWithLabel: true
            },
            axisLabel: {
                interval: 0,
                rotate: -10,
                margin: 20
            },
            data: labels
        },
        tooltip: {
            trigger: 'item',
            formatter: function (info) {
                return tooltip[info.name]
            }
        },
        yAxis: {
            type: 'value',
            name: 'RETURN ON INVESTMENT (%)',
            axisLine: {
                show: true,
                symbol: ['arrow', 'arrow']
            }
        },
        series: {
            type: 'bar',
            data: values,
            colorBy: 'data',
            label: {
                show: true,
                position: 'top'
            },
            itemStyle: {
                color: function (info) {
                    return getStageColor(info.name)
                }
            }
        }
    }
}

/*
* RING CHART
*/
const getRingChart = (items, tooltip, title) => {
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
                type: 'pie',
                data: items,
                radius: RIADUSES_PIE,
                itemStyle: {
                    color: function (info) {
                        return getStageColor(info.name)
                    }
                }
            }
        ]
    };
}

export const getAddedValueCreatorsData = (stages, actors, convertAmount, prettyAmount) => {
    const tooltip = {}
    const items = stages.value.map(({ name: stageName }) => {
        const stageActors = actors.value.filter(actor => actor.stage === stageName)

        const subTotal = convertAmount.value(stageActors.reduce((res, actor) => res + actor.directAddedValue, 0))
        if (!isNaN(subTotal)) {
            let toolTip = `<b>${stageName}</b>: ${prettyAmount.value(subTotal)}`
            for (const actor of stageActors) {
                toolTip += `<br><b>${actor.name}</b>: ${prettyAmount.value(convertAmount.value(actor.directAddedValue))}`
            }
            tooltip[stageName] = toolTip
            return {
                value: subTotal || 0,
                name: stageName
            }
        }
    }).filter(item => !!item)
    .filter(item => item.value !== 0)

    return getRingChart(items, tooltip, 'Who creates the direct value added')
}

export const getAddedValueReceiversData = (stages, actors, convertAmount, prettyAmount, addedValue) => {

    const tooltip = {}

    let items = stages.value.map(({ name: stageName }) => {
        const stageActors = actors.value.filter(actor => actor.stage === stageName)

        const subTotal = convertAmount.value(stageActors.reduce((res, actor) => res + actor.receivedAddedValue, 0))

        let toolTip = `<b>${stageName}</b>: ${prettyAmount.value(subTotal)}`
        for (const actor of stageActors) {
            toolTip += `<br><b>${actor.name}</b>: ${prettyAmount.value(convertAmount.value(actor.receivedAddedValue))}`
        }
        tooltip[stageName] = toolTip

        return {
            value: subTotal,
            name: stageName
        }
    })
    for (let key in addedValue) {
        tooltip[key] = `<b>${key}</b>: ${prettyAmount.value(convertAmount.value(addedValue[key]))}`
        items.push({
            value: convertAmount.value(addedValue[key]),
            name: key
        })
    }
    
    items = items.filter(item => !!item).filter(item => item.value !== 0)
    return getRingChart(items, tooltip, 'Who receives the direct value added')
}

/*
* SELECTABLE BAR CHART
*/
const getSelectableBarChart = (items, currentItem, tooltip, formatLabel) => {
    let labels = []
    let values = []
    items.map(item => {
        labels.push(item.name)
        // const color = currentItem === item.name ? SELECTED_COLOR : getStageColor(item.name)
        // const emphasisColor = currentItem === item.name ? SELECTED_COLOR_HOVER : getStageColor(item.name) + "B3"
        const color = getStageColor(item.name)
        const emphasisColor = getStageColor(item.name) + "B3"
        values.push({
            value: item.value,
            itemStyle: {
                color,
                emphasis: {
                    color: emphasisColor
                }
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
                barWidth: '80%',
            }
        ]
    };
}

export const getPublicFinancesData = (stages, actors, convertAmount, prettyAmount) => {

    let tooltip = {}
    const items = stages.value.map(({ name: stageName }) => {
        const stageActors = actors.value.filter(actor => actor.stage === stageName)

        const subTotal = convertAmount.value(stageActors.reduce((res, actor) => res + actor.publicFundsBalance, 0))
        tooltip[stageName] = `${prettyAmount.value(subTotal)}`
        return {
            name: stageName,
            value: subTotal
        }
    })
    return getBarChart(items, tooltip, prettyAmount.value)
}

export const getNumberOfActorsData = (stages, actors, currentStage) => {
    let tooltip = {}
    const items = stages.value.map(stage => {
        const stageActors = actors.value.filter(actor => actor.stage === stage.name)

        const subTotal = stageActors
            .reduce((res, actor) => res + actor.numberOfActors || 0, 0)
        if (subTotal !== 0) {
            let toolTipValue = `${stage.name}: ${formatNumber(subTotal)}`
            for (const actor of stageActors) {
                toolTipValue += `<br>${actor.name}: ${formatNumber(actor.numberOfActors)}`
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
            console.log('stageActors', stageActors)
            let toolTipValue = `<b>${stage.name}</b>: ${formatNumber(subTotal)}`
            toolTipValue += `<br><b>Male temp</b>: ${formatNumber(stageActors.map(actor => actor.employment?.tempMale || 0)
                .reduce((res, curr) => res + curr, 0))}`
            toolTipValue += `<br><b>Female temp</b>: ${formatNumber(stageActors.map(actor => actor.employment?.tempFemale || 0)
                .reduce((res, curr) => res + curr, 0))}`
            toolTipValue += `<br><b>Male unskilled</b>: ${formatNumber(stageActors.map(actor => actor.employment?.unskilledMale || 0)
                .reduce((res, curr) => res + curr, 0))}`
            toolTipValue += `<br><b>Female unskilled</b>: ${formatNumber(stageActors.map(actor => actor.employment?.unskilledFemale || 0)
                .reduce((res, curr) => res + curr, 0))}`
            toolTipValue += `<br><b>Male skilled</b>: ${formatNumber(stageActors.map(actor => actor.employment?.skilledMale || 0)
                .reduce((res, curr) => res + curr, 0))}`
            toolTipValue += `<br><b>Female skilled</b>: ${formatNumber(stageActors.map(actor => actor.employment?.skilledFemale || 0)
                .reduce((res, curr) => res + curr, 0))}`
            tooltip[stage.name] = toolTipValue
            return {
                name: stage.name,
                value: subTotal
            }
        }
    }).filter(item => !!item)

    return getSelectableBarChart(items, currentStage.value, tooltip)
}

export const getNetOperatingProfitData = (stages, actors, convertAmount, prettyAmount, currentStage) => {
    let tooltip = {}

    const items = stages.value.map(stage => {
        const stageActors = actors.value.filter(actor => actor.stage === stage.name)
        const subTotal = convertAmount.value(stageActors
            .reduce((res, actor) => res + actor.netOperatingProfit || 0, 0))
        if (subTotal !== 0) {
            let toolTipValue = `${stage.name}: ${prettyAmount.value(subTotal)}`
            for (const actor of stageActors) {
                toolTipValue += `<br>${actor.name}: ${prettyAmount.value(actor.netOperatingProfit)}`
            }
            tooltip[stage.name] = toolTipValue
            return {
                name: stage.name,
                value: subTotal
            }
        }
    }).filter(item => !!item)
    return getSelectableBarChart(items, currentStage.value, tooltip, prettyAmount.value)
}

/*
* BAR CHART
*/
const getBarChart = (items, tooltip, formatLabel) => {
    let labels = []
    let values = []

    items.map(item => {
        labels.push(item.name)
        values.push(item.value)
    })


    return {
        xAxis: {
            data: labels,
            left: 0
        },
        label: {
            show: true,
            position: 'top',
            formatter: function (d) {
                if (!d.data) {
                    return ""
                }
                return formatLabel ? formatLabel(d.data) : formatNumber(d.data)
            },
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
                barWidth: '100%',
                itemStyle: {
                    color: function (info) {
                        return getStageColor(info.name)
                    }
                }
            }
        ]
    };
}

export const getNetOperatingProfitByNumberActorsData = (stages, actors, convertAmount, prettyAmount) => {
    let tooltip = {}

    const items = stages.value.map(stage => {
        const stageActors = actors.value.filter(actor => actor.stage === stage.name)
        const subTotalOperatingProfit = convertAmount.value(stageActors
            .reduce((res, actor) => res + actor.netOperatingProfit || 0, 0))
        const subTotalNumberOfActors = stageActors
            .reduce((res, actor) => res + actor.numberOfActors || 0, 0)
        if (subTotalOperatingProfit !== 0 && subTotalNumberOfActors !== 0) {
            let toolTipValue = `${stage.name}: ${prettyAmount.value(subTotalOperatingProfit / subTotalNumberOfActors)} per actor`
            for (const actor of stageActors) {
                toolTipValue += `<br>${actor.name}: net operating profit= ${prettyAmount.value(actor.netOperatingProfit)} -- #actors= ${formatNumber(actor.numberOfActors)}`
            }
            tooltip[stage.name] = toolTipValue
            return {
                name: stage.name,
                value: subTotalOperatingProfit / subTotalNumberOfActors
            }
        }
    }).filter(item => !!item)
    return getBarChart(items, tooltip, prettyAmount.value)
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
                    color: "#e2e0e0",
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
            value: actors.map(actor => actor.employment?.totalSkilled || 0).reduce((res, curr) => res + curr, 0),
            name: 'Permanent qualified'
        },
        {
            value: actors.map(actor => actor.employment?.totalUnskilled || 0).reduce((res, curr) => res + curr, 0),
            name: 'Permanent unqualified'
        },
        {
            value: actors.map(actor => actor.employment?.totalTemp || 0).reduce((res, curr) => res + curr, 0),
            name: 'Temporary'
        }
    ]
    return getMiniPieChart(data, 'By qualification')
}

export const getEmploymentByGenderData = (actors) => {
    let data = [
        {
            value: actors.map(actor => actor.employment?.totalMale || 0).reduce((res, curr) => res + curr, 0),
            name: 'Male'
        },
        {
            value: actors.map(actor => actor.employment?.totalFemale || 0).reduce((res, curr) => res + curr, 0),
            name: 'Female'
        }
    ]
    return getMiniPieChart(data, 'By gender')
}

export const getNumberOfActorsByTypeOfActorData = (actors) => {
    let data = actors.map(actor => ({
        value: actor.numberOfActors || 10,
        name: actor.name
    }))
    return getMiniPieChart(data, 'By actor')
}
