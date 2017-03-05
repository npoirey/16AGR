/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai'
import chaiEnzyme from 'chai-enzyme'
import dirtyChai from 'dirty-chai'
import React from 'react'
import { shallow } from 'enzyme'
import Loader from './Loader'

const expect = chai.expect
chai.use(dirtyChai)
chai.use(chaiEnzyme())


describe('<Loader>', () => {
  it('instantiate correctly', () => {
    const wrapper = shallow(<Loader />)
    expect(wrapper).to.have.className('preloader-dots')
    expect(wrapper).to.have.exactly(5).descendants('.dot')
    // expect(wrapper).to.not.have.attr('style') //FIXME https://github.com/producthunt/chai-enzyme/issues/86
  })
  it('has an option to remove margins', () => {
    const wrapper = shallow(<Loader noMargin />)
    expect(wrapper).to.have.className('preloader-dots')
    expect(wrapper).to.have.exactly(5).descendants('.dot')
    expect(wrapper).to.have.style('margin').equal('0')
  })
})
