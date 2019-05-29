import React from 'react'
import { mount } from 'enzyme'

import UIMultiInput from '../../components/UIMultiInput'

// Not so proper workaround to wait for render part of component to update. Creates race-condition. Wait for fix in Jest/Enzyme.
const waitForAsync = () => new Promise(resolve => setImmediate(resolve))

const options = [
  { text: 'This option', value: 'thisOption' },
  { text: 'That option', value: 'thatOption' },
  { text: 'Something else', value: 'somethingElse' }
]

const value = [{ text: 'This text', option: 'thisOption' }]

const multiValue = [{ text: ['This text'], option: 'thisOption' }]

describe('UIMultiInput', () => {
  it('Sets correct state values when no props or props of wrong type are provided', () => {
    const componentNoProp = mount(<UIMultiInput />)

    expect(componentNoProp.state('value')).toEqual([{ text: '', option: '' }])

    const componentWrongProp = mount(<UIMultiInput value={false} />)

    expect(componentWrongProp.state('value')).toEqual([{ text: '', option: '' }])

    const componentNoPropMulti = mount(<UIMultiInput multiValue={true} />)

    expect(componentNoPropMulti.state('value')).toEqual([{ text: [''], option: '' }])

    const componentWrongPropMulti = mount(<UIMultiInput multiValue={true} value={false} />)

    expect(componentWrongPropMulti.state('value')).toEqual([{ text: [''], option: '' }])

    const componentOnlyNameProp = mount(<UIMultiInput name='Test' />)
    expect(componentOnlyNameProp.state('value')).toEqual([{ text: '', option: '' }])
    expect(componentOnlyNameProp.state('options')).toEqual([])
  })

  it('Sets correct state values when props are provided and everything is rendered correctly', async () => {
    const componentSingle = mount(<UIMultiInput name='Test' value={value} options={options} />)

    await waitForAsync()
    componentSingle.update()

    expect(componentSingle.state('value')).toEqual(value)
    expect(componentSingle.state('options')).toEqual(options)
    expect(componentSingle.find('div.text').text()).toEqual('This option')
    expect(componentSingle.find('span').at(0).text()).toEqual('This option')
    expect(componentSingle.find('span').at(1).text()).toEqual('That option')
    expect(componentSingle.find('span').at(2).text()).toEqual('Something else')
    expect(componentSingle.find('input').prop('value')).toEqual(value[0].text)

    const componentMulti = mount(<UIMultiInput name='Test' multiValue={true} value={multiValue} options={options} />)

    await waitForAsync()
    componentMulti.update()

    expect(componentMulti.state('value')).toEqual(multiValue)
    expect(componentMulti.state('options')).toEqual(options)
    expect(componentSingle.find('div.text').text()).toEqual('This option')
    expect(componentSingle.find('span').at(0).text()).toEqual('This option')
    expect(componentSingle.find('span').at(1).text()).toEqual('That option')
    expect(componentSingle.find('span').at(2).text()).toEqual('Something else')
    expect(componentSingle.find('input').prop('value')).toEqual(multiValue[0].text[0])
  })

  it('Updates state correctly when changed and more inputs are added and show links are enabled', async () => {
    const componentSingle = mount(<UIMultiInput name='Test' valueChange={jest.fn()} options={options}
                                                showLinks={true} />)

    await waitForAsync()
    componentSingle.update()

    componentSingle.find('div.item').at(0).simulate('click')
    componentSingle.find('input').at(0).simulate('change', { target: { value: 'New Value' } })
    componentSingle.find('i.plus').at(0).simulate('click')
    componentSingle.find('div.item').at(5).simulate('click')
    componentSingle.find('input').at(1).simulate('change', { target: { value: 'Another Value' } })
    componentSingle.find('i.plus').at(0).simulate('click')
    componentSingle.find('i.close').at(2).simulate('click')

    expect(componentSingle.find('div.text').at(0).text()).toEqual('This option')
    expect(componentSingle.find('div.text').at(1).text()).toEqual('Something else')
    expect(componentSingle.find('input').at(0).prop('value')).toEqual('New Value')
    expect(componentSingle.find('input').at(1).prop('value')).toEqual('Another Value')
    expect(componentSingle.find('a').at(0).prop('href')).toEqual('thisOption')
    expect(componentSingle.find('a').at(1).prop('href')).toEqual('somethingElse')
    expect(componentSingle.state('value')).toEqual([
      { text: 'New Value', option: 'thisOption' },
      { text: 'Another Value', option: 'somethingElse' }
    ])

    const componentMulti = mount(<UIMultiInput name='Test' multiValue={true} valueChange={jest.fn()} options={options}
                                               showLinks={true} />)

    await waitForAsync()
    componentMulti.update()

    componentMulti.find('i.plus').at(0).simulate('click')
    componentMulti.find('div.item').at(0).simulate('click')
    componentMulti.find('input').at(1).simulate('change', { target: { value: 'New Value' } })
    componentMulti.find('i.plus').at(1).simulate('click')
    componentMulti.find('div.item').at(5).simulate('click')
    componentMulti.find('input').at(2).simulate('change', { target: { value: 'Another Value' } })
    componentMulti.find('i.plus').at(2).simulate('click')
    componentMulti.find('i.close').at(5).simulate('click')
    componentMulti.find('i.close').at(1).simulate('click')

    expect(componentMulti.find('div.text').at(0).text()).toEqual('This option')
    expect(componentMulti.find('div.text').at(1).text()).toEqual('Something else')
    expect(componentMulti.find('input').at(0).prop('value')).toEqual('New Value')
    expect(componentMulti.find('input').at(1).prop('value')).toEqual('Another Value')
    expect(componentSingle.find('a').at(0).prop('href')).toEqual('thisOption')
    expect(componentSingle.find('a').at(1).prop('href')).toEqual('somethingElse')
    expect(componentMulti.state('value')).toEqual([
      { text: ['New Value'], option: 'thisOption' },
      { text: ['Another Value'], option: 'somethingElse' }
    ])
  })
})