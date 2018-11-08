import React, { Component } from 'react'
import { DCFormField } from './main'
import { Checkbox, Divider, Form, Grid, Header } from 'semantic-ui-react'
import * as moment from 'moment'
import 'moment/locale/nb'

moment.locale('nb')

export const formComponents = {
  DCText: {
    parent: 'myForm',
    name: 'myTextInput',
    displayName: 'DCText',
    description: 'A description for this input',
    error: '',
    warning: '',
    required: true,
    value: ''
  },
  DCBoolean: {
    parent: 'myForm',
    name: 'myBooleanInput',
    displayName: 'DCBoolean',
    description: 'A description for this input',
    value: false
  },
  DCNumber: {
    parent: 'myForm',
    name: 'myNumberInput',
    displayName: 'DCNumber',
    description: 'A description for this input',
    error: '',
    warning: '',
    required: true,
    value: ''
  },
  DCRadio: {
    parent: 'myForm',
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
    parent: 'myForm',
    name: 'myDateInput',
    displayName: 'DCDate',
    description: 'A description for this input',
    error: '',
    warning: '',
    required: true,
    value: '',
  }
}

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ready: true,
      error: false,
      warning: false,
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

  render () {
    const {ready, warning, error, formComponents} = this.state

    return (
      <Grid padded divided columns='equal'>
        <Grid.Column>
          <Header as='h1' content='Form' />

          {ready &&
          <Form>
            {Object.keys(formComponents).map(value => {
              return <DCFormField key={value} tag={value} additionalProps={formComponents[value]} />
            })}
          </Form>
          }
        </Grid.Column>

        <Grid.Column>
          <Header as='h1' content='Test stuff' />

          <Checkbox label='Add warnings' checked={warning} onChange={this.handleCheckbox.bind(this, 'warning')} />

          <Divider hidden />

          <Checkbox label='Add errors' checked={error} onChange={this.handleCheckbox.bind(this, 'error')} />
        </Grid.Column>
      </Grid>
    )
  }
}

export default App
