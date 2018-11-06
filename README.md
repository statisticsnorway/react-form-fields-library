# dc-react-form-fields-library
DC React Form Fields Library is a React Component library consisting of different types of form components which can be 
imported and used in any React application. Its primary purpose is to supplement 
[dc-react-components-library](https://github.com/statisticsnorway/dc-react-components-library).

### How to use this library in another React application directly from GitHub (useful in early development)
1. In your React application run `yarn add https://github.com/statisticsnorway/dc-react-form-fields-library.git` 
    * Optionally add `#name-of-branch` at the end to use a specific branch instead of master
2. Import the component in your React application with `import { DCFormField } from 'dc-react-form-fields-library'`

##### Useful information
* Whenever changes are commited here you have to run `yarn upgrade dc-react-form-fields-library` in your React 
application

### How it works
The DCFormField component expects two properties; `tag` and `additionalProperties`, like this:
```javascript
const input = 'DCText'                          // The input type you want the form field to be
const props = {
  parent: 'myForm',                             // The name of the form
  name: 'myInput',                              
  displayName: 'My input',                      // Displayed as the label for the form field
  description: 'A description for my input',
  error: '',                                    // If there are errors
  warning: '',                                  // If there are warnings
  required: '',                                 // If the field is a required part of the form
  value: 'The default value'                    // The default value, different input types require different default values
}

return <DCFormField tag={input} additionalProps={props} />
```

Some form component types require more properties than the standard ones, they will be explaned below.

The form components store their value in sessionStorage at the moment so to fetch the value from the component do this:

```javascript
sessionStorage.getItem(parent[name])            // parent and name are they same values that you used in the props for the component
```

###Current input types supported:
* DCText

   A typical text input.
   
   **Additional props?** - *none*
