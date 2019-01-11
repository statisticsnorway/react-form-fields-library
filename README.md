# dc-react-form-fields-library
DC React Form Fields Library is a React Component library consisting of different types of input and form fields. 
Its primary purpose is to supplement [dc-react-components-library](https://github.com/statisticsnorway/dc-react-components-library).

### How it works
The **DCFormField** component expects one object containing some properties and one function (more on that later) for example:

```javascript
import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'

import { DCFormField } from 'dc-react-form-fields-library'

const properties = {
  component: 'DCText',                          // The form field type
  name: 'myInput',                              // Identifier for the value stored in the parent
  displayName: 'My input',                      // Label on the field
  description: ['A description for my input'],  // Popup on the label
  required: true,                               // If the field is required
  value: ''                                     // If the component should be initiated with a value, different components require different data types
}

class App extends Component {
  render () {
    return (
      <Form>
        <DCFormField properties={properties} valueChange={this.valueChange} languageCode={'en'} />
      </Form>
    )
  }
}
```

##### Note:
* *component*, *name* and *languageCode* are the only **required** properties but some component types need more properties too work correctly.
  * Norwegian ('nb') and english ('en') are the currently supported languageCodes.
* If you want to structure the description with separated sentances, note how *description* takes and array of strings.
* This library uses [Semantic UI](https://semantic-ui.com/introduction/getting-started.html) for styling and therefore 
requires your project to to have `semantic-ui-css` and `semantic-ui-react` as dependencies (since those are not packaged with this library).
  * Do not forget to wrap your DCFormField components inside the [Semantic UI React](https://react.semantic-ui.com/) 
  component `Form` (like in the example above).
  * Also do not forget to add `import 'semantic-ui-css/semantic.min.css'` in your `index.js`.
* The DCDate component uses [Moment.js](https://momentjs.com/docs/) and [ReactJS Datepicker](https://reactdatepicker.com/) 
so if you wish to use it you need `react-datepicker` and `moment` as dependencies in your project.
  * Again do not forget to add the css - `import 'react-datepicker/dist/react-datepicker.css'` in your `index.js`.
* The form components store their value in their own state, so they can be controlled inputs, but also updates the parents state
  so we can keep the data synchronized.
  * However you may not want to re-render the entire form when one input changes its value, so to avoid this you need some 
    functions in the component holding your form, and then pass the handling of value changing to the DCFormField component
    (discussed earlier), like this: 

```javascript
  shouldComponentUpdate (nextProps, nextState) {
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
In `App.js` you can find usage examples for all of these. Test them out to get a feel for what you want!

Name | Description | Additional properties | Accepted type(s) for value
-----|-------------|------------------------|---------------
DCText | A typical text input | - | *string*
DCBoolean | A typical checkbox | - | *boolean*
DCNumber | A typical number input | - | JavaScript *number*
DCRadio | A typical radio choice | *options* | *string*
DCDate | A typical date picker | - | *Moment.js object**
DCDropdown | A dropdown list populated with the options provided (can have search functionality) | *multiSelect*, *searchable*, *options* and *showLinks* | *string* if regular or *array* if multiSelect
DCMultiInput | A collection of dropdowns with one or multiple text inputs attached | *options*, *multiValue* and *showLinks* | An *array* of *objects* with two properties; text (*string* or *array*) and option (*string*)
DCStatic | A collection of one or more non-interactable values to be displayed either as tags, labels, dates or regular text (alternatively with an icon) | *format* and *icon* | An *array* of accepted JavaScript *date-strings* or *Moment.js objects**

**MomentJS* accepts Java Date, JavaScript Date objects and some some typical date formats (check MomentJS documentation)

### How to import this library directly from GitHub (useful in early development)
1. In your React application run `yarn add https://github.com/statisticsnorway/dc-react-form-fields-library.git`
    * Optionally add `#name-of-branch` at the end to use a specific branch
2. Import the component in your React application with `import { DCFormField } from 'dc-react-form-fields-library'`

##### Note:
* When imported from GitHub the library does not automatically stay up to date with the latest commits so you have to 
run `yarn upgrade dc-react-form-fields-library` to get the latest "build"

### Test it yourself
The first time you clone the repository, remember to run `yarn install`

Run `yarn start` and navigate to `http://localhost:3000/`

##### Alternatively try a more optimized production build:
1. Run `yarn build:example`
2. Optionally run `yarn global add serve` (if you do not have [serve](https://github.com/zeit/serve/))
3. Run `serve -s build`
4. Navigate to `http://localhost:5000/`
