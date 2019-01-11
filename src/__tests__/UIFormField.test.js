import React from 'react'
import { shallow } from 'enzyme'

import UIFormField from '../UIFormField'
import { testFormComponents } from '../App'

describe('UIFormField', () => {
  it('Renders all the input components without error and only once', () => {
    Object.keys(testFormComponents).forEach(key => {
      const component = shallow(<UIFormField key={key} properties={testFormComponents[key]} />)

      expect(component.length).toEqual(1)
      expect(component).toMatchSnapshot()
    })
  })
})
