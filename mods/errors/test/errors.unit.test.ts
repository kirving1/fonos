import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import chaiAsPromised from 'chai-as-promised'
import { join } from 'path'
import FonosError from '../src/error'
import FonosInvalidArgument from '../src/invalid_argument'
import { INVALID_ARGUMENT } from '../src/codes'

const expect = chai.expect
chai.use(sinonChai)
chai.use(chaiAsPromised)
const sandbox = sinon.createSandbox()

if (process.env.NODE_ENV === 'dev') {
  require('dotenv').config({ path: join(__dirname, '..', '..', '.env') })
}

describe('@fonos/errors', () => {
  afterEach(() => sandbox.restore())

  it('has correct constructor name and message', () => {
    expect(new FonosError('test'))
      .to.have.property('name')
      .to.be.equal('FonosError')
    expect(() => {
      throw new FonosError('my message')
    }).to.throw('my message')
  })

  it('has correct constructor name, message, and code', () => {
    expect(new FonosInvalidArgument('test'))
      .to.have.property('name')
      .to.be.equal('FonosInvalidArgument')

    expect(new FonosInvalidArgument())
      .to.have.property('code')
      .to.be.equal(INVALID_ARGUMENT)

    expect(new FonosInvalidArgument()).to.have.property('stack')
  })
})
