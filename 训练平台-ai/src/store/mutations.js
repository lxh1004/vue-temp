const mutations = {
    PATTERNLIST(state, value) {
        state.patternList = value
    },
    LEARNTYPELIST(state, value) {
        state.learnTypeList = value
    },
    JOBSTATUSLIST(state, value) {
        state.jobStatusList = value
    },
    FRAMEWORKLISTALL(state, value) {
        state.frameworkAllList = value
    },
    FRAMEWORKLISTROBOT(state, value) {
        state.frameworkRobotList = value
    },
    FRAMEWORKLISTDEEP(state, value) {
        state.frameworkDeepList = value
    },
    CSVCONTENTDATA(state, value){
        state.jobCsvContentArr = value;
    },
    SETTRAINABORTID(state, value) {
        state.trainAbortParam = value
    },
    setMViPathingData (state, value) {
      state.vi_pathing_data = value
    },
    setMViConfig (state, value) {
      state.vi_config = value
    },
    setDragDis(state,value){
      state.disDrag=value;
    }
}

export default mutations
