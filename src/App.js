import React, { Component } from 'react'
import { DCFormField } from './main'
import { Checkbox, Divider, Form, Grid, Header } from 'semantic-ui-react'
import * as moment from 'moment'
import 'moment/locale/nb'

moment.locale('nb')

export const formComponents = {
  DCText: {
    component: 'DCText',
    name: 'myTextInput',
    displayName: 'DCText',
    description: 'A description for this input',
    error: '',
    warning: '',
    required: true,
    value: ''
  },
  DCBoolean: {
    component: 'DCBoolean',
    name: 'myBooleanInput',
    displayName: 'DCBoolean',
    description: 'A description for this input',
    value: false
  },
  DCNumber: {
    component: 'DCNumber',
    name: 'myNumberInput',
    displayName: 'DCNumber',
    description: 'A description for this input',
    error: '',
    warning: '',
    required: true,
    value: ''
  },
  DCRadio: {
    component: 'DCRadio',
    name: 'myRadioInput',
    displayName: 'DCRadio',
    description: 'A description for this input',
    error: '',
    warning: '',
    required: true,
    value: '',
    options: [
      {key: 'thisOption', text: 'This option', value: 'thisOption'},
      {key: 'thatOption', text: 'That option', value: 'thatOption'},
      {key: 'somethingElse', text: 'Something else', value: 'somethingElse'}
    ]
  },
  DCDate: {
    component: 'DCDate',
    name: 'myDateInput',
    displayName: 'DCDate',
    description: 'A description for this input',
    error: '',
    warning: '',
    required: true,
    value: ''
  },
  DCDropdownSingleSelect: {
    component: 'DCDropdown',
    name: 'myDropdownSingleSelectInput',
    displayName: 'DCDropdown',
    description: 'A description for this input',
    error: '',
    warning: '',
    required: true,
    value: '',
    endpoints: [
      'https://metadata.ssbmod.net/data/Role/',
      'https://metadata.ssbmod.net/data/Agent/'
    ],
    multiSelect: false
  },
  DCDropdownMultipleSelect: {
    component: 'DCDropdown',
    name: 'myDropdownMultipleSelectInput',
    displayName: 'DCDropdown (multiSelect)',
    description: 'A description for this input',
    error: '',
    warning: '',
    required: true,
    value: [],
    endpoints: [
      'https://metadata.ssbmod.net/data/Agent/',
      'https://metadata.ssbmod.net/data/Role/'
    ],
    multiSelect: true
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
      formComponents: formComponents
    }
  }

  componentDidMount () {
    sessionStorage.clear()
  }

  handleCheckbox (name) {
    this.setState({
      [name]: !this.state[name]
    }, () => {
      if (this.state[name]) {
        this.setState({ready: false}, () => {
          const formComponents = JSON.parse(JSON.stringify(this.state.formComponents))

          Object.keys(formComponents).forEach(key => {
            formComponents[key][name] = name
          })

          this.setState({formComponents: formComponents}, () => {
            this.setState({ready: true})
          })
        })
      } else {
        this.setState({ready: false}, () => {
          const formComponents = JSON.parse(JSON.stringify(this.state.formComponents))

          Object.keys(formComponents).forEach(key => {
            formComponents[key][name] = ''
          })

          this.setState({formComponents: formComponents}, () => {
            this.setState({ready: true})
          })
        })
      }
    })
  }

  handleDropdownErrors (name) {
    this.setState({
      [name]: !this.state[name]
    }, () => {
      if (this.state[name]) {
        this.setState({ready: false}, () => {
          const formComponents = JSON.parse(JSON.stringify(this.state.formComponents))
          const errorEndpoints = []

          if (name === 'urlError') {
            errorEndpoints.push('https://metadata.ssbmod.net/data/Agentfda/')
            errorEndpoints.push('https://metadata.ssbmod.net/data/Roleyj/')
          }

          if (name === 'networkError') {
            errorEndpoints.push('https://metadatas.ssbmod.net/data/Agent/')
            errorEndpoints.push('https://metadataas.ssbmod.net/data/Role/')
          }

          Object.keys(formComponents).forEach(key => {
            if (key === 'DCDropdownSingleSelect' || key === 'DCDropdownMultipleSelect') {
              formComponents[key].endpoints = errorEndpoints
            }
          })

          this.setState({formComponents: formComponents}, () => {
            this.setState({ready: true})
          })
        })
      } else {
        this.setState({ready: false}, () => {
          const formComponents = JSON.parse(JSON.stringify(this.state.formComponents))
          const goodEndpoints = ['https://metadata.ssbmod.net/data/Agent/', 'https://metadata.ssbmod.net/data/Role/']

          Object.keys(formComponents).forEach(key => {
            if (key === 'DCDropdownSingleSelect' || key === 'DCDropdownMultipleSelect') {
              formComponents[key].endpoints = goodEndpoints
            }
          })

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

          <Checkbox label='Add warnings' checked={warning} onChange={this.handleCheckbox.bind(this, 'warning')} />

          <Divider hidden />

          <Checkbox label='Add errors' checked={error} onChange={this.handleCheckbox.bind(this, 'error')} />

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
