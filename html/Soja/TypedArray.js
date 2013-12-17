var TypedArray;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
TypedArray = (function() {
  __extends(TypedArray, Model);
  function TypedArray(size, data) {
    var B;
    TypedArray.__super__.constructor.call(this);
    if (!(size != null)) {
      size = [];
    }
    if (!size.length) {
      size = [size];
    }
    this._size = size;
    if (!(data != null)) {
      B = this.base_type();
      data = new B(this.nb_items());
    }
    this._data = data;
  }
  TypedArray.prototype.base_type = function() {};
  TypedArray.prototype.dim = function() {
    return this._size.length;
  };
  TypedArray.prototype.size = function(d) {
    if (d != null) {
      return this._size[d];
    } else {
      return this._size;
    }
  };
  TypedArray.prototype.set_val = function(index, value) {
    index = this._get_index(index);
    if (this._data[index] !== value) {
      this._data[index] = value;
      return this._signal_change();
    }
  };
  TypedArray.prototype.nb_items = function() {
    var i, tot, _i, _len, _ref;
    tot = this._size[0] || 0;
    _ref = this._size.slice(1);
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      i = _ref[_i];
      tot *= i;
    }
    return tot;
  };
  TypedArray.prototype.toString = function() {
    var i, j, l, m, o, res, s, v, _len, _ref, _ref2;
    m = 1;
    res = "";
    l = (function() {
      var _i, _len, _ref, _results;
      _ref = this._size;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        s = _ref[_i];
        o = m;
        m *= s;
        _results.push(o);
      }
      return _results;
    }).call(this);
    _ref = this._data;
    for (i = 0, _len = _ref.length; i < _len; i++) {
      v = _ref[i];
      res += v;
      for (j = _ref2 = l.length - 1; (_ref2 <= 0 ? j <= 0 : j >= 0); (_ref2 <= 0 ? j += 1 : j -= 1)) {
        if (i % l[j] === l[j] - 1) {
          res += [" ", "\n", "\n\n"][j];
          break;
        }
      }
    }
    return res;
  };
  TypedArray.prototype.equals = function(obj) {
    var i, v, _len, _ref;
    if (obj instanceof TypedArray) {
      if (this._size.length !== obj._size.length) {
        return false;
      }
      _ref = this._size;
      for (i = 0, _len = _ref.length; i < _len; i++) {
        v = _ref[i];
        if (v !== obj._size[i]) {
          return false;
        }
      }
      return this._data === obj._data;
    }
    return this._data === obj;
  };
  TypedArray.prototype.get = function(index) {
    if (index != null) {
      return this._data[this._get_index(index)];
    } else {
      return this._data;
    }
  };
  TypedArray.prototype.resize = function(new_size) {
    var B, n, s, tot, _i, _len;
    tot = 1;
    for (_i = 0, _len = new_size.length; _i < _len; _i++) {
      s = new_size[_i];
      tot *= s;
    }
    B = this.base_type();
    n = new B(tot);
    n.set(this._data);
    this._data = n;
    this._size = new_size;
    return this._signal_change();
  };
  TypedArray.prototype._set = function(str) {
    var B;
    if (typeof str === "string") {
      this._set_state(str, {});
      return true;
    }
    if (this._data !== value || this._size.length !== 1 || this._size[0] !== value.length) {
      B = this.base_type();
      this._data = new B(value);
      this._size = [value.length];
      return true;
    }
    return false;
  };
  TypedArray.prototype._get_index = function(index) {
    var i, m, o, _ref;
    if (index.length) {
      o = 0;
      m = 1;
      for (i = 0, _ref = index.length; (0 <= _ref ? i < _ref : i > _ref); (0 <= _ref ? i += 1 : i -= 1)) {
        o += m * index[i];
        m *= this._size[i];
      }
      return o;
    }
    return index;
  };
  TypedArray.prototype._get_fs_data = function(out) {
    FileSystem.set_server_id_if_necessary(out, this);
    return out.mod += "C " + this._server_id + " " + (this._get_state()) + " ";
  };
  TypedArray.prototype._get_state = function() {
    var d, res, s, _i, _j, _len, _len2, _ref, _ref2;
    res = "";
    res += this._size.length;
    _ref = this._size;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      s = _ref[_i];
      res += "," + s;
    }
    _ref2 = this._data;
    for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
      d = _ref2[_j];
      res += "," + d;
    }
    return res;
  };
  TypedArray.prototype._set_state = function(str, map) {
    var B, l, n, s, v, _results;
    l = str.split(",");
    s = parseInt(l[0]);
    this._size = (function() {
      var _results;
      _results = [];
      for (v = 0; (0 <= s ? v < s : v > s); (0 <= s ? v += 1 : v -= 1)) {
        _results.push(parseInt(l[v + 1]));
      }
      return _results;
    })();
    B = this.base_type();
    n = this.nb_items();
    this._data = new B(n);
    _results = [];
    for (v = 0; (0 <= n ? v < n : v > n); (0 <= n ? v += 1 : v -= 1)) {
      _results.push(this._data[v] = parseFloat(l[s + 1 + v]));
    }
    return _results;
  };
  return TypedArray;
})();var TypedArray_Float64;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
TypedArray_Float64 = (function() {
  __extends(TypedArray_Float64, TypedArray);
  function TypedArray_Float64(size, data) {
    if (size == null) {
      size = [];
    }
    TypedArray_Float64.__super__.constructor.call(this, size, data);
  }
  TypedArray_Float64.prototype.base_type = function() {
    return Float64Array;
  };
  TypedArray_Float64.prototype.deep_copy = function() {
    return new TypedArray_Float64(this._size, this._data);
  };
  return TypedArray_Float64;
})();var TypedArray_Int32;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
TypedArray_Int32 = (function() {
  __extends(TypedArray_Int32, TypedArray);
  function TypedArray_Int32(size, data) {
    if (size == null) {
      size = [];
    }
    TypedArray_Int32.__super__.constructor.call(this, size, data);
  }
  TypedArray_Int32.prototype.base_type = function() {
    return Int32Array;
  };
  TypedArray_Int32.prototype.deep_copy = function() {
    return new TypedArray_Int32(this._size, this._data);
  };
  return TypedArray_Int32;
})();var TypedArray_Float32;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
TypedArray_Float32 = (function() {
  __extends(TypedArray_Float32, TypedArray);
  function TypedArray_Float32(size, data) {
    if (size == null) {
      size = [];
    }
    TypedArray_Float32.__super__.constructor.call(this, size, data);
  }
  TypedArray_Float32.prototype.base_type = function() {
    return Float32Array;
  };
  TypedArray_Float32.prototype.deep_copy = function() {
    return new TypedArray_Float32(this._size, this._data);
  };
  return TypedArray_Float32;
})();var ModelEditorItem_TypedArray;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
ModelEditorItem_TypedArray = (function() {
  __extends(ModelEditorItem_TypedArray, ModelEditorItem);
  function ModelEditorItem_TypedArray(params) {
    ModelEditorItem_TypedArray.__super__.constructor.call(this, params);
    this._ad = [];
    this._size = [];
    this._inputs = [];
  }
  ModelEditorItem_TypedArray.prototype.onchange = function() {
    var i, input, w, _i, _j, _len, _len2, _len3, _ref, _ref2, _ref3, _results;
    if (!this._same_parms()) {
      this._size = this.model.size();
      _ref = this._inputs;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        this.ed.removeChild(i);
      }
      _ref2 = this._ad;
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        i = _ref2[_j];
        this.ed.removeChild(i);
      }
      this._ad = [];
      w = this.ew / this.model.size(0);
      if (this.model.dim() > 1) {
        w = 100 / this.model.size(0);
        this._ad.push(new_dom_element({
          parentNode: this.ed,
          nodeName: "span",
          style: {
            display: "inline-block",
            width: this.ew + "%"
          }
        }));
      }
      this._inputs = (function() {
        var _ref, _results;
        _results = [];
        for (i = 0, _ref = this.model.nb_items(); (0 <= _ref ? i < _ref : i > _ref); (0 <= _ref ? i += 1 : i -= 1)) {
          _results.push(__bind(function(i) {
            var input;
            return input = new_dom_element({
              parentNode: this.ed,
              type: "text",
              nodeName: "input",
              style: {
                width: w + "%"
              },
              onchange: __bind(function() {
                this.snapshot();
                return this.model.set_val(i, input.value);
              }, this),
              onfocus: __bind(function() {
                var _ref;
                return (_ref = this.get_focus()) != null ? _ref.set(this.view_id) : void 0;
              }, this)
            });
          }, this)(i));
        }
        return _results;
      }).call(this);
    }
    _ref3 = this._inputs;
    _results = [];
    for (i = 0, _len3 = _ref3.length; i < _len3; i++) {
      input = _ref3[i];
      _results.push(input.value = this.model.get(i));
    }
    return _results;
  };
  ModelEditorItem_TypedArray.prototype._same_parms = function() {
    var i, v, _len, _ref;
    if (this._size.length !== this.model.dim()) {
      return false;
    }
    _ref = this._size;
    for (i = 0, _len = _ref.length; i < _len; i++) {
      v = _ref[i];
      if (v !== this.model.size(i)) {
        return false;
      }
    }
    return true;
  };
  return ModelEditorItem_TypedArray;
})();
ModelEditorItem.default_types.unshift(function(model) {
  if (model instanceof TypedArray) {
    return ModelEditorItem_TypedArray;
  }
});