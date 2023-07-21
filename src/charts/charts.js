const RADIUSES_PIE = ['20%', '40%']
const formatNumber = (value) => value ? value.toLocaleString(undefined, { maximumFractionDigits: 2 }) : "-"

export const getNumberOfActorsData = (stages, actors) => {
    let tooltip = {}
    let labels = []
    let values = []
    stages.value.map(stage => {
        const stageActors = actors.value.filter(actor => actor.stage === stage.name)

        const subTotal = stageActors
            .reduce((res, actor) => res + actor.numberOfActors || 0, 0)
        if (subTotal !== 0) {
            labels.push(stage.name)
            values.push(subTotal)
            let toolTipValue = `${stage.name}: ${formatNumber(subTotal)}`
            for (const actor of stageActors) {
                toolTipValue += `<br>${actor.name}: ${formatNumber(actor.numberOfActors)}`
            }

            tooltip[stage.name] = toolTipValue
        }
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
                return formatNumber(d.data)
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
                barWidth: '75%',
            }
        ]
    };
}

export const getNumberOfJobsData = (stages, actors, currentStage) => {
    let tooltip = {}
    let labels = []
    let values = []
    stages.value.map(stage => {
        const stageActors = actors.value.filter(actor => actor.stage === stage.name && actor.employment)

        const subTotal = stageActors.map(actor => actor.employment.total)
            .reduce((res, curr) => res + curr, 0)

        if (subTotal !== 0) {
            labels.push(stage.name)
            const color = currentStage.value === stage.name ? '#F7E9EB' : 'lightBlue'
            const emphasisColor = currentStage.value === stage.name ? "#f7d9de" : '#90d0e5'
            values.push({
                value: subTotal,
                itemStyle: {
                    color,
                    emphasis: {
                        color: emphasisColor
                    }
                }
            })
            let toolTipValue = `${stage.name}: ${subTotal}`
            toolTipValue += `<br>Male temp: ${stageActors.map(actor => actor.employment.male_temp)
                .reduce((res, curr) => res + curr, 0)}`
            toolTipValue += `<br>Female temp: ${stageActors.map(actor => actor.employment.female_temp)
                .reduce((res, curr) => res + curr, 0)}`
            toolTipValue += `<br>Male unskilled: ${stageActors.map(actor => actor.employment.male_perm_unskilled)
                .reduce((res, curr) => res + curr, 0)}`
            toolTipValue += `<br>Female unskilled: ${stageActors.map(actor => actor.employment.female_perm_unskilled)
                .reduce((res, curr) => res + curr, 0)}`
            toolTipValue += `<br>Male skilled: ${stageActors.map(actor => actor.employment.male_perm_skilled)
                .reduce((res, curr) => res + curr, 0)}`
            toolTipValue += `<br>Female skilled: ${stageActors.map(actor => actor.employment.female_perm_skilled)
                .reduce((res, curr) => res + curr, 0)}`
            tooltip[stage] = toolTipValue
        }
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
                return formatNumber(d.data.value)
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
                barWidth: '100%'
            }
        ]
    };
}

const getMiniPieChart = (data, title) => {
    const titleItem = {
        text: title,
        left: 'center',
        top: 0
    }
    let tooltip = {}
    data.map(item => tooltip[item.name] = `<strong>${item.name}</strong>: ${formatNumber(item.value)}`)
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
                radius: RADIUSES_PIE
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

export const getNetOperatingProfitData = (stages, actors, convertAmount, prettyAmount) => {

    let tooltip = {}
    let labels = []
    let values = []

    stages.value.map(stage => {
        const stageActors = actors.value.filter(actor => actor.stage === stage.name)
        const subTotal = convertAmount.value(stageActors
            .reduce((res, actor) => res + actor.netOperatingProfit || 0, 0))
        if (subTotal !== 0) {
            labels.push(stage.name)
            values.push(subTotal)
            let toolTipValue = `${stage.name}: ${prettyAmount.value(subTotal)}`
            for (const actor of stageActors) {
                toolTipValue += `<br>${actor.name}: ${prettyAmount.value(actor.netOperatingProfit)}`
            }

            tooltip[stage.name] = toolTipValue
        }
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
                return prettyAmount.value(d.data)
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
                barWidth: '100%'
            }
        ]
    };
}

export const getNetOperatingProfitByNumberActorsData = (stages, actors, convertAmount, prettyAmount) => {
    let tooltip = {}
    let labels = []
    let values = []

    stages.value.map(stage => {
        const stageActors = actors.value.filter(actor => actor.stage === stage.name)
        const subTotalOperatingProfit = convertAmount.value(stageActors
            .reduce((res, actor) => res + actor.netOperatingProfit || 0, 0))
        const subTotalNumberOfActors = stageActors
            .reduce((res, actor) => res + actor.numberOfActors || 0, 0)
        if (subTotalOperatingProfit !== 0 && subTotalNumberOfActors !== 0) {

            labels.push(stage.name)
            values.push(subTotalOperatingProfit / subTotalNumberOfActors)
            let toolTipValue = `${stage.name}: ${prettyAmount.value(subTotalOperatingProfit / subTotalNumberOfActors)}`
            for (const actor of stageActors) {
                toolTipValue += `<br>${actor.name}: ${prettyAmount.value(actor.netOperatingProfit)} ${prettyAmount.value(actor.numberOfActors)} actors`
            }

            tooltip[stage.name] = toolTipValue
        }
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
                return prettyAmount.value(d.data)
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
                barWidth: '100%'
            }
        ]
    };
}