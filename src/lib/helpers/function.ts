function insertText($vm: HTMLTextAreaElement, params: any): string {
  const { prefix, str = '', subfix = '' } = params
  const value = $vm.value
  if ($vm.selectionStart || $vm.selectionStart === 0) {
    const start = $vm.selectionStart
    const end = $vm.selectionEnd

    const restoreTop = $vm.scrollTop

    if (start === end) {
      $vm.value =
        value.substring(0, start) +
        prefix +
        str +
        subfix +
        value.substring(end, value.length)
      $vm.selectionStart = start + prefix.length
      $vm.selectionEnd = end + prefix.length + str.length
    } else {
      $vm.value =
        value.substring(0, start) +
        prefix +
        value.substring(start, end) +
        subfix +
        value.substring(end, value.length)
      $vm.selectionStart = start + prefix.length
      $vm.selectionEnd = end + prefix.length
    }

    $vm.focus()
    if (restoreTop >= 0) {
      $vm.scrollTop = restoreTop
    }
  }
  return $vm.value
}

function deleteCursorLine($vm: HTMLTextAreaElement) {
  let value = $vm.value
  if ($vm.selectionStart || $vm.selectionStart === 0) {
    let restoreTop = $vm.scrollTop

    let start = $vm.selectionStart
    let end = $vm.selectionEnd
    
    // 光标前的全部文本内容
    let valueBeforeCursor = value.substring(0, start)
    // 光标前全部内容中，、n的索引
    let firstLFIndexOfPrevRow = valueBeforeCursor.lastIndexOf('\n')
    // 光标后的全部文本内容
    let valueAfterCursor = value.substring(end, value.length)
    // 光标后的全部内容中，\n的索引
    let firstLFIndexOfNextRow = valueAfterCursor.indexOf('\n')

    if (firstLFIndexOfPrevRow === -1 && firstLFIndexOfNextRow === -1) {
      // 如果都没有找到\n(第一行)，则认为是第一行 e.g. 12 I 3
      value = ''

      setTimeout(() => {
        $vm.selectionStart = 0
        $vm.selectionEnd = 0
      })     
    } else if (firstLFIndexOfPrevRow === -1) {
      // 如果上一行没有找到\n，但是下一行有\n e.g. 12 I 3\n456
      value = valueAfterCursor.substring(firstLFIndexOfNextRow + 1, value.length)

      setTimeout(() => {
        $vm.selectionStart = 0
        $vm.selectionEnd = 0
      })
    } else if (firstLFIndexOfNextRow === -1) {
      // 如果上一行有\n，但下一行没有\n e.g. 123\n4 I 56
      value = valueBeforeCursor.substring(0, firstLFIndexOfPrevRow)

      setTimeout(() => {
        $vm.selectionStart = firstLFIndexOfPrevRow + 1
        $vm.selectionEnd = firstLFIndexOfPrevRow + 1
      })
    } else {
      // 前后都有\n e.g. 123\n4 I 5\n678
      // 光标上一行到第一个字符的内容
      let valueOfPrevRow = valueBeforeCursor.substring(0, firstLFIndexOfPrevRow + 1)
      // 光标下一行到最后一个字符的内容
      let valueOfNextRow = valueAfterCursor.substring(firstLFIndexOfNextRow + 1, value.length) 
      value = valueOfPrevRow + valueOfNextRow

      setTimeout(() => {
        $vm.selectionStart = firstLFIndexOfPrevRow + 1
        $vm.selectionEnd = firstLFIndexOfPrevRow + 1
      })
    }

    $vm.focus()
    if (restoreTop >= 0) {
      $vm.scrollTop = restoreTop
    }
  }
  return $vm.value = value
}

const seedMap = new Map()
function asyncMaker(seed?: string): (callback: () => void, delay?: number) => void {
  let timer: number // 默认的 timer
  if (seed) {
    let timerKey = `timer_${seed}`

    if (!seedMap.has(seed)) {
      seedMap.set(timerKey, null)
    }

    return (callback, delay): void => {
      let timerSeed = seedMap.get(timerKey)

      // reset
      if (timerSeed) {
        window.clearTimeout(timerSeed)
        seedMap.set(timerKey, null)
      }
    
      seedMap.set(`timer_${seed}`, window.setTimeout(callback, delay))
    }
  } else {
    return (callback, delay): void => {
      // reset
      window.clearTimeout(timer)
      timer = null
    
      timer = window.setTimeout(callback, delay)
    }
  }
}

export {
  insertText,
  deleteCursorLine,
  asyncMaker,
}
