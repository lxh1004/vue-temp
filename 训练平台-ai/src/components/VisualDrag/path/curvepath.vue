<template>
  <g ref="gss">
    <template v-for="(item,index) in con">
      <t-line :key="index"
              :portData="item"
              @on-mouse="mouseFn"
              @on-mouse-over="mouseOverFn"
              @on-mouse-out="mouseOutFn">
      </t-line>
    </template>
    <t-line v-if="path.isShow"
            :portData="path">
    </t-line>
  </g>
</template>
<script>
import TLine from "./tline.vue";
import { zoomRatio } from "@/utils/tools";
import { mapGetters } from "vuex";
export default {
  components: { TLine },
  name: "CurvePath",
  props: {
    paths: {
      type: Array,
    },
    areaid: [String, Number],
  },
  data() {
    return {
      con: [],
    };
  },
  watch: {
    paths(newData, oldData) {
      this.vReload();
    },
  },
  computed: {
    ...mapGetters(["getViConfig"]),
    path() {
      let pa = this.$store.getters.getViPathingData;
      let isShow = pa.isShow;
      if (pa.Mxy) {
        pa = this.computeXY(pa.Mxy, pa.Txy, true);
      }
      pa.isShow = isShow;
      pa.dotted = this.getViConfig.isDotted;
      pa.ptype = this.getViConfig.lineType;
      return pa;
    },
  },
  mounted() {
    this.vReload();
  },
  methods: {
    vReload() {
      this.con = [];
      this.paths.forEach((o) => {
        let vstart = document.getElementById(o.startPort);
        let vend = document.getElementById(o.endPort);
        if (vend && vstart) {
          let obj = this.computeXY(vstart, vend, false);
          if (o.dotted) {
            obj.dotted = o.dotted;
          }
          if (o.ptype) {
            obj.ptype = o.ptype;
          }
          obj.startPort = o.startPort;
          obj.endPort = o.endPort;
          obj.useAnimation = o.useAnimation?o.useAnimation:false;
          this.con.push(obj);
        }
      });
    },
    computeXY(vstart, vend, isBing) {
      let area = document.getElementById(this.areaid);
      let scaling = this.getViConfig.scaling;
      let zoom = zoomRatio() / 100;
      let obj = {};
      if (isBing) {
        obj = {
          Mxy: {
            x: vstart.x - area.getBoundingClientRect().left,
            y: vstart.y - area.getBoundingClientRect().top,
          },
          Txy: {
            x: vend.x - area.getBoundingClientRect().left,
            y: vend.y - area.getBoundingClientRect().top,
          },
        };
      } else {
        let vstartRect = vstart.getBoundingClientRect();
        let vendRect = vend.getBoundingClientRect();
        obj = {
          Mxy: {
            x:
              vstartRect.left / zoom -
              area.getBoundingClientRect().left +
              5 * scaling.Zoom,
            y:
              vstartRect.top / zoom -
              area.getBoundingClientRect().top +
              5 * scaling.Zoom,
          },
          Txy: {
            x:
              vendRect.left / zoom -
              area.getBoundingClientRect().left +
              4 * scaling.Zoom,
            y:
              vendRect.top / zoom -
              area.getBoundingClientRect().top +
              4 * scaling.Zoom,
          },
        };
      }
      return obj;
    },
    mouseFn(event, portData) {
      this.$emit("on-mouse", event, portData);
    },
    mouseOverFn(event, portData) {
      this.$emit("on-mouse-over", event, portData);
    },
    mouseOutFn(event, portData) {
      this.$emit("on-mouse-out", event, portData);
    },
  },
};
</script>
