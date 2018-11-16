import React, { Component } from 'react'
import { Button, Divider, Dropdown, Icon, Input } from 'semantic-ui-react'

import { fullFormField } from './common/FormField'
import { fetchData } from './common/Fetch'

class DCMultiInput extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ready: false,
      problem: false,
      errorMessage: '',
      value: [{text: '', option: ''}],
      options: []
    }
  }

  setOptionsAndValue (options) {
    return new Promise(resolve => {
      this.setState({options: options}, () => {
        if (Array.isArray(this.props.value)) {
          this.setState({value: this.props.value}, () => resolve())
        } else resolve()
      })
    })
  }

  componentDidMount () {
    if (this.props.hasOwnProperty('options')) {
      this.setOptionsAndValue(this.props.options).then(() => this.setState({ready: true}))
    } else {
      fetchData(this.props.endpoint).then(options => {
        this.setOptionsAndValue(options).then(() => {
          this.setState({ready: true})
        })
      }).catch(error => {
        this.setState({
          ready: true,
          problem: true,
          errorMessage: error
        })
      })
    }
  }

  handleInputChange (index, event) {
    const value = [...this.state.value]
    const editedEntry = {text: event.target.value, option: value[index].option}

    value.splice(parseInt(index), 1, editedEntry)

    this.setState({value: value}, () => this.props.valueChange(this.props.name, this.state.value))
  }

  handleDropdownChange (index, event, data) {
    const value = [...this.state.value]
    const editedEntry = {text: value[index].text, option: data.value}

    value.splice(parseInt(index), 1, editedEntry)

    this.setState({value: value}, () => this.props.valueChange(this.props.name, this.state.value))
  }

  handleAddEntry = () => {
    this.setState({value: [...this.state.value, {text: '', option: ''}]}, () =>
      this.props.valueChange(this.props.name, this.state.value)
    )
  }

  handleRemoveEntry (index) {
    const entries = [...this.state.value]

    if (parseInt(index) !== -1) entries.splice(parseInt(index), 1)

    this.setState({value: entries}, () => this.props.valueChange(this.props.name, this.state.value))
  }

  component () {
    const {ready, problem, value, options, errorMessage} = this.state
    const {name, displayName, description, error, warning, required} = this.props

    if (!ready) {
      const action = <Dropdown selection options={[]} loading />
      const component = <Input placeholder={displayName} action={action} actionPosition='left' disabled />

      return fullFormField(displayName, description, error, warning, required, component)
    }

    if (ready && problem) {
      const action = <Dropdown selection options={[]} disabled />
      const component = <Input placeholder={displayName} action={action} actionPosition='left' disabled />

      return fullFormField(displayName, description, errorMessage, warning, required, component)
    }

    if (ready && !problem) {
      const components =
        <div>
          {value.map((entry, index) => {
            const action = <Dropdown options={options} value={entry.option} selection clearable
                                     onChange={this.handleDropdownChange.bind(this, index)} />
            const button = <Button basic icon={{name: 'minus', color: 'red'}}
                                   onClick={this.handleRemoveEntry.bind(this, index)} />

            return (
              <div key={index}>
                <Input labelPosition='right' name={name} placeholder={displayName} value={entry.text}
                       onChange={this.handleInputChange.bind(this, index)} action actionPosition='left'>
                  {action}
                  <input />
                  {button}
                </Input>
                <Divider hidden fitted />
              </div>
            )
          })}
          <Divider hidden fitted />
          <Icon link name='plus' color='green' onClick={this.handleAddEntry} />
        </div>

      return fullFormField(displayName, description, error, warning, required, components)
    }

    return null
  }

  render () {
    return this.component()
  }
}

export default DCMultiInput
