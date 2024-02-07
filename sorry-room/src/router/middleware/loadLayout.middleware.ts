import type { RouteLocationNormalized } from 'vue-router'
import { layoutToFileMap } from '@/layouts/layouts.functions'
import { resultFn } from '@/result.functions'
import type { ResultType } from '@/main.types'
export async function loadLayoutMiddleware(route: RouteLocationNormalized): Promise<ResultType> {
  const layout = route.meta ? route.meta.layout : undefined

  let normalizedLayoutName: string | unknown
  layout === undefined ? (normalizedLayoutName = 'default') : (normalizedLayoutName = layout)
  // normalizedLayoutName = 1 // для ошибки типа скрипта
  if (typeof normalizedLayoutName === 'string') {
    const fileName = layoutToFileMap[normalizedLayoutName]
    const fileNameWithoutExtension = fileName.split('.vue')[0]
    const component = await import(`../../layouts/${fileNameWithoutExtension}.vue`)

    if (typeof route.meta === 'undefined') {
      return resultFn(false, new Error('route.meta: undefined'))
    }
    route.meta.layoutComponent = component.default
    return resultFn(true)
  } else {
    return resultFn(false, new Error(`unknown type normalizedLayoutName: ${route.meta}`))
  }
}
