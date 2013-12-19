var ModelEditorItem;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __indexOf = Array.prototype.indexOf || function(item) {
  for (var i = 0, l = this.length; i < l; i++) {
    if (this[i] === item) return i;
  }
  return -1;
};
ModelEditorItem = (function() {
  __extends(ModelEditorItem, View);
  ModelEditorItem.default_types = [
    function(model) {
      if (model instanceof Bool) {
        return ModelEditorItem_CheckBox;
      }
    }, function(model) {
      if (model instanceof Choice) {
        return ModelEditorItem_Choice;
      }
    }, function(model) {
      if (model instanceof Button) {
        return ModelEditorItem_Button;
      }
    }, function(model) {
      if (model instanceof ConstrainedVal) {
        return ModelEditorItem_ConstrainedVal;
      }
    }, function(model) {
      if (model instanceof Text) {
        return ModelEditorItem_TextArea;
      }
    }, function(model) {
      if (model instanceof Obj) {
        return ModelEditorItem_Input;
      }
    }, function(model) {
      if (model instanceof ConstOrNotModel) {
        return ModelEditorItem_ConstOrNotModel;
      }
    }, function(model) {
      if (model.dim()) {
        return ModelEditorItem_Lst;
      }
    }
  ];
  function ModelEditorItem(params) {
    var key, val, _ref;
    ModelEditorItem.__super__.constructor.call(this, params.model);
    this.default_types = [];
    for (key in params) {
      val = params[key];
      this[key] = val;
    }
    if (!(this.focus != null) && !(this.parent != null)) {
      this.focus = new Val(-1);
    }
    if (!this.closed_models && !(this.parent != null)) {
      this.closed_models = new Lst;
    }
    if ((_ref = this.get_focus()) != null) {
      _ref.bind(this);
    }
    this.make_ed();
  }
  ModelEditorItem.prototype.destructor = function() {
    var _ref;
    if (((_ref = this.ce) != null ? _ref.parentNode : void 0) != null) {
      this.ce.parentNode.removeChild(this.ce);
    }
    return ModelEditorItem.__super__.destructor.call(this);
  };
  ModelEditorItem.prototype.get_property = function(name, default_value) {
    if (this[name] != null) {
      return this[name];
    }
    if (this.parent != null) {
      return this.parent.get_property(name, default_value);
    }
    return default_value;
  };
  ModelEditorItem.prototype.get_focus = function() {
    return this.get_property("focus");
  };
  ModelEditorItem.prototype.get_item_width = function() {
    return this.get_property("item_width", 98);
  };
  ModelEditorItem.prototype.get_className = function() {
    return this.get_property("className", '');
  };
  ModelEditorItem.prototype.get_closed_models = function() {
    return this.get_property("closed_models");
  };
  ModelEditorItem.prototype.get_label_ratio = function() {
    return this.get_property("label_ratio", 0.35);
  };
  ModelEditorItem.prototype.get_justification = function() {
    if (this.justification != null) {
      return this.justification;
    }
    if (this.parent != null) {
      return this.parent.get_justification();
    }
    return true;
  };
  ModelEditorItem.prototype.snapshot = function() {
    if (this.undo_manager != null) {
      return this.undo_manager.snapshot();
    } else if (this.parent != null) {
      return this.parent.snapshot();
    }
  };
  ModelEditorItem.prototype.get_display_name = function(model, name) {
    var res;
    if (model.get_model_editor_parameters != null) {
      res = ModelEditorItem._get_model_editor_parameters(model);
      if (res.display_name[name] != null) {
        return res.display_name[name];
      }
    }
    return this.trans_name(name);
  };
  ModelEditorItem.prototype.trans_name = function(name) {
    var r, res;
    if (this.parent != null) {
      return this.parent.trans_name(name);
    }
    r = /\_/g;
    res = name.replace(r, " ");
    return res[0].toUpperCase() + res.slice(1);
  };
  ModelEditorItem.prototype.make_ed = function() {
    var closed_models, el, legend;
    if (this.label != null) {
      if (this.ok_for_label()) {
        this.ce = new_dom_element({
          parentNode: this.el,
          nodeName: "span"
        });
        if (this.display_label()) {
          this.ev = new_dom_element({
            parentNode: this.ce,
            nodeName: "span",
            innerHTML: this.label,
            style: {
              display: "inline-block",
              fontSize: 12,
              width: this.get_item_width() * this.get_label_ratio() + "%",
              paddingLeft: 0.5 * (100 - this.get_item_width()) + "%"
            }
          });
          this.ew = this.get_item_width() * (1.0 - this.get_label_ratio());
        } else {
          this.ew = this.get_item_width();
        }
        return this.ed = this.ce;
      } else {
        this.ce = new_dom_element({
          parentNode: this.el,
          nodeName: "fieldset"
        });
        closed_models = this.get_closed_models();
        legend = new_dom_element({
          parentNode: this.ce,
          nodeName: "legend",
          innerHTML: this.label,
          onclick: __bind(function() {
            closed_models = this.get_closed_models();
            return closed_models.toggle_ref(this.model);
          }, this)
        });
        el = new_dom_element({
          parentNode: this.ce
        });
        closed_models.bind(__bind(function() {
          var _ref;
          if (_ref = this.model, __indexOf.call(closed_models, _ref) >= 0) {
            el.style.display = "none";
            add_class(this.ce, "ModelEditor_closed");
            return add_class(legend, "ModelEditor_closed");
          } else {
            el.style.display = "block";
            rem_class(this.ce, "ModelEditor_closed");
            return rem_class(legend, "ModelEditor_closed");
          }
        }, this));
        this.ew = this.get_item_width();
        return this.ed = el;
      }
    } else {
      this.ce = new_dom_element({
        parentNode: this.el,
        nodeName: "span",
        className: this.get_className()
      });
      this.ew = this.get_item_width();
      return this.ed = this.ce;
    }
  };
  ModelEditorItem.prototype.ok_for_label = function() {
    return true;
  };
  ModelEditorItem.prototype.display_label = function() {
    return true;
  };
  ModelEditorItem.prototype.contains_labels = function() {
    return false;
  };
  ModelEditorItem._get_model_editor_parameters = function(model) {
    var res;
    res = {
      display_name: {},
      model_editor: {}
    };
    model.get_model_editor_parameters(res);
    return res;
  };
  ModelEditorItem.get_item_type_for = function(params) {
    var it, r, res, t, _i, _len, _ref, _ref2;
    it = params.item_type;
    if (it != null) {
      return it;
    }
    if ((params.name != null) && (((_ref = params.parent) != null ? _ref.model.get_model_editor_parameters : void 0) != null)) {
      res = ModelEditorItem._get_model_editor_parameters(params.parent.model);
      if (res.model_editor[params.name] != null) {
        return res.model_editor[params.name];
      }
    }
    _ref2 = ModelEditorItem.default_types;
    for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
      t = _ref2[_i];
      r = t(params.model);
      if (r != null) {
        return r;
      }
    }
    return ModelEditorItem_Aggregate;
  };
  return ModelEditorItem;
})();var new_model_editor;
new_model_editor = function(params) {
  var TI, key, n_params, sub_model, val, _base;
  sub_model = typeof (_base = params.model).disp_only_in_model_editor === "function" ? _base.disp_only_in_model_editor() : void 0;
  if (sub_model != null) {
    n_params = {};
    for (key in params) {
      val = params[key];
      n_params[key] = val;
    }
    n_params.model = sub_model;
    return new_model_editor(n_params);
  }
  TI = ModelEditorItem.get_item_type_for(params);
  return new TI(params);
};var ModelEditorItem_Choice;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
ModelEditorItem_Choice = (function() {
  __extends(ModelEditorItem_Choice, ModelEditorItem);
  function ModelEditorItem_Choice(params) {
    var _ref;
    ModelEditorItem_Choice.__super__.constructor.call(this, params);
    this.select = new_dom_element({
      parentNode: this.ed,
      nodeName: "select",
      onchange: __bind(function() {
        this.snapshot();
        return this.model.set(this.select.value);
      }, this),
      style: {
        width: this.ew + "%"
      }
    });
    if ((_ref = this.ev) != null) {
      _ref.onmousedown = __bind(function() {
        var _ref;
        return (_ref = this.get_focus()) != null ? _ref.set(this.view_id) : void 0;
      }, this);
    }
  }
  ModelEditorItem_Choice.prototype.onchange = function() {
    var cpt, i, selected, _i, _len, _ref, _ref2;
    if (this.model.lst.has_been_modified()) {
      while (this.select.firstChild != null) {
        this.select.removeChild(this.select.firstChild);
      }
      cpt = 0;
      _ref = this.model._nlst();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        selected = "";
        if (i.toString() === this.model.item().toString()) {
          selected = "selected";
        }
        new_dom_element({
          parentNode: this.select,
          nodeName: "option",
          selected: selected,
          txt: i.toString(),
          value: cpt
        });
        cpt += 1;
      }
    }
    if (this.model.num.has_been_modified()) {
      this.select.value = this.model.num.get();
    }
    if ((_ref2 = this.get_focus()) != null ? _ref2.has_been_modified() : void 0) {
      if (this.get_focus().get() === this.view_id) {
        return setTimeout((__bind(function() {
          return this.select.focus();
        }, this)), 1);
      } else {
        return this.select.blur();
      }
    }
  };
  return ModelEditorItem_Choice;
})();var ModelEditorItem_Lst;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
ModelEditorItem_Lst = (function() {
  __extends(ModelEditorItem_Lst, ModelEditorItem);
  function ModelEditorItem_Lst(params) {
    ModelEditorItem_Lst.__super__.constructor.call(this, params);
    this.lst = [];
    this.dst = [];
  }
  ModelEditorItem_Lst.prototype.onchange = function() {
    var i, v, w, _i, _j, _len, _len2, _ref, _ref2;
    if (this.model.has_been_directly_modified() || this.lst.length === 0) {
      _ref = this.lst;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        v = _ref[_i];
        v.destructor();
      }
      _ref2 = this.dst;
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        v = _ref2[_j];
        v.parentNode.removeChild(v);
      }
      this.dim = ModelEditorItem_Lst._rec_dim(this.model);
      if (this.model.length < 50) {
        w = this.dim === 1 ? this.ew / this.model.length : this.ew;
        if (this.model.length) {
          this.lst = (function() {
            var _i, _len, _ref, _results;
            _ref = this.model;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              i = _ref[_i];
              _results.push(new_model_editor({
                el: this.ed,
                model: i,
                parent: this,
                item_width: w
              }));
            }
            return _results;
          }).call(this);
          this.dst = [];
        } else {
          this.lst = [];
          this.dst = [
            new_dom_element({
              parentNode: this.ed,
              style: {
                width: this.ew + "%",
                background: "#123456"
              }
            })
          ];
        }
        if (this.lst.length && (this.ev != null)) {
          this.ev.onmousedown = __bind(function() {
            var _ref;
            return (_ref = this.get_focus()) != null ? _ref.set(this.lst[0].view_id) : void 0;
          }, this);
        }
      }
    }
    return this.fd = true;
  };
  ModelEditorItem_Lst.prototype.ok_for_label = function() {
    return ModelEditorItem_Lst._rec_dim(this.model) === 1;
  };
  ModelEditorItem_Lst._rec_dim = function(model) {
    var d;
    while (typeof model.disp_only_in_model_editor === "function" ? model.disp_only_in_model_editor() : void 0) {
      model = model.disp_only_in_model_editor();
    }
    d = model.dim(true);
    if (d && (model[0] != null)) {
      return d + ModelEditorItem_Lst._rec_dim(model[0]);
    }
    return d;
  };
  return ModelEditorItem_Lst;
})();var ModelEditorItem_ConstOrNotModel;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
ModelEditorItem_ConstOrNotModel = (function() {
  __extends(ModelEditorItem_ConstOrNotModel, ModelEditorItem);
  function ModelEditorItem_ConstOrNotModel(params) {
    ModelEditorItem_ConstOrNotModel.__super__.constructor.call(this, params);
    this.inp = new_model_editor({
      el: this.ed,
      model: this.model.model,
      parent: this,
      item_width: this.ew
    });
  }
  ModelEditorItem_ConstOrNotModel.prototype.onchange = function() {
    var _ref;
    if (this.model.bool.has_been_modified()) {
      if ((_ref = this.check_disabled) != null ? _ref.get() : void 0) {
        return this.inp.set_disabled(!this.model.bool.get());
      } else {
        return this.inp.set_disabled(this.model.bool.get());
      }
    }
  };
  return ModelEditorItem_ConstOrNotModel;
})();var ModelEditorItem_Choice_Roll;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
ModelEditorItem_Choice_Roll = (function() {
  __extends(ModelEditorItem_Choice_Roll, ModelEditorItem);
  function ModelEditorItem_Choice_Roll(params) {
    ModelEditorItem_Choice_Roll.__super__.constructor.call(this, params);
    this.line_height = 30;
    this.container = new_dom_element({
      parentNode: this.ed,
      nodeName: "span",
      className: "ModelEditorChoiceRoll",
      onclick: __bind(function(evt) {
        this.snapshot();
        this.model.set((this.model.num.get() + 1) % this.model._nlst().length);
        return typeof evt.stopPropagation === "function" ? evt.stopPropagation() : void 0;
      }, this),
      style: {
        color: "rgba(0,0,0,0)",
        display: "inline-block",
        width: this.ew + "%"
      }
    });
    this.window = new_dom_element({
      parentNode: this.container,
      className: "ModelEditorChoiceRollWindow",
      txt: "."
    });
    this._cl = [];
  }
  ModelEditorItem_Choice_Roll.prototype.onchange = function() {
    var cpt, i, _i, _j, _len, _len2, _ref, _ref2;
    if (this.model.lst.has_been_modified() || this._cl.length === 0) {
      _ref = this._cl;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        i.parentNode.removeChild(i);
      }
      this._cl = [];
      cpt = 0;
      _ref2 = this.model._nlst();
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        i = _ref2[_j];
        this._cl.push(new_dom_element({
          parentNode: this.window,
          txt: i.get(),
          value: cpt,
          style: {
            position: "absolute",
            left: 0,
            right: 0,
            top: this.line_height * cpt + "px"
          }
        }));
        cpt += 1;
      }
    }
    return this.window.style.top = -this.line_height * this.model.num.get() + "px";
  };
  return ModelEditorItem_Choice_Roll;
})();var ModelEditorItem_CheckBox;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
ModelEditorItem_CheckBox = (function() {
  __extends(ModelEditorItem_CheckBox, ModelEditorItem);
  function ModelEditorItem_CheckBox(params) {
    var span, _ref;
    ModelEditorItem_CheckBox.__super__.constructor.call(this, params);
    this.legend_focus = params.parent.legend_focus;
    span = new_dom_element({
      parentNode: this.ed,
      nodeName: "span",
      style: {
        width: this.ew + "%",
        display: "inline-block"
      }
    });
    this.input = new_dom_element({
      parentNode: span,
      type: "checkbox",
      nodeName: "input",
      onchange: __bind(function() {
        this.snapshot();
        return this.model.set(this.input.checked);
      }, this)
    });
    if (this.legend_focus !== false) {
      if ((_ref = this.ev) != null) {
        _ref.onmousedown = __bind(function() {
          var _ref;
          if ((_ref = this.get_focus()) != null) {
            _ref.set(this.view_id);
          }
          return this.model.toggle();
        }, this);
      }
    }
  }
  ModelEditorItem_CheckBox.prototype.onchange = function() {
    var _ref;
    if (this.model.has_been_modified()) {
      this.input.checked = this.model.toBoolean();
      if (this.label != null) {
        if (this.model.toBoolean()) {
          add_class(this.label, "modelEditor_checked");
        } else {
          rem_class(this.label, "modelEditor_checked");
        }
      }
    }
    if (this.legend_focus !== false) {
      if ((_ref = this.get_focus()) != null ? _ref.has_been_modified() : void 0) {
        if (this.get_focus().get() === this.view_id) {
          return this.input.focus();
        } else {
          return this.input.blur();
        }
      }
    }
  };
  return ModelEditorItem_CheckBox;
})();var ModelEditorItem_ConstrainedVal;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
ModelEditorItem_ConstrainedVal = (function() {
  __extends(ModelEditorItem_ConstrainedVal, ModelEditorItem);
  function ModelEditorItem_ConstrainedVal(params) {
    this._drag_end = __bind(this._drag_end, this);;
    this._drag_evt = __bind(this._drag_evt, this);;    var _base, _ref;
    ModelEditorItem_ConstrainedVal.__super__.constructor.call(this, params);
    this.inp = new_model_editor({
      el: this.ed,
      model: this.model,
      parent: this,
      item_width: 0.3 * this.ew,
      item_type: ModelEditorItem_Input
    });
    if ((_ref = this.ev) != null) {
      _ref.onmousedown = __bind(function() {
        var _ref;
        return (_ref = this.get_focus()) != null ? _ref.set(this.inp.view_id) : void 0;
      }, this);
    }
    this.div = new_dom_element({
      parentNode: this.ed,
      nodeName: "span",
      className: "ModelEditorSlider",
      style: {
        display: "inline-block",
        width: 0.7 * this.ew - 0.5 + "%",
        marginLeft: 0.5 + "%",
        zIndex: 1
      },
      onmousedown: __bind(function(evt) {
        var offset, twidth;
        this.snapshot();
        offset = evt.clientX - get_left(this.div) - this.cur.offsetWidth / 2;
        twidth = this.div.offsetWidth - this.cur.offsetWidth;
        this.model.set(this.model._min.get() + offset * this.model.delta() / twidth);
        this.off_x = 0;
        return this._on_mouse_down(evt, false);
      }, this),
      onmousewheel: __bind(function(evt) {
        var delta, m;
        this.snapshot();
        if (evt.wheelDelta != null) {
          delta = evt.wheelDelta / 120.0;
          if (window.opera) {
            delta = -delta;
          }
        } else if (evt.detail) {
          delta = -evt.detail / 3.0;
        }
        m = 10 * (1 + 9 * evt.shiftKey) * (1 + 9 * evt.ctrlKey) * (1 + 9 * evt.altKey);
        if (this.model._div.get() !== 0) {
          this.model.set(this.model.get() + delta * this.model.delta() / this.model._div.get());
        } else {
          this.model.set(this.model.get() + delta * this.model.delta() / m);
        }
        if (typeof evt.stopPropagation === "function") {
          evt.stopPropagation();
        }
        if (typeof evt.preventDefault === "function") {
          evt.preventDefault();
        }
        return false;
      }, this)
    });
    if (typeof (_base = this.div).addEventListener === "function") {
      _base.addEventListener("DOMMouseScroll", this.div.onmousewheel, false);
    }
    this.cur = new_dom_element({
      parentNode: this.div,
      className: "ModelEditorSliderItem",
      style: {
        position: "relative"
      },
      onmousedown: __bind(function(evt) {
        return this._on_mouse_down(evt);
      }, this)
    });
    this._drag_evt_func = __bind(function(evt) {
      return this._drag_evt(evt);
    }, this);
    this._drag_end_func = __bind(function(evt) {
      return this._drag_end(evt);
    }, this);
  }
  ModelEditorItem_ConstrainedVal.prototype.onchange = function() {
    if (this.div.offsetWidth && this.cur.offsetWidth) {
      return this.cur.style.left = 100.0 * (this.div.offsetWidth - this.cur.offsetWidth) * this.model.ratio() / this.div.offsetWidth + "%";
    } else {
      return this.cur.style.left = 100.0 * (200 - 11) * this.model.ratio() / 200 + "%";
    }
  };
  ModelEditorItem_ConstrainedVal.prototype._on_mouse_down = function(evt, make_off_x) {
    if (make_off_x == null) {
      make_off_x = true;
    }
    this.old_x = evt.clientX;
    if (make_off_x) {
      this.off_x = this.old_x - get_left(this.cur);
    }
    document.addEventListener("mousemove", this._drag_evt_func, true);
    document.addEventListener("mouseup", this._drag_end_func, true);
    if (typeof evt.stopPropagation === "function") {
      evt.stopPropagation();
    }
    return false;
  };
  ModelEditorItem_ConstrainedVal.prototype._drag_evt = function(evt) {
    var offset, twidth;
    this.snapshot();
    this.new_x = evt.clientX;
    if (this.new_x !== this.old_x) {
      offset = this.new_x - get_left(this.div) - this.off_x;
      twidth = this.div.offsetWidth - this.cur.offsetWidth;
      this.model.set(this.model._min.get() + offset * this.model.delta() / twidth);
      this.old_x = this.new_x;
    }
    return typeof evt.preventDefault === "function" ? evt.preventDefault() : void 0;
  };
  ModelEditorItem_ConstrainedVal.prototype._drag_end = function(evt) {
    if (typeof document.detachEvent === "function") {
      document.detachEvent("onmousemove", this._drag_evt_func);
    }
    if (typeof document.detachEvent === "function") {
      document.detachEvent("onmouseup", this._drag_end_func);
    }
    if (typeof document.removeEventListener === "function") {
      document.removeEventListener("mousemove", this._drag_evt_func, true);
    }
    return typeof document.removeEventListener === "function" ? document.removeEventListener("mouseup", this._drag_end_func, true) : void 0;
  };
  return ModelEditorItem_ConstrainedVal;
})();var ModelEditorItem_Button;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
ModelEditorItem_Button = (function() {
  __extends(ModelEditorItem_Button, ModelEditorItem);
  function ModelEditorItem_Button(params) {
    ModelEditorItem_Button.__super__.constructor.call(this, params);
    this.select = new_dom_element({
      parentNode: this.ed,
      nodeName: "input",
      type: "button",
      value: this.model.txt(),
      onclick: __bind(function() {
        return this.model.toggle();
      }, this),
      style: {
        width: this.ew + "%"
      }
    });
    if (this.model.disabled.equals(true)) {
      this.select.disabled = "true";
    }
  }
  ModelEditorItem_Button.prototype.onchange = function() {
    this.select.value = this.model.txt();
    if (this.model.disabled.has_been_modified()) {
      return this.select.disabled = this.model.disabled.get();
    }
  };
  return ModelEditorItem_Button;
})();var ModelEditorItem_Input;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
ModelEditorItem_Input = (function() {
  __extends(ModelEditorItem_Input, ModelEditorItem);
  function ModelEditorItem_Input(params) {
    var _ref;
    ModelEditorItem_Input.__super__.constructor.call(this, params);
    this.input = new_dom_element({
      parentNode: this.ed,
      type: "text",
      nodeName: "input",
      style: {
        width: this.ew + "%"
      },
      onchange: __bind(function() {
        this.snapshot();
        return this.model.set(this.input.value);
      }, this),
      onfocus: __bind(function() {
        var _ref;
        return (_ref = this.get_focus()) != null ? _ref.set(this.view_id) : void 0;
      }, this)
    });
    if ((_ref = this.ev) != null) {
      _ref.onmousedown = __bind(function() {
        var _ref;
        return (_ref = this.get_focus()) != null ? _ref.set(this.view_id) : void 0;
      }, this);
    }
  }
  ModelEditorItem_Input.prototype.onchange = function() {
    var _ref;
    if (this.model.has_been_modified()) {
      this.input.value = this.model.get();
    }
    if ((_ref = this.get_focus()) != null ? _ref.has_been_modified() : void 0) {
      if (this.get_focus().get() === this.view_id) {
        return setTimeout((__bind(function() {
          return this.input.focus();
        }, this)), 1);
      } else {
        return this.input.blur();
      }
    }
  };
  ModelEditorItem_Input.prototype.set_disabled = function(val) {
    return this.input.disabled = val;
  };
  return ModelEditorItem_Input;
})();var ModelEditorItem_TextArea;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
ModelEditorItem_TextArea = (function() {
  __extends(ModelEditorItem_TextArea, ModelEditorItem);
  function ModelEditorItem_TextArea(params) {
    var _ref;
    ModelEditorItem_TextArea.__super__.constructor.call(this, params);
    this.input = new_dom_element({
      parentNode: this.ed,
      type: "text",
      nodeName: "textarea",
      style: {
        width: this.ew + "%"
      },
      onchange: __bind(function() {
        this.snapshot();
        return this.model.set(this.input.value);
      }, this),
      onfocus: __bind(function() {
        var _ref;
        return (_ref = this.get_focus()) != null ? _ref.set(this.view_id) : void 0;
      }, this)
    });
    if ((_ref = this.ev) != null) {
      _ref.onmousedown = __bind(function() {
        var _ref;
        return (_ref = this.get_focus()) != null ? _ref.set(this.view_id) : void 0;
      }, this);
    }
  }
  ModelEditorItem_TextArea.prototype.onchange = function() {
    var _ref;
    if (this.model.has_been_modified()) {
      this.input.value = this.model.get();
    }
    if ((_ref = this.get_focus()) != null ? _ref.has_been_modified() : void 0) {
      if (this.get_focus().get() === this.view_id) {
        return setTimeout((__bind(function() {
          return this.input.focus();
        }, this)), 1);
      } else {
        return this.input.blur();
      }
    }
  };
  ModelEditorItem_TextArea.prototype.set_disabled = function(val) {
    return this.input.disabled = val;
  };
  return ModelEditorItem_TextArea;
})();var ModelEditorItem_ChoiceWithEditableItems;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
ModelEditorItem_ChoiceWithEditableItems = (function() {
  __extends(ModelEditorItem_ChoiceWithEditableItems, ModelEditorItem);
  function ModelEditorItem_ChoiceWithEditableItems(params) {
    ModelEditorItem_ChoiceWithEditableItems.__super__.constructor.call(this, params);
    this.choice = new_model_editor({
      el: this.ed,
      model: this.model,
      parent: this,
      item_width: this.ew,
      item_type: ModelEditorItem_Choice
    });
    this.editdiv = new_dom_element({
      parentNode: this.ed,
      nodeName: "span"
    });
    this.editors = [];
  }
  ModelEditorItem_ChoiceWithEditableItems.prototype.onchange = function() {
    var e, i, l, _i, _len, _len2, _ref, _ref2, _results;
    if (this.model.lst.has_been_directly_modified()) {
      _ref = this.editors;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        e = _ref[_i];
        e.destructor();
      }
      this.editors = (function() {
        var _i, _len, _ref, _results;
        _ref = this.model.lst;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          l = _ref[_i];
          _results.push(new_model_editor({
            el: this.editdiv,
            model: l,
            parent: this
          }));
        }
        return _results;
      }).call(this);
    }
    if (this.model.num.has_been_modified() || this.model.lst.has_been_directly_modified()) {
      _ref2 = this.editors;
      _results = [];
      for (i = 0, _len2 = _ref2.length; i < _len2; i++) {
        e = _ref2[i];
        _results.push(e.ed.style.display = (this.model.num.get() === i ? "block" : "none"));
      }
      return _results;
    }
  };
  return ModelEditorItem_ChoiceWithEditableItems;
})();var ModelEditorItem_Aggregate;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
ModelEditorItem_Aggregate = (function() {
  __extends(ModelEditorItem_Aggregate, ModelEditorItem);
  function ModelEditorItem_Aggregate(params) {
    ModelEditorItem_Aggregate.__super__.constructor.call(this, params);
    this.containers = {};
  }
  ModelEditorItem_Aggregate.prototype.onchange = function() {
    var info, me, model_id, name, o, res, span, val, w, _i, _j, _k, _l, _len, _len2, _len3, _len4, _ref, _ref2, _ref3, _ref4, _ref5;
    _ref = this.containers;
    for (model_id in _ref) {
      me = _ref[model_id];
      res = false;
      _ref2 = this.model._attribute_names;
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        name = _ref2[_i];
        if (name[0] !== "_") {
          val = this.model[name];
          res |= val.model_id === parseInt(model_id);
        }
      }
      if (!res) {
        me.edit.destructor();
        delete this.containers[model_id];
      }
    }
    _ref3 = this.model._attribute_names;
    for (_j = 0, _len2 = _ref3.length; _j < _len2; _j++) {
      name = _ref3[_j];
      if (name[0] !== "_") {
        val = this.model[name];
        if (!(this.containers[val.model_id] != null)) {
          this.containers[val.model_id] = {
            edit: new_model_editor({
              el: this.ed,
              model: this.model[name],
              label: this.get_display_name(this.model, name),
              parent: this,
              name: name
            }),
            span: this.get_justification() ? new_dom_element({
              parentNode: this.ed,
              nodeName: "span"
            }) : void 0
          };
        }
      }
    }
    if (this.get_justification()) {
      w = 0;
      o = [];
      _ref4 = this.model._attribute_names;
      for (_k = 0, _len3 = _ref4.length; _k < _len3; _k++) {
        name = _ref4[_k];
        if (name[0] !== "_") {
          val = this.model[name];
          info = this.containers[val.model_id];
          if (w + info.edit.get_item_width() > 100) {
            info.span.style.width = 0;
            _ref5 = o.slice(0, o.length - 1);
            for (_l = 0, _len4 = _ref5.length; _l < _len4; _l++) {
              span = _ref5[_l];
              span.style.display = "inline-block";
              span.style.width = (100 - w) / (o.length - 1) + "%";
            }
            w = 0;
            o = [];
          }
          w += info.edit.get_item_width();
          o.push(info.span);
        }
      }
      if (w < 100 && o.length >= 2) {
        span = o[o.length - 2];
        span.style.display = "inline-block";
        return span.style.width = (100 - w) / (o.length - 1) + "%";
      }
    }
  };
  ModelEditorItem_Aggregate.prototype.ok_for_label = function() {
    return false;
  };
  ModelEditorItem_Aggregate.prototype.contains_labels = function() {
    return true;
  };
  ModelEditorItem_Aggregate.prototype.set_disabled = function(val) {
    var me, model_id, _ref, _results;
    _ref = this.containers;
    _results = [];
    for (model_id in _ref) {
      me = _ref[model_id];
      _results.push(me.edit.set_disabled(val));
    }
    return _results;
  };
  return ModelEditorItem_Aggregate;
})();var ModelEditorItem_Bool_Img;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
ModelEditorItem_Bool_Img = (function() {
  __extends(ModelEditorItem_Bool_Img, ModelEditorItem);
  function ModelEditorItem_Bool_Img(params) {
    ModelEditorItem_Bool_Img.__super__.constructor.call(this, params);
    this.ed.onclick = __bind(function() {
      this.snapshot();
      return this.model.toggle();
    }, this);
    this.span = new_dom_element({
      parentNode: this.ed,
      nodeName: "span",
      style: {
        display: "inline-block",
        width: this.ew + "%"
      }
    });
  }
  ModelEditorItem_Bool_Img.prototype.onchange = function() {
    if (this.model.get()) {
      add_class(this.span, "ModelEditorItem_CheckImg_1");
      rem_class(this.span, "ModelEditorItem_CheckImg_0");
    } else {
      add_class(this.span, "ModelEditorItem_CheckImg_0");
      rem_class(this.span, "ModelEditorItem_CheckImg_1");
    }
    if (this.label != null) {
      if (this.model.toBoolean()) {
        return add_class(this.label, "modelEditor_checked");
      } else {
        return rem_class(this.label, "modelEditor_checked");
      }
    }
  };
  return ModelEditorItem_Bool_Img;
})();