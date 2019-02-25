'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var semanticUiReact = require('semantic-ui-react');
var DatePicker = _interopDefault(require('react-datepicker'));
var moment = _interopDefault(require('moment'));

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

var UI = {
  LINK: 'Link',
  NO_OPTIONS: {
    en: 'No options',
    nb: 'Ingen valg'
  },
  OPTIONS: {
    en: 'Pick one',
    nb: 'Velg'
  },
  TODAY: {
    en: 'Today',
    nb: 'I dag'
  }
};
var MESSAGE = {
  NO_NAME: {
    en: 'Cannot render properly without the name property',
    nb: 'Kan ikke lage komponenten ordentlig uten name atributtet'
  }
};

function checkValueAndType(value, type) {
  return value !== undefined && value !== '' && value !== null && _typeof(value) === type;
}
function cutoffString(string) {
  if (typeof string === 'string' && string.length > 32) {
    return string.substring(0, 30) + '...';
  } else {
    return string;
  }
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

var structureDescription = function structureDescription(description) {
  if (Array.isArray(description)) {
    return React__default.createElement("div", null, description.map(function (value, index) {
      return React__default.createElement("p", {
        key: index
      }, value);
    }));
  } else {
    return description;
  }
};

var formatLinks = function formatLinks(route, value) {
  if (value !== '' && value !== undefined && value !== null) {
    if (route === undefined || typeof route !== 'string') {
      route = '';
    }

    if (Array.isArray(value)) {
      return React__default.createElement("div", null, value.map(function (thing, index) {
        return React__default.createElement("a", {
          key: index,
          href: route + thing
        }, UI.LINK, " #", index + 1, React__default.createElement("br", null));
      }));
    } else {
      return React__default.createElement("div", null, React__default.createElement("a", {
        href: route + value
      }, UI.LINK));
    }
  } else {
    return null;
  }
};
function fullFormField(displayName, description, error, warning, required, component, showLinks, value, route) {
  return React__default.createElement(semanticUiReact.Form.Field, {
    error: !!error,
    required: required
  }, React__default.createElement(semanticUiReact.Popup, {
    hideOnScroll: true,
    position: "top left",
    header: displayName,
    wide: "very",
    trigger: React__default.createElement("label", null, displayName),
    content: structureDescription(description)
  }), component, showLinks && formatLinks(route, value), warning && !error && React__default.createElement(InlineWarning, {
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
    content: structureDescription(description)
  }));
}
function simpleStaticFormField(displayName, description, component) {
  var icon = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  return React__default.createElement(semanticUiReact.Form.Field, null, React__default.createElement(semanticUiReact.Popup, {
    hideOnScroll: true,
    position: "top left",
    header: displayName,
    wide: "very",
    content: structureDescription(description),
    trigger: React__default.createElement("label", null, displayName, " ", icon)
  }), component);
}

var UIText =
/*#__PURE__*/
function (_Component) {
  _inherits(UIText, _Component);

  function UIText(props) {
    var _this;

    _classCallCheck(this, UIText);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(UIText).call(this, props));

    _this.handleChange = function (event) {
      var _this$props = _this.props,
          valueChange = _this$props.valueChange,
          name = _this$props.name;

      _this.setState({
        value: event.target.value
      }, function () {
        return valueChange(name, _this.state.value);
      });
    };

    _this.state = {
      value: ''
    };
    return _this;
  }

  _createClass(UIText, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var value = this.props.value;
      if (checkValueAndType(value, 'string')) this.setState({
        value: value
      });
    }
  }, {
    key: "render",
    value: function render() {
      var value = this.state.value;
      var _this$props2 = this.props,
          name = _this$props2.name,
          displayName = _this$props2.displayName,
          description = _this$props2.description,
          error = _this$props2.error,
          warning = _this$props2.warning,
          required = _this$props2.required;
      var component = React__default.createElement(semanticUiReact.TextArea, {
        autoHeight: true,
        rows: 1,
        name: name,
        placeholder: cutoffString(displayName),
        value: value,
        onChange: this.handleChange
      });
      return fullFormField(displayName, description, error, warning, required, component);
    }
  }]);

  return UIText;
}(React.Component);

