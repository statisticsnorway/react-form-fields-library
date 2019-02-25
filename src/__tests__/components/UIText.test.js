import React from 'react'
import { mount } from 'enzyme'

import UIText from '../../components/UIText'

describe('UIText', () => {
  it('Sets value to default empty string if value prop is not provided or not typeof string', () => {
    const componentNoProp = mount(<UIText />)

    expect(componentNoProp.find('textarea').prop('value')).toEqual('')
    expect(componentNoProp.state('value')).toEqual('')

    const componentWrongProp = mount(<UIText value={false} />)

    expect(componentWrongProp.find('textarea').prop('value')).toEqual('')
    expect(componentWrongProp.state('value')).toEqual('')
  })

  it('Sets value to provided value', () => {
    const component = mount(<UIText value='Provided' />)

    expect(component.find('textarea').prop('value')).toEqual('Provided')
    expect(component.state('value')).toEqual('Provided')
  })

  it('Updates state and value correctly when changed', () => {
    const component = mount(<UIText valueChange={jest.fn()} />)

    component.find('textarea').simulate('change', {target: {value: 'Changed'}})

    expect(component.find('textarea').prop('value')).toEqual('Changed')
    expect(component.state('value')).toEqual('Changed')
  })

  it('Cuts off placeholder but keeps value', () => {
    const longValue = 'This is a very long value that cuts off when used as placeholder'
    const cutoffValue = 'This is a very long value that...'
    const component = mount(<UIText valueChange={jest.fn()} displayName={longValue} />)

    expect(component.find('textarea').prop('placeholder')).toEqual(cutoffValue)
    expect(component.find('label').text()).toEqual(longValue)
  })

  it('Renders error when expected prop is not passed or of wrong type', () => {
    jest.spyOn(console, 'error')
    global.console.error.mockImplementation(() => {})

    const componentNoProp = mount(<UIText />)
    const componentWrongProp = mount(<UIText valueChange='Not typeof function' />)

    expect(() => {
      componentNoProp.find('textarea').simulate('change')
    }).toThrowError()

    expect(() => {
      componentWrongProp.find('textarea').simulate('change')
    }).toThrowError()

    global.console.error.mockRestore()
  })
})
