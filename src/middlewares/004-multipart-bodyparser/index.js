/* eslint-disable */
import busboy from 'co-busboy'
import convert from 'koa-convert'

module.exports = convert(function* (next) {
  return yield* next
  if (!this.request.is('multipart/*')) {
    return yield* next
  }

  const parser = busboy(this, {
    autoFields: true,
  })

  let fileStream

  // copy normal fields from parser to ctx.request.body
  const { body } = this.request

  while (fileStream = yield parser()) {
    // filesStream - stream with file
    // autoFields => part is a file
    // specific handlers know how to handle the file, not us
    // alt: can auto-save to disk
    this.throw(400, 'Files are not allowed here')
  }

  for (const [name, val, fieldnameTruncated, valTruncated] of parser.fields) {
    if (body[name]) { // same value already exists
      if (!Array.isArray(body[name])) { //  convert to array
        body[name] = [body[name]]
      }
      body[name].push(val)
    } else {
      body[name] = val
    }
  }

  yield* next
})
