# dc-react-form-fields-library
DC React Form Fields Library is a React Component library consisting of different types of form components, wrapped in 
different kinds of form fields. These components can be imported and used in any React application. Its primary purpose 
is to supplement [dc-react-components-library](https://github.com/statisticsnorway/dc-react-components-library).

### How to use this library in another React application directly from GitHub (useful in early development)
1. In your React application run `yarn add https://github.com/statisticsnorway/dc-react-form-fields-library.git` 
    * Optionally add `#name-of-branch` at the end to use a specific branch instead of master
2. Import the component in your React application with `import { DCFormField } from 'dc-react-form-fields-library'`

##### Note:
* When imported from GitHub the library does not automatically stay up to date with the latest commits to GitHub so you 
have to run `yarn upgrade dc-react-form-fields-library` in your React application to get the latest "build"

### Test it yourself
Run `yarn start` and navigate to `http://localhost:3000/`

##### Alternatively try a more optimized production build:
1. Run `yarn build:example`
2. Optionally run `yarn global add serve` (if you do not have [serve](https://github.com/zeit/serve/))
3. Run `serve -s build`
4. Navigate to `http://localhost:5000/`

### How it works
The DCFormField component expects one object containing some properties, for example:
```javascript
import React, { Component } from 'react'
import { DCFormField } from 'dc-react-form-fields-library'
import { Form } from 'semantic-ui-react'

const props = {
  component: 'DCText',                          // The component type
  name: 'myInput',                              // Identifier for the value stored in sessionStorage
  displayName: 'My input',                      // Displayed as the label for the form field
  description: 'A description for my input',    // Displayed as a popup on the label
  error: '',                                    // If there are errors
  warning: '',                                  // If there are warnings
  required: true,                               // If the field is required
  value: null                                   // If the component should be initiated with a value, different components require different types
}

class App extends Component {
  render () {
    return (
      <Form>
        <DCFormField properties={props} />
      </Form>
    )
  }
}
```

##### Note:
* *component* and *name* are the only **required** properties by default but ome component types require more properties too work correctly, they will be explaned below
* This library uses [Semantic UI](https://semantic-ui.com/introduction/getting-started.html) for styling and therefore 
requires your project to to have `semantic-ui-css` and `semantic-ui-react` as dependencies
  * Do not forget to wrap your DCFormField components inside the [Semantic UI React](https://react.semantic-ui.com/) 
  component `Form` (like in the example above)
  * Also do not forget to add `import 'semantic-ui-css/semantic.min.css'` in your `index.js`
* The DCDate component uses [Moment.js](https://momentjs.com/docs/) and [ReactJS Datepicker](https://reactdatepicker.com/) 
so if you wish to use it you need `react-datepicker` and `moment` as dependencies in your project
* The form components store their value in sessionStorage (to avoid having to use Redux or passing state to parent), so to 
fetch a value from a component do this:

```javascript
sessionStorage.getItem(name)            // 'name' is they same value that you used in the props for the component
```


### Component types
In `App.js` you can find usage examples for all of them

Name | Description | Additional properties | Accepted value type(s)
-----|-------------|------------------------|---------------
DCText | A typical text input | - | *string*
DCBoolean | A typical checkbox | - | *boolean*
DCNumber | A typical number input | - | JavaScript *number*
DCRadio | A typical radio choice | *options*: [{text: ' ', value: ' '}]  | *string*
DCDate | A typical date picker | - | *Moment.js object**
DCDropdown | A dropdown list populated with options fetched from an array of endpoints | *endpoints*: [' '] and *multiSelect*: boolean | *string* if regular or *array* if multiSelect
DCMultiInput | A collection of one or more text inputs with a dropdown attached to each | *endpoints*: [' '] | An *array* of *objects* with two properties; text and option
DCStatic | A collection of one or more non-interactable values to be displayed either as tags, labels, dates or regular text | *format*: ' ' | An *array* of *strings* or *Moment.js objects**

*MomentJS accepts Java Date and JavaScript Date objects and some other (check MomentJS documentation)
