import React from 'react'
import { shallow } from 'enzyme'

import DCFormField from '../DCFormField'
import { testFormComponents } from '../App'

describe('DCFormField', () => {
  it('Renders all the input components without error and only once', () => {
    Object.keys(testFormComponents).forEach(key => {
      const component = shallow(<DCFormField key={key} properties={testFormComponents[key]} />)

      expect(component.length).toEqual(1)
      expect(component).toMatchSnapshot()
    })
  })
})
