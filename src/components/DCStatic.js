import React, { Component } from 'react'
import moment from 'moment'
import { SimpleStaticFormField } from './common/FormField'
import { Label, List } from 'semantic-ui-react'

class DCStatic extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ready: false,
      component: null
    }
  }

  componentDidMount () {
    const {format, value} = this.props

    let component

    switch (format) {
      case 'date':
        const date = []

        for (const entry in value) {
          if (value.hasOwnProperty(entry)) {
            let convertedEntry

            try {
              convertedEntry = moment(value[entry]).format('LLL')
            } catch (error) {
              convertedEntry = error
            }

            date.push(convertedEntry)
          }
        }

        component = <List style={{marginTop: 0}} items={date} />
        break

      case 'tag':
        const tags = []

        for (const entry in value) {
          if (value.hasOwnProperty(entry)) {
            tags.push(<Label key={entry} color='teal'>{value[entry]}</Label>)
          }
        }

        component = <Label.Group tag content={tags} />
        break

      case 'label':
        const labels = []

        for (const entry in value) {
          if (value.hasOwnProperty(entry)) {
            labels.push(<Label key={entry} color='teal'>{value[entry]}</Label>)
          }
        }

        component = <div>{labels}</div>
        break

      default:
        component = <List style={{marginTop: 0}} items={value} />
    }

    this.setState({
      ready: true,
      component: component
    })
  }

  render () {
    const {ready, component} = this.state
    const {displayName, description} = this.props

    const header = <label>{displayName}</label>

    if (ready) return SimpleStaticFormField(displayName, description, header, component)

    return null
  }
}

export default DCStatic
