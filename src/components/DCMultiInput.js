import React, { Component } from 'react'
import { Button, Container, Dropdown, Grid, Header, Icon, Input } from 'semantic-ui-react'

import { fullFormField } from './common/FormField'
import { UI } from './common/ENUM'
import { shorten } from './common/Utlities'

class DCMultiInput extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ready: false,
      problem: false,
      errorMessage: '',
      value: [{text: this.props.multiValue ? [''] : '', option: ''}],
      options: []
    }
  }

  setOptionsAndValue (options) {
    return new Promise(resolve => {
      const {value} = this.props

      this.setState({options: options}, () => {
        if (Array.isArray(value) && value.length !== 0) {
          this.setState({value: value}, () => resolve())
        } else resolve()
      })
    })
  }

  componentDidMount () {
    if (this.props.hasOwnProperty('options')) {
      this.setOptionsAndValue(this.props.options).then(() => this.setState({ready: true}))
    } else {
      this.setOptionsAndValue([]).then(() => this.setState({ready: true}))
    }
  }

  handleInputChange (index, innerIndex, event) {
    const {valueChange, name, multiValue} = this.props
    const value = [...this.state.value]

    if (!multiValue) {
      value[parseInt(index)].text = event.target.value
    } else {
      value[parseInt(index)].text[parseInt(innerIndex)] = event.target.value
    }

    this.setState({value: value}, () => valueChange(name, this.state.value))
  }

  handleDropdownChange (index, event, data) {
    const {valueChange, name} = this.props
    const value = [...this.state.value]

    value[parseInt(index)].option = data.value

    this.setState({value: value}, () => valueChange(name, this.state.value))
  }

  handleAddEntry = () => {
    const {valueChange, name, multiValue} = this.props

    this.setState({value: [...this.state.value, {text: multiValue ? [''] : '', option: ''}]}, () =>
      valueChange(name, this.state.value)
    )
  }

  handleRemoveEntry (index) {
    const {valueChange, name} = this.props
    const entries = [...this.state.value]

    if (parseInt(index) !== -1) entries.splice(parseInt(index), 1)

    this.setState({value: entries}, () => valueChange(name, this.state.value))
  }

  handleAddValueToEntry (index) {
    const {valueChange, name} = this.props
    const entries = [...this.state.value]

    entries[parseInt(index)].text = [...this.state.value[parseInt(index)].text, '']

    this.setState({value: entries}, () =>
      valueChange(name, this.state.value)
    )
  }

  handleRemoveValueFromEntry (index, innerIndex) {
    const {valueChange, name} = this.props
    const entries = [...this.state.value]

    if (parseInt(index) !== -1 && parseInt(innerIndex) !== -1) {
      entries[parseInt(index)].text.splice(parseInt(innerIndex), 1)
    }

    this.setState({value: entries}, () => valueChange(name, this.state.value))
  }

  render () {
    const {ready, problem, value, options, errorMessage} = this.state
    const {name, displayName, description, error, warning, required, multiValue, languageCode} = this.props

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

      return fullFormField(displayName, description, error, errorMessage, required, component)
    }

    if (ready && !problem) {
      const components =
        <Grid>
          {value.map((entry, index) => {
            const dropdown = <Dropdown options={options} value={entry.option} selection disabled={options.length === 0}
                                       placeholder={options.length === 0 ? UI.NO_OPTIONS[languageCode] : UI.OPTIONS[languageCode]}
                                       clearable fluid={!!multiValue}
                                       onChange={this.handleDropdownChange.bind(this, index)} />

            return (
              <Grid.Row key={index}>
                <Grid.Column width={1} style={{margin: 0, paddingRight: 0, paddingTop: '0.2rem'}}>
                  <Container textAlign='center'>
                    <Header as='h4' color='teal' content={(index + 1) + '.'} style={{marginBottom: 0}} />
                    <Icon link name='close' color='red' onClick={this.handleRemoveEntry.bind(this, index)} />
                  </Container>
                </Grid.Column>
                {multiValue &&
                <Grid.Column width={8} style={{margin: 0, paddingLeft: 0}}>
                  {dropdown}
                </Grid.Column>
                }
                {multiValue &&
                <Grid.Column width={7} style={{margin: 0}}>
                  {entry.text.map((innerValue, innerIndex) => {
                    const action = <Button basic icon={{name: 'close', color: 'red'}}
                                           onClick={this.handleRemoveValueFromEntry.bind(this, index, innerIndex)} />

                    return (
                      <Input key={innerIndex} action={action} style={{paddingTop: innerIndex === 0 ? 0 : '0.5rem'}}
                             placeholder={shorten(displayName)} value={innerValue} name={name + innerIndex}
                             onChange={this.handleInputChange.bind(this, index, innerIndex)} />
                    )
                  })}
                  <Icon link name='plus' color='green' onClick={this.handleAddValueToEntry.bind(this, index)} />
                </Grid.Column>
                }
                {!multiValue &&
                <Grid.Column width={15} style={{margin: 0, paddingLeft: 0}}>
                  <Input name={name} placeholder={shorten(displayName)} value={entry.text} actionPosition='left'
                         onChange={this.handleInputChange.bind(this, index, index)} action={dropdown} />
                </Grid.Column>
                }
              </Grid.Row>
            )
          })}
          <Grid.Row style={{paddingTop: 0}}>
            <Grid.Column width={16} style={{margin: 0}}>
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
}

export default DCMultiInput
