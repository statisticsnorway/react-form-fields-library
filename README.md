# dc-react-form-fields-library
DC React Form Fields Library is a React Component library consisting of different types of form components, wrapped in 
a form field, which can be imported and used in any React application. Its primary purpose is to supplement 
[dc-react-components-library](https://github.com/statisticsnorway/dc-react-components-library).

### How to use this library in another React application directly from GitHub (useful in early development)
1. In your React application run `yarn add https://github.com/statisticsnorway/dc-react-form-fields-library.git` 
    * Optionally add `#name-of-branch` at the end to use a specific branch instead of master
2. Import the component in your React application with `import { DCFormField } from 'dc-react-form-fields-library'`

##### Useful information
* Your imported library does not automatically stay up to date with the latest commits to GitHub so you have to run 
`yarn upgrade dc-react-form-fields-library` in your React application to get the latest "build"

### How it works
The DCFormField component expects two properties; `tag` and `additionalProperties`, like this:
```javascript
import React, { Component } from 'react'
import { DCFormField } from 'dc-react-form-fields-library'
import { Form } from 'semantic-ui-react'

const input = 'DCText'                          // The input type you want the form field to be
const props = {
  parent: 'myForm',                             // The name of the form
  name: 'myInput',                              
  displayName: 'My input',                      // Displayed as the label for the form field
  description: 'A description for my input',
  error: '',                                    // If there are errors
  warning: '',                                  // If there are warnings
  required: true,                               // If the field is a required part of the form
  value: 'The default value'                    // The default value, different input types require different types of default values
}

class App extends Component {
  render () {
    return (
      <div>
        <Form>
          <DCFormField tag={input} additionalProps={props} />
        </Form>
      </div>
    )
  }
}
```

**Note:**
* Some form component types require more properties than the default ones, they will be explaned below
* The library uses Semantic-UI for styling and therefore requires your React application to to have `semantic-ui-css` and `semantic-ui-react` as dependencies
* Do not forget to wrap your DCFormField components inside the semantic-ui-react component `Form` (like in the example above)
* Also do not forget to add `import 'semantic-ui-css/semantic.min.css'` in your `index.js`
* The DCDate component uses Moment.js and React Date Picker so if you wish to use it you need `react-datepicker` and `moment` as dependencies
* The form components store their value in sessionStorage at the moment so to fetch the value from the component do this:

```javascript
sessionStorage.getItem(name)            // 'name' is they same value that you used in the props for the component
```

### Current form component types
Name | Description | Additional properties | Accepted value types
-----|-------------|------------------------|---------------
DCText | A typical text input | - | *string*
DCBoolean | A typical checkbox | *error*, *warning* and *required* does not make sense here so those will be ignored | *boolean*
DCNumber | A typical number input | - | JavaScript *Number* or empty *string*
DCRadio | A typical radio choice | An array of objects (with *key*, *text* and *value* properties) called options | *array* of *objects*
DCDate | A typical date picker | - | *Moment.js object* or empty *string*
