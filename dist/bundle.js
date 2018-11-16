'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var DatePicker = _interopDefault(require('react-datepicker'));
var moment = _interopDefault(require('moment'));
var React = require('react');
var React__default = _interopDefault(React);
var semanticUiReact = require('semantic-ui-react');

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

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

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
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

function fullFormField(displayName, description, error, warning, required, component) {
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
  }), component, warning && !error && React__default.createElement(InlineWarning, {
    text: warning
  }), error && !warning && React__default.createElement(InlineError, {
    text: error
  }), error && warning && React__default.createElement("div", null, React__default.createElement(InlineError, {
    text: error
  }), React__default.createElement(semanticUiReact.Divider, {
    hidden: true,
    fitted: true
  }), React__default.createElement(InlineWarning, {
    text: warning
  })));
}
function simpleFormField(displayName, description, component) {
  return React__default.createElement(semanticUiReact.Form.Field, null, React__default.createElement(semanticUiReact.Popup, {
    hideOnScroll: true,
    position: "top left",
    header: displayName,
    wide: "very",
    trigger: component,
    content: description
  }));
}
function simpleStaticFormField(displayName, description, component) {
  return React__default.createElement(semanticUiReact.Form.Field, null, React__default.createElement(semanticUiReact.Popup, {
    hideOnScroll: true,
    position: "top left",
    header: displayName,
    wide: "very",
    trigger: React__default.createElement("label", null, displayName),
    content: description
  }), component);
}

function checkValueAndType(value, type) {
  return value !== undefined && value !== '' && value !== null && _typeof(value) === type;
}

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
        return _this.props.valueChange(_this.props.name, _this.state.value);
      });
    };

    _this.state = {
      value: ''
    };
    return _this;
  }

  _createClass(DCText, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (checkValueAndType(this.props.value, 'string')) this.setState({
        value: this.props.value
      });
    }
  }, {
    key: "component",
    value: function component() {
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
        value: value,
        onChange: this.handleChange
      });
      return fullFormField(displayName, description, error, warning, required, component);
    }
  }, {
    key: "render",
    value: function render() {
      return this.component();
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
        return _this.props.valueChange(_this.props.name, _this.state.value);
      });
    };

    _this.state = {
      value: false
    };
    return _this;
  }

  _createClass(DCBoolean, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (checkValueAndType(this.props.value, 'boolean')) this.setState({
        value: this.props.value
      });
    }
  }, {
    key: "component",
    value: function component() {
      var value = this.state.value;
      var _this$props = this.props,
          displayName = _this$props.displayName,
          description = _this$props.description;
      var component = React__default.createElement(semanticUiReact.Checkbox, {
        label: displayName,
        onChange: this.handleChange,
        checked: value
      });
      return simpleFormField(displayName, description, component);
    }
  }, {
    key: "render",
    value: function render() {
      return this.component();
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
        var value = '';
        if (event.target.value !== '') value = parseFloat(event.target.value);

        _this.setState({
          value: value
        }, function () {
          return _this.props.valueChange(_this.props.name, _this.state.value);
        });
      }
    };

    _this.state = {
      value: ''
    };
    return _this;
  }

  _createClass(DCNumber, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (checkValueAndType(this.props.value, 'number')) this.setState({
        value: this.props.value
      });
    }
  }, {
    key: "component",
    value: function component() {
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
      return fullFormField(displayName, description, error, warning, required, component);
    }
  }, {
    key: "render",
    value: function render() {
      return this.component();
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
        return _this.props.valueChange(_this.props.name, _this.state.value);
      });
    };

    _this.state = {
      value: ''
    };
    return _this;
  }

  _createClass(DCRadio, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (checkValueAndType(this.props.value, 'string')) this.setState({
        value: this.props.value
      });
    }
  }, {
    key: "component",
    value: function component() {
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
        children: radios,
        style: {
          margin: 0
        }
      });
      return fullFormField(displayName, description, error, warning, required, component);
    }
  }, {
    key: "render",
    value: function render() {
      return this.component();
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
        return _this.props.valueChange(_this.props.name, _this.state.value);
      });
    };

    _this.state = {
      value: null
    };
    return _this;
  }

  _createClass(DCDate, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (checkValueAndType(this.props.value, 'object')) this.setState({
        value: this.props.value
      });
    }
  }, {
    key: "component",
    value: function component() {
      var value = this.state.value;
      var _this$props = this.props,
          displayName = _this$props.displayName,
          description = _this$props.description,
          error = _this$props.error,
          warning = _this$props.warning,
          required = _this$props.required;
      var datePicker = React__default.createElement(DatePicker, {
        selected: value,
        onChange: this.handleChange,
        isClearable: true,
        showWeekNumbers: true,
        dateFormat: "DD/MM/YYYY",
        placeholderText: displayName,
        dropdownMode: "select",
        todayButton: "I dag"
      });
      var component = React__default.createElement(semanticUiReact.Form.Group, {
        inline: true,
        children: datePicker,
        style: {
          margin: 0
        }
      });
      return fullFormField(displayName, description, error, warning, required, component);
    }
  }, {
    key: "render",
    value: function render() {
      return this.component();
    }
  }]);

  return DCDate;
}(React.Component);

