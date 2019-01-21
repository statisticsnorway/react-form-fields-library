import React from 'react'
import { mount } from 'enzyme'
import { Dropdown } from 'semantic-ui-react'

import UIDropdown from '../../components/UIDropdown'

// Not so proper workaround to wait for render part of component to update. Creates race-condition. Wait for fix in Jest/Enzyme.
const waitForAsync = () => new Promise(resolve => setImmediate(resolve))

const options = [
  {text: 'This option', value: 'thisOption'},
  {text: 'That option', value: 'thatOption'},
  {text: 'Something else', value: 'somethingElse'}
]

describe('UIDropdown', () => {
  it('Sets correct state values when no props or props of wrong type are provided', () => {
    const componentNoProp = mount(<UIDropdown />)

    expect(componentNoProp.state('value')).toEqual('')
    expect(componentNoProp.state('options')).toEqual([])

    const componentWrongProp = mount(<UIDropdown value={false} />)

    expect(componentWrongProp.state('value')).toEqual('')
    expect(componentWrongProp.state('options')).toEqual([])

    const componentNoPropMulti = mount(<UIDropdown multiSelect={true} />)

    expect(componentNoPropMulti.state('value')).toEqual([])
    expect(componentNoPropMulti.state('options')).toEqual([])

    const componentWrongPropMulti = mount(<UIDropdown multiSelect={true} value={false} />)

    expect(componentWrongPropMulti.state('value')).toEqual([])
    expect(componentWrongPropMulti.state('options')).toEqual([])
  })

  it('Sets correct state values when props are provided and everything is rendered correctly', async () => {
    const componentSingle = mount(<UIDropdown value='thisOption' options={options} />)

    await waitForAsync()
    componentSingle.update()

    expect(componentSingle.state('value')).toEqual('thisOption')
    expect(componentSingle.state('options')).toEqual(options)
    expect(componentSingle.find('div.text').text()).toEqual('This option')
    expect(componentSingle.find('span').at(0).text()).toEqual('This option')
    expect(componentSingle.find('span').at(1).text()).toEqual('That option')
    expect(componentSingle.find('span').at(2).text()).toEqual('Something else')

    const componentMulti = mount(<UIDropdown multiSelect={true} value={['thisOption', 'thatOption']}
                                             options={options} />)

    await waitForAsync()
    componentMulti.update()

    expect(componentMulti.state('value')).toEqual(['thisOption', 'thatOption'])
    expect(componentMulti.state('options')).toEqual(options)
    // Semantic UI Dropdown removes selected "spans" from dropdown list, therefore a little different check
    expect(componentMulti.find('span').text()).toEqual('Something else')
    // Expect amount of chosen options to appear in input box as labels (anchors in Semantic UI)
    expect(componentMulti.find('a')).toHaveLength(2)
  })

  it('Handles array of links', async () => {
    const component = mount(<UIDropdown multiSelect={true} value={['thisOption', 'thatOption']} options={options}
                                        showLinks={true} />)

    await waitForAsync()
    component.update()

    expect(component.find('a')).toHaveLength(4)
    expect(component.find('a').at(2).prop('href')).toEqual('thisOption')
    expect(component.find('a').at(2).text()).toEqual('Link #1')
    expect(component.find('a').at(3).prop('href')).toEqual('thatOption')
    expect(component.find('a').at(3).text()).toEqual('Link #2')
  })

  it('Updates state correctly when changed', async () => {
    const componentSingle = mount(<UIDropdown options={options} valueChange={jest.fn()} />)

    await waitForAsync()
    componentSingle.update()

    componentSingle.find('div.item').at(0).simulate('click')

    expect(componentSingle.state('value')).toEqual('thisOption')
    expect(componentSingle.find('div.text').text()).toEqual('This option')
  })

  it('Enables search when searchable prop is passed', async () => {
    const component = mount(<UIDropdown options={options} searchable={true} />)

    await waitForAsync()
    component.update()

    expect(component.find(Dropdown).prop('search')).toEqual(true)
  })

  it('Renders error when expected prop is not passed or of wrong type', async () => {
    jest.spyOn(console, 'error')
    global.console.error.mockImplementation(() => {})

    const componentNoProp = mount(<UIDropdown options={options} />)

    await waitForAsync()
    componentNoProp.update()

    expect(() => {
      componentNoProp.find('div.item').at(0).simulate('click')
    }).toThrowError()

    const componentWrongProp = mount(<UIDropdown options={options} valueChange='Not typeof function' />)

    await waitForAsync()
    componentWrongProp.update()

    expect(() => {
      componentWrongProp.find('div.item').at(0).simulate('click')
    }).toThrowError()

    global.console.error.mockRestore()
  })
})
