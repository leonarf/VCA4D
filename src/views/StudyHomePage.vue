
<template>
  <div>
    <h1>Study Home Page</h1>
    <StudyHeader v-if="study_data" :study_data="study_data" />
  </div>
</template>

<script>
import StudyHeader from '@/components/StudyHeader.vue'
import Repository from '@/repositories/TestRepository.js'

export default {
  name: 'StudyHomePage',
  components: {
    StudyHeader
  },
  props: {
    study_name: String
  },
  data() {
    return {
      study_data: null
    }
  },
  beforeMount: function () {
    Repository.getStudyData(this.study_name).then((response) => {
      this.study_data = response
    })
  }
}
</script>