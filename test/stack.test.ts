import Stack from '../src/lib/helpers/stack'

describe('Test src/lib/helpers/stack.ts', () => {
  describe('prev and next', () => {
    const stack = new Stack<string>()
  
    stack.push('item1')
    stack.push('item2')
    stack.push('item3')
    
    test('stack prev', () => {
      stack.prev()
      expect(stack.get()).toBe('item2')
    })
    
    test('stack prev -> next', () => {
      stack.next()
      expect(stack.get()).toBe('item3')
    })
  })

  describe('edge situation', () => {
    const stack = new Stack<string>()
  
    stack.push('item1')
    stack.push('item2')

    test('stack next edge', () => {
      stack.next()
      expect(stack.get()).toBe('item2')
    })
    
    test('stack prev edge', () => {
      stack.prev()
      expect(stack.get()).toBe('item1')

      stack.prev()
      expect(stack.get()).toBe('item1')
    })
  })

  describe('prev and push new item', () => {
    const stack = new Stack<string>()
  
    stack.push('item1')
    stack.push('item2')

    test('if the stack has 2 item, stack prev, and then, push new item', () => {
      stack.prev()
      expect(stack.get()).toBe('item1')

      stack.push('item3')
      expect(stack.len()).toBe(2)
      expect(stack.get()).toBe('item3')

      stack.next()
      expect(stack.get()).toBe('item3')
    })
  })

  describe('out of range', () => {
    const stack = new Stack<string>(2)
  
    stack.push('item1')
    stack.push('item2')
    stack.push('item3')

    expect(stack.get()).toBe('item3')
    expect(stack.get(0)).toBe('item2')
  })
})