import * as React from 'react'
import { IToolbar, IWords } from '../config'
import '../lib/css/index.scss'

interface IP {
  onClick: (type: string) => void
  addImg: (file: File, index: number) => void
  toolbar: IToolbar
  words: IWords
}

interface IS {
  imgList: File[]

  imgHidden: boolean
  paraHidden: boolean
  titleHidden: boolean
  moreHidden: boolean
  listHidden: boolean
  codeHidden: boolean
  hintHidden: boolean
}

class Toolbars extends React.Component<IP, IS> {
  static defaultProps = {
    onClick: () => {},
    toolbar: {},
    words: {}
  }

  private imgTimer: number
  private paraTimer: number
  private titleTimer: number
  private moreTimer: number
  private listTimer: number
  private codeTimer: number
  private hintTimer: number
  private timerInterval = 150

  constructor(props: IP) {
    super(props)

    this.state = {
      imgList: [],
      imgHidden: true,
      paraHidden: true,
      titleHidden: true,
      moreHidden: true,
      listHidden: true,
      codeHidden: true,
      hintHidden: true,
    }
  }

  onClick(type: string) {
    this.props.onClick(type)
  }

  listMouseOver() {
    window.clearTimeout(this.listTimer)
    this.setState({
      listHidden: false
    })
  }
  listMouseOut() {
    this.listTimer = window.setTimeout(() => {
      this.setState({
        listHidden: true
      })
    }, this.timerInterval)
  }

  paraMouseOver() {
    window.clearTimeout(this.paraTimer)
    this.setState({
      paraHidden: false
    })
  }
  paraMouseOut() {
    this.paraTimer = window.setTimeout(() => {
      this.setState({
        paraHidden: true
      })
    }, this.timerInterval)
  }

  titleMouseOver() {
    window.clearTimeout(this.titleTimer)
    this.setState({
      titleHidden: false
    })
  }
  titleMouseOut() {
    this.titleTimer = window.setTimeout(() => {
      this.setState({
        titleHidden: true
      })
    }, this.timerInterval)
  }

  moreMouseOver() {
    window.clearTimeout(this.moreTimer)
    this.setState({
      moreHidden: false
    })
  }
  moreMouseOut() {
    this.moreTimer = window.setTimeout(() => {
      this.setState({
        moreHidden: true
      })
    }, this.timerInterval)
  }

  imgMouseOver() {
    window.clearTimeout(this.imgTimer)
    this.setState({
      imgHidden: false
    })
  }
  imgMouseOut() {
    this.imgTimer = window.setTimeout(() => {
      this.setState({
        imgHidden: true
      })
    }, this.timerInterval)
  }

  codeMouseOver() {
    window.clearTimeout(this.codeTimer)
    this.setState({
      codeHidden: false
    })
  }
  codeMouseOut() {
    this.codeTimer = window.setTimeout(() => {
      this.setState({
        codeHidden: true
      })
    }, this.timerInterval)
  }

  hintMouseOver() {
    window.clearTimeout(this.hintTimer)
    this.setState({
      hintHidden: false
    })
  }
  hintMouseOut() {
    this.hintTimer = window.setTimeout(() => {
      this.setState({
        hintHidden: true
      })
    }, this.timerInterval)
  }

  addImgUrl() {
    this.props.onClick('img')
  }

  addImgFile(e: any) {
    let { imgList } = this.state
    const index = imgList.length
    imgList.push(e.target.files[0])
    this.setState({
      imgList
    })
    this.props.addImg(e.target.files[0], index)
    e.target.value = ''
  }

