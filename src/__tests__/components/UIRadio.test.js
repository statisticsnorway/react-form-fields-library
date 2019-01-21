import React from 'react'
import { mount } from 'enzyme'

import UIRadio from '../../components/UIRadio'

const options = [
  {text: 'This option', value: 'thisOption'},
  {text: 'That option', value: 'thatOption'},
  {text: 'Something else', value: 'somethingElse'}
]

describe('UIRadio', () => {
  it('Renders nothing if options are not provided and sets default value to empty string if value prop is not provided or not typeof string and also renders', () => {
    const componentNoProp = mount(<UIRadio />)

    expect(componentNoProp.find('input')).toHaveLength(0)
    expect(componentNoProp.state('value')).toEqual('')

    const componentWrongProp = mount(<UIRadio value={false} />)

    expect(componentWrongProp.find('input')).toHaveLength(0)
    expect(componentWrongProp.state('value')).toEqual('')
  })

  it('Sets correct radio checked if provided value is typeof string and corresponds to provided option', () => {
    const component = mount(<UIRadio valueChange={jest.fn()} value='thisOption' options={options} />)

    expect(component.find('input').at(0).prop('checked')).toEqual(true)
    expect(component.find('input').at(1).prop('checked')).toEqual(false)
    expect(component.find('input').at(2).prop('checked')).toEqual(false)
    expect(component.state('value')).toEqual('thisOption')
  })

  it('Sets correct radio checked when clicked', () => {
    const component = mount(<UIRadio valueChange={jest.fn()} options={options} />)

    expect(component.find('input').at(0).prop('checked')).toEqual(false)

    component.find('input').at(0).simulate('change')

    expect(component.find('input').at(0).prop('checked')).toEqual(true)
    expect(component.find('input').at(1).prop('checked')).toEqual(false)
    expect(component.find('input').at(2).prop('checked')).toEqual(false)
    expect(component.state('value')).toEqual('thisOption')
  })

  it('Renders error when expected prop is not passed or of wrong type', () => {
    jest.spyOn(console, 'error')
    global.console.error.mockImplementation(() => {})

    const componentNoProp = mount(<UIRadio />)
    const componentWrongProp = mount(<UIRadio options={options} valueChange='Not typeof function' />)

    expect(() => {
      componentNoProp.find('input').at(0).simulate('change')
    }).toThrowError()

    expect(() => {
      componentWrongProp.find('input').at(0).simulate('change')
    }).toThrowError()

    global.console.error.mockRestore()
  })
})
