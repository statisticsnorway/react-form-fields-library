import React from 'react'
import { Popup } from 'semantic-ui-react'
import { mount } from 'enzyme'

import UIText from '../components/UIText'
import UIDropdown from '../components/UIDropdown'

// Not so proper workaround to wait for render part of component to update. Creates race-condition. Wait for fix in Jest/Enzyme.
const waitForAsync = () => new Promise(resolve => setImmediate(resolve))

const options = [
  { text: 'This option', value: 'thisOption' },
  { text: 'That option', value: 'thatOption' },
  { text: 'Something else', value: 'somethingElse' }
]

describe('FormFields', () => {
  it('Structures descriptions correctly', () => {
    const description = [
      'Some description',
      'More description',
      'And even more'
    ]
    const component = mount(<UIText description={description} />)

    expect(component.find(Popup).prop('content')).toBeInstanceOf(Object)
  })

  it('Ignores structuring description if Array is not recieved', () => {
    const component = mount(<UIText description='A short one' />)

    expect(component.find(Popup).prop('content')).toEqual('A short one')
  })

  it('Handles route and broken route', async () => {
    const componentRoute = mount(<UIDropdown multiSelect={true} value={['thisOption', 'thatOption']}
                                             options={options} showLinks={true} route={'route/'} />)

    await waitForAsync()
    componentRoute.update()

    expect(componentRoute.find('a')).toHaveLength(4)
    expect(componentRoute.find('a').at(2).prop('href')).toEqual('route/thisOption')
    expect(componentRoute.find('a').at(2).text()).toEqual('Link #1')
    expect(componentRoute.find('a').at(3).prop('href')).toEqual('route/thatOption')
    expect(componentRoute.find('a').at(3).text()).toEqual('Link #2')

    const componentBrokenRoute = mount(<UIDropdown multiSelect={true} value={['thisOption', 'thatOption']}
                                                   options={options} showLinks={true} route={false} />)

    await waitForAsync()
    componentBrokenRoute.update()

    expect(componentBrokenRoute.find('a')).toHaveLength(4)
    expect(componentBrokenRoute.find('a').at(2).prop('href')).toEqual('thisOption')
    expect(componentBrokenRoute.find('a').at(2).text()).toEqual('Link #1')
    expect(componentBrokenRoute.find('a').at(3).prop('href')).toEqual('thatOption')
    expect(componentBrokenRoute.find('a').at(3).text()).toEqual('Link #2')
  })

  it('Shows only error when passed', () => {
    const component = mount(<UIText error='Error' />)

    expect(component.find('span').text()).toEqual('Error')
  })

  it('Shows only warning when passed', () => {
    const component = mount(<UIText warning='Warning' />)

    expect(component.find('span').text()).toEqual('Warning')
  })

  it('Shows error and warning when passed', () => {
    const component = mount(<UIText error='Error' warning='Warning' />)

    expect(component.find('span').at(0).text()).toEqual('Error')
    expect(component.find('span').at(1).text()).toEqual('Warning')
  })
})
