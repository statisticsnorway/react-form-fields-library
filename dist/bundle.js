'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var DatePicker = _interopDefault(require('react-datepicker'));
var React = require('react');
var React__default = _interopDefault(React);
var semanticUiReact = require('semantic-ui-react');

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

var InlineError = function InlineError(_ref) {
  var text = _ref.text;
  return React__default.createElement("span", {
    style: {
      color: '#db2828'
    }
  }, text);
};

var InlineWarning = function InlineWarning(_ref2) {
  var text = _ref2.text;
  return React__default.createElement("span", {
    style: {
      color: '#ffd700'
    }
  }, text);
};

var FullFormField = function FullFormField(displayName, description, error, warning, required, component) {
  return React__default.createElement(semanticUiReact.Form.Field, {
    error: !!error,
    required: required
  }, React__default.createElement(semanticUiReact.Popup, {
    hideOnScroll: true,
    position: "top left",
    header: displayName,
    wide: "very",
    trigger: React__default.createElement("label", null, displayName),
    content: description
  }), component, error && !warning && React__default.createElement(InlineError, {
    text: error
  }), warning && !error && React__default.createElement(InlineWarning, {
    text: warning
  }), error && warning && React__default.createElement("div", null, React__default.createElement(InlineError, {
    text: error
  }), React__default.createElement(semanticUiReact.Divider, {
    hidden: true,
    fitted: true
  }), React__default.createElement(InlineWarning, {
    text: warning
  })));
};
var SimpleFormField = function SimpleFormField(displayName, description, component) {
  return React__default.createElement(semanticUiReact.Form.Field, null, React__default.createElement(semanticUiReact.Popup, {
    hideOnScroll: true,
    position: "top center",
    header: displayName,
    wide: "very",
    trigger: component,
    content: description
  }));
};

var DCText =
/*#__PURE__*/
function (_Component) {
  _inherits(DCText, _Component);

  function DCText(props) {
    var _this;

    _classCallCheck(this, DCText);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DCText).call(this, props));

    _this.handleChange = function (event) {
      _this.setState({
        value: event.target.value
      }, function () {
        sessionStorage.setItem(_this.props.name, _this.state.value);
      });
    };

    _this.state = {
      value: _this.props.value
    };
    return _this;
  }

  _createClass(DCText, [{
    key: "render",
    value: function render() {
      var value = this.state.value;
      var _this$props = this.props,
          name = _this$props.name,
          displayName = _this$props.displayName,
          description = _this$props.description,
          error = _this$props.error,
          warning = _this$props.warning,
          required = _this$props.required;
      var component = React__default.createElement(semanticUiReact.TextArea, {
        autoHeight: true,
        rows: 1,
        name: name,
        placeholder: displayName,
        onChange: this.handleChange,
        value: value
      });
      return FullFormField(displayName, description, error, warning, required, component);
    }
  }]);

  return DCText;
}(React.Component);

var DCBoolean =
/*#__PURE__*/
function (_Component) {
  _inherits(DCBoolean, _Component);

  function DCBoolean(props) {
    var _this;

    _classCallCheck(this, DCBoolean);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DCBoolean).call(this, props));

    _this.handleChange = function () {
      _this.setState({
        value: !_this.state.value
      }, function () {
        sessionStorage.setItem(_this.props.name, _this.state.value);
      });
    };

    _this.state = {
      value: _this.props.value
    };
    return _this;
  }

  _createClass(DCBoolean, [{
    key: "render",
    value: function render() {
      var value = this.state.value;
      var _this$props = this.props,
          displayName = _this$props.displayName,
          description = _this$props.description;
      var component = React__default.createElement(semanticUiReact.Checkbox, {
        label: displayName,
        onChange: this.handleChange,
        checked: value
      });
      return SimpleFormField(displayName, description, component);
    }
  }]);

  return DCBoolean;
}(React.Component);

