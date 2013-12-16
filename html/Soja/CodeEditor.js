var ModelEditorItem_TextAreaLanguage;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
ModelEditorItem_TextAreaLanguage = (function() {
  __extends(ModelEditorItem_TextAreaLanguage, ModelEditorItem);
  function ModelEditorItem_TextAreaLanguage(params) {
    var _ref;
    ModelEditorItem_TextAreaLanguage.__super__.constructor.call(this, params);
    this.current_path = "/scripts";
    this.button = new_dom_element({
      parentNode: this.ed,
      nodeName: "input",
      type: "button",
      value: "FullScreen",
      onclick: __bind(function(evt) {
        var p;
        p = new_popup(this.label || "Code Editor", {
          event: evt,
          width: "50",
          onclose: __bind(function() {
            return this.onPopupClose();
          }, this)
        });
        p.appendChild(this.textarea);
        this.code_mirror.save();
        this.model.set(this.code_mirror.getValue());
        this.fullscreen_code_mirror = CodeMirror.fromTextArea(this.textarea, {
          lineNumbers: true,
          mode: this.model.get_language(),
          lineWrapping: true,
          onChange: __bind(function() {
            var changed_string, _base, _ref;
            changed_string = this.fullscreen_code_mirror.getValue();
            this.model.set(changed_string);
            if (typeof (_base = this.model).callback === "function") {
              _base.callback();
            }
            return (_ref = this.get_focus()) != null ? _ref.set(this.view_id) : void 0;
          }, this),
          onCursorActivity: __bind(function() {
            this.fullscreen_code_mirror.setLineClass(this.hlLine, null);
            this.hlLine = this.fullscreen_code_mirror.setLineClass(this.fullscreen_code_mirror.getCursor().line, "activeline");
            return this.fullscreen_code_mirror.matchHighlight("CodeMirror-matchhighlight");
          }, this)
        });
        return this.hlLine = this.fullscreen_code_mirror.setLineClass(0, "activeline");
      }, this)
    });
    this.textarea = new_dom_element({
      parentNode: this.ed,
      nodeName: "textarea",
      className: "code_editor",
      txt: this.model.get()
    });
    if ((_ref = this.ev) != null) {
      _ref.onmousedown = __bind(function() {
        var _ref2;
        return (_ref2 = this.get_focus()) != null ? _ref2.set(this.view_id) : void 0;
      }, this);
    }
    this.code_mirror = CodeMirror.fromTextArea(this.textarea, {
      lineNumbers: true,
      mode: this.model.get_language(),
      lineWrapping: true,
      onChange: __bind(function() {
        var _base;
        this.model.set(this.code_mirror.getValue());
        if (typeof (_base = this.model).callback === "function") {
          _base.callback();
        }
        return setTimeout((__bind(function() {
          return this.code_mirror.focus();
        }, this)), 1);
      }, this),
      onCursorActivity: __bind(function() {
        this.code_mirror.setLineClass(this.hlLine2, null);
        this.hlLine2 = this.code_mirror.setLineClass(this.code_mirror.getCursor().line, "activeline");
        return this.code_mirror.matchHighlight("CodeMirror-matchhighlight");
      }, this)
    });
    this.code_mirror.getWrapperElement().onmousedown = __bind(function() {
      var _ref2;
      return (_ref2 = this.get_focus()) != null ? _ref2.set(this.view_id) : void 0;
    }, this);
    this.hlLine2 = this.code_mirror.setLineClass(0, "activeline");
  }
  ModelEditorItem_TextAreaLanguage.prototype.onchange = function() {
    var _ref;
    if ((_ref = this.get_focus()) != null ? _ref.has_been_modified() : void 0) {
      if (this.get_focus().get() === this.view_id) {
        return setTimeout((__bind(function() {
          return this.code_mirror.focus();
        }, this)), 1);
      }
    }
  };
  ModelEditorItem_TextAreaLanguage.prototype.onPopupClose = function() {
    var changed_string;
    changed_string = this.fullscreen_code_mirror.getValue();
    this.model.set(changed_string);
    return this.code_mirror.setValue(changed_string);
  };
  return ModelEditorItem_TextAreaLanguage;
})();
ModelEditorItem.default_types.push(function(model) {
  if (model instanceof StrLanguage) {
    return ModelEditorItem_TextAreaLanguage;
  }
});var StrLanguage;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
StrLanguage = (function() {
  __extends(StrLanguage, Model);
  function StrLanguage(value, language, callback) {
    if (value == null) {
      value = "";
    }
    if (language == null) {
      language = "text";
    }
    if (callback == null) {
      callback = void 0;
    }
    StrLanguage.__super__.constructor.call(this);
    this.add_attr({
      value: new Str(value),
      language: language,
      callback: callback
    });
  }
  StrLanguage.prototype.get = function() {
    return this.value.get();
  };
  StrLanguage.prototype.set = function(val) {
    return this.value.set(val);
  };
  StrLanguage.prototype.get_language = function() {
    return this.language.get();
  };
  return StrLanguage;
})();