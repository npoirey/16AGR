/* eslint-disable import/no-extraneous-dependencies */
import 'sinon-as-promised'
import chai from 'chai'
import chaiEnzyme from 'chai-enzyme'
import dirtyChai from 'dirty-chai'
import { mount, shallow } from 'enzyme'
import { Checkbox, FlatButton, TableBody, TableRow, TableRowColumn } from 'material-ui'
import { getMuiTheme, MuiThemeProvider } from 'material-ui/styles/index'
import React from 'react'
import { Link } from 'react-router'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import * as usersActions from '../../../actions/users/usersActions'
import EnhancedTable from '../../../components/widgets/enhancedTable/EnhancedTable'
import UsersPage from './UsersPage'


const expect = chai.expect
chai.use(dirtyChai)
chai.use(chaiEnzyme())
chai.use(sinonChai)
const UsersPageUndecorated = UsersPage.WrappedComponent

const getWrapper = (dispatch, users, loading) => mount(<MuiThemeProvider muiTheme={getMuiTheme()}>
  <UsersPageUndecorated dispatch={dispatch} users={users} loading={loading} />
</MuiThemeProvider>)

describe('<UsersPage>', () => {
  let users
  let defaultWrapper
  let fetchUsersStub
  let deleteUsersStub
  let dispatchStub

  beforeEach(() => {
    users = [{
      admin: true,
      callsign: 'admin',
      email: 'admin@mymail.com',
      id: 1,
    }, {
      admin: false,
      callsign: 'user',
      email: 'user@mymail.com',
      id: 2,
    }, {
      admin: false,
      callsign: 'user2',
      email: 'user2@mymail.com',
      id: 3,
    }]
    dispatchStub = sinon.stub().resolves('foo')
    fetchUsersStub = sinon.stub(usersActions, 'fetchUsers')
    deleteUsersStub = sinon.stub(usersActions, 'deleteUsers')
  })

  afterEach(() => {
    fetchUsersStub.restore()
    deleteUsersStub.restore()
  })

  it('render correctly', () => {
    defaultWrapper = getWrapper(dispatchStub, users, false)
    expect(defaultWrapper.find('h1')).text().to.eql('Users list')
    const actionRow = defaultWrapper.find('.action-row-buttons')
    const buttons = actionRow.find(FlatButton)
    expect(buttons).to.have.length(2)
    // delete button
    const deleteButton = buttons.at(0)
    expect(deleteButton.prop('disabled')).to.be.true()
    expect(deleteButton.find('span')).to.have.length(2)
    expect(deleteButton.find('.material-icons')).text().to.eql('delete')
    expect(deleteButton.find('span').at(1)).text().to.eql('Delete selected')
    // add user button
    const addButton = buttons.at(1)
    expect(addButton.find('span')).to.have.length(2)
    expect(addButton.find('.material-icons')).text().to.eql('add')
    expect(addButton.find('span').at(1)).text().to.eql('Create user')
    expect(addButton.find(Link).prop('to')).to.eql('/admin/users/create')
    // users table
    const table = defaultWrapper.find(EnhancedTable)
    expect(table.prop('selectable')).to.be.true()
    expect(table.prop('multiSelectable')).to.be.true()
    expect(table.prop('displaySelectAll')).to.be.false()
    expect(table.prop('hoverable')).to.be.true()
    expect(table.prop('data')).to.eql(users)
    // row content
    const tableBody = table.find(TableBody)
    const firstRow = tableBody.find(TableRow).at(0)
    expect(firstRow.find(TableRowColumn).at(1)).text().to.eql('admin')
    expect(firstRow.find(TableRowColumn).at(2)).text().to.eql('admin@mymail.com')
    expect(firstRow.find(TableRowColumn).at(3).find(Checkbox).prop('disabled')).to.be.true()
    expect(firstRow.find(TableRowColumn).at(3).find(Checkbox).prop('defaultChecked')).to.be.true()
    expect(firstRow.find(TableRowColumn).at(4).find(Link).prop('to')).to.eql('/admin/users/1')
    const secondRow = tableBody.find(TableRow).at(1)
    expect(secondRow.find(TableRowColumn).at(1)).text().to.eql('user')
    expect(secondRow.find(TableRowColumn).at(2)).text().to.eql('user@mymail.com')
    expect(secondRow.find(TableRowColumn).at(3).find(Checkbox).prop('disabled')).to.be.true()
    expect(secondRow.find(TableRowColumn).at(3).find(Checkbox).prop('defaultChecked')).to.be.false()
    expect(secondRow.find(TableRowColumn).at(4).find(Link).prop('to')).to.eql('/admin/users/2')
  })

  it('should init state correctly', () => {
    defaultWrapper = shallow(<UsersPageUndecorated dispatch={dispatchStub} users={users} loading={false} />)
    expect(defaultWrapper.state().selectedIds).to.eql([])
    expect(defaultWrapper.state().request).to.eql({
      sort: {
        name: 'callsign',
        order: 'ASC',
      },
      filters: [],
    })
    expect(defaultWrapper.state().columns.length).to.eql(4)
    expect(defaultWrapper.state().columns[0]).to.eql({
      name: 'callsign',
      label: 'Callsign',
      type: 'text',
      sortable: true,
      filterable: true,
    })
    expect(defaultWrapper.state().columns[1]).to.eql({
      name: 'email',
      label: 'Email',
      type: 'text',
      sortable: true,
      filterable: true,
    })
    expect(defaultWrapper.state().columns[2]).to.eql({
      name: 'admin',
      label: 'Admin',
      type: 'boolean',
      sortable: false,
      filterable: true,
      style: {
        width: '60px',
      },
    })
    expect({ ...defaultWrapper.state().columns[3], render: 'placeholder' }).to.eql({
      name: 'actions',
      type: 'custom',
      sortable: false,
      filterable: false,
      style: {
        width: '50px',
      },
      render: 'placeholder',
    })
  })

  it('should fetch users on request change', () => {
    defaultWrapper = shallow(<UsersPageUndecorated dispatch={dispatchStub} users={users} loading={false} />)
    expect(fetchUsersStub).to.have.been.calledWith(
      {
        sort: {
          name: 'callsign',
          order: 'ASC',
        },
        filters: [],
      },
    )
    fetchUsersStub.reset()

    const newRequest = {
      sort: {
        name: 'callsign',
        order: 'ASC',
      },
      filters: [{
        name: 'callsign',
        pattern: 'adm',
        type: 'contains',
      }],
    }
    defaultWrapper.instance().onRequestChange(newRequest)
    expect(fetchUsersStub).to.have.been.calledWith(newRequest)
  })

  it('should update state on selection change', () => {
    defaultWrapper = shallow(<UsersPageUndecorated dispatch={dispatchStub} users={users} loading={false} />)
    expect(defaultWrapper.state().selectedIds).to.eql([])
    defaultWrapper.instance().onRowSelection([{ id: 1 }])
    expect(defaultWrapper.state().selectedIds).to.eql([1])
  })

  it('should delete selected users and fetch users again on success', () => {
    defaultWrapper = shallow(<UsersPageUndecorated dispatch={dispatchStub} users={users} loading={false} />)

    fetchUsersStub.reset()
    defaultWrapper.instance().onRowSelection([{ id: 1 }])
    // successful call
    defaultWrapper.instance().onRequestChange({
      sort: {
        name: 'callsign',
        order: 'ASC',
      },
      filters: [],
    })
    defaultWrapper.instance().deleteSelected()
    expect(deleteUsersStub).to.have.been.calledWith([1])
    expect(fetchUsersStub).to.have.been.calledWith(
      {
        sort: {
          name: 'callsign',
          order: 'ASC',
        },
        filters: [],
      },
    )
  })

  it('should delete selected users and fetch users again on error', () => {
    defaultWrapper = shallow(<UsersPageUndecorated dispatch={dispatchStub} users={users} loading={false} />)
    fetchUsersStub.reset()
    const newRequest = {
      sort: {
        name: 'callsign',
        order: 'ASC',
      },
      filters: [{
        name: 'callsign',
        pattern: 'adm',
        type: 'contains',
      }],
    }
    dispatchStub.rejects('error')

    defaultWrapper.instance().onRequestChange(newRequest)
    defaultWrapper.instance().onRowSelection([{ id: 2 }])
    defaultWrapper.instance().deleteSelected()
    expect(deleteUsersStub).to.have.been.calledWith([2])
    expect(fetchUsersStub).to.have.been.calledWith(newRequest)
  })
})
