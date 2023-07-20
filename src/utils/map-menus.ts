import type { RouteRecordRaw } from 'vue-router'

function loadLocalRoutes() {
  /**
   * 1.获取菜单
   * 代码写的位置
   * 2.动态获取所有的路由对象，放到数组中
   * 路由对象都在独立的文件中
   * 从文件中将所有路由对象先读取数组中
   * 3.根据菜单去匹配正确的路由
   * router.addRoute('main',xxx)
   *
   */
  const localRoutes: RouteRecordRaw[] = []

  // 1.读取router/main/所有ts文件
  const files: Record<string, any> = import.meta.glob(
    '../router/main/**/*.ts',
    { eager: true }
  )
  console.log(files)

  for (const key in files) {
    const module = files[key]
    localRoutes.push(module.default)
  }

  return localRoutes
}

export function mapMenusToRoutes(userMenus: any[]) {
  const localRoutes = loadLocalRoutes()
  console.log(localRoutes)

  const routes: RouteRecordRaw[] = []

  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path === submenu.url)
      if (route) routes.push(route)
    }
  }

  return routes
}
