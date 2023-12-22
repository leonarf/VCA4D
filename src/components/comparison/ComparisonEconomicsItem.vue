<template>
<tr class="rounded">
        <td>
            <div class="subtitle">{{ title }}</div>
            <div class="definition">{{ subtitle }}</div>
        </td>
        <td v-for="(study, index) in studies" :key="`value_added__${study.id}`">
            <div :class="getAddedValueClass(values[index])">
                {{ values[index] ? format(values[index]) : '-' }}
            </div>
        </td>
    </tr>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    studies: Array,
    title: String,
    subtitle: String,
    getValue: Function,
    format: Function
})

const values = computed(() => props.studies.map(study => props.getValue(study)))
const getAddedValueClass = (value) => {
    if (!value) {
        return "gray"
    }
    if (value < 0) {
        return "light-red"
    }
    return "light-green"
}

// one set if only values between 0 and 1
// one set if only values positive
// one set if values negative and positive

// const getGdpClass = (value) => {
//     if (!value) {
//         return "gray"
//     }
//     if (value < 0.1) {
//         return "light-blue"
//     }
//     return "dark-blue"
// }

// const getAddedValueClass = (value) => {
//     if (!value) {
//         return "gray"
//     }
//     if (value < 0) {
//         return "light-red"
//     }
//     return "light-green"
// }

</script>