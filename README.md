# for-editor

[![version](https://img.shields.io/npm/v/@cuiko/for-editor.svg)](https://www.npmjs.com/package/@cuiko/for-editor)
[![download](https://img.shields.io/npm/dm/@cuiko/for-editor.svg)](https://www.npmjs.com/package/@cuiko/for-editor)
[![cnpmVersion](https://cnpmjs.org/badge/v/@cuiko/for-editor.svg)](https://cnpmjs.org/package/@cuiko/for-editor)
[![cnpmDownload](https://cnpmjs.org/badge/d/@cuiko/for-editor.svg)](https://cnpmjs.org/package/@cuiko/for-editor)

> Markdown editor for React

> Base on [for-editor-herb v2.0.0](https://github.com/HerbertHe/for-editor-herb)

## Demo

[demo page](http://demo.cuiko.top/for-editor/)

## Documents

* [简体中文](./README.md)

## Todo

- [ ] README_EN.md
- [ ] 编写`markdown-it`拓展，提供插入自定义`iframe`的支持，方便得插入视频
- [ ] 提供相册(多张图片展示)支持
- [ ] `emoji`表情展示，方便插入
- [ ] 提供首字下沉支持
- [ ] 其他语言的支持
- [ ] ~~提供音乐播放器支持~~
- [ ] ~~快捷键`Shift` + `del`删除当前行~~

## Install

```shell
# npm
npm install @cuiko/for-editor -S
# yarn
yarn add @cuiko/for-editor
```

## Usage

```js
import React from 'react'
import ReactDOM from 'react-dom'
import Editor from '@cuiko/for-editor'

// require `highlight.js` package
const Hljs = require('highlight.js')

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  componentDidMount() {
    // register languages in componentDidMount lifecycle
    Hljs.registerLanguage('css', require('highlight.js/lib/languages/css'))
    Hljs.registerLanguage('json', require('highlight.js/lib/languages/json'))
    Hljs.registerLanguage('less', require('highlight.js/lib/languages/less'))
    Hljs.registerLanguage('scss', require('highlight.js/lib/languages/scss'))
    Hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'))
    Hljs.registerLanguage('typescript', require('highlight.js/lib/languages/typescript'))
    Hljs.registerLanguage('go', require('highlight.js/lib/languages/go'))
  }

  handleChange: (value) => {
    this.setState({
      value
    })
  }

  render() {
    const { value } = this.state

    // pass in Hljs
    return (
      <Editor
        value={value}
        onChange={this.handleChange}
        highlight={Hljs}
      />
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
```

## Api

### Props

* 基本参数

  | 参数名 | 类型 | 默认值 | 说明 |
  | --- | --- | --- | --- |
  | fontSize | string | '14px' | 字体大小 |
  | disabled | boolean | false | 是否禁用 |
  | height | string | '600px' | 高度 |
  | placeholder | string | '开始编辑...' | 占位文本 |
  | style | object | {} | 样式 |
  | value | string | - | 编辑器值 |

* 组件参数

  | 参数名 | 类型 | 默认值 | 说明 |
  | --- | --- | --- | --- |
  | realtimeRender | boolean | false | 是否实时渲染 |
  | realtimeRenderDelay | number | 50 | 异步渲染间隔，单位：毫秒 |
  | lineNum | boolean | true | 是否显示行号 |
  | language | ILanguage / IWords | en | 默认语言 |
  | preview | boolean | false | 是否显示预览 |
  | expand | boolean | false | 是否全屏 |
  | subfield | boolean | false | 是否双栏显示(预览模式激活下有效) |
  | toolbar | object | 如下 | 自定义工具栏 |
  | anchor | boolean | true | 是否在预览时显示标题锚点 |
  | outline | boolean | true | 是否在预览时显示大纲 |
  | highlight | Function | - | 自定义`hljs`支持的语言 |

### Events

| 参数名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| onChange | Function | - | 内容改变时触发 |
| onSave | Function | - | 保存时触发 |
| addImg | Function(File) | - | 添加图片时触发 |

```js
// toolbar 说明
/*
默认工具栏按钮全部开启, 传入自定义对象
  例如: {
    h1: true, // h1
    code: true, // 代码块
    preview: true, // 预览
  }
  此时, 仅仅显示此三个功能键
  注:传入空对象则不显示工具栏
*/
toolbar: {
  undo: true,
  redo: true,
  save: true,
  h: {
    heading: true, // 是否显示
    h1: true,
    h2: true,
    h3: true,
    h4: true,
    h5: true,
    h6: true,
  },
  para: {
    paragraph: true, // 是否显示
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
```

```ts
// ILanguage 说明
type ILanguage = 'zh-CN' | 'en'
```

```ts
// IWords 说明
interface IWords {
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
```

### Upload Image

```js
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
    this.$vm = React.createRef()
  }

  handleChange(value) {
    this.setState({
      value
    })
  }

  addImg($file) {
    console.log($file) // The $file type is File
    // upload file => success => call $img2Url
    this.$vm.current.$img2Url($file.name, 'file_url')
  }

  render() {
    const { value } = this.state

    return (
      <Editor
        ref={this.$vm}
        value={value}
        addImg={($file) => this.addImg($file)}
        onChange={(value) => this.handleChange(value)}
      />
    )
  }
}
```

### Hotkey

| name     | description |
| ------   | ----------- |
| Tab      | two space   |
| Ctrl + S | save        |
| Ctrl + Z | undo        |
| Ctrl + Y | redo        |

## Update

* [Update Log](./docs/UPDATELOG.md)

## Bug

是的，它有一些小毛病

1. 撤销、重做后光标会到最后一行，而不是，上次操作的位置

## Licence

Copyright (c) 2020 cuiko. [MIT License](./LICENSE).