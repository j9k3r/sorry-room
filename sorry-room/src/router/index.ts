import { createRouter, createWebHistory } from 'vue-router'
import type {ResultType} from "@/main.types";
import {loadLayoutMiddleware} from "@/router/middleware/loadLayout.middleware";
import {saveErrorsToMeta} from "@/result.functions";

import HomeView from '../views/HomeView.vue'
import Editor from "@/components/editor/Editor.vue";
import Test from "@/components/editor/Test.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/old',
      name: 'home',
      component: HomeView
    },
    {
      path: '/',
      name: 'editor',
      component: Editor
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

router.beforeEach(async (to) => {
  // const err: ResultHtmlType[] = []
  const err: ResultType[] = []

  // sessionStorage.removeItem('Errors')
  try {
    const result = await loadLayoutMiddleware(to)

    router.onError((error) => {
      // err.push(resultErrorToJson({ result: false, error: error }))
      err.push({ result: false, error: error })

      //добавляем ошибки навигации
      // saveErrorsToMeta(resultErrorToJson({ result: false, error: error }), to)
      saveErrorsToMeta({ result: false, error: error }, to)
      console.log(`router.onError =  ${error.message}  `)
    })

    if (result.result) {
      // Продолжаем навигацию
    } else {
      const error = result.error || 'An error occurred'
      console.error('no catch - An error occurred while processing the route:', error)
      // err.push(resultErrorToJson(result))
      err.push(result)

      //добавляем новую ошибку
      // saveErrorsToMeta(resultErrorToJson(result), to)
      saveErrorsToMeta(result, to)
      // throw new Error('ssss') // для ошибки катч
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      const cstrErr: Error = new Error(error.message)
      cstrErr.stack = error.stack

      // err.push(resultErrorToJson({ result: false, error: cstrErr }))
      err.push({ result: false, error: cstrErr })

      // saveErrorsToMeta(resultErrorToJson({ result: false, error: cstrErr }), to)
      saveErrorsToMeta({ result: false, error: cstrErr }, to)

      console.error('Critical error the route:', error)
      // throw error
    } else {
      console.error('Error is not an instance of Error:', error)
    }
  }

  if (to.meta.errors && to.meta.errors instanceof Array)
    if (err.length !== to.meta.errors.length)
      console.log(new Error('The mismatch between the number of meta.error and the errors call'))
})

export default router
