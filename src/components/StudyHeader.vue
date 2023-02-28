<template>
  <div>
    <p>Commodity: {{ study_data.commodity.value }}</p>
    <p>Country: {{ study_data.country.value }}</p>
    <p>Local currency: {{ study_data.currency.value }}</p>
    <p>Reference year: {{ study_data['reference year'].value }}</p>
  </div>
</template>

<script>
export default {
  name: 'StudyHeader',
  props: {
    study_data: Object
  },
  data() {
    return {}
  },
  computed: {}
}
</script>