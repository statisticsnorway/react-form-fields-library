import React from 'react'
import { Divider, Form, Popup } from 'semantic-ui-react'

const InlineError = ({text}) => <span style={{color: '#db2828'}}>{text}</span>

const InlineWarning = ({text}) => <span style={{color: '#ffd700'}}>{text}</span>

export const FullFormField = (displayName, description, error, warning, required, component) => {
  return (
    <Form.Field error={!!error} required={required}>
      <Popup hideOnScroll position='top left' header={displayName} wide='very' trigger={<label>{displayName}</label>}
             content={description} />

      {component}

      {error && !warning && <InlineError text={error} />}

      {warning && !error && <InlineWarning text={warning} />}

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

export const SimpleFormField = (displayName, description, component) => {
  return (
    <Form.Field>
      <Popup hideOnScroll position='top left' header={displayName} wide='very' trigger={component}
             content={description} />
    </Form.Field>
  )
}

export const SimpleStaticFormField = (displayName, description, header, component) => {
  return (
    <Form.Field>
      <Popup hideOnScroll position='top left' header={displayName} wide='very' trigger={header}
             content={description} />

      {component}
    </Form.Field>
  )
}
