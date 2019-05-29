import React from 'react'
import { mount } from 'enzyme'

import App, { testFormComponents } from '../App'
import UIFormField from '../UIFormField'

describe('App', () => {
  it('Renders all test subjects correctly', () => {
    const component = mount(<App />)

    expect(component.find(UIFormField)).toHaveLength(Object.keys(testFormComponents).length)
  })

  it('Handles toggling errors', () => {
    const component = mount(<App />)

    const addErrors = component.findWhere(node => node.prop('label') === 'Add errors').children()
    addErrors.find('input').simulate('change')

    expect(component.findWhere(node => node.text() === 'error' && node.type() === 'span'))
      .toHaveLength(Object.keys(testFormComponents)
        .filter(component => !['UIStatic', 'UIRadio'].includes(testFormComponents[component].component)).length)

    addErrors.find('input').simulate('change')

    expect(component.findWhere(node => node.text() === 'error' && node.type() === 'span'))
      .toHaveLength(0)
  })

  it('Handles toggling warnings', () => {
    const component = mount(<App />)

    const addWarnings = component.findWhere(node => node.prop('label') === 'Add warnings').children()
    addWarnings.find('input').simulate('change')

    expect(component.findWhere(node => node.text() === 'warning' && node.type() === 'span'))
      .toHaveLength(Object.keys(testFormComponents)
        .filter(component => !['UIStatic', 'UIRadio'].includes(testFormComponents[component].component)).length)

    addWarnings.find('input').simulate('change')

    expect(component.findWhere(node => node.text() === 'warning' && node.type() === 'span'))
      .toHaveLength(0)
  })

  it('Behaves properly', () => {
    const component = mount(<App />)

    component.find('textarea').at(0).simulate('change', { target: { value: 'A value' } })

    expect(component.find('textarea').at(0).prop('value')).toEqual('A value')

    const dataState = component.state('data')

    expect(dataState[component.find('textarea').at(0).prop('name')]).toEqual('A value')
  })
})
