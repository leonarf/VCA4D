<template >
    <table class="w-full md:w-1/3 text-center text-sm font-light ml-36">
          <thead
            class="border-b bg-[#E4E4E4] font-medium text-[#303030] ">
            <tr>
              <th scope="col" class=" px-3 py-2">Case</th>
              <th scope="col" class=" px-3 py-2">Farm gate price</th>
              <th scope="col" class=" px-3 py-2">Final price</th>
              <th scope="col" class=" px-3 py-2">Ratio</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b bg-[#F2F2F2]" v-for="item in data" :key="item.label">
              <td class="whitespace-nowrap  px-3 py-2 font-medium">{{ item.label}}</td>
              <td class="whitespace-nowrap  px-3 py-2">{{ item.farm}} per kg</td>
              <td class="whitespace-nowrap  px-3 py-2">{{ item.final}} per kg</td>
              <td class="whitespace-nowrap  px-3 py-2">{{ item.ratio }}%</td>
            </tr>
          </tbody>
        </table>
</template>

<script setup>
const props = defineProps({
    data: Array,
})

</script>

<style>
</style>