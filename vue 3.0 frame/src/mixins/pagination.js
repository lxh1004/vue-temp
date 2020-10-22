export default {
  data() {
    return {
      page: {
        totalCount: 0, // 总条数
        pageSize: 10, // 每页显示条数
        pageNo: 1, // 当前页数
      },
      showLoading: false,
    };
  },
  methods: {
    // 改变页数
    handleCurrentChange(val) {
      this.page.pageNo = val;
    },
    // 改变条数
    handleSizeChange(val) {
      this.page.pageSize = val;
    },
  },
};
