import zhCN from './lib/lang/zh-CN/index.json'
import en from './lib/lang/en/index.json'

export type ILanguage = 'zh-CN' | 'en'

// 工具栏选项
export interface IToolbar {
  undo?: boolean // 撤销
  redo?: boolean // 重做
  save?: boolean // 保存

  // 标题
  h?: {
    heading?: boolean // 是否显示
    h1?: boolean
    h2?: boolean
    h3?: boolean
    h4?: boolean
    h5?: boolean
    h6?: boolean
  }
  // 段落
  para?: {
    paragraph?: boolean // 是否显示
    italic?: boolean // 斜体
    bold?: boolean // 加粗
    boldItalic?: boolean // 斜体加粗
    strikethrough?: boolean // 删除线
    underline?: boolean // 下划线
    kbText?: boolean // 键盘文本
    superscript?: boolean // 上标
    subscript?: boolean // 下标
    markTag?: boolean // 文本高亮
  }
  img?: boolean // 图片
  list?: boolean // 列表
  code?: boolean // 代码
  hint?: boolean // 提示

  table?: boolean // 表格
  quote?: boolean // 引用
  link?: boolean // 链接
  hr?: boolean // 水平线
  collapse?: boolean // 折叠面板
  katex?: boolean // Katex支持
  toc?: boolean // 目录

  subfield?: boolean // 分栏显示
  preview?: boolean // 默认预览
  expand?: boolean // 全屏显示
}

// 工具栏选项描述
export interface IWords {
  placeholder?: string

  undo?: string
  redo?: string
  save?: string

  h1?: string
  h2?: string
  h3?: string
  h4?: string
  h5?: string
  h6?: string

  italic?: string
  bold?: string
  boldItalic?: string
  strikethrough?: string
  underline?: string
  kbText?: string
  superscript?: string
  subscript?: string
  markTag?: string

  addImgLink?: string
  addImg?: string

  orderedList?: string
  unorderedList?: string
  taskList?: string
  
  code?: string
  inlineCode?: string

  infoHint?: string
  warningHint?: string
  dangerHint?: string
  successHint?: string

  table?: string
  quote?: string
  link?: string
  hr?: string
  collapse?: string
  katex?: string
  toc?: string
  
  fullscreenOn?: string
  fullscreenOff?: string
  preview?: string
  singleColumn?: string
  doubleColumn?: string
}

export interface ICONFIG {
  language: {
    [key in ILanguage]: IWords
  }
  langList: ILanguage[]
  toolbar: IToolbar
}

// 编辑栏设置
const CONFIG: ICONFIG = {
  language: {
    'zh-CN': zhCN,
    en: en,
  },
  langList: ['zh-CN', 'en'],
  toolbar: {
    undo: true,
    redo: true,
    save: true,
    h: {
      heading: true,
      h1: true,
      h2: true,
      h3: true,
      h4: true,
      h5: true,
      h6: true,
    },
    para: {
      paragraph: true,
      italic: true,
      bold: true,
      boldItalic: true,
      strikethrough: true,
      underline: true,
      kbText: true,
      superscript: true,
      subscript: true,
      markTag: true,
    },
    img: true,
    list: true,
    code: true,
    hint: true,

    table: true,
    quote: true,
    link: true,
    hr: true,
    collapse: true,
    katex: true,
    toc: true,

    subfield: true,
    preview: true,
    expand: true,
  }
}
export default CONFIG
