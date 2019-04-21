import Boom from 'boom'


const bodyValidationError = () => Boom.badRequest('Invalid body!')
export default {
  bodyValidationError,
}
