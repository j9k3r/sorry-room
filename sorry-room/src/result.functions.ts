import type { ResultFn } from '@/interfaces'
import type { ResultHtmlType, ResultType } from "./main.types";
import type { RouteLocationNormalized } from "vue-router";

export const resultFn: ResultFn = (result, error, data) => {
  return { result, error, data }
}
export function resultErrorToJson(result: ResultType): ResultHtmlType {
  const resultJson: ResultHtmlType = { ...result, errorMsgStr: '', errorStackStr: '' }
  resultJson.error = undefined
  resultJson.errorMsgStr = result.error!.message!
  resultJson.errorStackStr = result.error!.stack!
  return resultJson
}

// export function saveErrorsSession(err) {
//   const existingErrors = sessionStorage.getItem('Errors')
//   const allErrors = existingErrors ? JSON.parse(existingErrors).concat(err) : err
//   sessionStorage.setItem('Errors', JSON.stringify(allErrors))
// }

// Сохранение ошибок в метаданные маршрута
// export function saveErrorsToMeta(err: ResultHtmlType, to: RouteLocationNormalized) {
export function saveErrorsToMeta(err: ResultType, to: RouteLocationNormalized) {
  if (!(to.meta.errors instanceof Array)) {
    // to.meta.errors = [err] as ResultType[]
    to.meta.errors = [err] as ResultType[]
  } else {
    to.meta.errors.push(err)
  }
}