var DCNumber =
/*#__PURE__*/
function (_Component) {
  _inherits(DCNumber, _Component);

  function DCNumber(props) {
    var _this;

    _classCallCheck(this, DCNumber);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DCNumber).call(this, props));

    _this.handleChange = function (event) {
      if (!isNaN(event.target.value)) {
        _this.setState({
          value: event.target.value
        }, function () {
          sessionStorage.setItem(_this.props.name, _this.state.value);
        });
      }
    };

    _this.state = {
      value: _this.props.value
    };
    return _this;
  }

  _createClass(DCNumber, [{
    key: "render",
    value: function render() {
      var value = this.state.value;
      var _this$props = this.props,
          name = _this$props.name,
          displayName = _this$props.displayName,
          description = _this$props.description,
          error = _this$props.error,
          warning = _this$props.warning,
          required = _this$props.required;
      var component = React__default.createElement(semanticUiReact.Input, {
        name: name,
        placeholder: displayName,
        onChange: this.handleChange,
        value: value
      });
      return FullFormField(displayName, description, error, warning, required, component);
    }
  }]);

  return DCNumber;
}(React.Component);

var DCRadio =
/*#__PURE__*/
function (_Component) {
  _inherits(DCRadio, _Component);

  function DCRadio(props) {
    var _this;

    _classCallCheck(this, DCRadio);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DCRadio).call(this, props));

    _this.handleChange = function (event, _ref) {
      var value = _ref.value;

      _this.setState({
        value: value
      }, function () {
        sessionStorage.setItem(_this.props.name, _this.state.value);
      });
    };

    _this.state = {
      value: _this.props.value
    };
    return _this;
  }

  _createClass(DCRadio, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var value = this.state.value;
      var _this$props = this.props,
          displayName = _this$props.displayName,
          description = _this$props.description,
          error = _this$props.error,
          warning = _this$props.warning,
          required = _this$props.required,
          options = _this$props.options;
      var radios = Object.keys(options).map(function (key) {
        return React__default.createElement(semanticUiReact.Form.Radio, {
          key: key,
          label: options[key].text,
          value: options[key].value,
          checked: value === options[key].value,
          onChange: _this2.handleChange
        });
      });
      var component = React__default.createElement(semanticUiReact.Form.Group, {
        inline: true,
        children: radios
      });
      return FullFormField(displayName, description, error, warning, required, component);
    }
  }]);

  return DCRadio;
}(React.Component);

var DCDate =
/*#__PURE__*/
function (_Component) {
  _inherits(DCDate, _Component);

  function DCDate(props) {
    var _this;

    _classCallCheck(this, DCDate);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DCDate).call(this, props));

    _this.handleChange = function (value) {
      _this.setState({
        value: value
      }, function () {
        sessionStorage.setItem(_this.props.name, _this.state.value);
      });
    };

    _this.state = {
      value: _this.props.value
    };
    return _this;
  }

  _createClass(DCDate, [{
    key: "render",
    value: function render() {
      var value = this.state.value;
      var _this$props = this.props,
          displayName = _this$props.displayName,
          description = _this$props.description,
          error = _this$props.error,
          warning = _this$props.warning,
          required = _this$props.required;
      var datePicker = React__default.createElement(DatePicker, {
        selected: value === '' ? null : value,
        onChange: this.handleChange,
        locale: "nb",
        dateFormat: "DD/MM/YYYY",
        placeholderText: displayName,
        dropdownMode: "select",
        todayButton: "I dag",
        isClearable: true,
        showWeekNumbers: true
      });
      var component = React__default.createElement(semanticUiReact.Form.Group, {
        inline: true,
        children: datePicker
      });
      return FullFormField(displayName, description, error, warning, required, component);
    }
  }]);

  return DCDate;
}(React.Component);

function fetchData(url) {
  return new Promise(function (resolve, reject) {
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    }).then(function (response) {
      if (response.ok) {
        response.json().then(function (json) {
          var options = [];

          for (var key in json) {
            if (json.hasOwnProperty(key)) {
              options.push({
                key: json[key].id,
                text: json[key].name[0].languageText,
                // TODO: Fix this when the ability to do it becomes available
                value: json[key].id
              });
            }
          }

          resolve(options);
        });
      } else {
        response.text().then(function (text) {
          reject(text + ' (' + url + ')');
        });
      }
    }).catch(function (error) {
      reject(error.toString() + ' \'' + url + '\'');
    });
  });
}

