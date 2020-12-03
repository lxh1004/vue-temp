/**
 * 静态路由表
 */
const NoFound = () => import("@/pages/not_found");
const ProjectManage = () => import("@/pages/experiment_manage");
const ProjectTrain = () => import("@/pages/job_train");
const ProjectDetail = () => import("@/pages/experiment_detail");
const Login = () => import("@/pages/login")
const routes = [
  {
    path: "/",
    redirect: {
      path: "/login",
    },
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/pages/home"),
    meta: {
      title: "实验管理",
      index: "/home",
    },
    children: [
      {
        path: "/home",
        redirect: {
          path: "/home/experiment_manage",
        },
      },
      {
        path: "/home/experiment_manage",
        name: "experiment_manage",
        component: ProjectManage,
        meta: {
          index: "/home/experiment_manage",
        },
      },
      {
        path: "/home/experiment_detail",
        name: "experiment_detail",
        component: ProjectDetail,
        meta: {
          title: "实验详情",
          index: "/home/experiment_manage",
        },
      },
    ],
  },
  {
    path: "/job_train",
    component: ProjectTrain,
    name: "project_train",
    meta: {
      title: "训练工具",
    },
  },
  {
    path: "/not_found",
    name: "not_found",
    component: NoFound,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      title: "登录",
    },
  },
  {
    path: "*",
    redirect: {
      path: "/not_found",
    },
  },
];

export default routes;
