const bodyValidationError = ctx => ctx.throw(400, 'Invalid body!')
export default {
  bodyValidationError,
}
