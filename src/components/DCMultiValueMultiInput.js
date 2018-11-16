import React, { Component } from 'react'
import { Button, Container, Divider, Dropdown, Grid, Icon, Input } from 'semantic-ui-react'

import { fullFormField } from './common/FormField'
import { fetchData } from './common/Fetch'

class DCMultiValueMultiInput extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ready: false,
      problem: false,
      errorMessage: '',
      value: [{text: [''], option: ''}],
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

  handleInputChange (index, innerIndex, event) {
    const value = [...this.state.value]

    value[parseInt(index)].text[parseInt(innerIndex)] = event.target.value

    this.setState({value: value}, () => this.props.valueChange(this.props.name, this.state.value))
  }

  handleDropdownChange (index, event, data) {
    const value = [...this.state.value]

    value[parseInt(index)].option = data.value

    this.setState({value: value}, () => this.props.valueChange(this.props.name, this.state.value))
  }

  handleAddEntry = () => {
    this.setState({value: [...this.state.value, {text: [''], option: ''}]}, () =>
      this.props.valueChange(this.props.name, this.state.value)
    )
  }

  handleRemoveEntry (index) {
    const entries = [...this.state.value]

    if (parseInt(index) !== -1) entries.splice(parseInt(index), 1)

    this.setState({value: entries}, () => this.props.valueChange(this.props.name, this.state.value))
  }

  handleAddValueToEntry (index) {
    const entries = [...this.state.value]

    entries[parseInt(index)].text = [...this.state.value[parseInt(index)].text, '']

    this.setState({value: entries}, () =>
      this.props.valueChange(this.props.name, this.state.value)
    )
  }

  handleRemoveValueFromEntry (index, innerIndex) {
    const entries = [...this.state.value]

    if (parseInt(index) !== -1 && parseInt(innerIndex) !== -1) {
      entries[parseInt(index)].text.splice(parseInt(innerIndex), 1)
    }

    this.setState({value: entries}, () => this.props.valueChange(this.props.name, this.state.value))
  }

  component () {
    const {ready, problem, value, options, errorMessage} = this.state
    const {name, displayName, description, error, warning, required} = this.props

    if (!ready) {
      const component =
        <Grid columns='equal'>
          <Grid.Column>
            <Dropdown selection options={[]} loading fluid />
          </Grid.Column>
          <Grid.Column>
            <Input placeholder={displayName} disabled />
          </Grid.Column>
        </Grid>

      return fullFormField(displayName, description, error, warning, required, component)
    }

    if (ready && problem) {
      const component =
        <Grid columns='equal'>
          <Grid.Column>
            <Dropdown selection options={[]} disabled fluid />
          </Grid.Column>
          <Grid.Column>
            <Input placeholder={displayName} disabled />
          </Grid.Column>
        </Grid>

      return fullFormField(displayName, description, errorMessage, warning, required, component)
    }

    if (ready && !problem) {
      const components =
        <Grid columns='equal' divided='vertically'>
          {value.map((entry, index) => {
            const dropdown = <Dropdown options={options} value={entry.option} selection clearable placeholder='Pick one'
                                       fluid onChange={this.handleDropdownChange.bind(this, index)} />

            return (
              <Grid.Row key={index}>
                <Grid.Column>
                  {dropdown}
                  <Divider hidden />
                  <Icon link name='trash' color='red' size='large'
                        onClick={this.handleRemoveEntry.bind(this, index)} />
                </Grid.Column>
                <Grid.Column>
                  {entry.text.map((innerValue, innerIndex) => {
                    const label = <Button basic icon={{name: 'minus', color: 'red'}}
                                          onClick={this.handleRemoveValueFromEntry.bind(this, index, innerIndex)} />

                    return (
                      <Input key={innerIndex} labelPosition='right' label={label} name={name + innerIndex}
                             placeholder={displayName} value={innerValue}
                             onChange={this.handleInputChange.bind(this, index, innerIndex)} />
                    )
                  })}
                  <Icon link name='plus' color='green' onClick={this.handleAddValueToEntry.bind(this, index)} />
                </Grid.Column>
              </Grid.Row>
            )
          })}
          <Grid.Row>
            <Grid.Column>
              <Container textAlign='right'>
                <Icon link name='plus' color='green' size='large' onClick={this.handleAddEntry} />
              </Container>
            </Grid.Column>
          </Grid.Row>
        </Grid>

      return fullFormField(displayName, description, error, warning, required, components)
    }

    return null
  }

  render () {
    return this.component()
  }
}

export default DCMultiValueMultiInput
