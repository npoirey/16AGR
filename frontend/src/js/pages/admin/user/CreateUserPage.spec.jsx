/* eslint-disable import/no-extraneous-dependencies */
import 'sinon-as-promised'
import chai from 'chai'
import chaiEnzyme from 'chai-enzyme'
import dirtyChai from 'dirty-chai'
import { render, shallow } from 'enzyme'
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles/index'
import React from 'react'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import mockStore from '../../../../../test/mockStore'
import * as usersActions from '../../../actions/users/usersActions'
import CreateUserPage from './CreateUserPage'

const expect = chai.expect
chai.use(dirtyChai)
chai.use(chaiEnzyme())
chai.use(sinonChai)
const CreateUserPageUndecorated = CreateUserPage.WrappedComponent

const getWrapper = (store) => render(<MuiThemeProvider muiTheme={getMuiTheme()}>
  <CreateUserPage store={store} dispatch={null} params={{}}/>
</MuiThemeProvider>)

describe('<CreateUserPage>', () => {
  let store
  let defaultWrapper
  let createUserStub
  let dispatchStub

  before(() => {
    store = mockStore(({
      user: {
        user: undefined,
      },
    }))
    defaultWrapper = getWrapper(store)
  })

  beforeEach(() => {
    createUserStub = sinon.stub(usersActions, 'createUser')
    dispatchStub = sinon.stub().resolves('foo') // returns a resolve promise
  })

  afterEach(() => {
    createUserStub.restore()
  })

  it('render correctly', () => {
    expect(defaultWrapper.find('h1')).text().to.eql('Create new user')
    const emailInput = defaultWrapper.find('input[name="email"]')
    const callsignInput = defaultWrapper.find('input[name="callsign"]')
    const passwordInput = defaultWrapper.find('input[name="password"]')
    const passwordRepeatInput = defaultWrapper.find('input[name="passwordRepeat"]')

    expect(emailInput).to.have.attr('required')
    expect(emailInput).to.have.attr('type').equal('email')

    expect(callsignInput).to.have.attr('required')
    expect(callsignInput).to.have.attr('type').equal('text')

    expect(passwordInput).to.have.attr('required')
    expect(passwordInput).to.have.attr('type').equal('password')

    expect(passwordRepeatInput).to.have.attr('required')
    expect(passwordRepeatInput).to.have.attr('type').equal('password')
  })

  it('should enable and disable button', () => {
    const wrapper = shallow(<CreateUserPageUndecorated store={store} dispatch={dispatchStub} />)
    const inst = wrapper.instance()
    expect(inst).to.be.instanceOf(CreateUserPageUndecorated)
    expect(wrapper.state().buttonEnabled).to.be.false()
    inst.enableButton()
    expect(wrapper.state().buttonEnabled).to.be.true()
    inst.disableButton()
    expect(wrapper.state().buttonEnabled).to.be.false()
    inst.submit({ id: 'test' })
    expect(usersActions.createUser).to.have.been.calledWith({ id: 'test' })
  })
})
