import React, { Component } from 'react'
import { Button, Checkbox, Divider, Form, Grid, Header } from 'semantic-ui-react'
import moment from 'moment'
import 'moment/locale/nb'

import { DCFormField } from './main'

moment.locale('nb')

export const testFormComponents = {
  DCText: {
    component: 'DCText',
    name: 'myTextInput',
    displayName: 'DCText',
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
  DCDropdownSingleSelect: {
    component: 'DCDropdown',
    name: 'myDropdownSingleSelectInput',
    displayName: 'DCDropdown',
    description: 'A description for this input',
    required: true,
    endpoints: [
      'https://metadata.ssbmod.net/data/Role/',
      'https://metadata.ssbmod.net/data/Agent/'
    ]
  },
  DCDropdownMultipleSelect: {
    component: 'DCDropdown',
    name: 'myDropdownMultipleSelectInput',
    displayName: 'DCDropdown (multiSelect)',
    description: 'A description for this input',
    required: true,
    multiSelect: true,
    endpoints: [
      'https://metadata.ssbmod.net/data/Agent/',
      'https://metadata.ssbmod.net/data/Role/'
    ]
  },
  DCDropdownSingleSelectSearchable: {
    component: 'DCDropdown',
    name: 'myDropdownSingleSelectSearchableInput',
    displayName: 'DCDropdown (searchable)',
    description: 'A description for this input',
    required: true,
    searchable: true,
    endpoints: [
      'https://metadata.ssbmod.net/data/Role/',
      'https://metadata.ssbmod.net/data/Agent/'
    ]
  },
  DCDropdownMultipleSelectSearchable: {
    component: 'DCDropdown',
    name: 'myDropdownMultipleSelectSearchableInput',
    displayName: 'DCDropdown (searchable multiSelect)',
    description: 'A description for this input',
    required: true,
    multiSelect: true,
    searchable: true,
    endpoints: [
      'https://metadata.ssbmod.net/data/Agent/',
      'https://metadata.ssbmod.net/data/Role/'
    ]
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
  DCMultiInput: {
    component: 'DCMultiInput',
    name: 'myDCMultiInputInput',
    displayName: 'DCMultiInput',
    description: 'A description for this input',
    required: true,
    endpoint: 'https://metadata.ssbmod.net/data/Protocol/'
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
    ]
  },
  DCMultiValueMultiInput: {
    component: 'DCMultiValueMultiInput',
    name: 'myMultiValueMultiInput',
    displayName: 'DCMultiValueMultiInput',
    description: 'A description for this input',
    required: true,
    endpoint: 'https://metadata.ssbmod.net/data/Protocol/'
  },
  DCMultiValueMultiInputProvidedOptions: {
    component: 'DCMultiValueMultiInput',
    name: 'myDCMultiValueMultiInputProvidedOptions',
    displayName: 'DCMultiValueMultiInput (provided options)',
    description: 'A description for this input',
    required: true,
    options: [
      {text: 'This option', value: 'thisOption'},
      {text: 'That option', value: 'thatOption'},
      {text: 'Something else', value: 'somethingElse'}
    ]
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
    value: [moment()]
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
      moment(),
      moment().add(1, 'years')
    ]
  }
}

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ready: false,
      error: false,
      warning: false,
      urlError: false,
      networkError: false,
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
      const formComponents = {...this.state.formComponents}

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

  handleDropdownErrors (type) {
    this.setState({
      [type]: !this.state[type]
    }, () => {
      const formComponents = {...this.state.formComponents}

      if (this.state[type]) {
        this.setState({ready: false}, () => {
          const errorEndpoints = []
          let errorEndpoint = ''

          if (type === 'urlError') {
            errorEndpoints.push('https://metadata.ssbmod.net/data/Agentfda/')
            errorEndpoints.push('https://metadata.ssbmod.net/data/Roleyj/')
            errorEndpoint = 'https://metadata.ssbmod.net/data/Protocolsd/'
          }

          if (type === 'networkError') {
            errorEndpoints.push('https://metadatas.ssbmod.net/data/Agent/')
            errorEndpoints.push('https://metadataas.ssbmod.net/data/Role/')
            errorEndpoint = 'https://mettadata.ssbmod.net/data/Protocol/'
          }

          formComponents.DCDropdownSingleSelect.endpoints = errorEndpoints
          formComponents.DCDropdownMultipleSelect.endpoints = errorEndpoints
          formComponents.DCMultiInput.endpoint = errorEndpoint
          formComponents.DCMultiValueMultiInput.endpoint = errorEndpoint
        })

        Object.keys(formComponents).forEach(key => {
          formComponents[key].value = this.state.data[formComponents[key].name]
        })

        this.setState({formComponents: formComponents}, () => {
          this.setState({ready: true})
        })
      } else {
        this.setState({ready: false}, () => {
          const goodEndpoint = 'https://metadata.ssbmod.net/data/Protocol/'
          const goodEndpoints = ['https://metadata.ssbmod.net/data/Agent/', 'https://metadata.ssbmod.net/data/Role/']

          formComponents.DCDropdownSingleSelect.endpoints = goodEndpoints
          formComponents.DCDropdownMultipleSelect.endpoints = goodEndpoints
          formComponents.DCMultiInput.endpoint = goodEndpoint
          formComponents.DCMultiValueMultiInput.endpoint = goodEndpoint

          Object.keys(formComponents).forEach(key => {
            formComponents[key].value = this.state.data[formComponents[key].name]
          })

          this.setState({formComponents: formComponents}, () => {
            this.setState({ready: true})
          })
        })
      }
    })
  }

  checkState = () => {
    console.log(this.state)
  }

  render () {
    const {ready, warning, error, urlError, networkError, formComponents} = this.state

    return (
      <Grid padded divided columns='equal'>
        <Grid.Column>
          <Header as='h1' content='Form' />
          {ready &&
          <Form>
            {Object.keys(formComponents).map(value => {
              return <DCFormField key={value} properties={formComponents[value]} valueChange={this.handleValueChange} />
            })}
          </Form>
          }
        </Grid.Column>

        <Grid.Column>
          <Header as='h1' content='Test stuff' />
          <Header as='h3' content='All components' />
          <Checkbox label='Add warnings' checked={warning}
                    onChange={this.handleWarningsAndErrors.bind(this, 'warning')} />
          <Divider hidden />
          <Checkbox label='Add errors' checked={error} onChange={this.handleWarningsAndErrors.bind(this, 'error')} />
          <Header as='h3' content='Dropdowns' />
          <Checkbox label='Wrong url' checked={urlError} onChange={this.handleDropdownErrors.bind(this, 'urlError')} />
          <Divider hidden />
          <Checkbox label='Network error' checked={networkError}
                    onChange={this.handleDropdownErrors.bind(this, 'networkError')} />
          <Divider hidden />
          <Button primary content='Print state in console' onClick={this.checkState} />
        </Grid.Column>
      </Grid>
    )
  }
}

export default App
