import React from 'react'

declare class MdEditor extends React.Component<ForEditorP, ForEditorS> {
  $img2Url: (name: string, url: string) => void
}
export default MdEditor

declare global {
  // 语言
  type ForEditorLanguage = 'zh-CN' | 'en'
  // 工具栏选项
  interface ForEditorToolbar {
    undo?: boolean // 撤销
    redo?: boolean // 重做
    deleteRow?: boolean // 删除行
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
    wordwrap?: boolean // 自动换行
  }
  // 工具栏选项描述
  interface ForEditorWords {
    placeholder?: string

    undo?: string
    redo?: string
    deleteRow?: string
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
    wordwrap?: string
  }
  // 组件选项
  interface ForEditorP {
    // 基本参数
    fontSize?: string
    disabled?: boolean
    height?: string
    placeholder?: string
    style?: object
    value?: string
    
    // 组件参数
    realtimeRender?: boolean // 是否实时渲染
    realtimeRenderDelay?: number // 实时渲染延时
    lineNum?: boolean
    language?: ForEditorLanguage | ForEditorWords
    preview?: boolean
    expand?: boolean
    subfield?: boolean
    toolbar?: ForEditorToolbar
    anchor?: boolean
    outline?: boolean
    highlight: () => string
    
    onChange?: (value: string) => void
    onSave?: (value: string, parsed: string) => void
    addImg?: (file: File, index: number) => void
  }
  // 组件状态
  interface ForEditorS {
    preview: boolean
    expand: boolean
    subfield: boolean
    wordwrap: boolean
    lineIndex: number
    sValue: string
    words: ForEditorWords
  }
}