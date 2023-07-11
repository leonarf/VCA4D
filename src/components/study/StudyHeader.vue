<template>
    <div class="text-xl rounded bg-[#dcefbb] flex flex-row py-3 px-8 rounded-full">
        <div class="bloc">
            <div class="title">{{ studyData.product }}</div>
            <div class="subtitle">Commodity</div>
        </div>
        <div class="bloc">
            <div class="title">{{ studyData.country }}</div>
            <div class="subtitle">Country</div>
        </div>
        <div class="bloc">
            <div class="title">BIF</div>
            <div class="subtitle">Local currency</div>
        </div>
        <div class="bloc">
            <div class="title">{{ studyData.year }}</div>
            <div class="subtitle">Reference year</div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    studyData: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
    .subtitle {
        @apply text-[#656565] text-xs
    }
    .title {
        @apply text-[#303030] text-3xl font-thin
    }
    .bloc {
        @apply mr-20
    }
</style>