import React from 'react'
import { Divider, Form, Popup } from 'semantic-ui-react'

import { UI } from './ENUM'

const InlineError = ({ text }) => <span style={{ color: '#db2828' }}>{text}</span>
const InlineWarning = ({ text }) => <span style={{ color: '#ffd700' }}>{text}</span>

const structureDescription = (description) => {
  if (Array.isArray(description)) {
    return (
      <div>
        {description.map((value, index) => <p key={index}>{value}</p>)}
      </div>
    )
  } else {
    return description
  }
}

export const formatLinks = (route, value) => {
  if (value !== '' && value !== undefined && value !== null) {
    if (route === undefined || typeof route !== 'string') {
      route = ''
    }

    if (Array.isArray(value)) {
      return (
        <div>
          {value.map((thing, index) => <a key={index} href={route + thing}>{UI.LINK} #{index + 1}<br /></a>)}
        </div>
      )
    } else {
      return <div><a href={route + value}>{UI.LINK}</a></div>
    }
  } else {
    return null
  }
}

export function fullFormField (displayName, description, error, warning, required, component, showLinks, value, route) {
  return (
    <Form.Field error={!!error} required={required}>
      <Popup hideOnScroll position='top left' header={displayName} wide='very' trigger={<label>{displayName}</label>}
             content={structureDescription(description)} />
      {component}
      {showLinks && formatLinks(route, value)}
      {warning && !error && <InlineWarning text={warning} />}
      {error && !warning && <InlineError text={error} />}
      {error && warning &&
      <div>
        <InlineError text={error} />
        <Divider hidden fitted />
        <InlineWarning text={warning} />
      </div>
      }
    </Form.Field>
  )
}

export function simpleFormField (displayName, description, component) {
  return (
    <Form.Field>
      <Popup hideOnScroll position='top left' header={displayName} wide='very' trigger={component}
             content={structureDescription(description)} />
    </Form.Field>
  )
}

export function simpleStaticFormField (displayName, description, component, icon = null) {
  return (
    <Form.Field>
      <Popup hideOnScroll position='top left' header={displayName} wide='very'
             content={structureDescription(description)} trigger={<label>{displayName} {icon}</label>} />
      {component}
    </Form.Field>
  )
}
