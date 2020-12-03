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
        component: () => import("@/pages/user"),
        meta: {
          title: "用户管理",
        }
      },
      {
        path: "/home/project",
        name: "project",
        component: () => import("@/pages/project"),
        meta: {
          title: "项目管理",
        }
      },
      {
        path: "/home",
        redirect: {
          path: "/home/project",
        },
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