var DCDropdown =
/*#__PURE__*/
function (_Component) {
  _inherits(DCDropdown, _Component);

  function DCDropdown(props) {
    var _this;

    _classCallCheck(this, DCDropdown);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DCDropdown).call(this, props));

    _this.handleChange = function (value) {
      _this.setState({
        value: value
      }, function () {
        sessionStorage.setItem(_this.props.name, _this.state.value);
      });
    };

    _this.state = {
      ready: false,
      problem: false,
      errorMessage: '',
      value: _this.props.value,
      options: []
    };
    return _this;
  }

  _createClass(DCDropdown, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      Promise.all(Object.keys(this.props.endpoints).map(function (key) {
        var url = _this2.props.endpoints[key];
        return fetchData(url);
      })).then(function (allOptions) {
        var options = [].concat.apply([], allOptions);

        _this2.setState({
          ready: true,
          options: options
        });
      }).catch(function (error) {
        _this2.setState({
          ready: true,
          problem: true,
          errorMessage: error
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$state = this.state,
          ready = _this$state.ready,
          problem = _this$state.problem,
          value = _this$state.value,
          options = _this$state.options,
          errorMessage = _this$state.errorMessage;
      var _this$props = this.props,
          displayName = _this$props.displayName,
          description = _this$props.description,
          error = _this$props.error,
          warning = _this$props.warning,
          required = _this$props.required,
          multiSelect = _this$props.multiSelect;
      if (!ready) return FullFormField(displayName, description, error, warning, required, React__default.createElement(semanticUiReact.Dropdown, {
        placeholder: displayName,
        selection: true,
        options: [],
        loading: true,
        disabled: true
      }));
      if (ready && problem) return FullFormField(displayName, description, errorMessage, warning, required, React__default.createElement(semanticUiReact.Dropdown, {
        selection: true,
        options: [],
        disabled: true
      }));
      if (ready && !problem) return FullFormField(displayName, description, error, warning, required, React__default.createElement(semanticUiReact.Dropdown, {
        placeholder: displayName,
        value: value,
        options: options,
        clearable: true,
        selection: true,
        multiple: multiSelect,
        onChange: function onChange(event, _ref) {
          var value = _ref.value;
          return _this3.handleChange(value);
        }
      }));
      return null;
    }
  }]);

  return DCDropdown;
}(React.Component);

