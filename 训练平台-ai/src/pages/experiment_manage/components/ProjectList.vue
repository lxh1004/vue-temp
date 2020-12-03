<template>
  <div class="list-container">
    <ul class="list"
        v-infinite-scroll="load"
        :infinite-scroll-disabled="disabled">
      <li v-for="(item,index) in listData"
          class="list-item"
          :key="index">
        <project-list-item :experiment-data="item"
                           @clickItem="clickItem"></project-list-item>
      </li>
    </ul>
    <p v-if="loading"
       class="load-more">加载中...</p>
    <p v-if="noMore"
       class="load-more">没有更多了</p>
  </div>
</template>

<script>
import ProjectListItem from './ProjectListItem'
export default {
  name: 'ExperimentListCom',
  data() {
    return {
      count: 10,
      loading: false,
      noMore: false,
    }
  },
  props: {
    listData: {
      type: Array,
      default: () => [],
    },
  },
  components: { ProjectListItem },
  computed: {
    disabled() {
      return this.loading || this.noMore
    },
  },
  mounted() {},
  methods: {
    load() {
      this.$emit('load')
    },
    clickItem(value) {
      this.$emit('clickItem', value)
    },
  },
}
</script>

<style scoped lang="scss">
.list-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  border-radius: 10px;
}
.list{
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
}
.load-more {
  line-height: 50px;
  font-size: 14px;
  width: 100%;
  height: 50px;
  background: #fff;
  text-align: center;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
</style>