  render() {
    const { toolbar, words } = this.props
    const { imgHidden, paraHidden, titleHidden, moreHidden, listHidden, codeHidden, hintHidden } = this.state
    return (
      <>
        {/* 桌面端 */}
        <div className="for-toolbar-left-pc">
          <ul>
            {/* 撤销 */}
            {toolbar.undo && (
              <li onClick={() => this.onClick('undo')} title={`${words.undo} (ctrl + z)`}>
                <i className="foricon for-icon-undo" />
              </li>
            )}
            {/* 重做 */}
            {toolbar.redo && (
              <li onClick={() => this.onClick('redo')} title={`${words.redo} (ctrl + y)`}>
                <i className="foricon for-icon-redo" />
              </li>
            )}
            {/* 保存 */}
            {toolbar.save && (
              <li onClick={() => this.onClick('save')} title={`${words.save} (ctrl + s)`}>
                <i className="foricon for-icon-save" />
              </li>
            )}
            {/* 分隔符 */}
            {(toolbar.save || toolbar.undo || toolbar.redo) && (
              <i className="for-separator" />
            )}

            {/* 折叠标题 */}
            {toolbar.h.heading && (
              <li
                className="for-toolbar-title"
                onMouseOver={() => this.titleMouseOver()}
                onMouseOut={() => this.titleMouseOut()}
                onClick={() => this.titleMouseOut()}
              >
                <i className="foricon for-icon-heading" />
                <ul style={titleHidden ? { display: 'none' } : {}}>
                  {toolbar.h.h1 && (
                    <li onClick={() => this.onClick('h1')} title={words.h1}>
                      {words.h1}
                    </li>
                  )}
                  {toolbar.h.h2 && (
                    <li onClick={() => this.onClick('h2')} title={words.h2}>
                      {words.h2}
                    </li>
                  )}
                  {toolbar.h.h3 && (
                    <li onClick={() => this.onClick('h3')} title={words.h3}>
                      {words.h3}
                    </li>
                  )}
                  {toolbar.h.h4 && (
                    <li onClick={() => this.onClick('h4')} title={words.h4}>
                      {words.h4}
                    </li>
                  )}
                  {toolbar.h.h5 && (
                    <li onClick={() => this.onClick('h5')} title={words.h5}>
                      {words.h5}
                    </li>
                  )}
                  {toolbar.h.h6 && (
                    <li onClick={() => this.onClick('h6')} title={words.h6}>
                      {words.h6}
                    </li>
                  )}
                </ul>
              </li>
            )}

            {/* 折叠段落 */}
            {toolbar.para.paragraph && (
              <li
                className="for-toolbar-para"
                onMouseOver={() => this.paraMouseOver()}
                onMouseOut={() => this.paraMouseOut()}
                onClick={() => this.paraMouseOut()}
              >
                <i className="foricon for-icon-text" />
                <ul style={paraHidden ? { display: 'none' } : {}}>
                  {toolbar.para.italic && (
                    <li onClick={() => this.onClick('italic')} title={words.italic}>
                      {words.italic}
                    </li>
                  )}
                  {toolbar.para.bold && (
                    <li onClick={() => this.onClick('bold')} title={words.bold}>
                      {words.bold}
                    </li>
                  )}
                  {toolbar.para.boldItalic && (
                    <li onClick={() => this.onClick('boldItalic')} title={words.boldItalic}>
                      {words.boldItalic}
                    </li>
                  )}

                  {toolbar.para.strikethrough && (
                    <li onClick={() => this.onClick('strikethrough')} title={words.strikethrough}>
                      {words.strikethrough}
                    </li>
                  )}

                  {toolbar.para.underline && (
                    <li onClick={() => this.onClick('underline')} title={words.underline}>
                      {words.underline}
                    </li>
                  )}

                  {toolbar.para.kbText && (
                    <li onClick={() => this.onClick('kbText')} title={words.kbText}>
                      {words.kbText}
                    </li>
                  )}

                  {toolbar.para.superscript && (
                    <li onClick={() => this.onClick('superscript')} title={words.superscript}>
                      {words.superscript}
                    </li>
                  )}

                  {toolbar.para.subscript && (
                    <li onClick={() => this.onClick('subscript')} title={words.subscript}>
                      {words.subscript}
                    </li>
                  )}

                  {toolbar.para.markTag && (
                    <li onClick={() => this.onClick('markTag')} title={words.markTag}>
                      {words.markTag}
                    </li>
                  )}
                </ul>
              </li>
            )}

            {/* 折叠图片 */}
            {toolbar.img && (
              <li
                className="for-toolbar-img"
                onMouseOver={() => this.imgMouseOver()}
                onMouseOut={() => this.imgMouseOut()}
                onClick={() => this.imgMouseOut()}
              >
                <i className="foricon for-icon-image" />
                <ul style={imgHidden ? { display: 'none' } : {}}>
                  <li onClick={() => this.addImgUrl()}>{words.addImgLink}</li>
                  <li>
                    {words.addImg}
                    <input
                      type="file"
                      accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
                      onChange={(e) => this.addImgFile(e)}
                    />
                  </li>
                </ul>
              </li>
            )}

            {/* 折叠列表 */}
            {toolbar.list && (
              <li
                className="for-toolbar-list"
                onMouseOver={() => this.listMouseOver()}
                onMouseOut={() => this.listMouseOut()}
                onClick={() => this.listMouseOut()}
              >
                <i className="foricon for-icon-list" />
                <ul style={listHidden ? { display: 'none' } : {}}>
                  <li onClick={() => this.onClick('unorderedList')} title={words.unorderedList}>
                    {words.unorderedList}
                  </li>
                  <li onClick={() => this.onClick('orderedList')} title={words.orderedList}>
                    {words.orderedList}
                  </li>
                  <li onClick={() => this.onClick('taskList')} title={words.taskList}>
                    {words.taskList}
                  </li>
                </ul>
              </li>
            )}

            {/* 折叠代码 */}
            {toolbar.code && (
              <li
                className="for-toolbar-code"
                onMouseOver={() => this.codeMouseOver()}
                onMouseOut={() => this.codeMouseOut()}
                onClick={() => this.codeMouseOut()}
              >
                <i className="foricon for-icon-code" />
                <ul style={codeHidden ? { display: 'none' } : {}}>
                  <li onClick={() => this.onClick('code')} title={words.code}>
                    {words.code}
                  </li>
                  <li onClick={() => this.onClick('inlineCode')} title={words.orderedList}>
                    {words.inlineCode}
                  </li>
                </ul>
              </li>
            )}

            {/* 折叠提示 */}
            {toolbar.hint && (
              <li
                className="for-toolbar-hint"
                onMouseOver={() => this.hintMouseOver()}
                onMouseOut={() => this.hintMouseOut()}
                onClick={() => this.hintMouseOut()}
              >
                <i className="foricon for-icon-hint" />
                <ul style={hintHidden ? { display: 'none' } : {}}>
                  <li onClick={() => this.onClick('infoHint')} title={words.infoHint}>
                    {words.infoHint}
                  </li>
                  <li onClick={() => this.onClick('warningHint')} title={words.warningHint}>
                    {words.warningHint}
                  </li>
                  <li onClick={() => this.onClick('dangerHint')} title={words.dangerHint}>
                    {words.dangerHint}
                  </li>
                  <li onClick={() => this.onClick('successHint')} title={words.successHint}>
                    {words.successHint}
                  </li>
                </ul>
              </li>
            )}

            {/* 表格 */}
            {toolbar.table && (
              <li onClick={() => this.onClick('table')} title={words.table}>
                <i className="foricon for-icon-table" />
              </li>
            )}

            {/* 引用 */}
            {toolbar.quote && (
              <li onClick={() => this.onClick('quote')} title={words.quote}>
                <i className="foricon for-icon-quote" />
              </li>
            )}

            {/* 链接 */}
            {toolbar.link && (
              <li onClick={() => this.onClick('link')} title={words.link}>
                <i className="foricon for-icon-link" />
              </li>
            )}

            {/* 水平线 */}
            {toolbar.hr && (
              <li onClick={() => this.onClick('hr')} title={words.hr}>
                <i className="foricon for-icon-hr" />
              </li>
            )}

            {/* 折叠块 */}
            {toolbar.collapse && (
              <li onClick={() => this.onClick('collapse')} title={words.collapse}>
                <i className="foricon for-icon-collapse" />
              </li>
            )}

            {/* katex支持 */}
            {toolbar.katex && (
              <li onClick={() => this.onClick('katex')} title={words.katex}>
                <i className="foricon for-icon-katex" />
              </li>
            )}

            {/* 插入目录 */}
            {toolbar.toc && (
              <li onClick={() => this.onClick('toc')} title={words.toc}>
                <i className="foricon for-icon-outline1" />
              </li>
            )}
          </ul>
        </div>

        {/* 移动端 */}
        <div className="for-toolbar-left-mobile">
          <ul>
            {/* 撤销 */}
            {toolbar.undo && (
              <li onClick={() => this.onClick('undo')} title={`${words.undo} (ctrl + z)`}>
                <i className="foricon for-icon-undo" />
              </li>
            )}
            {/* 重做 */}
            {toolbar.redo && (
              <li onClick={() => this.onClick('redo')} title={`${words.redo} (ctrl + y)`}>
                <i className="foricon for-icon-redo" />
              </li>
            )}
            {/* 保存 */}
            {toolbar.save && (
              <li onClick={() => this.onClick('save')} title={`${words.save} (ctrl + s)`}>
                <i className="foricon for-icon-save" />
              </li>
            )}
            {/* 分隔符 */}
            {(toolbar.save || toolbar.undo || toolbar.redo) && (
              <i className="for-separator" />
            )}

            {/* 折叠标题 */}
            {toolbar.h.heading && (
              <li
                className="for-toolbar-title"
                onMouseOver={() => this.titleMouseOver()}
                onMouseOut={() => this.titleMouseOut()}
                onClick={() => this.titleMouseOut()}
              >
                <i className="foricon for-icon-heading" />
                <ul style={titleHidden ? { display: 'none' } : {}}>
                  {toolbar.h.h1 && (
                    <li onClick={() => this.onClick('h1')} title={words.h1}>
                      {words.h1}
                    </li>
                  )}
                  {toolbar.h.h2 && (
                    <li onClick={() => this.onClick('h2')} title={words.h2}>
                      {words.h2}
                    </li>
                  )}
                  {toolbar.h.h3 && (
                    <li onClick={() => this.onClick('h3')} title={words.h3}>
                      {words.h3}
                    </li>
                  )}
                  {toolbar.h.h4 && (
                    <li onClick={() => this.onClick('h4')} title={words.h4}>
                      {words.h4}
                    </li>
                  )}
                  {toolbar.h.h5 && (
                    <li onClick={() => this.onClick('h5')} title={words.h5}>
                      {words.h5}
                    </li>
                  )}
                  {toolbar.h.h6 && (
                    <li onClick={() => this.onClick('h6')} title={words.h6}>
                      {words.h6}
                    </li>
                  )}
                </ul>
              </li>
            )}

            {/* 折叠段落 */}
            {toolbar.para.paragraph && (
              <li
                className="for-toolbar-para"
                onMouseOver={() => this.paraMouseOver()}
                onMouseOut={() => this.paraMouseOut()}
                onClick={() => this.paraMouseOut()}
              >
                <i className="foricon for-icon-text" />
                <ul style={paraHidden ? { display: 'none' } : {}}>
                  {toolbar.para.italic && (
                    <li onClick={() => this.onClick('italic')} title={words.italic}>
                      {words.italic}
                    </li>
                  )}
                  {toolbar.para.bold && (
                    <li onClick={() => this.onClick('bold')} title={words.bold}>
                      {words.bold}
                    </li>
                  )}
                  {toolbar.para.boldItalic && (
                    <li onClick={() => this.onClick('boldItalic')} title={words.boldItalic}>
                      {words.boldItalic}
                    </li>
                  )}

                  {toolbar.para.strikethrough && (
                    <li onClick={() => this.onClick('strikethrough')} title={words.strikethrough}>
                      {words.strikethrough}
                    </li>
                  )}

                  {toolbar.para.underline && (
                    <li onClick={() => this.onClick('underline')} title={words.underline}>
                      {words.underline}
                    </li>
                  )}

                  {toolbar.para.kbText && (
                    <li onClick={() => this.onClick('kbText')} title={words.kbText}>
                      {words.kbText}
                    </li>
                  )}

                  {toolbar.para.superscript && (
                    <li onClick={() => this.onClick('superscript')} title={words.superscript}>
                      {words.superscript}
                    </li>
                  )}

                  {toolbar.para.subscript && (
                    <li onClick={() => this.onClick('subscript')} title={words.subscript}>
                      {words.subscript}
                    </li>
                  )}

                  {toolbar.para.markTag && (
                    <li onClick={() => this.onClick('markTag')} title={words.markTag}>
                      {words.markTag}
                    </li>
                  )}
                </ul>
              </li>
            )}

            {/* 折叠图片 */}
            {toolbar.img && (
              <li
                className="for-toolbar-img"
                onMouseOver={() => this.imgMouseOver()}
                onMouseOut={() => this.imgMouseOut()}
                onClick={() => this.imgMouseOut()}
              >
                <i className="foricon for-icon-image" />
                <ul style={imgHidden ? { display: 'none' } : {}}>
                  <li onClick={() => this.addImgUrl()}>{words.addImgLink}</li>
                  <li>
                    {words.addImg}
                    <input
                      type="file"
                      accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
                      onChange={(e) => this.addImgFile(e)}
                    />
                  </li>
                </ul>
              </li>
            )}

            {/* 折叠列表 */}
            {toolbar.list && (
              <li
                className="for-toolbar-list"
                onMouseOver={() => this.listMouseOver()}
                onMouseOut={() => this.listMouseOut()}
                onClick={() => this.listMouseOut()}
              >
                <i className="foricon for-icon-list" />
                <ul style={listHidden ? { display: 'none' } : {}}>
                  <li onClick={() => this.onClick('unorderedList')} title={words.unorderedList}>
                    {words.unorderedList}
                  </li>
                  <li onClick={() => this.onClick('orderedList')} title={words.orderedList}>
                    {words.orderedList}
                  </li>
                  <li onClick={() => this.onClick('taskList')} title={words.taskList}>
                    {words.taskList}
                  </li>
                </ul>
              </li>
            )}

            {/* 折叠代码 */}
            {toolbar.code && (
              <li
                className="for-toolbar-code"
                onMouseOver={() => this.codeMouseOver()}
                onMouseOut={() => this.codeMouseOut()}
                onClick={() => this.codeMouseOut()}
              >
                <i className="foricon for-icon-code" />
                <ul style={codeHidden ? { display: 'none' } : {}}>
                  <li onClick={() => this.onClick('code')} title={words.code}>
                    {words.code}
                  </li>
                  <li onClick={() => this.onClick('inlineCode')} title={words.orderedList}>
                    {words.inlineCode}
                  </li>
                </ul>
              </li>
            )}

            {/* 折叠提示 */}
            {toolbar.hint && (
              <li
                className="for-toolbar-hint"
                onMouseOver={() => this.hintMouseOver()}
                onMouseOut={() => this.hintMouseOut()}
                onClick={() => this.hintMouseOut()}
              >
                <i className="foricon for-icon-hint" />
                <ul style={hintHidden ? { display: 'none' } : {}}>
                  <li onClick={() => this.onClick('infoHint')} title={words.infoHint}>
                    {words.infoHint}
                  </li>
                  <li onClick={() => this.onClick('warningHint')} title={words.warningHint}>
                    {words.warningHint}
                  </li>
                  <li onClick={() => this.onClick('dangerHint')} title={words.dangerHint}>
                    {words.dangerHint}
                  </li>
                  <li onClick={() => this.onClick('successHint')} title={words.successHint}>
                    {words.successHint}
                  </li>
                </ul>
              </li>
            )}

            {/* 更多 */}
            <li
              className="for-toolbar-more"
              onMouseOver={() => this.moreMouseOver()}
              onMouseOut={() => this.moreMouseOut()}
            >
              <i className="foricon for-icon-more" />
              <ul style={moreHidden ? { display: 'none' } : {}} onClick={() => this.moreMouseOut()}>
                {/* 表格 */}
                {toolbar.table && (
                  <li onClick={() => this.onClick('table')} title={words.table}>
                    <i className="foricon for-icon-table" />
                    <span>{words.table}</span>
                  </li>
                )}

                {/* 引用 */}
                {toolbar.quote && (
                  <li onClick={() => this.onClick('quote')} title={words.quote}>
                    <i className="foricon for-icon-quote" />
                    <span>{words.quote}</span>
                  </li>
                )}

                {/* 链接 */}
                {toolbar.link && (
                  <li onClick={() => this.onClick('link')} title={words.link}>
                    <i className="foricon for-icon-link" />
                    <span>{words.link}</span>
                  </li>
                )}

                {/* 水平线 */}
                {toolbar.hr && (
                  <li onClick={() => this.onClick('hr')} title={words.hr}>
                    <i className="foricon for-icon-hr" />
                    <span>{words.hr}</span>
                  </li>
                )}

                {/* 折叠块 */}
                {toolbar.collapse && (
                  <li onClick={() => this.onClick('collapse')} title={words.collapse}>
                    <i className="foricon for-icon-collapse" />
                    <span>{words.collapse}</span>
                  </li>
                )}

                {/* katex支持 */}
                {toolbar.katex && (
                  <li onClick={() => this.onClick('katex')} title={words.katex}>
                    <i className="foricon for-icon-katex" />
                    <span>{words.katex}</span>
                  </li>
                )}

                {/* 插入目录 */}
                {toolbar.toc && (
                  <li onClick={() => this.onClick('toc')} title={words.toc}>
                    <i className="foricon for-icon-outline1" />
                    <span>{words.toc}</span>
                  </li>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </>
    )
  }
}

export default Toolbars
