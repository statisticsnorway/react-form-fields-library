import React from 'react'
import { mount } from 'enzyme'
import UIBoolean from '../../components/UIBoolean'

describe('UIBoolean', () => {
  it('Sets value to default false if value prop is not provided or not typeof boolean', () => {
    const componentNoProp = mount(<UIBoolean />)

    expect(componentNoProp.find('input').prop('checked')).toEqual(false)
    expect(componentNoProp.state('value')).toEqual(false)

    const componentWrongProp = mount(<UIBoolean value='Not typeof boolean' />)

    expect(componentWrongProp.find('input').prop('checked')).toEqual(false)
    expect(componentWrongProp.state('value')).toEqual(false)
  })

  it('Sets checkbox checked if provided value is typeof boolean and true', () => {
    const component = mount(<UIBoolean value={true} />)

    expect(component.find('input').prop('checked')).toEqual(true)
    expect(component.state('value')).toEqual(true)
  })

  it('Updates state and value correctly when clicked', () => {
    const component = mount(<UIBoolean valueChange={jest.fn()} />)

    component.find('input').simulate('change')

    expect(component.find('input').prop('checked')).toEqual(true)
    expect(component.state('value')).toEqual(true)
  })

  it('Renders error when expected prop is not passed or of wrong type', () => {
    jest.spyOn(console, 'error')
    global.console.error.mockImplementation(() => {})

    const componentNoProp = mount(<UIBoolean />)
    const componentWrongProp = mount(<UIBoolean valueChange='Not typeof function' />)

    expect(() => {
      componentNoProp.find('input').simulate('change')
    }).toThrowError()

    expect(() => {
      componentWrongProp.find('input').simulate('change')
    }).toThrowError()

    global.console.error.mockRestore()
  })
})
