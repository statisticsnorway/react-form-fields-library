import React from 'react'
import { shallow } from 'enzyme'

import DCFormField from '../DCFormField'

describe('DCFormField', () => {
  it('renders one DCFormField component', () => {
    const component = shallow(<DCFormField />)

    expect(component.length).toEqual(1)
    expect(component).toMatchSnapshot()
  })
})