var UIBoolean =
/*#__PURE__*/
function (_Component) {
  _inherits(UIBoolean, _Component);

  function UIBoolean(props) {
    var _this;

    _classCallCheck(this, UIBoolean);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(UIBoolean).call(this, props));

    _this.handleChange = function () {
      var _this$props = _this.props,
          valueChange = _this$props.valueChange,
          name = _this$props.name;

      _this.setState({
        value: !_this.state.value
      }, function () {
        return valueChange(name, _this.state.value);
      });
    };

    _this.state = {
      value: false
    };
    return _this;
  }

  _createClass(UIBoolean, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var value = this.props.value;
      if (checkValueAndType(value, 'boolean')) this.setState({
        value: value
      });
    }
  }, {
    key: "render",
    value: function render() {
      var value = this.state.value;
      var _this$props2 = this.props,
          displayName = _this$props2.displayName,
          description = _this$props2.description;
      var component = React__default.createElement(semanticUiReact.Checkbox, {
        label: displayName,
        onChange: this.handleChange,
        checked: value
      });
      return simpleFormField(displayName, description, component);
    }
  }]);

  return UIBoolean;
}(React.Component);

var UINumber =
/*#__PURE__*/
function (_Component) {
  _inherits(UINumber, _Component);

  function UINumber(props) {
    var _this;

    _classCallCheck(this, UINumber);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(UINumber).call(this, props));

    _this.handleChange = function (event) {
      if (!isNaN(event.target.value)) {
        var _this$props = _this.props,
            valueChange = _this$props.valueChange,
            name = _this$props.name;
        var value = '';
        if (event.target.value !== '') value = parseFloat(event.target.value);

        _this.setState({
          value: value
        }, function () {
          return valueChange(name, _this.state.value);
        });
      }
    };

    _this.state = {
      value: ''
    };
    return _this;
  }

  _createClass(UINumber, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var value = this.props.value;
      if (checkValueAndType(value, 'number')) this.setState({
        value: value
      });
    }
  }, {
    key: "render",
    value: function render() {
      var value = this.state.value;
      var _this$props2 = this.props,
          name = _this$props2.name,
          displayName = _this$props2.displayName,
          description = _this$props2.description,
          error = _this$props2.error,
          warning = _this$props2.warning,
          required = _this$props2.required;
      var component = React__default.createElement(semanticUiReact.Input, {
        icon: {
          name: 'hashtag',
          color: 'teal'
        },
        iconPosition: "left",
        name: name,
        value: value,
        placeholder: cutoffString(displayName),
        onChange: this.handleChange
      });
      return fullFormField(displayName, description, error, warning, required, component);
    }
  }]);

  return UINumber;
}(React.Component);

var UIRadio =
/*#__PURE__*/
function (_Component) {
  _inherits(UIRadio, _Component);

  function UIRadio(props) {
    var _this;

    _classCallCheck(this, UIRadio);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(UIRadio).call(this, props));

    _this.handleChange = function (event, _ref) {
      var value = _ref.value;
      var _this$props = _this.props,
          valueChange = _this$props.valueChange,
          name = _this$props.name;

      _this.setState({
        value: value
      }, function () {
        return valueChange(name, _this.state.value);
      });
    };

    _this.state = {
      value: ''
    };
    return _this;
  }

  _createClass(UIRadio, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var value = this.props.value;
      if (checkValueAndType(value, 'string')) this.setState({
        value: value
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var value = this.state.value;
      var _this$props2 = this.props,
          displayName = _this$props2.displayName,
          description = _this$props2.description,
          error = _this$props2.error,
          warning = _this$props2.warning,
          required = _this$props2.required,
          options = _this$props2.options;

      if (Array.isArray(options)) {
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

      return null;
    }
  }]);

  return UIRadio;
}(React.Component);

