export default [
  {
    path: '/user',
    layout: false,
    routes: [{ name: '登录', path: '/user/login', component: './User/Login' }],
  },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  {
    path: '/excel',
    name: 'Excel管理',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/excel', redirect: '/excel/test' },
      { path: '/excel/test', name: '测试插件', component: './Excel/test' },
    ],
  },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
