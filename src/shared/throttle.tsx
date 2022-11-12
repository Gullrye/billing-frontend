export const throttle = <T extends ((...args: unknown[]) => any)>(fn: T, delay: number) => {
  let result: ReturnType<T>
  let begin: number = new Date().getTime()

  return (...args: Parameters<T>) => {
    let curr: number = new Date().getTime()
    if (curr - begin >= delay) {
      result = fn(...args)
      begin = curr
    }
    return result
  }
}