function fetchData(url) {
  var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3000;
  return new Promise(function (resolve, reject) {
    var controller = new AbortController();
    var signal = controller.signal;
    var timer = setTimeout(function () {
      reject('Request timeout for url: ' + url);
      controller.abort();
    }, timeout);
    fetch(url, {
      signal: signal,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    }).then(function (response) {
      if (response.ok) {
        response.json().then(function (json) {
          var options = [];
          Object.keys(json).forEach(function (value, index) {
            options.push({
              key: json[value].id,
              text: json[value].name[index].languageText,
              // TODO: Fix this when the ability to do it becomes available
              value: json[value].id
            });
          });
          resolve(options);
        });
      } else {
        response.text().then(function (text) {
          reject(text + ' (' + url + ')');
        });
      }
    }).catch(function (error) {
      reject(error.toString() + ' \'' + url + '\'');
    }).finally(function () {
      return clearTimeout(timer);
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

    _this.handleChange = function (event, data) {
      _this.setState({
        value: data.value
      }, function () {
        return _this.props.valueChange(_this.props.name, _this.state.value);
      });
    };

    _this.state = {
      ready: false,
      problem: false,
      errorMessage: '',
      value: null,
      options: []
    };
    return _this;
  }

  _createClass(DCDropdown, [{
    key: "setOptionsAndValue",
    value: function setOptionsAndValue(options) {
      var _this2 = this;

      return new Promise(function (resolve) {
        _this2.setState({
          options: options
        }, function () {
          if (checkValueAndType(_this2.props.value, 'string') || Array.isArray(_this2.props.value)) {
            _this2.setState({
              value: _this2.props.value
            }, function () {
              return resolve();
            });
          } else {
            _this2.setState({
              value: _this2.props.multiSelect ? [] : ''
            }, function () {
              return resolve();
            });
          }
        });
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this3 = this;

      if (this.props.hasOwnProperty('options')) {
        this.setOptionsAndValue(this.props.options).then(function () {
          return _this3.setState({
            ready: true
          });
        });
      } else {
        Promise.all(Object.keys(this.props.endpoints).map(function (key) {
          return fetchData(_this3.props.endpoints[key]);
        })).then(function (allOptions) {
          var options = [].concat.apply([], allOptions);

          _this3.setOptionsAndValue(options).then(function () {
            return _this3.setState({
              ready: true
            });
          });
        }).catch(function (error) {
          _this3.setState({
            ready: true,
            problem: true,
            errorMessage: error
          });
        });
      }
    }
  }, {
    key: "component",
    value: function component() {
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
          multiSelect = _this$props.multiSelect,
          searchable = _this$props.searchable;
      if (!ready) return fullFormField(displayName, description, error, warning, required, React__default.createElement(semanticUiReact.Dropdown, {
        placeholder: displayName,
        selection: true,
        options: [],
        loading: true,
        disabled: true
      }));
      if (ready && problem) return fullFormField(displayName, description, errorMessage, warning, required, React__default.createElement(semanticUiReact.Dropdown, {
        selection: true,
        options: [],
        disabled: true
      }));
      if (ready && !problem) return fullFormField(displayName, description, error, warning, required, React__default.createElement(semanticUiReact.Dropdown, {
        placeholder: displayName,
        value: value,
        options: options,
        clearable: true,
        selection: true,
        multiple: multiSelect,
        icon: {
          name: searchable ? 'search' : 'dropdown',
          disabled: !!searchable,
          size: searchable ? 'small' : null
        },
        search: searchable,
        onChange: this.handleChange
      }));
      return null;
    }
  }, {
    key: "render",
    value: function render() {
      return this.component();
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

    _this.handleAddEntry = function () {
      _this.setState({
        value: _toConsumableArray(_this.state.value).concat([{
          text: '',
          option: ''
        }])
      }, function () {
        return _this.props.valueChange(_this.props.name, _this.state.value);
      });
    };

    _this.state = {
      ready: false,
      problem: false,
      errorMessage: '',
      value: [{
        text: '',
        option: ''
      }],
      options: []
    };
    return _this;
  }

  _createClass(DCMultiInput, [{
    key: "setOptionsAndValue",
    value: function setOptionsAndValue(options) {
      var _this2 = this;

      return new Promise(function (resolve) {
        _this2.setState({
          options: options
        }, function () {
          if (Array.isArray(_this2.props.value)) {
            _this2.setState({
              value: _this2.props.value
            }, function () {
              return resolve();
            });
          } else resolve();
        });
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this3 = this;

      if (this.props.hasOwnProperty('options')) {
        this.setOptionsAndValue(this.props.options).then(function () {
          return _this3.setState({
            ready: true
          });
        });
      } else {
        fetchData(this.props.endpoint).then(function (options) {
          _this3.setOptionsAndValue(options).then(function () {
            _this3.setState({
              ready: true
            });
          });
        }).catch(function (error) {
          _this3.setState({
            ready: true,
            problem: true,
            errorMessage: error
          });
        });
      }
    }
  }, {
    key: "handleInputChange",
    value: function handleInputChange(index, event) {
      var _this4 = this;

      var value = _toConsumableArray(this.state.value);

      value[parseInt(index)].text = event.target.value;
      this.setState({
        value: value
      }, function () {
        return _this4.props.valueChange(_this4.props.name, _this4.state.value);
      });
    }
  }, {
    key: "handleDropdownChange",
    value: function handleDropdownChange(index, event, data) {
      var _this5 = this;

      var value = _toConsumableArray(this.state.value);

      value[parseInt(index)].option = data.value;
      this.setState({
        value: value
      }, function () {
        return _this5.props.valueChange(_this5.props.name, _this5.state.value);
      });
    }
  }, {
    key: "handleRemoveEntry",
    value: function handleRemoveEntry(index) {
      var _this6 = this;

      var entries = _toConsumableArray(this.state.value);

      if (parseInt(index) !== -1) entries.splice(parseInt(index), 1);
      this.setState({
        value: entries
      }, function () {
        return _this6.props.valueChange(_this6.props.name, _this6.state.value);
      });
    }
  }, {
    key: "component",
    value: function component() {
      var _this7 = this;

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
          selection: true,
          options: [],
          loading: true
        });
        var component = React__default.createElement(semanticUiReact.Input, {
          placeholder: displayName,
          action: action,
          actionPosition: "left",
          disabled: true
        });
        return fullFormField(displayName, description, error, warning, required, component);
      }

      if (ready && problem) {
        var _action = React__default.createElement(semanticUiReact.Dropdown, {
          selection: true,
          options: [],
          disabled: true
        });

        var _component = React__default.createElement(semanticUiReact.Input, {
          placeholder: displayName,
          action: _action,
          actionPosition: "left",
          disabled: true
        });

        return fullFormField(displayName, description, errorMessage, warning, required, _component);
      }

      if (ready && !problem) {
        var components = React__default.createElement("div", null, value.map(function (entry, index) {
          var action = React__default.createElement(semanticUiReact.Dropdown, {
            options: options,
            value: entry.option,
            selection: true,
            clearable: true,
            placeholder: "Pick one",
            onChange: _this7.handleDropdownChange.bind(_this7, index)
          });
          var button = React__default.createElement(semanticUiReact.Button, {
            basic: true,
            icon: {
              name: 'minus',
              color: 'red'
            },
            onClick: _this7.handleRemoveEntry.bind(_this7, index)
          });
          return React__default.createElement("div", {
            key: index
          }, React__default.createElement(semanticUiReact.Input, {
            labelPosition: "right",
            name: name,
            placeholder: displayName,
            value: entry.text,
            onChange: _this7.handleInputChange.bind(_this7, index),
            action: true,
            actionPosition: "left"
          }, action, React__default.createElement("input", null), button), React__default.createElement(semanticUiReact.Divider, {
            hidden: true,
            fitted: true
          }));
        }), React__default.createElement(semanticUiReact.Divider, {
          hidden: true,
          fitted: true
        }), React__default.createElement(semanticUiReact.Icon, {
          link: true,
          name: "plus",
          color: "green",
          size: "large",
          onClick: this.handleAddEntry
        }));
        return fullFormField(displayName, description, error, warning, required, components);
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      return this.component();
    }
  }]);

  return DCMultiInput;
}(React.Component);

var formats = ['date', 'label', 'tag'];

var DCStatic =
/*#__PURE__*/
function (_Component) {
  _inherits(DCStatic, _Component);

  function DCStatic(props) {
    var _this;

    _classCallCheck(this, DCStatic);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DCStatic).call(this, props));
    _this.state = {
      ready: false,
      component: null
    };
    return _this;
  }

  _createClass(DCStatic, [{
    key: "createComponent",
    value: function createComponent() {
      var _this$props = this.props,
          format = _this$props.format,
          value = _this$props.value;

      if (!formats.includes(format)) {
        return React__default.createElement(semanticUiReact.List, {
          style: {
            marginTop: 0
          },
          items: value
        });
      } else {
        var entries = [];

        for (var entry in value) {
          if (value.hasOwnProperty(entry)) {
            if (format === 'date') {
              var convertedEntry = void 0;

              try {
                convertedEntry = moment(value[entry]).format('LLL');
              } catch (error) {
                convertedEntry = error;
              }

              entries.push(convertedEntry);
            } else {
              entries.push(React__default.createElement(semanticUiReact.Label, {
                key: entry,
                color: "teal"
              }, value[entry]));
            }
          }
        }

        if (format === 'date') {
          return React__default.createElement(semanticUiReact.List, {
            style: {
              marginTop: 0
            },
            items: entries
          });
        } else {
          return React__default.createElement(semanticUiReact.Label.Group, {
            tag: format === 'tag',
            color: "teal",
            content: entries
          });
        }
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.setState({
        component: this.createComponent()
      }, function () {
        return _this2.setState({
          ready: true
        });
      });
    }
  }, {
    key: "component",
    value: function component() {
      var _this$state = this.state,
          ready = _this$state.ready,
          component = _this$state.component;
      var _this$props2 = this.props,
          displayName = _this$props2.displayName,
          description = _this$props2.description;
      if (ready) return simpleStaticFormField(displayName, description, component);
      return null;
    }
  }, {
    key: "render",
    value: function render() {
      return this.component();
    }
  }]);

  return DCStatic;
}(React.Component);

var DCMultiValueMultiInput =
/*#__PURE__*/
function (_Component) {
  _inherits(DCMultiValueMultiInput, _Component);

  function DCMultiValueMultiInput(props) {
    var _this;

    _classCallCheck(this, DCMultiValueMultiInput);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DCMultiValueMultiInput).call(this, props));

    _this.handleAddEntry = function () {
      _this.setState({
        value: _toConsumableArray(_this.state.value).concat([{
          text: [''],
          option: ''
        }])
      }, function () {
        return _this.props.valueChange(_this.props.name, _this.state.value);
      });
    };

    _this.state = {
      ready: false,
      problem: false,
      errorMessage: '',
      value: [{
        text: [''],
        option: ''
      }],
      options: []
    };
    return _this;
  }

  _createClass(DCMultiValueMultiInput, [{
    key: "setOptionsAndValue",
    value: function setOptionsAndValue(options) {
      var _this2 = this;

      return new Promise(function (resolve) {
        _this2.setState({
          options: options
        }, function () {
          if (Array.isArray(_this2.props.value)) {
            _this2.setState({
              value: _this2.props.value
            }, function () {
              return resolve();
            });
          } else resolve();
        });
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this3 = this;

      if (this.props.hasOwnProperty('options')) {
        this.setOptionsAndValue(this.props.options).then(function () {
          return _this3.setState({
            ready: true
          });
        });
      } else {
        fetchData(this.props.endpoint).then(function (options) {
          _this3.setOptionsAndValue(options).then(function () {
            _this3.setState({
              ready: true
            });
          });
        }).catch(function (error) {
          _this3.setState({
            ready: true,
            problem: true,
            errorMessage: error
          });
        });
      }
    }
  }, {
    key: "handleInputChange",
    value: function handleInputChange(index, innerIndex, event) {
      var _this4 = this;

      var value = _toConsumableArray(this.state.value);

      value[parseInt(index)].text[parseInt(innerIndex)] = event.target.value;
      this.setState({
        value: value
      }, function () {
        return _this4.props.valueChange(_this4.props.name, _this4.state.value);
      });
    }
  }, {
    key: "handleDropdownChange",
    value: function handleDropdownChange(index, event, data) {
      var _this5 = this;

      var value = _toConsumableArray(this.state.value);

      value[parseInt(index)].option = data.value;
      this.setState({
        value: value
      }, function () {
        return _this5.props.valueChange(_this5.props.name, _this5.state.value);
      });
    }
  }, {
    key: "handleRemoveEntry",
    value: function handleRemoveEntry(index) {
      var _this6 = this;

      var entries = _toConsumableArray(this.state.value);

      if (parseInt(index) !== -1) entries.splice(parseInt(index), 1);
      this.setState({
        value: entries
      }, function () {
        return _this6.props.valueChange(_this6.props.name, _this6.state.value);
      });
    }
  }, {
    key: "handleAddValueToEntry",
    value: function handleAddValueToEntry(index) {
      var _this7 = this;

      var entries = _toConsumableArray(this.state.value);

      entries[parseInt(index)].text = _toConsumableArray(this.state.value[parseInt(index)].text).concat(['']);
      this.setState({
        value: entries
      }, function () {
        return _this7.props.valueChange(_this7.props.name, _this7.state.value);
      });
    }
  }, {
    key: "handleRemoveValueFromEntry",
    value: function handleRemoveValueFromEntry(index, innerIndex) {
      var _this8 = this;

      var entries = _toConsumableArray(this.state.value);

      if (parseInt(index) !== -1 && parseInt(innerIndex) !== -1) {
        entries[parseInt(index)].text.splice(parseInt(innerIndex), 1);
      }

      this.setState({
        value: entries
      }, function () {
        return _this8.props.valueChange(_this8.props.name, _this8.state.value);
      });
    }
  }, {
    key: "component",
    value: function component() {
      var _this9 = this;

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
        var component = React__default.createElement(semanticUiReact.Grid, {
          columns: "equal"
        }, React__default.createElement(semanticUiReact.Grid.Column, null, React__default.createElement(semanticUiReact.Dropdown, {
          selection: true,
          options: [],
          loading: true,
          fluid: true
        })), React__default.createElement(semanticUiReact.Grid.Column, null, React__default.createElement(semanticUiReact.Input, {
          placeholder: displayName,
          disabled: true
        })));
        return fullFormField(displayName, description, error, warning, required, component);
      }

      if (ready && problem) {
        var _component = React__default.createElement(semanticUiReact.Grid, {
          columns: "equal"
        }, React__default.createElement(semanticUiReact.Grid.Column, null, React__default.createElement(semanticUiReact.Dropdown, {
          selection: true,
          options: [],
          disabled: true,
          fluid: true
        })), React__default.createElement(semanticUiReact.Grid.Column, null, React__default.createElement(semanticUiReact.Input, {
          placeholder: displayName,
          disabled: true
        })));

        return fullFormField(displayName, description, errorMessage, warning, required, _component);
      }

      if (ready && !problem) {
        var components = React__default.createElement(semanticUiReact.Grid, {
          columns: "equal",
          divided: "vertically"
        }, value.map(function (entry, index) {
          var dropdown = React__default.createElement(semanticUiReact.Dropdown, {
            options: options,
            value: entry.option,
            selection: true,
            clearable: true,
            placeholder: "Pick one",
            fluid: true,
            onChange: _this9.handleDropdownChange.bind(_this9, index)
          });
          return React__default.createElement(semanticUiReact.Grid.Row, {
            key: index
          }, React__default.createElement(semanticUiReact.Grid.Column, null, dropdown, React__default.createElement(semanticUiReact.Divider, {
            hidden: true
          }), React__default.createElement(semanticUiReact.Icon, {
            link: true,
            name: "trash",
            color: "red",
            size: "large",
            onClick: _this9.handleRemoveEntry.bind(_this9, index)
          })), React__default.createElement(semanticUiReact.Grid.Column, null, entry.text.map(function (innerValue, innerIndex) {
            var label = React__default.createElement(semanticUiReact.Button, {
              basic: true,
              icon: {
                name: 'minus',
                color: 'red'
              },
              onClick: _this9.handleRemoveValueFromEntry.bind(_this9, index, innerIndex)
            });
            return React__default.createElement(semanticUiReact.Input, {
              key: innerIndex,
              labelPosition: "right",
              label: label,
              name: name + innerIndex,
              placeholder: displayName,
              value: innerValue,
              onChange: _this9.handleInputChange.bind(_this9, index, innerIndex)
            });
          }), React__default.createElement(semanticUiReact.Icon, {
            link: true,
            name: "plus",
            color: "green",
            onClick: _this9.handleAddValueToEntry.bind(_this9, index)
          })));
        }), React__default.createElement(semanticUiReact.Grid.Row, null, React__default.createElement(semanticUiReact.Grid.Column, null, React__default.createElement(semanticUiReact.Container, {
          textAlign: "right"
        }, React__default.createElement(semanticUiReact.Icon, {
          link: true,
          name: "plus",
          color: "green",
          size: "large",
          onClick: this.handleAddEntry
        })))));
        return fullFormField(displayName, description, error, warning, required, components);
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      return this.component();
    }
  }]);

  return DCMultiValueMultiInput;
}(React.Component);

var formComponents = {
  DCText: DCText,
  DCBoolean: DCBoolean,
  DCNumber: DCNumber,
  DCRadio: DCRadio,
  DCDate: DCDate,
  DCDropdown: DCDropdown,
  DCMultiInput: DCMultiInput,
  DCStatic: DCStatic,
  DCMultiValueMultiInput: DCMultiValueMultiInput
};

var DCFormField =
/*#__PURE__*/
function (_Component) {
  _inherits(DCFormField, _Component);

  function DCFormField() {
    _classCallCheck(this, DCFormField);

    return _possibleConstructorReturn(this, _getPrototypeOf(DCFormField).apply(this, arguments));
  }

  _createClass(DCFormField, [{
    key: "render",
    value: function render() {
      var FormComponent = formComponents[this.props.properties.component];
      return React__default.createElement(FormComponent, _extends({}, this.props.properties, {
        valueChange: this.props.valueChange
      }));
    }
  }]);

  return DCFormField;
}(React.Component);

exports.DCFormField = DCFormField;
