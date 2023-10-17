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
  const files: Record<string, any> = import.meta.glob('../router/**/*.ts', {
    eager: true
  })

  for (const key in files) {
    const module = files[key].default

    localRoutes.push(module)
  }

  return localRoutes
}
export let firstMenu: any = null
export function mapMenusToRoutes(userMenus: any[]) {
  const localRoutes = loadLocalRoutes()
  const routes: RouteRecordRaw[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      const menuUrl = submenu.url
      const route = localRoutes.find((item) => item.path == menuUrl)
      if (route) {
        if (!routes.find((item) => item.path == menu.url)) {
          routes.push({ path: menu.url, redirect: route.path })
        }
        routes.push(route)
      }
      if (!firstMenu && route) firstMenu = submenu
      // console.log(firstMenu)
    }
  }

  return routes
}

/**
 *
 * 根据路径去匹配需要显示的菜单
 * @param path 需要匹配的路径
 * @param userMenus 所有的菜单
 *
 *
 *
 */
export function mapPathToMenu(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        return submenu
      }
    }
  }
}

export function mapPathToBreadcrumb(path: string, userMenus: any[]) {
  // 定义面包屑
  const breadcrumb: any[] = []

  // 遍历获取面包屑层级
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        breadcrumb.push({ name: menu.name, path: menu.url })
        breadcrumb.push({ name: submenu.name, path: submenu.url })
      }
    }
  }
  return breadcrumb
}

/**
 * 菜单映射到id的列表
 *
 *
 */

export function mapMenuListToIds(menuList:any){
  const ids:number[] = []

  function recurseGetId(menus:any[]){
    for(const item of menus){
      if(item.children){
        recurseGetId(item.children)
      }else{
        ids.push(item.id)
      }
    }
  }

  recurseGetId(menuList)

  return ids
}
