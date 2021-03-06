import * as React from 'react'
import classNames from 'classnames'
import markdownIt from './lib/helpers/markdownIt'
import keydownListen from './lib/helpers/keydownListen'
import ToolbarLeft from './components/toolbar_left'
import ToolbarRight from './components/toolbar_right'
import CONFIG from './config'
import Stack from './lib/helpers/stack'
import { insertText, deleteCursorLine, asyncMaker } from './lib/helpers/function'
import { outlined, generateTOC } from './lib/helpers/outlined'
const elementResizeDetectorMaker = require('element-resize-detector')

import './lib/css/atom-one-dark.scss'
import './lib/icon/iconfont.css'
import './lib/css/index.scss'
import './lib/katex/katex.min.css'

interface IInsertTextObj {
  [type: string]: {
    prefix: string
    subfix: string
    str: string
  }
}

class MdEditor extends React.Component<ForEditorP, ForEditorS> {
  // 默认属性
  static defaultProps = {
    realtimeRender: false,
    realtimeRenderDelay: 50,
    lineNum: true,
    fontSize: '14px',
    disabled: false,
    preview: false,
    expand: false,
    subfield: false,
    style: {},
    toolbar: CONFIG.toolbar,
    language: 'en',
    outline: true,
    anchor: true,
    onChange: () => {},
    onSave: () => {},
    addImg: () => {},
  }

  private $vm = React.createRef<HTMLTextAreaElement>()
  private $scrollEdit = React.createRef<HTMLDivElement>()
  private $scrollPreview = React.createRef<HTMLDivElement>()
  private $blockEdit = React.createRef<HTMLDivElement>()
  private $blockPreview = React.createRef<HTMLDivElement>()
  private $lineNumFirstNode = React.createRef<HTMLLIElement>()
  private currentTimeout: number
  private history: Stack<string> = new Stack()
  
  constructor(props: ForEditorP) {
    super(props)

    this.state = {
      preview: props.preview,
      expand: props.expand,
      subfield: props.subfield,
      wordwrap: true,

      lineIndex: 1,
      sValue: props.value,
      words: {}
    }
  }

  componentDidMount() {
    keydownListen(this.$vm.current, (type: string) => {
      this.toolBarLeftClick(type)
      this.toolBarRightClick(type)
    })
    this.initLanguage()

    const erd = elementResizeDetectorMaker()
    const { realtimeRender, realtimeRenderDelay } = this.props
    let prevWidth: number
    erd.listenTo(this.$scrollEdit.current, (element: HTMLElement) => {
      if (prevWidth !== element.offsetWidth) {
        // 渲染高度
        if (realtimeRender) {
          this.reHeight()
        } else {
          asyncMaker('reHeight')(() => {
            this.reHeight()
          }, realtimeRenderDelay)
        }
        prevWidth = element.offsetWidth
      }
    })
  }

  componentDidUpdate(preProps: ForEditorP) {
    const { value, preview, expand, subfield, language } = this.props
    const { history } = this
    if (preProps.value !== value) {
      this.reHeight()
    }
    if (value !== history.get()) {
      window.clearTimeout(this.currentTimeout)
      this.currentTimeout = window.setTimeout(() => {
        this.saveHistory(value)
      }, 500)
    }

    if (subfield !== preProps.subfield && this.state.subfield !== subfield) {
      this.setState({ subfield })
    }
    if (preview !== preProps.preview && this.state.preview !== preview) {
      this.setState({ preview })
    }
    if (expand !== preProps.expand && this.state.expand !== expand) {
      this.setState({ expand })
    }

    if (language !== preProps.language) {
      this.initLanguage()
    }

    // 在此添加渲染函数
  }

  // 初始化语言
  initLanguage = (): void => {
    const { language } = this.props
    if (typeof language === 'string') {
      const lang = CONFIG.langList.indexOf(language) >= 0 ? language : 'en'
      this.setState({
        words: CONFIG.language[lang]
      })
    } else {
      this.setState({
        words: language
      })
    }
  }

