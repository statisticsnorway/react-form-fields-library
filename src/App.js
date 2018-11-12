import React, { Component } from 'react'
import { Checkbox, Divider, Form, Grid, Header } from 'semantic-ui-react'
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
  DCMultiInput: {
    component: 'DCMultiInput',
    name: 'myDCMultiInputInput',
    displayName: 'DCMultiInput',
    description: 'A description for this input',
    required: true,
    endpoint: 'https://metadata.ssbmod.net/data/Protocol/'
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
      ready: true,
      error: false,
      warning: false,
      urlError: false,
      networkError: false,
      formComponents: testFormComponents
    }
  }

  componentDidMount () {
    sessionStorage.clear()
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
          })

          this.setState({formComponents: formComponents}, () => {
            this.setState({ready: true})
          })
        })
      } else {
        this.setState({ready: false}, () => {
          Object.keys(formComponents).forEach(key => {
            delete formComponents[key][type]
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

          this.setState({formComponents: formComponents}, () => {
            this.setState({ready: true})
          })
        })
      }
    })
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
              return <DCFormField key={value} properties={formComponents[value]} />
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
        </Grid.Column>
      </Grid>
    )
  }
}

export default App
