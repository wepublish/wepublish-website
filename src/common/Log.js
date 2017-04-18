export function log () {
  if (process.env.NODE_ENV !== 'production') {
    console.log(...arguments)
  }
}