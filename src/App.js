import React, { Component } from 'react'
import { Checkbox, Divider, Form, Grid, Header } from 'semantic-ui-react'
import moment from 'moment'

import { DCFormField } from './main'

export const testFormComponents = {
  DCText: {
    component: 'DCText',
    name: 'myTextInput',
    displayName: 'DCText',
    description: 'A description for this input',
    required: true
  },
  DCTextLongName: {
    component: 'DCText',
    name: 'myTextLongNameInput',
    displayName: 'DCText with a long name that cuts off in the placeholder so its shorther',
    description: 'A description for this input',
    required: true
  },
  DCBoolean: {
    component: 'DCBoolean',
    name: 'myBooleanInput',
    displayName: 'DCBoolean',
    description: 'A description for this input'
  },
  DCNumber: {
    component: 'DCNumber',
    name: 'myNumberInput',
    displayName: 'DCNumber',
    description: 'A description for this input',
    required: true
  },
  DCRadio: {
    component: 'DCRadio',
    name: 'myRadioInput',
    displayName: 'DCRadio',
    description: 'A description for this input',
    required: true,
    options: [
      {text: 'This option', value: 'thisOption'},
      {text: 'That option', value: 'thatOption'},
      {text: 'Something else', value: 'somethingElse'}
    ]
  },
  DCDate: {
    component: 'DCDate',
    name: 'myDateInput',
    displayName: 'DCDate',
    description: 'A description for this input',
    required: true
  },
  DCDateMultiple: {
    component: 'DCDate',
    name: 'myDateMultipleInput',
    displayName: 'DCDate (multiple)',
    description: 'A description for this input',
    required: true,
    multiple: true
  },
  DCDropdownSingleSelectProvidedOptions: {
    component: 'DCDropdown',
    name: 'myDropdownSingleSelectProvidedOptionsInput',
    displayName: 'DCDropdown (provided options)',
    description: 'A description for this input',
    required: true,
    options: [
      {text: 'This option', value: 'thisOption'},
      {text: 'That option', value: 'thatOption'},
      {text: 'Something else', value: 'somethingElse'}
    ]
  },
  DCDropdownMultipleSelectProvidedOptions: {
    component: 'DCDropdown',
    name: 'myDropdownMultipleSelectProvidedOptionsInput',
    displayName: 'DCDropdown (multiSelect and provided options)',
    description: 'A description for this input',
    required: true,
    multiSelect: true,
    options: [
      {text: 'This option', value: 'thisOption'},
      {text: 'That option', value: 'thatOption'},
      {text: 'Something else', value: 'somethingElse'}
    ]
  },
  DCDropdownEmptyOptions: {
    component: 'DCDropdown',
    name: 'myDropdownEmptyOptionsInput',
    displayName: 'DCDropdown (empty options)',
    description: 'A description for this input',
    required: true,
    options: []
  },
  DCMultiInputProvidedOptions: {
    component: 'DCMultiInput',
    name: 'myDCMultiInputProvidedOptionsInput',
    displayName: 'DCMultiInput (provided options)',
    description: 'A description for this input',
    required: true,
    options: [
      {text: 'This option', value: 'thisOption'},
      {text: 'That option', value: 'thatOption'},
      {text: 'Something else', value: 'somethingElse'}
    ],
    multiValue: false
  },
  DCMultiInputEmptyOptions: {
    component: 'DCMultiInput',
    name: 'myDCMultiInputEmptyOptionsInput',
    displayName: 'DCMultiInput (empty options)',
    description: 'A description for this input',
    required: true,
    options: [],
    multiValue: false
  },
  DCMultiInputMultiValueProvidedOptions: {
    component: 'DCMultiInput',
    name: 'myDCMultiInputMultiValueProvidedOptions',
    displayName: 'DCMultiInput (multi value and provided options)',
    description: 'A description for this input',
    required: true,
    options: [
      {text: 'This option', value: 'thisOption'},
      {text: 'That option', value: 'thatOption'},
      {text: 'Something else', value: 'somethingElse'}
    ],
    multiValue: true
  },
  DCMultiInputMultiValueEmptyOptions: {
    component: 'DCMultiInput',
    name: 'myDCMultiInputMultiValueEmptyOptions',
    displayName: 'DCMultiInput (multi value and empty options)',
    description: 'A description for this input',
    required: true,
    options: [],
    multiValue: true
  },
  DCStaticStandard: {
    component: 'DCStatic',
    name: 'myDCStaticInput',
    displayName: 'DCStatic (standard)',
    description: 'A description for this input',
    value: ['Value']
  },
  DCStaticDate: {
    component: 'DCStatic',
    name: 'myDCStaticDateInput',
    displayName: 'DCStatic (date)',
    description: 'A description for this input',
    format: 'date',
    value: [moment('1989-12-28')]
  },
  DCStaticTag: {
    component: 'DCStatic',
    name: 'myDCStaticTagInput',
    displayName: 'DCStatic (tags)',
    description: 'A description for this input',
    format: 'tag',
    value: [
      'A tag',
      'Another tag',
      'A third?'
    ]
  },
  DCStaticLabel: {
    component: 'DCStatic',
    name: 'myDCStaticLabelInput',
    displayName: 'DCStatic (labels)',
    description: 'A description for this input',
    format: 'label',
    value: [
      'A label',
      'Another label',
      'A third?'
    ]
  },
  DCStaticStandardMulti: {
    component: 'DCStatic',
    name: 'myDCStaticMultiInput',
    displayName: 'DCStatic (multi standard)',
    description: 'A description for this input',
    value: [
      'Value',
      'Another value'
    ]
  },
  DCStaticDateMulti: {
    component: 'DCStatic',
    name: 'myDCStaticDateMultiInput',
    displayName: 'DCStatic (multi date)',
    description: 'A description for this input',
    format: 'date',
    value: [
      moment('1989-12-28'),
      moment('1989-12-28').add(1, 'years')
    ]
  },
  DCStaticIcon: {
    component: 'DCStatic',
    name: 'myDCStaticIconInput',
    displayName: 'DCStatic (with icon)',
    description: 'A description for this input',
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

    this.setState({data: data}, () => {
      this.setState({ready: true})
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
      [type]: !this.state[type]
    }, () => {
      const formComponents = JSON.parse(JSON.stringify(this.state.formComponents))

      if (this.state[type]) {
        this.setState({ready: false}, () => {
          Object.keys(formComponents).forEach(key => {
            formComponents[key][type] = type
            formComponents[key].value = this.state.data[formComponents[key].name]
          })

          this.setState({formComponents: formComponents}, () => {
            this.setState({ready: true})
          })
        })
      } else {
        this.setState({ready: false}, () => {
          Object.keys(formComponents).forEach(key => {
            delete formComponents[key][type]
            formComponents[key].value = this.state.data[formComponents[key].name]
          })

          this.setState({formComponents: formComponents}, () => {
            this.setState({ready: true})
          })
        })
      }
    })
  }

  render () {
    const {ready, warning, error, formComponents} = this.state

    return (
      <Grid padded divided columns='equal'>
        <Grid.Column>
          <Header as='h1' content='Form' />
          {ready &&
          <Form>
            {Object.keys(formComponents).map(value => {
              return <DCFormField key={value} properties={formComponents[value]} valueChange={this.handleValueChange}
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
