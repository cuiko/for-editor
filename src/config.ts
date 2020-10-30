import zhCN from './lib/lang/zh-CN/index.json'
import en from './lib/lang/en/index.json'

interface ForEditorConfig {
  language: {
    [key in ForEditorLanguage]: ForEditorWords
  }
  langList: ForEditorLanguage[]
  toolbar: ForEditorToolbar
}

// 编辑栏设置
const CONFIG: ForEditorConfig = {
  language: {
    'zh-CN': zhCN,
    en: en,
  },
  langList: ['zh-CN', 'en'],
  toolbar: {
    undo: true,
    redo: true,
    deleteRow: true,
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
    wordwrap: true,
  }
}
export default CONFIG
