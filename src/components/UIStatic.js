import React, { Component } from 'react'
import { Icon, Label, List } from 'semantic-ui-react'
import moment from 'moment'

import { simpleStaticFormField } from './common'

const formats = ['date', 'label', 'tag']

class UIStatic extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ready: false,
      component: null,
      icon: null
    }
  }

  checkIcon () {
    return new Promise(resolve => {
      if (this.props.hasOwnProperty('icon')) {
        this.setState({icon: <Icon name={this.props.icon} color='teal' />}, () => resolve())
      } else {
        this.setState({icon: ''}, () => resolve())
      }
    })
  }

  createComponent () {
    return new Promise(resolve => {
      const {format, value} = this.props

      if (!Array.isArray(value)) {
        resolve(null)
      } else {
        if (!formats.includes(format)) {
          resolve(<List style={{marginTop: 0}} items={value} />)
        } else {
          const entries = []

          for (const entry in value) {
            if (format === 'date') {
              entries.push(moment(value[entry]).format('LLL'))
            } else {
              entries.push(<Label key={entry} color='teal'>{value[entry]}</Label>)
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
      }
    })
  }

  componentDidMount () {
    this.checkIcon().then(() => {
      this.createComponent().then(result => {
        this.setState({component: result}, () => this.setState({ready: true}))
      })
    })
  }

  render () {
    const {ready, component, icon} = this.state
    const {displayName, description} = this.props

    if (!ready) {
      return simpleStaticFormField(displayName, description, <List style={{marginTop: 0}} />)
    } else {
      return simpleStaticFormField(displayName, description, component, icon)
    }
  }
}

export default UIStatic
