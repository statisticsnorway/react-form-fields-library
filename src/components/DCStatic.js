import React, { Component } from 'react'
import { Icon, Label, List } from 'semantic-ui-react'
import moment from 'moment'

import { simpleStaticFormField } from './common/FormField'

const formats = ['date', 'label', 'tag']

class DCStatic extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ready: false,
      component: null,
      icon: null
    }
  }

  createComponent () {
    return new Promise(resolve => {
      const {format, value} = this.props

      if (!formats.includes(format)) {
        resolve(<List style={{marginTop: 0}} items={value} />)
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
          this.setState({icon: <Icon name='calendar alternate outline' color='teal' size='large' />}, () => {
            resolve(<List style={{marginTop: 0}} items={entries} />)
          })
        } else {
          resolve(<Label.Group tag={format === 'tag'} color='teal' content={entries} />)
        }
      }
    })
  }

  componentDidMount () {
    this.createComponent().then(result => {
      this.setState({component: result}, () => this.setState({ready: true}))
    })
  }

  render () {
    const {ready, component, icon} = this.state
    const {displayName, description} = this.props

    if (ready) return simpleStaticFormField(displayName, description, component, icon)

    return null
  }
}

export default DCStatic
