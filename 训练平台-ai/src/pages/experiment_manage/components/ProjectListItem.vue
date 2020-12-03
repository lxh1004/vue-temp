<template>
  <div class="item-container">
    <div class="item-text-group">
      <div class="item-title">{{ experimentData.expName }}</div>
      <div class="item-type">
        <span class="pattern-left-icon"></span>
        <div>{{ checkPattern(experimentData.expPattern) }}</div>
      </div>
      <div class="item-type">
        <div class="item-subtitle">{{ experimentData.description ||''}}</div>
      </div>
      <div class="item-type">
        <div>{{ experimentData.createTime }}</div>
      </div>
    </div>
    <div class="button-group">
      <el-button type="success"
                 @click="selectDetail"
                 plain>查看详情</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "",
  data() {
    return {
      stateIndex: 0,
    };
  },
  computed: {
    ...mapGetters(["patternData"]),
  },
  components: {},
  props: {
    experimentData: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {},
  methods: {
    selectDetail() {
      this.$emit("clickItem", this.experimentData);
    },
    checkPattern(value) {
      let patternName = "模式";
      if (value) {
        for (let patternItem of this.patternData) {
          if (patternItem.expPattern === value) {
            patternName = patternItem.patternName;
            break;
          }
        }
      }
      return patternName;
    },
  },
};
</script>

<style scoped lang="scss">
.item-container {
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  width: 100%;
  height: 110px;
  background: #fff;
  box-sizing: border-box;
  border-bottom: 1px solid #eee;
}
.item-text-group {
  position: relative;
  display: flex;
  width: 88%;
  flex-direction: column;
  justify-content: space-around;
}
.button-group {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
}
.item-title {
  font-size: 16px;
  color: $title_color;
}
.item-subtitle {
  position: relative;
  font-size: 14px;
  text-align: start;
  width: 100%;
  margin-right: 20px;
  color: $subtitle_color;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; //文本不换行，这样超出一行的部分被截取，显示...
}
.item-type {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  color: $type_color;
  text-align: center;
  align-items: center;
}
.pattern-left-icon {
  background: $success_color;
  width: 10px;
  height: 10px;
  margin-right: 5px;
}
.status-left-icon {
  background: $auto_danger_color;
  width: 10px;
  height: 10px;
  margin-right: 5px;
}
</style>
