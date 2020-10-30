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
      // ctrl +
      switch (e.keyCode) {
        case KEY_CODE.Z: {
          // z
          e.preventDefault()
          func('undo')
          break
        }
        case KEY_CODE.Y: {
          // y
          e.preventDefault()
          func('redo')
          break
        }
        case KEY_CODE.S: {
          // s
          e.preventDefault()
          func('save')
          break
        }
      }
    } else if (e.shiftKey && !e.altKey && !(e.ctrlKey || e.metaKey)) {
      // shift +
      switch (e.keyCode) {
        case KEY_CODE.DELETE: {
          // delete row
          e.preventDefault()
          func('deleteRow')
          break
        }
      }
    } else if (e.altKey && !e.shiftKey && !(e.ctrlKey || e.metaKey)) {
      // alt
      switch (e.keyCode) {
        case KEY_CODE.Z:
          // z
          e.preventDefault()
          func('wordwrap')
          break
      }
    }
  })
}
