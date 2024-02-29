import type { ResultType } from '@/main.types'

export interface LayoutToFileMap {
  [key: string]: string
}
export interface ResultFn {
  (result: boolean, error?: Error, data?: object): ResultType
}

export interface Note {
  _id?: string
  createdAt?: object
  updatedAt?: object
  title?: string
  description?: string
  tags?: string[]
  content: {text?: string, type?: string, option: { theme?:string, lang?: string}}[]
}

export interface NoteList {
  currentPage: number,
  itemsPerPage: number
  notes: Note[]
}
