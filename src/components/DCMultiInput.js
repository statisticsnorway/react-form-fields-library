import React, { Component } from 'react'
import { Button, Divider, Dropdown, Input } from 'semantic-ui-react'
import { FullFormField } from './common/FormField'
import { fetchData } from './common/Fetch'

class DCMultiInput extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ready: false,
      problem: false,
      errorMessage: '',
      value: this.props.value,
      options: []
    }
  }

  componentDidMount () {
    fetchData(this.props.endpoint).then(options => {
      this.setState({
        ready: true,
        options: options
      })
    }).catch(error => {
      this.setState({
        ready: true,
        problem: true,
        errorMessage: error
      })
    })
  }

  handleInputChange = (event, index) => {
    index = parseInt(index)

    const entry = {
      text: event.target.value,
      option: this.state.value[index].option
    }

    const value = [...this.state.value]

    value[index] = entry

    this.setState({value: value}, () => {
      sessionStorage.setItem(this.props.name, this.state.value)
    })
  }

  handleDropdownChange = (option, index) => {
    index = parseInt(index)

    const entry = {
      text: this.state.value[index].text,
      option: option
    }

    const value = [...this.state.value]

    value[index] = entry

    this.setState({value: value}, () => {
      sessionStorage.setItem(this.props.name, this.state.value)
    })
  }

  handleAddEntry = () => {
    const entries = this.state.value

    entries.push({text: '', option: ''})

    this.setState({value: entries}, () => {
      sessionStorage.setItem(this.props.name, this.state.value)
    })
  }

  handleRemoveEntry (entry) {
    entry = parseInt(entry)

    const entries = this.state.value

    entries.splice(entry, 1)

    this.setState({value: entries}, () => {
      sessionStorage.setItem(this.props.name, this.state.value)
    })
  }

  render () {
    const {ready, problem, value, options, errorMessage} = this.state
    const {name, displayName, description, error, warning, required} = this.props

    if (!ready) {
      const action = <Dropdown button basic options={[]} loading />

      const component = <Input placeholder={displayName} action={action} disabled />

      return FullFormField(displayName, description, error, warning, required, component)
    }

    if (ready && problem) {
      const action = <Dropdown button basic options={[]} disabled />

      const component = <Input placeholder={displayName} action={action} disabled />

      return FullFormField(displayName, description, errorMessage, warning, required, component)
    }

    if (ready && !problem) {
      const components = <div>
        {Object.keys(value).map(key => {
          const action = <Dropdown key={key} button basic options={options} value={value[key].option}
                                   onChange={(event, {returned = key, value}) => this.handleDropdownChange(value, returned)} />

          const button = <Button basic icon={{name: 'minus', color: 'red'}}
                                 onClick={({returned = key}) => this.handleRemoveEntry(returned)} />

          return (
            <div key={key}>
              <Input key={key} name={name} placeholder={displayName} value={value[key].text} action
                     onChange={(event, {returned = key}) => this.handleInputChange(event, returned)}>

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

      return FullFormField(displayName, description, error, warning, required, components)
    }

    return null
  }
}

export default DCMultiInput
