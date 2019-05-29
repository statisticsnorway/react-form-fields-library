import React from 'react'
import { mount } from 'enzyme'

import UINumber from '../../components/UINumber'

describe('UINumber', () => {
  it('Sets values to default empty string if value prop is not provided or not typeof number', () => {
    const componentNoProp = mount(<UINumber />)

    expect(componentNoProp.find('input').prop('value')).toEqual('')
    expect(componentNoProp.state('value')).toEqual('')

    const componentWrongProp = mount(<UINumber value='Not typeof number' />)

    expect(componentWrongProp.find('input').prop('value')).toEqual('')
    expect(componentWrongProp.state('value')).toEqual('')
  })

  it('Sets value to provided value', () => {
    const component = mount(<UINumber value={12345} />)

    expect(component.find('input').prop('value')).toEqual(12345)
    expect(component.state('value')).toEqual(12345)
  })

  it('Updates state and value correctly when changed', () => {
    const component = mount(<UINumber valueChange={jest.fn()} />)

    component.find('input').simulate('change', { target: { value: 12345 } })

    expect(component.find('input').prop('value')).toEqual(12345)
    expect(component.state('value')).toEqual(12345)
  })

  it('Does not update state and value if not typeof number is passed', () => {
    const component = mount(<UINumber valueChange={jest.fn()} />)

    component.find('input').simulate('change', { target: { value: 'Not typeof number' } })

    expect(component.find('input').prop('value')).toEqual('')
    expect(component.state('value')).toEqual('')
  })

  it('Renders error when expected prop is not passed or of wrong type', () => {
    jest.spyOn(console, 'error')
    global.console.error.mockImplementation(() => {})

    const componentNoProp = mount(<UINumber />)
    const componentWrongProp = mount(<UINumber valueChange='Not typeof function' />)

    expect(() => {
      componentNoProp.find('input').simulate('change')
    }).toThrowError()

    expect(() => {
      componentWrongProp.find('input').simulate('change')
    }).toThrowError()

    global.console.error.mockRestore()
  })
})
