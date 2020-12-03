export default {
  data() {
    return {
      page: {
        total: 0, // 总条数
        limit: 10, // 每页显示条数
        page: 1, // 当前页数
      },
      showLoading: false,
    };
  },
  methods: {
    // 改变页数
    handleCurrentChange(val) {
      this.page.page = val;
    },
    // 改变条数
    handleSizeChange(val) {
      this.page.limit = val;
    },
  },
};
