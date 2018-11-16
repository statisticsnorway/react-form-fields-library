# dc-react-form-fields-library
DC React Form Fields Library is a React Component library consisting of different types of input and form fields. 
Its primary purpose is to supplement [dc-react-components-library](https://github.com/statisticsnorway/dc-react-components-library).

### How it works
The DCFormField component expects one object containing some properties and one function (more on that later) for example:
```javascript
import React, { Component } from 'react'
import { DCFormField } from 'dc-react-form-fields-library'
import { Form } from 'semantic-ui-react'

const properties = {
  component: 'DCText',                          // The component type
  name: 'myInput',                              // Identifier for the value stored in the parent
  displayName: 'My input',                      // Label on the field
  description: 'A description for my input',    // Popup on the label
  required: true,                               // If the field is required
  value: null                                   // If the component should be initiated with a value, different components require different data types
}

class App extends Component {
  render () {
    return (
      <Form>
        <DCFormField properties={properties} valueChange={this.valueChange} />
      </Form>
    )
  }
}
```

##### Note:
* *component* and *name* are the only **required** properties but some component types need more properties too work correctly
* This library uses [Semantic UI](https://semantic-ui.com/introduction/getting-started.html) for styling and therefore 
requires your project to to have `semantic-ui-css` and `semantic-ui-react` as dependencies (since those are not packaged with this library)
  * Do not forget to wrap your DCFormField components inside the [Semantic UI React](https://react.semantic-ui.com/) 
  component `Form` (like in the example above)
  * Also do not forget to add `import 'semantic-ui-css/semantic.min.css'` in your `index.js`
* The DCDate component uses [Moment.js](https://momentjs.com/docs/) and [ReactJS Datepicker](https://reactdatepicker.com/) 
so if you wish to use it you need `react-datepicker` and `moment` as dependencies in your project
  * Again do not forget to add the css - `import 'react-datepicker/dist/react-datepicker.css'` in your `index.js`
* The form components store their value in their own state, so they can be controlled inputs, but also updates the parents state
  so we can keep the data together
  * However you do not want to re-render the entire form when one input changes its value, so to avoid this you need some 
    functions in your form holder component. and then pass the handling of value changing to the DCFormField component
    (discussed earlier), like this: 

```javascript
  shouldComponentUpdate = (nextProps, nextState) => {
    return this.state.data === nextState.data;
  }

  handleValueChange = (name, value) => {
    this.setState({
      data: {
        ...this.state.data,
        [name]: value
      }
    })
  }
```

### Form field types
**PS!** In `App.js` you can find usage examples for all of these

Name | Description | Additional properties | Accepted type(s) for value
-----|-------------|------------------------|---------------
DCText | A typical text input | - | *string*
DCBoolean | A typical checkbox | - | *boolean*
DCNumber | A typical number input | - | JavaScript *number*
DCRadio | A typical radio choice | *options* | *string*
DCDate | A typical date picker | - | *Moment.js object**
DCDropdown | A dropdown list populated with options provided or alternatively fetched from an array of endpoints, that can be searchable if there are alot of options | *multiSelect*, *searchable* and *endpoints* or *options* | *string* if regular or *array* if multiSelect
DCMultiInput | A collection of one or more text inputs with a dropdown attached to each | *endpoints* or *options* | An *array* of *objects* with two properties; text and option
DCStatic | A collection of one or more non-interactable values to be displayed either as tags, labels, dates or regular text | *format* | An *array* of *strings* or *Moment.js objects**

*MomentJS accepts Java Date, JavaScript Date objects and some some typical date formats (check MomentJS documentation)

### How to import this library directly from GitHub (useful in early development)
1. In your React application run `yarn add https://github.com/statisticsnorway/dc-react-form-fields-library.git` 
    * Optionally add `#name-of-branch` at the end to use a specific branch
2. Import the component in your React application with `import { DCFormField } from 'dc-react-form-fields-library'`

##### Note:
* When imported from GitHub the library does not automatically stay up to date with the latest commits so you have to 
run `yarn upgrade dc-react-form-fields-library` to get the latest "build"

### Test it yourself
Run `yarn start` and navigate to `http://localhost:3000/`

##### Alternatively try a more optimized production build:
1. Run `yarn build:example`
2. Optionally run `yarn global add serve` (if you do not have [serve](https://github.com/zeit/serve/))
3. Run `serve -s build`
4. Navigate to `http://localhost:5000/`