var DCMultiInput =
/*#__PURE__*/
function (_Component) {
  _inherits(DCMultiInput, _Component);

  function DCMultiInput(props) {
    var _this;

    _classCallCheck(this, DCMultiInput);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DCMultiInput).call(this, props));

    _this.handleInputChange = function (event, index) {
      index = parseInt(index);
      var entry = {
        text: event.target.value,
        option: _this.state.value[index].option
      };

      var value = _toConsumableArray(_this.state.value);

      value[index] = entry;

      _this.setState({
        value: value
      }, function () {
        sessionStorage.setItem(_this.props.name, _this.state.value);
      });
    };

    _this.handleDropdownChange = function (option, index) {
      index = parseInt(index);
      var entry = {
        text: _this.state.value[index].text,
        option: option
      };

      var value = _toConsumableArray(_this.state.value);

      value[index] = entry;

      _this.setState({
        value: value
      }, function () {
        sessionStorage.setItem(_this.props.name, _this.state.value);
      });
    };

    _this.handleAddEntry = function () {
      var entries = _this.state.value;
      entries.push({
        text: '',
        option: ''
      });

      _this.setState({
        value: entries
      }, function () {
        sessionStorage.setItem(_this.props.name, _this.state.value);
      });
    };

    _this.state = {
      ready: false,
      problem: false,
      errorMessage: '',
      value: _this.props.value,
      options: []
    };
    return _this;
  }

  _createClass(DCMultiInput, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      fetchData(this.props.endpoint).then(function (options) {
        _this2.setState({
          ready: true,
          options: options
        });
      }).catch(function (error) {
        _this2.setState({
          ready: true,
          problem: true,
          errorMessage: error
        });
      });
    }
  }, {
    key: "handleRemoveEntry",
    value: function handleRemoveEntry(entry) {
      var _this3 = this;

      entry = parseInt(entry);
      var entries = this.state.value;
      entries.splice(entry, 1);
      this.setState({
        value: entries
      }, function () {
        sessionStorage.setItem(_this3.props.name, _this3.state.value);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$state = this.state,
          ready = _this$state.ready,
          problem = _this$state.problem,
          value = _this$state.value,
          options = _this$state.options,
          errorMessage = _this$state.errorMessage;
      var _this$props = this.props,
          name = _this$props.name,
          displayName = _this$props.displayName,
          description = _this$props.description,
          error = _this$props.error,
          warning = _this$props.warning,
          required = _this$props.required;

      if (!ready) {
        var action = React__default.createElement(semanticUiReact.Dropdown, {
          button: true,
          basic: true,
          options: [],
          loading: true
        });
        var component = React__default.createElement(semanticUiReact.Input, {
          placeholder: displayName,
          action: action,
          disabled: true
        });
        return FullFormField(displayName, description, error, warning, required, component);
      }

      if (ready && problem) {
        var _action = React__default.createElement(semanticUiReact.Dropdown, {
          button: true,
          basic: true,
          options: [],
          disabled: true
        });

        var _component = React__default.createElement(semanticUiReact.Input, {
          placeholder: displayName,
          action: _action,
          disabled: true
        });

        return FullFormField(displayName, description, errorMessage, warning, required, _component);
      }

      if (ready && !problem) {
        var components = React__default.createElement("div", null, Object.keys(value).map(function (key) {
          var action = React__default.createElement(semanticUiReact.Dropdown, {
            key: key,
            button: true,
            basic: true,
            options: options,
            value: value[key].option,
            onChange: function onChange(event, _ref) {
              var _ref$returned = _ref.returned,
                  returned = _ref$returned === void 0 ? key : _ref$returned,
                  value = _ref.value;
              return _this4.handleDropdownChange(value, returned);
            }
          });
          var button = React__default.createElement(semanticUiReact.Button, {
            basic: true,
            icon: {
              name: 'minus',
              color: 'red'
            },
            onClick: function onClick(_ref2) {
              var _ref2$returned = _ref2.returned,
                  returned = _ref2$returned === void 0 ? key : _ref2$returned;
              return _this4.handleRemoveEntry(returned);
            }
          });
          return React__default.createElement("div", {
            key: key
          }, React__default.createElement(semanticUiReact.Input, {
            key: key,
            name: name,
            placeholder: displayName,
            value: value[key].text,
            action: true,
            onChange: function onChange(event, _ref3) {
              var _ref3$returned = _ref3.returned,
                  returned = _ref3$returned === void 0 ? key : _ref3$returned;
              return _this4.handleInputChange(event, returned);
            }
          }, React__default.createElement("input", null), action, button), React__default.createElement(semanticUiReact.Divider, {
            hidden: true,
            fitted: true
          }));
        }), React__default.createElement(semanticUiReact.Divider, {
          hidden: true,
          fitted: true
        }), React__default.createElement(semanticUiReact.Button, {
          basic: true,
          icon: {
            name: 'plus',
            color: 'green'
          },
          size: "small",
          onClick: this.handleAddEntry
        }));
        return FullFormField(displayName, description, error, warning, required, components);
      }

      return null;
    }
  }]);

  return DCMultiInput;
}(React.Component);

var DCFormField =
/*#__PURE__*/
function (_Component) {
  _inherits(DCFormField, _Component);

  function DCFormField() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DCFormField);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DCFormField)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.formComponents = {
      DCText: DCText,
      DCBoolean: DCBoolean,
      DCNumber: DCNumber,
      DCRadio: DCRadio,
      DCDate: DCDate,
      DCDropdown: DCDropdown,
      DCMultiInput: DCMultiInput
    };
    return _this;
  }

  _createClass(DCFormField, [{
    key: "render",
    value: function render() {
      var FormComponent = this.formComponents[this.props.properties.component];
      return React__default.createElement(FormComponent, this.props.properties);
    }
  }]);

  return DCFormField;
}(React.Component);

exports.DCFormField = DCFormField;
