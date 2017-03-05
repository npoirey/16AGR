/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai'
import chaiEnzyme from 'chai-enzyme'
import dirtyChai from 'dirty-chai'
import React from 'react'
import { render } from 'enzyme'
import { IntlProvider } from 'react-intl'
import UserFormattedDate from './UserFormattedDate'
import mockStore from '../../../../../test/mockStore'

const expect = chai.expect
chai.use(dirtyChai)
chai.use(chaiEnzyme())

describe('<UserFormattedDate>', () => {
  let store

  it('Should use Local Time if user has set preference for it', () => {
    store = mockStore((
      {
        user: {
          user: {
            preferences: {
              useLocalTime: true,
            },
          },
        },
      }
    ))

    const wrapper = render(
      <IntlProvider locale="en">
        <UserFormattedDate store={store} date="2017-01-19T16:00:00.000Z" />
      </IntlProvider>)
    expect(wrapper).to.have.html('<span>January 19, 2017, 16:00 GMT</span>')
  })

  it('Should use ZULU if user has set preference for it', () => {
    store = mockStore((
      {
        user: {
          user: {
            preferences: {
              useLocalTime: false,
            },
          },
        },
      }
    ))
    const wrapper = render(
      <IntlProvider locale="en">
        <UserFormattedDate store={store} date="2017-01-19T16:00:00.000Z" />
      </IntlProvider>)
    expect(wrapper).to.have.html('<div><span>January 19, 2017, 16:00</span> ZULU</div>')
  })

  it('Should use ZULU if there is no user', () => {
    store = mockStore((
      {
        user: {
          user: {},
        },
      }
    ))
    const wrapper = render(
      <IntlProvider locale="en">
        <UserFormattedDate store={store} date="2017-01-19T16:00:00.000Z" />
      </IntlProvider>)
    expect(wrapper).to.have.html('<div><span>January 19, 2017, 16:00</span> ZULU</div>')
  })
})
