const KEY_CODE = {
  S: 83,
  Z: 90,
  Y: 89,
  TAB: 9,
  DELETE: 46,
}

export default ($vm: HTMLTextAreaElement, func: any) => {
  $vm.addEventListener('keydown', e => {
    if (!(e.ctrlKey || e.metaKey) && !e.altKey && !e.shiftKey) {
      // normal
      switch (e.keyCode) {
        case KEY_CODE.TAB: {
          e.preventDefault()
          func('tab')
          break
        }
      }
    } else if ((e.ctrlKey || e.metaKey) && !e.altKey && !e.shiftKey) {
      // Ctrl +
      switch (e.keyCode) {
        case KEY_CODE.Z: {
          // Z
          e.preventDefault()
          func('undo')
          break
        }
        case KEY_CODE.Y: {
          // Y
          e.preventDefault()
          func('redo')
          break
        }
        case KEY_CODE.S: {
          // S
          e.preventDefault()
          func('save')
          break
        }
      }
    } else if (e.shiftKey && !e.altKey && !(e.ctrlKey || e.metaKey)) {
      // Shift +
      switch (e.keyCode) {
        case KEY_CODE.DELETE: {
          // Delete
          e.preventDefault()
          func('delete')
          break
        }
      }
    }
  })
}
