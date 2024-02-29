import { defineComponent } from 'vue'

export type ResultType = {
  result: boolean
  error?: Error
  data?: object
}

export type ResultHtmlType = ResultType & {
  errorMsgStr: string
  errorStackStr: string
}

export type ResultErrCapturedType = ResultType & {
  componentName: string
  component: ReturnType<typeof defineComponent>
  info: string
}
