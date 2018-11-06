import React from 'react'
import { Form, Popup } from 'semantic-ui-react'

const InlineError = ({text}) => <span style={{color: '#db2828'}}>{text}</span>

const InlineWarning = ({text}) => <span style={{color: '#ffd700'}}>{text}</span>

export const FormField = (displayName, description, error, warning, required, component) => {
  return (
    <Form.Field error={!!error} required={required}>
      <Popup hideOnScroll position='top center' header={displayName} wide='very' trigger={<label>{displayName}</label>}
             content={description} />
      {component}
      {error && <InlineError text={error} />}
      {warning && <InlineWarning text={warning} />}
    </Form.Field>
  )
}