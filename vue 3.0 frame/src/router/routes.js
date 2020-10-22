/**
 * 静态路由表
 */

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
    children: [
      {
        path: "/home/user",
        name: "user",
        component: () => import("../pages/user"),
        meta: {
          title: "用户管理",
        }
      },
      {
        path: "/home/project",
        name: "project",
        component: () => import("../pages/project"),
        meta: {
          title: "项目管理",
        }
      },
      {
        path: "/home/need",
        name: "need",
        component: () => import("../pages/need"),
        meta: {
          title: "需求管理",
        }
      },
      {
        path: "/home/employ",
        name: "employ",
        component: () => import("../pages/employ"),
        meta: {
          title: "用列管理",
        }
      },
      {
        path: "/home/defect",
        name: "defect",
        component: () => import("../pages/defect"),
        meta: {
          title: "BUG管理",
        }
      },
      {
        path: "/home/person",
        name: "person",
        component: () => import("../pages/person"),
        meta: {
          title: "用户中心",
        }
      },
      {
        path: "/home/overall",
        name: "overall",
        component: () => import("../pages/overall"),
        meta: {
          title: "整体概览",
        }
      },
    ]
  },
  {
    path: "/404",
    name: "not_found",
    component: () => import("@/404"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/login"),
    meta: {
      title: "登录",
    },
  },
  {
    path: "*",
    redirect: {
      path: "/404",
    },
  },
];

export default routes;
