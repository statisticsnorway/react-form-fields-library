import React, { Component } from 'react'
import { Button, Divider, Dropdown, Input } from 'semantic-ui-react'

import { fullFormField } from './common/FormField'
import { fetchData } from './common/Fetch'
import { checkValueAndType } from './common/Utlities'

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
        if (checkValueAndType(this.props.value, 'array')) {
          this.setState({value: this.props.value}, () => resolve())
        } else resolve()
      })
    })
  }

  componentDidMount () {
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

  handleInputChange (index, event) {
    const value = [...this.state.value]
    const editedEntry = {text: event.target.value, option: value[index].option}

    value.splice(parseInt(index), 1, editedEntry)

    this.setState({value: value}, () => sessionStorage.setItem(this.props.name, this.state.value))
  }

  handleDropdownChange (index, event, data) {
    const value = [...this.state.value]
    const editedEntry = {text: value[index].text, option: data.value}

    value.splice(parseInt(index), 1, editedEntry)

    this.setState({value: value}, () => sessionStorage.setItem(this.props.name, this.state.value))
  }

  handleAddEntry = () => {
    this.setState({value: [...this.state.value, {text: '', option: ''}]}, () =>
      sessionStorage.setItem(this.props.name, this.state.value)
    )
  }

  handleRemoveEntry (index) {
    const entries = [...this.state.value]

    if (parseInt(index) !== -1) entries.splice(parseInt(index), 1)

    this.setState({value: entries}, () => sessionStorage.setItem(this.props.name, this.state.value))
  }

  component () {
    const {ready, problem, value, options, errorMessage} = this.state
    const {name, displayName, description, error, warning, required} = this.props

    if (!ready) {
      const action = <Dropdown button basic options={[]} loading />
      const component = <Input placeholder={displayName} action={action} disabled />

      return fullFormField(displayName, description, error, warning, required, component)
    }

    if (ready && problem) {
      const action = <Dropdown button basic options={[]} disabled />
      const component = <Input placeholder={displayName} action={action} disabled />

      return fullFormField(displayName, description, errorMessage, warning, required, component)
    }

    if (ready && !problem) {
      const components =
        <div>
          {value.map((entry, index) => {
            const action = <Dropdown key={index} button basic options={options} value={entry.option}
                                     onChange={this.handleDropdownChange.bind(this, index)} />
            const button = <Button basic icon={{name: 'minus', color: 'red'}}
                                   onClick={this.handleRemoveEntry.bind(this, index)} />

            return (
              <div key={index}>
                <Input action name={name} placeholder={displayName} value={entry.text}
                       onChange={this.handleInputChange.bind(this, index)}>
                  <input />
                  {action}
                  {button}
                </Input>
                <Divider hidden fitted />
              </div>
            )
          })}
          <Divider hidden fitted />
          <Button basic icon={{name: 'plus', color: 'green'}} size='small' onClick={this.handleAddEntry} />
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
