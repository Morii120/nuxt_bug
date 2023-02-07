<template>
  <NuxtLayout>
    <div class="page-index">
    </div>
  </NuxtLayout>
</template>
<script setup>


useHead({
  meta: [{ charset: 'utf-8' }, {
    hid: 'keywords',
    name: 'keywords',
    content: "test"
  },
  {
    hid: 'description',
    name: 'description',
    content:  "test"
  }],
  title: computed(() => ` "test"`)
})

const opts = reactive({
  componentEnum: {
    1: { name: 'banner', listName: 'detailList' },
    2: { name: 'course', listName: 'courseList' },
    3: { name: 'grade', listName: 'classroomList' },
    4: { name: 'teacher', listName: 'teacherList' },
    5: { name: 'news', listName: 'articleList' },
    6: { name: 'ad', listName: 'detailList' },
    7: { name: 'patchAd', listName: 'detailList' }
  }
});
const componentList = ref([])

</script>
<style lang="scss" scoped>

</style>
