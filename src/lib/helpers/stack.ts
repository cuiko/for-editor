/**
 * @private {number} idx 堆栈当前索引
 * @private {number} size 堆栈大小，size > 0 为有效值
 * @readonly {array} stack 堆栈容器
 */
export default class Stack<T> {
  private idx: number = 0
  private size: number = 20
  private readonly stack: T[] = []

  constructor(size?: number) {
    if (size > 0) {
      this.size = size
    }
  }

  // 前置推出
  shift(): T {
    return this.stack.shift()
  }

  // 后置推入
  push(value: T): T {
    if (this.idx < this.len()) {
      this.stack.splice(this.idx + 1, this.len())
    }
    if (this.len() >= this.size) {
      this.shift()
    } else {
      this.idx = this.len()
    }
    this.stack.push(value)
    return value
  }

  // 上一个
  prev(): T {
    if (this.idx <= 0) {
      return this.stack[0]
    }
    return this.stack[--this.idx]
  }

  // 下一个
  next(): T {
    if (this.idx >= this.len() - 1) {
      return this.stack[this.len() - 1]
    }
    return this.stack[++this.idx]
  }

  // 当前
  get(idx?: number): T {
    if (idx >= 0) {
      return this.stack[idx]
    }
    return this.stack[this.idx]
  }

  // 长度
  len(): number {
    return this.stack.length
  }
}