import React from 'react'
import { mount } from 'enzyme'
import moment from 'moment'
import { Label } from 'semantic-ui-react'

import UIStatic from '../../components/UIStatic'

// Not so proper workaround to wait for render part of component to update. Creates race-condition. Wait for fix in Jest/Enzyme.
const waitForAsync = () => new Promise(resolve => setImmediate(resolve))

describe('UIStatic', () => {
  it('Renders nothing if value prop is not provided or not typeof array', async () => {
    const componentNoProp = mount(<UIStatic />)

    await waitForAsync()
    componentNoProp.update()

    expect(componentNoProp.find('div.ui.list')).toHaveLength(0)
    expect(componentNoProp.state('component')).toBeNull()
    expect(componentNoProp.state('icon')).toEqual('')

    const componentWrongProp = mount(<UIStatic value={false} />)

    await waitForAsync()
    componentWrongProp.update()

    expect(componentNoProp.find('div.ui.list')).toHaveLength(0)
    expect(componentWrongProp.state('component')).toBeNull()
    expect(componentWrongProp.state('icon')).toEqual('')
  })

  it('Renders correct with provided values, formats and icon', async () => {
    const value = ['This', 'That']

    const componentNoFormat = mount(<UIStatic value={value} />)

    await waitForAsync()
    componentNoFormat.update()

    expect(componentNoFormat.find('div.ui.list')).toHaveLength(1)
    expect(componentNoFormat.find('div.ui.label')).toHaveLength(0)

    const componentIcon = mount(<UIStatic icon='user' />)

    await waitForAsync()
    componentIcon.update()

    expect(componentIcon.find('i.user.icon')).toHaveLength(1)
    expect(componentIcon.find('div.ui.list')).toHaveLength(0)
    expect(componentIcon.find('div.ui.label')).toHaveLength(0)

    const componentLabel = mount(<UIStatic value={value} format='label' />)

    await waitForAsync()
    componentLabel.update()

    expect(componentLabel.find('div.ui.label')).toHaveLength(2)
    expect(componentLabel.find('div.ui.list')).toHaveLength(0)

    const componentTag = mount(<UIStatic value={value} format='tag' />)

    await waitForAsync()
    componentTag.update()

    expect(componentTag.find('div.ui.label')).toHaveLength(2)
    expect(componentTag.find('div.ui.list')).toHaveLength(0)
    expect(componentTag.find(Label.Group).prop('tag')).toEqual(true)
  })

  it('Renders correctly when dates are provided or handles invalid dates', async () => {
    jest.spyOn(console, 'warn')
    global.console.warn.mockImplementation(() => {})

    const componentValidDate = mount(<UIStatic value={[moment('1989-12-28')]} format='date' />)

    await waitForAsync()
    componentValidDate.update()

    expect(componentValidDate.find('div.item').text()).toEqual(moment('1989-12-28').format('LLL'))

    const componentInvalidDate = mount(<UIStatic value={['Not typeof moment date object']} format='date' />)

    await waitForAsync()
    componentInvalidDate.update()

    expect(componentInvalidDate.find('div.item').text()).toEqual('Invalid date')

    global.console.warn.mockRestore()
  })
})
