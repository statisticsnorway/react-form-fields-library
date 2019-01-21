import React from 'react'
import { mount } from 'enzyme'

import { UIBoolean, UIDate, UIDropdown, UIMultiInput, UINumber, UIRadio, UIStatic, UIText } from '../components'
import UIFormField from '../UIFormField'

describe('UIFormField', () => {
  const components = ['UIBoolean', 'UIDate', 'UIDropdown', 'UIMultiInput', 'UINumber', 'UIRadio', 'UIStatic', 'UIText']
  const formComponents = [UIBoolean, UIDate, UIDropdown, UIMultiInput, UINumber, UIRadio, UIStatic, UIText]

  components.forEach((component, index) => {
    it('Outputs correct component based on prop', () => {
      const formField = mount(<UIFormField properties={{component: component}} />)

      expect(formField.find(formComponents[index])).toHaveLength(1)
    })
  })
})