  // 渲染value
  renderChange(value: string, callback?: (value?: string) => void) {
    const { realtimeRender, realtimeRenderDelay } = this.props
    
    callback && callback(value)

    if (realtimeRender) {
      this.setState({
        sValue: value
      })
    } else {
      asyncMaker('setSValue')(() => {
        this.setState({
          sValue: value
        })
      }, realtimeRenderDelay)
    }
  }

  // 输入框改变
  handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const value = e.target.value
    this.renderChange(value, this.props.onChange)
  }

  // 重新计算行号
  reLineNum() {
    const editHeight: number = parseFloat(
      this.$vm.current.getBoundingClientRect().height.toFixed(2)
    )
    const lineHeight: number = parseFloat(
      this.$lineNumFirstNode.current.getBoundingClientRect().height.toFixed(2)
    )
    const baseHeight: number = Math.round(editHeight / lineHeight)
    this.setState({
      lineIndex: baseHeight
    })
  }

  // 重新计算输入框高度
  reHeight() {
    this.$vm.current.style.height = ''
    this.$vm.current.style.height = this.$vm.current.scrollHeight + 'px'
    this.reLineNum()
  }

  // 保存
  save = (): void => {
    this.props.onSave(this.$vm.current!.value, this.$scrollPreview.current!.innerHTML)
  }

  // 保存记录
  saveHistory = (value: string): void => {
    let { history } = this
    
    history.push(value)
  }

  // 重置光标位置
  resetCursorPosition = ($vm: HTMLTextAreaElement, callback: () => void) => {
    let start = $vm.selectionStart 
    callback()
    setTimeout(() => {
      $vm.selectionStart = start
      $vm.selectionEnd = start
    })
  }

  // 撤销
  undo = (): void => {
    this.resetCursorPosition(this.$vm.current, () => {
      let { history } = this
      let prevValue = history.prev()
      this.props.onChange(prevValue)
      this.setState({
        sValue: prevValue,
      })
    })
  }

  // 重做
  redo = (): void => {
    this.resetCursorPosition(this.$vm.current, () => {
      let { history } = this
      let nextValue = history.next()
      this.props.onChange(nextValue)
      this.setState({
        sValue: nextValue,
      })
    })
  }

  // 左侧菜单点击
  toolBarLeftClick = (type: string): void => {
    const { words } = this.state
    const insertTextObj: IInsertTextObj = {
      h1: {
        prefix: '# ',
        subfix: '',
        str: words.h1
      },
      h2: {
        prefix: '## ',
        subfix: '',
        str: words.h2
      },
      h3: {
        prefix: '### ',
        subfix: '',
        str: words.h3
      },
      h4: {
        prefix: '#### ',
        subfix: '',
        str: words.h4
      },
      h5: {
        prefix: '##### ',
        subfix: '',
        str: words.h5
      },
      h6: {
        prefix: '###### ',
        subfix: '',
        str: words.h6
      },
      quote: {
        prefix: '> ',
        subfix: '',
        str: words.quote
      },
      italic: {
        prefix: '*',
        subfix: '*',
        str: words.italic
      },
      bold: {
        prefix: '**',
        subfix: '**',
        str: words.bold
      },
      boldItalic: {
        prefix: '***',
        subfix: '***',
        str: words.boldItalic
      },
      strikethrough: {
        prefix: '~~',
        subfix: '~~',
        str: words.strikethrough
      },
      underline: {
        prefix: '++',
        subfix: '++',
        str: words.underline
      },
      kbText: {
        prefix: '[[',
        subfix: ']]',
        str: words.kbText
      },
      superscript: {
        prefix: '',
        subfix: '',
        str: '2^10^'
      },
      subscript: {
        prefix: '',
        subfix: '',
        str: 'x~1~'
      },
      markTag: {
        prefix: '==',
        subfix: '==',
        str: words.markTag
      },
      table: {
        prefix: '',
        subfix: '',
        str:
          '| title      | description     |\n| ---------- | --------------- |\n| for-editor | markdown editor |\n'
      },
      img: {
        prefix: '![alt](',
        subfix: ')',
        str: 'url'
      },
      link: {
        prefix: '[title](',
        subfix: ')',
        str: 'url'
      },
      orderedList: {
        prefix: '\n1. ',
        subfix: '',
        str: 'item'
      },
      unorderedList: {
        prefix: '\n- ',
        subfix: '',
        str: 'item'
      },
      taskList: {
        prefix: '\n- [x] ',
        subfix: '',
        str: 'item'
      },
      inlineCode: {
        prefix: '`',
        subfix: '`',
        str: words.inlineCode
      },
      code: {
        prefix: '```',
        subfix: '\n\n```',
        str: 'language'
      },
      collapse: {
        prefix: '\n::: collapse header\n',
        subfix: '\n:::',
        str: 'content'
      },
      katex: {
        prefix: '\n\n$$\n',
        subfix: '\n$$\n',
        str: 'a^2 + b^2 = c^2'
      },
      tab: {
        prefix: '  ',
        subfix: '',
        str: ''
      },
      hr: {
        prefix: '\n------------\n\n',
        subfix: '',
        str: ''
      },
      toc: {
        prefix: '\n<!-- TOC -->\n\n',
        subfix: '\n<!-- TOC -->\n',
        str: generateTOC(this.props.value)
      },
      infoHint: {
        prefix: '\n::: hint info\n',
        subfix: '\n:::',
        str: words.infoHint
      },
      warningHint: {
        prefix: '\n::: hint warning\n',
        subfix: '\n:::',
        str: words.warningHint
      },
      dangerHint: {
        prefix: '\n::: hint danger\n',
        subfix: '\n:::',
        str: words.dangerHint
      },
      successHint: {
        prefix: '\n::: hint success\n',
        subfix: '\n:::',
        str: words.successHint
      },
    }

    if (insertTextObj.hasOwnProperty(type)) {
      if (this.$vm.current) {
        const value = insertText(this.$vm.current, insertTextObj[type])
        this.props.onChange(value)
        this.setState({
          sValue: value
        })
      }
    }

    const otherLeftClick: any = {
      undo: this.undo,
      redo: this.redo,
      save: this.save,
      deleteRow: () => {
        const value = deleteCursorLine(this.$vm.current)
        this.props.onChange(value) 
        this.setState({
          sValue: value
        })
      }
    }
    if (otherLeftClick.hasOwnProperty(type)) {
      otherLeftClick[type]()
    }
  }

  // 添加图片
  addImg = (file: File, index: number) => {
    this.props.addImg(file, index)
  }

  // 插入链接到输入框
  public $img2Url = (name: string, url: string) => {
    const value = insertText(this.$vm.current, {
      prefix: `![${name}](${url})`,
      subfix: '',
      str: ''
    })
    this.props.onChange(value)
    this.setState({
      sValue: value
    })
  }

  // 右侧菜单点击
  toolBarRightClick = (type: string): void => {
    const previewClick = () => {
      this.setState({
        preview: !this.state.preview
      })
    }
    const expandClick = () => {
      this.setState({
        expand: !this.state.expand
      })
    }
    const subfieldClick = () => {
      const { preview, subfield } = this.state
      if (preview) {
        if (subfield) {
          this.setState({
            subfield: false,
            preview: false
          })
        } else {
          this.setState({
            subfield: true
          })
        }
      } else {
        if (subfield) {
          this.setState({
            subfield: false
          })
        } else {
          this.setState({
            preview: true,
            subfield: true
          })
        }
      }
    }
    const wordwrapClick = () => {
      this.setState({
        wordwrap: !this.state.wordwrap
      }, () => {
        this.reHeight()
      })
    }

    const rightClick: any = {
      preview: previewClick,
      expand: expandClick,
      subfield: subfieldClick,
      wordwrap: wordwrapClick,
    }
    if (rightClick.hasOwnProperty(type)) {
      rightClick[type]()
    }
  }

  // 聚焦
  focusText = (): void => {
    this.$vm.current!.focus()
  }

  // 滚动同步
  handleScoll = (e: React.UIEvent<HTMLDivElement>): void => {
    const radio =
      this.$blockEdit.current!.scrollTop /
      (this.$scrollEdit.current!.scrollHeight - e.currentTarget.offsetHeight)
    this.$blockPreview.current!.scrollTop =
      (this.$scrollPreview.current!.scrollHeight - this.$blockPreview.current!.offsetHeight) * radio
  }

  render() {
    const { preview, expand, subfield, wordwrap, lineIndex, words, sValue } = this.state
    const {
      placeholder,
      fontSize,
      disabled,
      height,
      style,
      toolbar,
      outline,
      highlight,
      anchor,
      value,
    } = this.props
    const editorClass = classNames({
      'for-panel': true,
      'for-editor-edit': true,
      'for-editor-subfield': preview && subfield,
      'for-editor-edit-hidden': preview && !subfield
    })
    const editorContentClass = classNames({
      'for-editor-content': true,
      'for-editor-content-wordwrap': wordwrap
    })
    const previewClass = classNames({
      'for-panel': true,
      'for-editor-preview': true,
      'for-editor-subfield': preview && subfield
    })
    const fullscreen = classNames({
      'for-container': true,
      'for-fullscreen': expand
    })
    const lineNumStyles = classNames({
      'for-line-num': true,
      'hidden': !this.props.lineNum
    })

    // 行号
    function lineNum() {
      const list = []
      for (let i = 0; i < lineIndex; i++) {
        list.push(<li key={i + 1}>{i + 1}</li>)
      }
      return list
    }

    return (
      <div className={fullscreen} style={{ height, ...style }}>
        {/* 菜单栏 */}
        {Boolean(Object.keys(toolbar).length) && (
          <div className="for-toolbar">
            <ToolbarLeft
              toolbar={toolbar}
              words={words}
              onClick={this.toolBarLeftClick}
              addImg={this.addImg}
            />
            <ToolbarRight
              toolbar={toolbar}
              words={words}
              preview={preview}
              expand={expand}
              subfield={subfield}
              wordwrap={wordwrap}
              onClick={this.toolBarRightClick}
            />
          </div>
        )}
        
        {/* 内容区 */}
        <div className="for-editor" style={{ fontSize }}>
          {/* 编辑区 */}
          <div
            className={editorClass}
            ref={this.$blockEdit}
            onScroll={this.handleScoll}
            onClick={this.focusText}
          >
            <div className="for-editor-block" ref={this.$scrollEdit}>
              <ul className={lineNumStyles}>
                <li ref={this.$lineNumFirstNode} key={0}>0</li>
                {lineNum()}
              </ul>
              <div className={editorContentClass}>
                <pre id="true-value">{value}</pre>
                <textarea
                  ref={this.$vm}
                  value={value}
                  disabled={disabled}
                  onChange={this.handleChange}
                  placeholder={placeholder ? placeholder : words.placeholder}
                />
              </div>
            </div>
          </div>

          {/* 预览区 */}
          <div className={previewClass} ref={this.$blockPreview}>
            <div
              id="for-preview"
              ref={this.$scrollPreview}
              className="for-preview for-markdown-preview"
              dangerouslySetInnerHTML={{ __html: markdownIt(sValue || value, highlight, { anchor }) }}
            ></div>
          </div>

          {/* 大纲 */}
          {preview && outline && anchor && (
            <div id="for-outline-box" className="for-outline-box">
              <div className="for-outline-title">
                <i className="foricon for-icon-outline2"></i>
              </div>
              <div
                className="for-outline-body"
                dangerouslySetInnerHTML={{ __html: outlined(sValue || value) }}
              ></div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default MdEditor