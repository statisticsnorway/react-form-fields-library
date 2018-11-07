'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

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

var FormField = function FormField(displayName, description, error, warning, required, component) {
  return React__default.createElement(semanticUiReact.Form.Field, {
    error: !!error,
    required: required
  }, React__default.createElement(semanticUiReact.Popup, {
    hideOnScroll: true,
    position: "top center",
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
      });

      sessionStorage.setItem(_this.props.name, event.target.value);
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
      return FormField(displayName, description, error, warning, required, component);
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
          description = _this$props.description,
          error = _this$props.error,
          warning = _this$props.warning,
          required = _this$props.required;
      var component = React__default.createElement(semanticUiReact.Checkbox, {
        label: displayName,
        onChange: this.handleChange,
        checked: value
      });
      return FormField(displayName, description, error, warning, required, component);
    }
  }]);

  return DCBoolean;
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
      DCBoolean: DCBoolean
    };
    return _this;
  }

  _createClass(DCFormField, [{
    key: "render",
    value: function render() {
      var FormComponent = this.formComponents[this.props.tag];
      return React__default.createElement(FormComponent, this.props.additionalProps);
    }
  }]);

  return DCFormField;
}(React.Component);

exports.DCFormField = DCFormField;
