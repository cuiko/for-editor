import * as React from 'react'
import classNames from 'classnames'
import '../lib/css/index.scss'

interface IP {
  onClick: (type: string) => void
  toolbar: ForEditorToolbar
  preview: boolean
  expand: boolean
  subfield: boolean
  wordwrap: boolean
  words: ForEditorWords
}

class Toolbars extends React.Component<IP, {}> {
  static defaultProps = {
    onClick: () => {},
    toolbars: {},
    words: {}
  }

  onClick(type: string) {
    this.props.onClick(type)
  }

  render() {
    const { preview, expand, subfield, toolbar, words, wordwrap } = this.props

    const wordwrapActive = classNames({
      'for-active': wordwrap
    })
    const previewActive = classNames({
      'for-active': preview
    })
    const expandActive = classNames({
      'for-active': expand
    })
    const subfieldActive = classNames({
      'for-active': subfield
    })
    return (
      <>
        {/* 桌面端 */}
        <div className="for-toolbar-right-pc">
          <ul>
            {toolbar.expand && (
              <li
                className={expandActive}
                onClick={() => this.onClick('expand')}
                title={expandActive ? words.fullscreenOff : words.fullscreenOn}
              >
                {expandActive ? (
                  <i className="foricon for-icon-quit-fullscreen" />
                ) : (
                  <i className="foricon for-icon-enter-fullscreen" />
                )}
              </li>
            )}
            {toolbar.preview && (
              <li
                className={previewActive}
                onClick={() => this.onClick('preview')}
                title={words.preview}
              >
                {previewActive ? (
                  <i className="foricon for-icon-visible" />
                ) : (
                  <i className="foricon for-icon-invisible" />
                )}
              </li>
            )}
            {toolbar.subfield && (
              <li
                className={subfieldActive}
                onClick={() => this.onClick('subfield')}
                title={subfieldActive ? words.singleColumn : words.doubleColumn}
              >
                <i className="foricon for-icon-subfield" />
              </li>
            )}
            {/* 自动换行 */}
            {toolbar.wordwrap && (
              <li
                className={wordwrapActive}
                onClick={() => this.onClick('wordwrap')}
                title={`${words.wordwrap} (alt + z)`}
              >
                <i className="foricon for-icon-wordwrap" />
              </li>
            )}
          </ul>
        </div>
        
        {/* 移动端 */}
        <div className="for-toolbar-right-mobile">
          <ul>
            {toolbar.expand && (
              <li
                className={expandActive}
                onClick={() => this.onClick('expand')}
                title={expandActive ? words.fullscreenOff : words.fullscreenOn}
              >
                {expandActive ? (
                  <i className="foricon for-icon-quit-fullscreen" />
                ) : (
                  <i className="foricon for-icon-enter-fullscreen" />
                )}
              </li>
            )}
            {toolbar.preview && (
              <li
                className={previewActive}
                onClick={() => this.onClick('preview')}
                title={words.preview}
              >
                {previewActive ? (
                  <i className="foricon for-icon-visible" />
                ) : (
                  <i className="foricon for-icon-invisible" />
                )}
              </li>
            )}
            {/* 自动换行 */}
            {toolbar.wordwrap && (
              <li
                className={wordwrapActive}
                onClick={() => this.onClick('wordwrap')}
                title={`${words.wordwrap} (alt + z)`}
              >
                <i className="foricon for-icon-wordwrap" />
              </li>
            )}
          </ul>
        </div>
      </>
    )
  }
}

export default Toolbars
