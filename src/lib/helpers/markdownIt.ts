import emojione = require('emojione')

interface IOption {
  anchor: boolean
}

const markdownItRender = (content: string, hljs: any, option: IOption): string => {
  const {
    anchor
  } = option

  const markdownIt = require('markdown-it')({
    html: true,
    highlight: function(str: string, lang: string) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return `<pre class="for-code" design="by Mashiro"><code class="hljs language-${lang}" data-lang="${lang}">${hljs.highlightAuto(str).value}</code></pre>`
        } catch (__) {}
      }
  
      return `<pre class="for-code" design="by Mashiro"><code class="hljs" data-lang="${lang}">${markdownIt.utils.escapeHtml(str)}</code></pre>`
    }
  })
    .use(require('markdown-it-abbr'))
    .use(require('markdown-it-task-lists'))
    .use(require('markdown-it-emoji'))
    .use(require('markdown-it-footnote'))
    .use(require('markdown-it-ins'))
    .use(require('markdown-it-mark'))
    .use(require('markdown-it-sub'))
    .use(require('markdown-it-sup'))
    .use(require('markdown-it-katexx').default)
    .use(require('markdown-it-kbd'))
    .use(require('markdown-it-container'), 'collapse', {
      validate: function(params: string) {
        return params.trim().match(/^collapse\s+(.*)$/)
      },
      render: function(tokens: any, idx: number) {
        let m = tokens[idx].info.trim().match(/^collapse\s+(.*)$/)
        
        if (tokens[idx].nesting === 1) {
          // opening tag
          return '<details><summary>' + markdownIt.utils.escapeHtml(m[1]) + '</summary>\n'

        } else {
          // closing tag
          return '</details>\n'
        }
      }
    })
    .use(require('markdown-it-container'), 'hint', {
      validate: function(params: string) {
        return params.trim().match(/^hint\s+(info|warning|danger|success)$/)
      },
      render: function(tokens: any, idx: number) {
        let types = tokens[idx].info.trim().match(/^hint\s+(info|warning|danger|success)$/)

        if (tokens[idx].nesting === 1) {
          let type: string = types[1]
          const hintIcon: any = {
            info: `<svg preserveAspectRatio="xMidYMid meet" height="1em" width="1em" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor" class="icon-7f6730be--text-3f89f380"><g><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12" y2="16"></line></g></svg>`,
            warning: `<svg preserveAspectRatio="xMidYMid meet" height="1em" width="1em" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor" class="icon-7f6730be--text-3f89f380"><g><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12" y2="16"></line></g></svg>`,
            danger: `<svg preserveAspectRatio="xMidYMid meet" height="1em" width="1em" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor" class="icon-7f6730be--text-3f89f380"><g><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12" y2="17"></line></g></svg>`,
            success: `<svg preserveAspectRatio="xMidYMid meet" height="1em" width="1em" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor"><g><path d="M22 11.07V12a10 10 0 1 1-5.93-9.14"></path><polyline points="23 3 12 14 9 11"></polyline></g></svg>`
          }

          return (`\n
            <div class="for-hint ${type}">
              <span class="for-hint-icon">${hintIcon[type]}</span>
          `)
        } else {
          return '</div>\n'
        }
      }
    })
    
  // anchor
  if (anchor) {
    markdownIt.use(require('markdown-it-github-headings'), {
      className: 'for-anchor',
      prefix: 'for-',
      enableHeadingLinkIcons: true,
    })
  }

  // inline code
  // eslint-disable-next-line camelcase
  markdownIt.renderer.rules.code_inline = function(token: any, idx: any) {
    return `<code class="for-codespan">${token[idx].content}</code>`
  }

  // mark
  markdownIt.renderer.rules.mark = function(token: any, idx: any) {
    return `<mark class="for-mark">${token[idx].content}</mark>`
  }

  // emoji
  markdownIt.renderer.rules.emoji = function(token: any, idx: any) {
    return emojione.shortnameToImage(`:${token[idx].markup}:`)
  }

  // img
  markdownIt.renderer.rules.image = function(token: any, idx: any) {
    return `<img class="for-img" alt="${token[idx].content}" src="${token[idx].attrs[0][1]}" />`
  }

  return markdownIt.render(content)
}

export default (content: string, hljs: any, option: IOption): string => {
  if (typeof content !== 'string') return ''
  
  return markdownItRender(content, hljs, option)
}
