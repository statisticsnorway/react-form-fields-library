import React, { Component } from 'react'
import { Label, List } from 'semantic-ui-react'
import moment from 'moment'

import { simpleStaticFormField } from './common/FormField'

const formats = ['date', 'label', 'tag']

class DCStatic extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ready: false,
      component: null
    }
  }

  createComponent () {
    const {format, value} = this.props

    if (!formats.includes(format)) {
      return <List style={{marginTop: 0}} items={value} />
    } else {
      const entries = []

      for (const entry in value) {
        if (value.hasOwnProperty(entry)) {
          if (format === 'date') {
            let convertedEntry

            try {
              convertedEntry = moment(value[entry]).format('LLL')
            } catch (error) {
              convertedEntry = error
            }

            entries.push(convertedEntry)

          } else {
            entries.push(<Label key={entry} color='teal'>{value[entry]}</Label>)
          }
        }
      }

      if (format === 'date') {
        return <List style={{marginTop: 0}} items={entries} />
      } else {
        return <Label.Group tag={format === 'tag'} color='teal' content={entries} />
      }
    }
  }

  componentDidMount () {
    this.setState({component: this.createComponent()}, () => this.setState({ready: true}))
  }

  component () {
    const {ready, component} = this.state
    const {displayName, description} = this.props

    if (ready) return simpleStaticFormField(displayName, description, component)

    return null
  }

  render () {
    return this.component()
  }
}

export default DCStatic