var UIDate =
/*#__PURE__*/
function (_Component) {
  _inherits(UIDate, _Component);

  function UIDate(props) {
    var _this;

    _classCallCheck(this, UIDate);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(UIDate).call(this, props));

    _this.handleChange = function (index, date) {
      var _this$props = _this.props,
          valueChange = _this$props.valueChange,
          name = _this$props.name,
          multiple = _this$props.multiple;

      if (multiple) {
        var value = _toConsumableArray(_this.state.value);

        value[parseInt(index)] = date;

        _this.setState({
          value: value
        }, function () {
          return valueChange(name, _this.state.value);
        });
      } else {
        _this.setState({
          value: date
        }, function () {
          return valueChange(name, _this.state.value);
        });
      }
    };

    _this.handleAddEntry = function () {
      _this.setState({
        value: [].concat(_toConsumableArray(_this.state.value), [null])
      }, function () {
        return _this.props.valueChange(_this.props.name, _this.state.value);
      });
    };

    _this.state = {
      value: _this.props.multiple ? [null] : null
    };
    return _this;
  }

  _createClass(UIDate, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var value = this.props.value;
      if (checkValueAndType(value, 'object')) this.setState({
        value: value
      });
    }
  }, {
    key: "handleRemoveEntry",
    value: function handleRemoveEntry(index) {
      var _this2 = this;

      var _this$props2 = this.props,
          valueChange = _this$props2.valueChange,
          name = _this$props2.name;

      var entries = _toConsumableArray(this.state.value);

      entries.splice(parseInt(index), 1);
      this.setState({
        value: entries
      }, function () {
        return valueChange(name, _this2.state.value);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var value = this.state.value;
      var _this$props3 = this.props,
          displayName = _this$props3.displayName,
          description = _this$props3.description,
          error = _this$props3.error,
          warning = _this$props3.warning,
          required = _this$props3.required,
          multiple = _this$props3.multiple,
          languageCode = _this$props3.languageCode;
      var icon = React__default.createElement(semanticUiReact.Icon, {
        name: "calendar alternate outline",
        size: "big",
        style: {
          paddingTop: '0.5rem'
        },
        color: "teal"
      });
      var component;

      if (multiple) {
        component = React__default.createElement(semanticUiReact.Grid, null, value.map(function (entry, index) {
          var datePicker = React__default.createElement(DatePicker, {
            selected: value[index],
            onChange: _this3.handleChange.bind(_this3, index),
            dateFormat: "DD/MM/YYYY",
            placeholderText: cutoffString(displayName),
            showWeekNumbers: true,
            dropdownMode: "select",
            todayButton: UI.TODAY[languageCode]
          });
          return React__default.createElement(semanticUiReact.Grid.Row, {
            key: index
          }, React__default.createElement(semanticUiReact.Grid.Column, {
            width: 1,
            style: {
              margin: 0,
              paddingRight: 0,
              paddingTop: '0.35rem'
            }
          }, React__default.createElement(semanticUiReact.Container, {
            textAlign: "center"
          }, React__default.createElement(semanticUiReact.Header, {
            as: "h4",
            color: "teal",
            content: index + 1 + '.',
            style: {
              marginBottom: 0
            }
          }), React__default.createElement(semanticUiReact.Icon, {
            link: true,
            name: "close",
            color: "red",
            onClick: _this3.handleRemoveEntry.bind(_this3, index)
          }))), React__default.createElement(semanticUiReact.Grid.Column, {
            width: 15,
            style: {
              margin: 0,
              paddingLeft: 0
            }
          }, React__default.createElement(semanticUiReact.Form.Group, {
            inline: true,
            style: {
              margin: 0
            },
            children: React__default.createElement("div", null, datePicker, icon)
          })));
        }), React__default.createElement(semanticUiReact.Grid.Row, {
          style: {
            paddingTop: 0
          }
        }, React__default.createElement(semanticUiReact.Grid.Column, {
          width: 16,
          style: {
            margin: 0
          }
        }, React__default.createElement(semanticUiReact.Container, {
          textAlign: "right"
        }, React__default.createElement(semanticUiReact.Icon, {
          link: true,
          name: "plus",
          color: "green",
          size: "large",
          onClick: this.handleAddEntry
        })))));
      } else {
        var datePicker = React__default.createElement(DatePicker, {
          selected: value,
          onChange: this.handleChange.bind(this, null),
          isClearable: true,
          dateFormat: "DD/MM/YYYY",
          placeholderText: cutoffString(displayName),
          showWeekNumbers: true,
          dropdownMode: "select",
          todayButton: UI.TODAY[languageCode]
        });
        component = React__default.createElement(semanticUiReact.Form.Group, {
          inline: true,
          style: {
            margin: 0
          },
          children: React__default.createElement("div", null, datePicker, icon)
        });
      }

      return fullFormField(displayName, description, error, warning, required, component);
    }
  }]);

  return UIDate;
}(React.Component);

