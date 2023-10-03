import { computed } from "vue";

export function useActorsAndStages(props) {
    const stages = computed(() => props.studyData.ecoData.stages);
    const actors = computed(() => props.studyData.ecoData.actors);

    return {
        stages,
        actors,
    };
}

const average = (array) => array.reduce((a, b) => a + b) / array.length
export const getSocialAverageGroup = (socialData, index) => Math.round(average(socialData[index].groups.map(group => Number(group.averageValue) || 0)), 2)
