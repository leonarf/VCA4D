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

export const ACVImpacts = [
    {
        name: "Global warming",
        children: []
    },
    {
        name: "Climate Change",
        children: ["Global warming, Human health",
            "Global warming. Freshwater ecosystems",
            "Global warming. Terrestrial ecosystems",
        ]
    },
    {
        name: "Human health",
        children: ["Global warming, Human health",
            "Stratospheric ozone depletion",
            "Ionizing radiation",
            "Ozone formation, Human health",
            "Fine particulate matter formation",
            "Human carcinogenic toxicity",
            "Human non-carcinogenic toxicity",
            "Water consumption, Human health"
        ]
    },
    {
        name: "Ecosystems",
        children: ["Global warming. Terrestrial ecosystems",
            "Global warming. Freshwater ecosystems",
            "Ozone formation. Terrestrial ecosystems",
            "Terrestrial acidification",
            "Freshwater eutrophication",
            "Marine eutrophication",
            "Terrestrial ecotoxicity",
            "Freshwater ecotoxicity",
            "Marine ecotoxicity",
            "Land use",
            "Water consumption. Terrestrial ecosystem",
            "Water consumption. Aquatic ecosystems"
        ]
    },
    {
        name: "Resources",
        children: ["Mineral resource scarcity",
            "Fossil resource scarcity"
        ]
    }
]
