interface PriorityQueue<T> {
  insert(item: T, priority: number): void
  peek(): T | null
  pop(): T | null
  size(): number
  isEmpty(): boolean
}

const priorityQueue = <T>(): PriorityQueue<T> => {
  const data: [number, T][] = []

  return {

    insert: (i:T, p:number) => {
      if (data.length == 0) {
        data.push([p, i])
        return
      }

      for (let index = 0; index < data.length; index++) {
        if (index == data.length - 1) {
          data.push([p, i])
          return
        }

        if (data[index][0] > p) {
          data.splice(index, 0, [p, i])
          return
        }
      }
    },

    isEmpty: () => data.length == 0,

    peek: () => data.length == 0 ? null : data[0][1],

    pop: () => data.length == 0 ? null : data.pop()![1],

    size: () => data.length
  }

}
export {priorityQueue}