var UIDropdown =
/*#__PURE__*/
function (_Component) {
  _inherits(UIDropdown, _Component);

  function UIDropdown(props) {
    var _this;

    _classCallCheck(this, UIDropdown);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(UIDropdown).call(this, props));

    _this.handleChange = function (event, data) {
      var _this$props = _this.props,
          valueChange = _this$props.valueChange,
          name = _this$props.name;

      _this.setState({
        value: data.value
      }, function () {
        return valueChange(name, _this.state.value);
      });
    };

    _this.state = {
      ready: false,
      value: null,
      options: []
    };
    return _this;
  }

  _createClass(UIDropdown, [{
    key: "setOptionsAndValue",
    value: function setOptionsAndValue(options) {
      var _this2 = this;

      return new Promise(function (resolve) {
        var _this2$props = _this2.props,
            value = _this2$props.value,
            multiSelect = _this2$props.multiSelect;

        _this2.setState({
          options: options
        }, function () {
          if (checkValueAndType(value, 'string') || Array.isArray(value) && value.length !== 0) {
            _this2.setState({
              value: value
            }, function () {
              return resolve();
            });
          } else {
            _this2.setState({
              value: multiSelect ? [] : ''
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
        this.setOptionsAndValue([]).then(function () {
          return _this3.setState({
            ready: true
          });
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          ready = _this$state.ready,
          value = _this$state.value,
          options = _this$state.options;
      var _this$props2 = this.props,
          displayName = _this$props2.displayName,
          description = _this$props2.description,
          error = _this$props2.error,
          warning = _this$props2.warning,
          required = _this$props2.required,
          multiSelect = _this$props2.multiSelect,
          searchable = _this$props2.searchable,
          languageCode = _this$props2.languageCode,
          showLinks = _this$props2.showLinks,
          route = _this$props2.route;

      if (!ready) {
        var component = React__default.createElement(semanticUiReact.Dropdown, {
          placeholder: cutoffString(displayName),
          selection: true,
          options: [],
          loading: true,
          disabled: true
        });
        return fullFormField(displayName, description, error, warning, required, component);
      } else {
        var _component = React__default.createElement(semanticUiReact.Dropdown, {
          placeholder: options.length === 0 ? UI.NO_OPTIONS[languageCode] : cutoffString(displayName),
          value: value,
          options: options,
          clearable: true,
          selection: true,
          multiple: multiSelect,
          disabled: options.length === 0,
          onChange: this.handleChange,
          search: searchable,
          icon: {
            name: searchable ? 'search' : 'dropdown',
            disabled: !!searchable,
            size: searchable ? 'small' : null
          }
        });

        return fullFormField(displayName, description, error, warning, required, _component, showLinks, value, route);
      }
    }
  }]);

  return UIDropdown;
}(React.Component);

var UIMultiInput =
/*#__PURE__*/
function (_Component) {
  _inherits(UIMultiInput, _Component);

  function UIMultiInput(props) {
    var _this;

    _classCallCheck(this, UIMultiInput);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(UIMultiInput).call(this, props));

    _this.handleAddEntry = function () {
      var _this$props = _this.props,
          valueChange = _this$props.valueChange,
          name = _this$props.name,
          multiValue = _this$props.multiValue;

      _this.setState({
        value: [].concat(_toConsumableArray(_this.state.value), [{
          text: multiValue ? [''] : '',
          option: ''
        }])
      }, function () {
        return valueChange(name, _this.state.value);
      });
    };

    _this.state = {
      ready: false,
      problem: false,
      errorMessage: '',
      value: [{
        text: _this.props.multiValue ? [''] : '',
        option: ''
      }],
      options: []
    };
    return _this;
  }

  _createClass(UIMultiInput, [{
    key: "setOptionsAndValue",
    value: function setOptionsAndValue(options) {
      var _this2 = this;

      return new Promise(function (resolve) {
        var value = _this2.props.value;

        _this2.setState({
          options: options
        }, function () {
          if (Array.isArray(value) && value.length !== 0) {
            _this2.setState({
              value: value
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

      var _this$props2 = this.props,
          name = _this$props2.name,
          languageCode = _this$props2.languageCode;

      if (this.props.hasOwnProperty('name') && typeof name === 'string') {
        if (this.props.hasOwnProperty('options')) {
          this.setOptionsAndValue(this.props.options).then(function () {
            return _this3.setState({
              ready: true
            });
          });
        } else {
          this.setOptionsAndValue([]).then(function () {
            return _this3.setState({
              ready: true
            });
          });
        }
      } else {
        this.setState({
          problem: true,
          errorMessage: MESSAGE.NO_NAME[languageCode],
          ready: true
        });
      }
    }
  }, {
    key: "handleInputChange",
    value: function handleInputChange(index, innerIndex, event) {
      var _this4 = this;

      var _this$props3 = this.props,
          valueChange = _this$props3.valueChange,
          name = _this$props3.name,
          multiValue = _this$props3.multiValue;

      var value = _toConsumableArray(this.state.value);

      if (!multiValue) {
        value[parseInt(index)].text = event.target.value;
      } else {
        value[parseInt(index)].text[parseInt(innerIndex)] = event.target.value;
      }

      this.setState({
        value: value
      }, function () {
        return valueChange(name, _this4.state.value);
      });
    }
  }, {
    key: "handleDropdownChange",
    value: function handleDropdownChange(index, event, data) {
      var _this5 = this;

      var _this$props4 = this.props,
          valueChange = _this$props4.valueChange,
          name = _this$props4.name;

      var value = _toConsumableArray(this.state.value);

      value[parseInt(index)].option = data.value;
      this.setState({
        value: value
      }, function () {
        return valueChange(name, _this5.state.value);
      });
    }
  }, {
    key: "handleRemoveEntry",
    value: function handleRemoveEntry(index) {
      var _this6 = this;

      var _this$props5 = this.props,
          valueChange = _this$props5.valueChange,
          name = _this$props5.name;

      var entries = _toConsumableArray(this.state.value);

      entries.splice(parseInt(index), 1);
      this.setState({
        value: entries
      }, function () {
        return valueChange(name, _this6.state.value);
      });
    }
  }, {
    key: "handleAddValueToEntry",
    value: function handleAddValueToEntry(index) {
      var _this7 = this;

      var _this$props6 = this.props,
          valueChange = _this$props6.valueChange,
          name = _this$props6.name;

      var entries = _toConsumableArray(this.state.value);

      entries[parseInt(index)].text = [].concat(_toConsumableArray(this.state.value[parseInt(index)].text), ['']);
      this.setState({
        value: entries
      }, function () {
        return valueChange(name, _this7.state.value);
      });
    }
  }, {
    key: "handleRemoveValueFromEntry",
    value: function handleRemoveValueFromEntry(index, innerIndex) {
      var _this8 = this;

      var _this$props7 = this.props,
          valueChange = _this$props7.valueChange,
          name = _this$props7.name;

      var entries = _toConsumableArray(this.state.value);

      entries[parseInt(index)].text.splice(parseInt(innerIndex), 1);
      this.setState({
        value: entries
      }, function () {
        return valueChange(name, _this8.state.value);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this9 = this;

      var _this$state = this.state,
          ready = _this$state.ready,
          problem = _this$state.problem,
          value = _this$state.value,
          options = _this$state.options,
          errorMessage = _this$state.errorMessage;
      var _this$props8 = this.props,
          name = _this$props8.name,
          displayName = _this$props8.displayName,
          description = _this$props8.description,
          error = _this$props8.error,
          warning = _this$props8.warning,
          required = _this$props8.required,
          multiValue = _this$props8.multiValue,
          languageCode = _this$props8.languageCode,
          showLinks = _this$props8.showLinks,
          route = _this$props8.route;

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
      } else if (ready && problem) {
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

        return fullFormField(displayName, description, error, errorMessage, required, _component);
      } else {
        var components = React__default.createElement(semanticUiReact.Grid, null, value.map(function (entry, index) {
          var dropdown = React__default.createElement(semanticUiReact.Dropdown, {
            options: options,
            value: entry.option,
            selection: true,
            disabled: options.length === 0,
            placeholder: options.length === 0 ? UI.NO_OPTIONS[languageCode] : UI.OPTIONS[languageCode],
            clearable: true,
            fluid: !!multiValue,
            onChange: _this9.handleDropdownChange.bind(_this9, index)
          });
          return React__default.createElement(semanticUiReact.Grid.Row, {
            key: index
          }, React__default.createElement(semanticUiReact.Grid.Column, {
            width: 1,
            style: {
              margin: 0,
              paddingRight: 0,
              paddingTop: '0.2rem'
            }
          }, React__default.createElement(semanticUiReact.Container, {
            textAlign: "center"
          }, React__default.createElement(semanticUiReact.Header, {
            as: "h4",
            color: "teal",
            content: index + 1 + '.',
            style: {
              marginBottom: 0
            }
          }), React__default.createElement(semanticUiReact.Icon, {
            link: true,
            name: "close",
            color: "red",
            onClick: _this9.handleRemoveEntry.bind(_this9, index)
          }))), multiValue && React__default.createElement(semanticUiReact.Grid.Column, {
            width: 8,
            style: {
              margin: 0,
              paddingLeft: 0
            }
          }, dropdown, showLinks && formatLinks(route, entry.option)), multiValue && React__default.createElement(semanticUiReact.Grid.Column, {
            width: 7,
            style: {
              margin: 0
            }
          }, entry.text.map(function (innerValue, innerIndex) {
            var action = React__default.createElement(semanticUiReact.Button, {
              basic: true,
              icon: {
                name: 'close',
                color: 'red'
              },
              onClick: _this9.handleRemoveValueFromEntry.bind(_this9, index, innerIndex)
            });
            return React__default.createElement(semanticUiReact.Input, {
              key: innerIndex,
              action: action,
              style: {
                paddingTop: innerIndex === 0 ? 0 : '0.5rem'
              },
              placeholder: cutoffString(displayName),
              value: innerValue,
              name: name + innerIndex,
              onChange: _this9.handleInputChange.bind(_this9, index, innerIndex)
            });
          }), React__default.createElement(semanticUiReact.Icon, {
            link: true,
            name: "plus",
            color: "green",
            onClick: _this9.handleAddValueToEntry.bind(_this9, index)
          })), !multiValue && React__default.createElement(semanticUiReact.Grid.Column, {
            width: 15,
            style: {
              margin: 0,
              paddingLeft: 0
            }
          }, React__default.createElement(semanticUiReact.Input, {
            name: name,
            placeholder: cutoffString(displayName),
            value: entry.text,
            actionPosition: "left",
            onChange: _this9.handleInputChange.bind(_this9, index, index),
            action: dropdown
          }), showLinks && formatLinks(route, entry.option)));
        }), React__default.createElement(semanticUiReact.Grid.Row, {
          style: {
            paddingTop: 0
          }
        }, React__default.createElement(semanticUiReact.Grid.Column, {
          width: 16,
          style: {
            margin: 0
          }
        }, React__default.createElement(semanticUiReact.Container, {
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
    }
  }]);

  return UIMultiInput;
}(React.Component);

var formats = ['date', 'label', 'tag'];

var UIStatic =
/*#__PURE__*/
function (_Component) {
  _inherits(UIStatic, _Component);

  function UIStatic(props) {
    var _this;

    _classCallCheck(this, UIStatic);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(UIStatic).call(this, props));
    _this.state = {
      ready: false,
      component: null,
      icon: null
    };
    return _this;
  }

  _createClass(UIStatic, [{
    key: "checkIcon",
    value: function checkIcon() {
      var _this2 = this;

      return new Promise(function (resolve) {
        if (_this2.props.hasOwnProperty('icon')) {
          _this2.setState({
            icon: React__default.createElement(semanticUiReact.Icon, {
              name: _this2.props.icon,
              color: "teal"
            })
          }, function () {
            return resolve();
          });
        } else {
          _this2.setState({
            icon: ''
          }, function () {
            return resolve();
          });
        }
      });
    }
  }, {
    key: "createComponent",
    value: function createComponent() {
      var _this3 = this;

      return new Promise(function (resolve) {
        var _this3$props = _this3.props,
            format = _this3$props.format,
            value = _this3$props.value;

        if (!Array.isArray(value)) {
          resolve(null);
        } else {
          if (!formats.includes(format)) {
            resolve(React__default.createElement(semanticUiReact.List, {
              style: {
                marginTop: 0
              },
              items: value
            }));
          } else {
            var entries = [];

            for (var entry in value) {
              if (format === 'date') {
                entries.push(moment(value[entry]).format('LLL'));
              } else {
                entries.push(React__default.createElement(semanticUiReact.Label, {
                  key: entry,
                  color: "teal"
                }, value[entry]));
              }
            }

            if (format === 'date') {
              _this3.setState({
                icon: React__default.createElement(semanticUiReact.Icon, {
                  name: "calendar alternate outline",
                  color: "teal",
                  size: "large"
                })
              }, function () {
                resolve(React__default.createElement(semanticUiReact.List, {
                  style: {
                    marginTop: 0
                  },
                  items: entries
                }));
              });
            } else {
              resolve(React__default.createElement(semanticUiReact.Label.Group, {
                tag: format === 'tag',
                color: "teal",
                content: entries
              }));
            }
          }
        }
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this4 = this;

      this.checkIcon().then(function () {
        _this4.createComponent().then(function (result) {
          _this4.setState({
            component: result
          }, function () {
            return _this4.setState({
              ready: true
            });
          });
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          ready = _this$state.ready,
          component = _this$state.component,
          icon = _this$state.icon;
      var _this$props = this.props,
          displayName = _this$props.displayName,
          description = _this$props.description;

      if (!ready) {
        return simpleStaticFormField(displayName, description, React__default.createElement(semanticUiReact.List, {
          style: {
            marginTop: 0
          }
        }));
      } else {
        return simpleStaticFormField(displayName, description, component, icon);
      }
    }
  }]);

  return UIStatic;
}(React.Component);

var formComponents = {
  UIText: UIText,
  UIBoolean: UIBoolean,
  UINumber: UINumber,
  UIRadio: UIRadio,
  UIDate: UIDate,
  UIDropdown: UIDropdown,
  UIMultiInput: UIMultiInput,
  UIStatic: UIStatic
};

var UIFormField =
/*#__PURE__*/
function (_Component) {
  _inherits(UIFormField, _Component);

  function UIFormField() {
    _classCallCheck(this, UIFormField);

    return _possibleConstructorReturn(this, _getPrototypeOf(UIFormField).apply(this, arguments));
  }

  _createClass(UIFormField, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          properties = _this$props.properties,
          valueChange = _this$props.valueChange,
          languageCode = _this$props.languageCode;
      var FormComponent = formComponents[properties.component];
      return React__default.createElement(FormComponent, _extends({}, properties, {
        valueChange: valueChange,
        languageCode: languageCode
      }));
    }
  }]);

  return UIFormField;
}(React.Component);

exports.UIFormField = UIFormField;
