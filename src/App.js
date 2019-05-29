import React, { Component } from 'react'
import { Checkbox, Divider, Form, Grid, Header } from 'semantic-ui-react'

import { UIFormField } from './main'

export const testFormComponents = {
  UIText: {
    component: 'UIText',
    name: 'myTextInput',
    displayName: 'UIText',
    description: ['A description for this input'],
    required: true
  },
  UITextMultiDescription: {
    component: 'UIText',
    name: 'myTextInput',
    displayName: 'UITextMultiDescription',
    description: ['A description for this input', 'Another one', 'One more?'],
    required: true
  },
  UITextLongName: {
    component: 'UIText',
    name: 'myTextLongNameInput',
    displayName: 'UIText with a long name that cuts off in the placeholder so its shorther',
    description: ['A description for this input'],
    required: true
  },
  UIBoolean: {
    component: 'UIBoolean',
    name: 'myBooleanInput',
    displayName: 'UIBoolean',
    description: ['A description for this input']
  },
  UINumber: {
    component: 'UINumber',
    name: 'myNumberInput',
    displayName: 'UINumber',
    description: ['A description for this input'],
    required: true
  },
  UIRadio: {
    component: 'UIRadio',
    name: 'myRadioInput',
    displayName: 'UIRadio',
    description: ['A description for this input'],
    required: true,
    options: [
      { text: 'This option', value: 'thisOption' },
      { text: 'That option', value: 'thatOption' },
      { text: 'Something else', value: 'somethingElse' }
    ]
  },
  UIDate: {
    component: 'UIDate',
    name: 'myDateInput',
    displayName: 'UIDate',
    description: ['A description for this input'],
    required: true
  },
  UIDateMultiple: {
    component: 'UIDate',
    name: 'myDateMultipleInput',
    displayName: 'UIDate (multiple)',
    description: ['A description for this input'],
    required: true,
    multiple: true
  },
  UIDropdownSingleSelectProvidedOptions: {
    component: 'UIDropdown',
    name: 'myDropdownSingleSelectProvidedOptionsInput',
    displayName: 'UIDropdown (provided options)',
    description: ['A description for this input'],
    required: true,
    options: [
      { text: 'This option', value: 'thisOption' },
      { text: 'That option', value: 'thatOption' },
      { text: 'Something else', value: 'somethingElse' }
    ]
  },
  UIDropdownMultipleSelectProvidedOptions: {
    component: 'UIDropdown',
    name: 'myDropdownMultipleSelectProvidedOptionsInput',
    displayName: 'UIDropdown (multiSelect and provided options)',
    description: ['A description for this input'],
    required: true,
    multiSelect: true,
    options: [
      { text: 'This option', value: 'thisOption' },
      { text: 'That option', value: 'thatOption' },
      { text: 'Something else', value: 'somethingElse' }
    ]
  },
  UIDropdownEmptyOptions: {
    component: 'UIDropdown',
    name: 'myDropdownEmptyOptionsInput',
    displayName: 'UIDropdown (empty options)',
    description: ['A description for this input'],
    required: true,
    options: []
  },
  UIMultiInputProvidedOptions: {
    component: 'UIMultiInput',
    name: 'myUIMultiInputProvidedOptionsInput',
    displayName: 'UIMultiInput (provided options)',
    description: ['A description for this input'],
    required: true,
    options: [
      { text: 'This option', value: 'thisOption' },
      { text: 'That option', value: 'thatOption' },
      { text: 'Something else', value: 'somethingElse' }
    ],
    multiValue: false
  },
  UIMultiInputEmptyOptions: {
    component: 'UIMultiInput',
    name: 'myUIMultiInputEmptyOptionsInput',
    displayName: 'UIMultiInput (empty options)',
    description: ['A description for this input'],
    required: true,
    options: [],
    multiValue: false
  },
  UIMultiInputMultiValueProvidedOptions: {
    component: 'UIMultiInput',
    name: 'myUIMultiInputMultiValueProvidedOptions',
    displayName: 'UIMultiInput (multi value and provided options)',
    description: ['A description for this input'],
    required: true,
    options: [
      { text: 'This option', value: 'thisOption' },
      { text: 'That option', value: 'thatOption' },
      { text: 'Something else', value: 'somethingElse' }
    ],
    multiValue: true
  },
  UIMultiInputMultiValueEmptyOptions: {
    component: 'UIMultiInput',
    name: 'myUIMultiInputMultiValueEmptyOptions',
    displayName: 'UIMultiInput (multi value and empty options)',
    description: ['A description for this input'],
    required: true,
    options: [],
    multiValue: true
  },
  UIDropdownShowLinks: {
    component: 'UIDropdown',
    name: 'myShowLinksInput',
    displayName: 'UIDropdown (show links)',
    description: ['A description'],
    required: true,
    showLinks: true,
    options: [
      { text: 'This option', value: 'thisOption' },
      { text: 'That option', value: 'thatOption' },
      { text: 'Something else', value: 'somethingElse' }
    ]
  },
  UIDropdownMultipleShowLinks: {
    component: 'UIDropdown',
    name: 'myShowLinksMultipleInput',
    displayName: 'UIDropdown (multiple and show links)',
    description: ['A description'],
    required: true,
    showLinks: true,
    multiSelect: true,
    options: [
      { text: 'This option', value: 'thisOption' },
      { text: 'That option', value: 'thatOption' },
      { text: 'Something else', value: 'somethingElse' }
    ]
  },
  UIMultiInputShowLinks: {
    component: 'UIMultiInput',
    name: 'myUIMultiInpuShowLinksInput',
    displayName: 'UIMultiInput (show links)',
    description: ['A description for this input'],
    required: true,
    options: [
      { text: 'This option', value: 'thisOption' },
      { text: 'That option', value: 'thatOption' },
      { text: 'Something else', value: 'somethingElse' }
    ],
    multiValue: false,
    showLinks: true
  },
  UIMultiInputMultiValueShowLinks: {
    component: 'UIMultiInput',
    name: 'myUIMultiInputMultiValueShowLinks',
    displayName: 'UIMultiInput (multi value and show links)',
    description: ['A description for this input'],
    required: true,
    options: [
      { text: 'This option', value: 'thisOption' },
      { text: 'That option', value: 'thatOption' },
      { text: 'Something else', value: 'somethingElse' }
    ],
    multiValue: true,
    showLinks: true
  },
  UIMultiInputMultiValueWithValues: {
    component: 'UIMultiInput',
    name: 'myUIMultiInputMultiValueWithValues',
    displayName: 'UIMultiInput (multi value with values)',
    description: ['A description for this input'],
    required: true,
    options: [
      { text: 'This option', value: 'thisOption' },
      { text: 'That option', value: 'thatOption' },
      { text: 'Something else', value: 'somethingElse' }
    ],
    multiValue: true,
    value: [
      {
        option: 'thisOption',
        text: ['Text', 'Text #2']
      }
    ]
  },
  UIStaticStandard: {
    component: 'UIStatic',
    name: 'myUIStaticInput',
    displayName: 'UIStatic (standard)',
    description: ['A description for this input'],
    value: ['Value']
  },
  UIStaticDate: {
    component: 'UIStatic',
    name: 'myUIStaticDateInput',
    displayName: 'UIStatic (date)',
    description: ['A description for this input'],
    format: 'date',
    value: ['1989-12-28T00:00:00.000Z']
  },
  UIStaticTag: {
    component: 'UIStatic',
    name: 'myUIStaticTagInput',
    displayName: 'UIStatic (tags)',
    description: ['A description for this input'],
    format: 'tag',
    value: [
      'A tag',
      'Another tag',
      'A third?'
    ]
  },
  UIStaticLabel: {
    component: 'UIStatic',
    name: 'myUIStaticLabelInput',
    displayName: 'UIStatic (labels)',
    description: ['A description for this input'],
    format: 'label',
    value: [
      'A label',
      'Another label',
      'A third?'
    ]
  },
  UIStaticStandardMulti: {
    component: 'UIStatic',
    name: 'myUIStaticMultiInput',
    displayName: 'UIStatic (multi standard)',
    description: ['A description for this input'],
    value: [
      'Value',
      'Another value'
    ]
  },
  UIStaticDateMulti: {
    component: 'UIStatic',
    name: 'myUIStaticDateMultiInput',
    displayName: 'UIStatic (multi date)',
    description: ['A description for this input'],
    format: 'date',
    value: [
      '1989-12-28T00:00:00.000Z',
      '1990-12-28T00:00:00.000Z'
    ]
  },
  UIStaticIcon: {
    component: 'UIStatic',
    name: 'myUIStaticIconInput',
    displayName: 'UIStatic (with icon)',
    description: ['A description for this input'],
    value: ['Value'],
    icon: 'user'
  }
}

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ready: false,
      error: false,
      warning: false,
      formComponents: testFormComponents,
      data: {}
    }
  }

  componentDidMount () {
    const data = {}

    Object.keys(testFormComponents).forEach(key => {
      if (testFormComponents[key].hasOwnProperty('value')) {
        data[testFormComponents[key].name] = testFormComponents[key].value
      } else {
        data[testFormComponents[key].name] = ''
      }
    })

    this.setState({ data: data }, () => {
      this.setState({ ready: true })
    })
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    return this.state.data === nextState.data
  }

  handleValueChange = (name, value) => {
    this.setState({
      data: {
        ...this.state.data,
        [name]: value
      }
    })
  }

  handleWarningsAndErrors (type) {
    this.setState({
      [type]: !this.state[type],
      ready: false
    }, () => {
      const formComponents = JSON.parse(JSON.stringify(this.state.formComponents))

      Object.keys(formComponents).forEach(key => {
        formComponents[key].value = this.state.data[formComponents[key].name]

        if (this.state[type]) {
          formComponents[key][type] = type
        } else {
          delete formComponents[key][type]
        }
      })

      this.setState({ formComponents: formComponents }, () => {
        this.setState({ ready: true })
      })
    })
  }

  render () {
    const { ready, warning, error, formComponents } = this.state

    return (
      <Grid padded divided columns='equal'>
        <Grid.Column>
          <Header as='h1' content='Form' />
          {ready &&
          <Form>
            {Object.keys(formComponents).map((value, index) => {
              return <UIFormField key={index} properties={formComponents[value]} valueChange={this.handleValueChange}
                                  languageCode={'en'} />
            })}
          </Form>
          }
        </Grid.Column>

        <Grid.Column>
          <Header as='h1' content='Test stuff' />
          <Checkbox label='Add warnings' checked={warning}
                    onChange={this.handleWarningsAndErrors.bind(this, 'warning')} />
          <Divider hidden />
          <Checkbox label='Add errors' checked={error} onChange={this.handleWarningsAndErrors.bind(this, 'error')} />
          <Divider hidden />
        </Grid.Column>
      </Grid>
    )
  }
}

export default App
