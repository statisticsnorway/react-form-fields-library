import React from 'react'
import { shallow } from 'enzyme'

import DCFormField from '../DCFormField'
import { formComponents } from '../App'

describe('DCFormField', () => {
  it('Renders all the input components without error', () => {
    Object.keys(formComponents).forEach(key => {
      const component = shallow(<DCFormField key={key} tag={formComponents[key].component} additionalProps={formComponents[key]} />)

      expect(component.length).toEqual(1)
      expect(component).toMatchSnapshot()
    })
  })
})
