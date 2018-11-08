import React from 'react'
import { shallow } from 'enzyme'

import DCFormField from '../DCFormField'
import { formComponents } from '../App'

describe('DCFormField', () => {
  it('renders one DCFormField component', () => {
    const component = shallow(<DCFormField />)

    expect(component.length).toEqual(1)
    expect(component).toMatchSnapshot()
  })

  it('renders all the input components', () => {
    Object.keys(formComponents).forEach(key => {
      const component = shallow(<DCFormField key={key} tag={key} additionalProps={formComponents[key]} />)

      expect(component.length).toEqual(1)
      expect(component).toMatchSnapshot()
    })
  })
})
