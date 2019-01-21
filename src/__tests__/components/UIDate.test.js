import React from 'react'
import { mount } from 'enzyme'
import moment from 'moment'

import UIDate from '../../components/UIDate'

describe('UIDate', () => {
  it('Sets value to default null if value prop is not provided or not typeof object', () => {
    const componentNoProp = mount(<UIDate />)

    expect(componentNoProp.find('input').prop('value')).toEqual('')
    expect(componentNoProp.state('value')).toEqual(null)

    const componentWrongProp = mount(<UIDate value='Not typeof object' />)

    expect(componentWrongProp.find('input').prop('value')).toEqual('')
    expect(componentWrongProp.state('value')).toEqual(null)
  })

  it('Sets value to provided value', () => {
    const momentDate = moment('1989-12-28')
    const component = mount(<UIDate value={momentDate} />)

    expect(component.find('input').prop('value')).toEqual('28/12/1989')
    expect(component.state('value')).toEqual(moment('1989-12-28'))
  })

  it('Sets correct moment date object to value when input is changed', () => {
    const component = mount(<UIDate valueChange={jest.fn()} />)

    component.find('input').simulate('change', {target: {value: '28/12/1989'}})

    const value = component.state('value')

    expect(moment(value).isValid()).toEqual(true)
    expect(moment(value).toISOString()).toEqual(moment('1989-12-28').toISOString())
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

  it('Sets correct moment date object to value when input is changed when multiple prop is passed', () => {
    const component = mount(<UIDate multiple={true} valueChange={jest.fn()} />)

    component.find('i.plus').simulate('click')
    component.find('input').at(0).simulate('change', {target: {value: '28/12/1989'}})
    component.find('input').at(1).simulate('change', {target: {value: '25/05/1972'}})

    const value = component.state('value')

    expect(moment(value[0]).isValid()).toEqual(true)
    expect(moment(value[0]).toISOString()).toEqual(moment('1989-12-28').toISOString())

    expect(moment(value[1]).isValid()).toEqual(true)
    expect(moment(value[1]).toISOString()).toEqual(moment('1972-05-25').toISOString())
  })

  it('Renders error when expectedProp is not passed or of wrong type', () => {
    jest.spyOn(console, 'error')
    global.console.error.mockImplementation(() => {})

    const componentNoProp = mount(<UIDate />)
    const componentWrongProp = mount(<UIDate valueChange='Not typeof function' />)

    expect(() => {
      componentNoProp.find('input').simulate('change', {target: {value: '28/12/1989'}})
    }).toThrowError()

    expect(() => {
      componentWrongProp.find('input').simulate('change', {target: {value: '28/12/1989'}})
    }).toThrowError()

    global.console.error.mockRestore()
  })
})
