import React from 'react'
import { mount } from 'enzyme'

import UIDate from '../../components/UIDate'

describe('UIDate', () => {
  it('Sets value to default null if value prop is not provided or not typeof string or array', () => {
    const componentNoProp = mount(<UIDate />)

    expect(componentNoProp.find('input').prop('value')).toEqual('')
    expect(componentNoProp.state('value')).toEqual(null)

    const componentWrongProp = mount(<UIDate value={false} />)

    expect(componentWrongProp.find('input').prop('value')).toEqual('')
    expect(componentWrongProp.state('value')).toEqual(null)
  })

  it('Sets value to provided value', () => {
    const date = '1989-12-28T00:00:00.000Z'
    const component = mount(<UIDate value={date} />)

    expect(component.find('input').prop('value')).toEqual('12/28/1989')
    expect(component.state('value')).toEqual(date)
  })

  it('If multiple property is passed expect date value to be array with one entry of null', () => {
    const component = mount(<UIDate multiple={true} />)
    const value = component.state('value')
    const expected = [null]

    expect(value).toBeInstanceOf(Array)
    expect(value).toHaveLength(1)
    expect(value).toEqual(expect.arrayContaining(expected))
    expect(component.find('input').prop('value')).toEqual('')
  })

  it('Multiple inputs are rendered and state value is array if multiple is set and entries are added', () => {
    const component = mount(<UIDate multiple={true} valueChange={jest.fn()} />)
    const expected = [null, null]

    component.find('i.plus').simulate('click')

    const value = component.state('value')

    expect(value).toBeInstanceOf(Array)
    expect(value).toHaveLength(2)
    expect(value).toEqual(expect.arrayContaining(expected))
    expect(component.find('input')).toHaveLength(2)
  })

  it('Correct number of inputs are rendered and state value is array of correct length if multiple is set and some are added and removed', () => {
    const component = mount(<UIDate multiple={true} valueChange={jest.fn()} />)

    component.find('i.plus').simulate('click')
    component.find('i.close').at(1).simulate('click')

    const value = component.state('value')

    expect(value).toBeInstanceOf(Array)
    expect(value).toHaveLength(1)
    expect(component.find('input')).toHaveLength(1)
  })
})
