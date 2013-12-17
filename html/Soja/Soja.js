var Model;
var __indexOf = Array.prototype.indexOf || function(item) {
  for (var i = 0, l = this.length; i < l; i++) {
    if (this[i] === item) return i;
  }
  return -1;
};
Model = (function() {
  Model._counter = 0;
  Model._modlist = {};
  Model._n_views = {};
  Model._cur_mid = 0;
  Model._timeout = void 0;
  Model._force_m = false;
  Model._synchro = void 0;
  function Model(attr) {
    this._attribute_names = [];
    this.model_id = Model._cur_mid;
    Model._cur_mid += 1;
    this._views = [];
    this._parents = [];
    this._date_last_modification = Model._counter + 2;
    if (attr != null) {
      this._set(attr);
    }
  }
  Model.prototype.destructor = function() {};
  Model.prototype.has_been_modified = function() {
    return this._date_last_modification > Model._counter - 2 || Model._force_m;
  };
  Model.prototype.has_been_directly_modified = function() {
    return this._date_last_modification > Model._counter - 1 || Model._force_m;
  };
  Model.prototype.bind = function(f, onchange_construction) {
    if (onchange_construction == null) {
      onchange_construction = true;
    }
    if (f instanceof View) {
      this._views.push(f);
      f._models.push(this);
      if (onchange_construction) {
        Model._n_views[f.view_id] = f;
        return Model._need_sync_views();
      }
    } else {
      return new BindView(this, onchange_construction, f);
    }
  };
  Model.prototype.unbind = function(f) {
    var v, _i, _len, _ref, _results;
    if (f instanceof View) {
      this._views.splice(this._views.indexOf(f), 1);
      return f._models.splice(f._models.indexOf(this), 1);
    } else {
      _ref = this._views;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        v = _ref[_i];
        if (v instanceof BindView && v.f === f) {
          _results.push(this.unbind(v));
        }
      }
      return _results;
    }
  };
  Model.prototype.get = function() {
    var name, res, _i, _len, _ref;
    res = {};
    _ref = this._attribute_names;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      name = _ref[_i];
      res[name] = this[name].get();
    }
    return res;
  };
  Model.prototype.set = function(value) {
    if (this._set(value)) {
      this._signal_change();
      return true;
    }
    return false;
  };
  Model.prototype.set_state = function(str) {
    var l, lst, map, mid, s, _i, _len;
    map = {};
    lst = str.split("\n");
    mid = lst.shift();
    for (_i = 0, _len = lst.length; _i < _len; _i++) {
      l = lst[_i];
      if (l.length) {
        s = l.split(" ");
        map[s[0]] = {
          type: s[1],
          data: s[2],
          buff: void 0
        };
      }
    }
    map[mid].buff = this;
    return this._set_state(map[mid].data, map);
  };
  Model.prototype.get_state = function(date) {
    var fmm, id, obj, res;
    if (date == null) {
      date = -1;
    }
    fmm = {};
    this._get_flat_model_map(fmm, date);
    res = this.model_id.toString();
    if (this._date_last_modification > date) {
      for (id in fmm) {
        obj = fmm[id];
        res += "\n" + obj.model_id + " " + Model.get_object_class(obj) + " " + obj._get_state();
      }
    }
    return res;
  };
  Model.prototype.add_attr = function(n, p, signal_change) {
    var key, val, _results;
    if (signal_change == null) {
      signal_change = true;
    }
    if (p != null) {
      if (typeof p === "function") {
        return this[n] = p;
      } else {
        if (this[n] != null) {
          console.error("attribute " + n + " already exists in " + (Model.get_object_class(this)));
        }
        p = Model.conv(p);
        if (__indexOf.call(p._parents, this) < 0) {
          p._parents.push(this);
        }
        this._attribute_names.push(n);
        this[n] = p;
        if (signal_change) {
          return this._signal_change();
        }
      }
    } else {
      _results = [];
      for (key in n) {
        val = n[key];
        if (val != null) {
          _results.push(this.add_attr(key, val, signal_change));
        }
      }
      return _results;
    }
  };
  Model.prototype.rem_attr = function(name, signal_change) {
    var c, i;
    if (signal_change == null) {
      signal_change = true;
    }
    c = this[name];
    if (c) {
      i = c._parents.indexOf(this);
      if (i >= 0) {
        c._parents.splice(i, 1);
        if (c._parents.length === 0) {
          c.destructor();
        }
      }
      delete this[name];
      i = this._attribute_names.indexOf(name);
      if (i >= 0) {
        this._attribute_names.splice(i, 1);
      }
      if (signal_change) {
        return this._signal_change();
      }
    }
  };
  Model.prototype.mod_attr = function(n, p) {
    if (this[n] !== p) {
      this.rem_attr(n);
      return this.add_attr(n, p);
    }
  };
  Model.prototype.set_attr = function(o) {
    var k, r, to_rem, v, _i, _len, _results;
    for (k in o) {
      v = o[k];
      this.mod_attr(k, v);
    }
    to_rem = (function() {
      var _i, _len, _ref, _results;
      _ref = this._attribute_names;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        k = _ref[_i];
        if (!(o[k] != null)) {
          _results.push(k);
        }
      }
      return _results;
    }).call(this);
    _results = [];
    for (_i = 0, _len = to_rem.length; _i < _len; _i++) {
      r = to_rem[_i];
      _results.push(this.rem_attr(r));
    }
    return _results;
  };
  Model.prototype.size = function(for_display) {
    if (for_display == null) {
      for_display = false;
    }
    return [];
  };
  Model.prototype.dim = function(for_display) {
    if (for_display == null) {
      for_display = false;
    }
    return this.size(for_display).length;
  };
  Model.prototype.equals = function(m) {
    var key, u, val, _i, _j, _len, _len2, _ref, _ref2;
    if (this === m) {
      return true;
    }
    if (m._attribute_names != null) {
      u = {};
      _ref = m._attribute_names;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        key = _ref[_i];
        val = m[key];
        if (!(this[key] != null)) {
          return false;
        }
        if (!this[key].equals(val)) {
          return false;
        }
        u[key] = true;
      }
      _ref2 = this._attribute_names;
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        key = _ref2[_j];
        if (!(u[key] != null)) {
          return false;
        }
      }
    }
    return false;
  };
  Model.prototype.get_parents_that_check = function(func_to_check) {
    var res, visited;
    res = [];
    visited = {};
    this._get_parents_that_check_rec(res, visited, func_to_check);
    return res;
  };
  Model.prototype.deep_copy = function() {
    var key, o, _i, _len, _ref;
    o = {};
    _ref = this._attribute_names;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      key = _ref[_i];
      o[key] = this[key].deep_copy();
    }
    eval("var __new__ = new " + (Model.get_object_class(this)) + ";");
    __new__.set_attr(o);
    return __new__;
  };
  Model.prototype.real_change = function() {
    var a, _i, _len, _ref;
    if (this.has_been_directly_modified() && !this._attribute_names.length) {
      return true;
    }
    _ref = this._attribute_names;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      a = _ref[_i];
      if (typeof this.cosmetic_attribute === "function" ? this.cosmetic_attribute(a) : void 0) {
        continue;
      }
      if (this[a].real_change()) {
        return true;
      }
    }
    return false;
  };
  Model.prototype.cosmetic_attribute = function(name) {
    return false;
  };
  Model.new_from_state = function(str) {
    var l, lst, map, mid, s, _i, _len;
    map = {};
    lst = str.split("\n");
    mid = lst.shift();
    for (_i = 0, _len = lst.length; _i < _len; _i++) {
      l = lst[_i];
      if (l.length) {
        s = l.split(" ");
        map[s[0]] = {
          type: s[1],
          data: s[2],
          buff: void 0
        };
      }
    }
    eval("var __new__ = new " + map[mid].type + ";");
    __new__._set_state(map[mid].data, map);
    return __new__;
  };
  Model.load = function(filename, func) {
    if (!Model.synchronizer) {
      Model._synchro = new Synchronizer;
    }
    return Model._synchro.load(filename, func);
  };
  Model.conv = function(v) {
    if (v instanceof Model) {
      return v;
    }
    if (v instanceof Array) {
      return new Lst(v);
    }
    if (typeof v === "string") {
      return new Str(v);
    }
    if (typeof v === "number") {
      return new Val(v);
    }
    if (typeof v === "boolean") {
      return new Bool(v);
    }
    if (v instanceof Object) {
      return new Model(v);
    }
    return new Obj(v);
  };
  Model.get_object_class = function(obj) {
    var arr;
    if (obj && obj.constructor && obj.constructor.toString) {
      arr = obj.constructor.toString().match(/function\s*(\w+)/);
      if (arr && arr.length === 2) {
        return arr[1];
      }
    }
  };
  Model.prototype._get_state = function() {
    var name, str;
    str = (function() {
      var _i, _len, _ref, _results;
      _ref = this._attribute_names;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        name = _ref[_i];
        _results.push(name + ":" + this[name].model_id);
      }
      return _results;
    }).call(this);
    return str.join(",");
  };
  Model.prototype._get_fs_data = function(out) {
    var name, obj, str;
    FileSystem.set_server_id_if_necessary(out, this);
    str = (function() {
      var _i, _len, _ref, _results;
      _ref = this._attribute_names;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        name = _ref[_i];
        obj = this[name];
        FileSystem.set_server_id_if_necessary(out, obj);
        _results.push(name + ":" + obj._server_id);
      }
      return _results;
    }).call(this);
    return out.mod += "C " + this._server_id + " " + (str.join(",")) + " ";
  };
  Model.prototype._set = function(value) {
    var change, key, used, val, _i, _j, _len, _len2, _ref, _ref2;
    change = false;
    used = {};
    _ref = Model._get_attribute_names(value);
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      key = _ref[_i];
      used[key] = true;
    }
    _ref2 = (function() {
      var _i, _len, _ref, _results;
      _ref = this._attribute_names;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        key = _ref[_i];
        if (!used[key]) {
          _results.push(key);
        }
      }
      return _results;
    }).call(this);
    for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
      key = _ref2[_j];
      change = true;
      this.rem_attr(key, false);
    }
    for (key in value) {
      val = value[key];
      if (val != null) {
        if (this[key] != null) {
          if (this[key].constructor === val.constructor) {
            change |= this[key].set(val);
          } else {
            change = true;
            this.mod_attr(key, val, false);
          }
        } else {
          this.add_attr(key, val, false);
        }
      }
    }
    return change;
  };
  Model._get_attribute_names = function(m) {
    var key, val, _results;
    if (m instanceof Model) {
      return m._attribute_names;
    } else {
      _results = [];
      for (key in m) {
        val = m[key];
        _results.push(key);
      }
      return _results;
    }
  };
  Model.prototype._signal_change = function(change_level) {
    var p, _i, _len, _ref;
    if (change_level == null) {
      change_level = 2;
    }
    if (change_level === 2 && (this._server_id != null)) {
      FileSystem.signal_change(this);
    }
    Model._modlist[this.model_id] = this;
    if (this._date_last_modification <= Model._counter) {
      this._date_last_modification = Model._counter + change_level;
      _ref = this._parents;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        p = _ref[_i];
        p._signal_change(1);
      }
    }
    return Model._need_sync_views();
  };
  Model.prototype._set_state = function(str, map) {
    var attr, inr, k_id, spl, u, _i, _j, _len, _len2, _ref, _ref2, _results;
    u = {};
    if (str.length) {
      _ref = str.split(",");
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        spl = _ref[_i];
        inr = spl.split(":");
        attr = inr[0];
        k_id = inr[1];
        u[attr] = true;
        if (map[k_id].buff != null) {
          if (!(this[attr] != null)) {
            this.add_attr(attr, map[k_id].buff);
          } else if (map[k_id].buff !== this[attr]) {
            this.mod_attr(attr, map[k_id].buff);
          }
        } else if (!(this[attr] != null)) {
          this.add_attr(attr, Model._new_model_from_state(k_id, map));
        } else if (!this[attr]._set_state_if_same_type(k_id, map)) {
          this.mod_attr(attr, Model._new_model_from_state(k_id, map));
        }
      }
    }
    _ref2 = this._attribute_names;
    _results = [];
    for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
      attr = _ref2[_j];
      _results.push(!u[attr] ? this.rem_attr(attr) : void 0);
    }
    return _results;
  };
  Model.prototype._get_parents_that_check_rec = function(res, visited, func_to_check) {
    var p, _i, _len, _ref, _results;
    if (!(visited[this.model_id] != null)) {
      visited[this.model_id] = true;
      if (func_to_check(this)) {
        return res.push(this);
      } else {
        _ref = this._parents;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          p = _ref[_i];
          _results.push(p._get_parents_that_check_rec(res, visited, func_to_check));
        }
        return _results;
      }
    }
  };
  Model.prototype._set_state_if_same_type = function(mid, map) {
    var dat;
    dat = map[mid];
    if (Model.get_object_class(this) === dat.type) {
      dat.buff = this;
      this._set_state(dat.data, map);
      return true;
    }
    return false;
  };
  Model.prototype._get_flat_model_map = function(map, date) {
    var name, obj, _i, _len, _ref, _results;
    map[this.model_id] = this;
    _ref = this._attribute_names;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      name = _ref[_i];
      obj = this[name];
      _results.push(!(map[obj.model_id] != null) ? obj._date_last_modification > date ? obj._get_flat_model_map(map, date) : void 0 : void 0);
    }
    return _results;
  };
  Model._new_model_from_state = function(mid, map) {
    var info;
    info = map[mid];
    eval("info.buff = new " + info.type + ";");
    info.buff._set_state(info.data, map);
    return info.buff;
  };
  Model._need_sync_views = function() {
    if (!(Model._timeout != null)) {
      return Model._timeout = setTimeout(Model._sync_views, 1);
    }
  };
  Model._sync_views = function() {
    var id, model, view, views, _i, _len, _ref, _ref2, _ref3;
    views = {};
    _ref = Model._modlist;
    for (id in _ref) {
      model = _ref[id];
      _ref2 = model._views;
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        view = _ref2[_i];
        views[view.view_id] = {
          value: view,
          force: false
        };
      }
    }
    _ref3 = Model._n_views;
    for (id in _ref3) {
      view = _ref3[id];
      views[id] = {
        value: view,
        force: true
      };
    }
    Model._timeout = void 0;
    Model._modlist = {};
    Model._n_views = {};
    Model._counter += 2;
    for (id in views) {
      view = views[id];
      Model._force_m = view.force;
      view.value.onchange();
    }
    return Model._force_m = false;
  };
  return Model;
})();var Obj;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
Obj = (function() {
  __extends(Obj, Model);
  function Obj(data) {
    Obj.__super__.constructor.call(this);
    if (data != null) {
      this._set(data);
    }
  }
  Obj.prototype.toString = function() {
    var _ref;
    return (_ref = this._data) != null ? _ref.toString() : void 0;
  };
  Obj.prototype.equals = function(obj) {
    if (obj instanceof Obj) {
      return this._data === obj._data;
    }
    return this._data === obj;
  };
  Obj.prototype.get = function() {
    return this._data;
  };
  Obj.prototype._get_fs_data = function(out) {
    FileSystem.set_server_id_if_necessary(out, this);
    return out.mod += "C " + this._server_id + " " + (this.toString()) + " ";
  };
  Obj.prototype._set = function(value) {
    if (this._data !== value) {
      this._data = value;
      return true;
    }
    return false;
  };
  Obj.prototype._get_state = function() {
    return this._data;
  };
  Obj.prototype._set_state = function(str, map) {
    return this.set(str);
  };
  return Obj;
})();var Lst;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __indexOf = Array.prototype.indexOf || function(item) {
  for (var i = 0, l = this.length; i < l; i++) {
    if (this[i] === item) return i;
  }
  return -1;
};
Lst = (function() {
  __extends(Lst, Model);
  function Lst(data) {
    var d, i, s;
    Lst.__super__.constructor.call(this);
    this.length = 0;
    s = this.static_length();
    if (s >= 0) {
      d = this.default_value();
      for (i = 0; (0 <= s ? i < s : i > s); (0 <= s ? i += 1 : i -= 1)) {
        this.push(d, true);
      }
    }
    if (data != null) {
      this._set(data);
    }
  }
  Lst.prototype.static_length = function() {
    return -1;
  };
  Lst.prototype.default_value = function() {
    return 0;
  };
  Lst.prototype.base_type = function() {
    return void 0;
  };
  Lst.prototype.get = function() {
    var i, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = this.length; _i < _len; _i++) {
      i = this[_i];
      _results.push(i.get());
    }
    return _results;
  };
  Lst.prototype.size = function() {
    return [length];
  };
  Lst.prototype.toString = function() {
    var l, x;
    if (this.length) {
      l = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = this.length; _i < _len; _i++) {
          x = this[_i];
          _results.push(x.toString());
        }
        return _results;
      }).call(this);
      return l.join();
    } else {
      return "";
    }
  };
  Lst.prototype.equals = function(lst) {
    var i, _ref;
    if (this.length !== lst.length) {
      return false;
    }
    for (i = 0, _ref = this.length; (0 <= _ref ? i < _ref : i > _ref); (0 <= _ref ? i += 1 : i -= 1)) {
      if (!this[i].equals(lst[i])) {
        return false;
      }
    }
    return true;
  };
  Lst.prototype.push = function(value, force) {
    var b;
    if (force == null) {
      force = false;
    }
    if (this._static_size_check(force)) {
      return;
    }
    b = this.base_type();
    if (b != null) {
      if (!(value instanceof b)) {
        value = new b(value);
      }
    } else {
      value = Model.conv(value);
    }
    if (__indexOf.call(value._parents, this) < 0) {
      value._parents.push(this);
    }
    this[this.length] = value;
    this.length += 1;
    return this._signal_change();
  };
  Lst.prototype.pop = function() {
    var old;
    if (this._static_size_check(false)) {
      return;
    }
    if (this.length <= 0) {
      return;
    }
    this.length -= 1;
    old = this[this.length];
    this.rem_attr(this.length);
    return old;
  };
  Lst.prototype.clear = function() {
    var _results;
    _results = [];
    while (this.length) {
      _results.push(this.pop());
    }
    return _results;
  };
  Lst.prototype.unshift = function(element) {
    var b, i, _ref;
    if (this._static_size_check(false)) {
      return;
    }
    b = this.base_type();
    if (b != null) {
      if (!(element instanceof b)) {
        element = new b(element);
      }
    } else {
      element = Model.conv(element);
    }
    if (__indexOf.call(element._parents, this) < 0) {
      element._parents.push(this);
    }
    if (this.length) {
      for (i = _ref = this.length - 1; (_ref <= 0 ? i <= 0 : i >= 0); (_ref <= 0 ? i += 1 : i -= 1)) {
        this[i + 1] = this[i];
      }
    }
    this[0] = element;
    this.length += 1;
    this._signal_change();
    return this.length;
  };
  Lst.prototype.shift = function() {
    var r;
    r = this[0];
    this.splice(0, 1);
    return r;
  };
  Lst.prototype.remove = function(item) {
    var i;
    i = this.indexOf(item);
    if (i >= 0) {
      return this.splice(i, 1);
    }
  };
  Lst.prototype.remove_ref = function(item) {
    var i;
    i = this.indexOf_ref(item);
    if (i >= 0) {
      return this.splice(i, 1);
    }
  };
  Lst.prototype.filter = function(f) {
    var i, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = this.length; _i < _len; _i++) {
      i = this[_i];
      if (f(i)) {
        _results.push(i);
      }
    }
    return _results;
  };
  Lst.prototype.detect = function(f) {
    var i, _i, _len;
    for (_i = 0, _len = this.length; _i < _len; _i++) {
      i = this[_i];
      if (f(i)) {
        return i;
      }
    }
    return void 0;
  };
  Lst.prototype.sorted = function(fun_sort) {
    var it, new_array, _i, _len;
    new_array = new Array;
    for (_i = 0, _len = this.length; _i < _len; _i++) {
      it = this[_i];
      new_array.push(it);
    }
    new_array.sort(fun_sort);
    return new_array;
  };
  Lst.prototype.has = function(f) {
    var i, _i, _len;
    for (_i = 0, _len = this.length; _i < _len; _i++) {
      i = this[_i];
      if (f(i)) {
        return true;
      }
    }
    return false;
  };
  Lst.prototype.indexOf = function(v) {
    var i, _ref;
    for (i = 0, _ref = this.length; (0 <= _ref ? i < _ref : i > _ref); (0 <= _ref ? i += 1 : i -= 1)) {
      if (this[i].equals(v)) {
        return i;
      }
    }
    return -1;
  };
  Lst.prototype.indexOf_ref = function(v) {
    var i, _ref;
    for (i = 0, _ref = this.length; (0 <= _ref ? i < _ref : i > _ref); (0 <= _ref ? i += 1 : i -= 1)) {
      if (this[i] === v) {
        return i;
      }
    }
    return -1;
  };
  Lst.prototype.contains = function(v) {
    return this.indexOf(v) >= 0;
  };
  Lst.prototype.contains_ref = function(v) {
    return this.indexOf_ref(v) >= 0;
  };
  Lst.prototype.toggle = function(v) {
    var i;
    i = this.indexOf(v);
    if (i >= 0) {
      this.splice(i);
      return false;
    } else {
      this.push(v);
      return true;
    }
  };
  Lst.prototype.toggle_ref = function(v) {
    var i;
    i = this.indexOf_ref(v);
    if (i >= 0) {
      this.splice(i);
      return false;
    } else {
      this.push(v);
      return true;
    }
  };
  Lst.prototype.slice = function(begin, end) {
    var i, tab;
    if (end == null) {
      end = this.length;
    }
    if (begin < 0) {
      begin = 0;
    }
    if (end > this.length) {
      end = this.length;
    }
    tab = new Lst;
    for (i = begin; (begin <= end ? i < end : i > end); (begin <= end ? i += 1 : i -= 1)) {
      tab.push(this[i].get());
    }
    return tab;
  };
  Lst.prototype.concat = function(new_tab, force) {
    var el, _i, _len;
    if (force == null) {
      force = false;
    }
    if (this._static_size_check(force)) {
      return;
    }
    if (new_tab.length) {
      for (_i = 0, _len = new_tab.length; _i < _len; _i++) {
        el = new_tab[_i];
        this.push(el);
      }
      return this;
    }
  };
  Lst.prototype.splice = function(index, n) {
    var i, _ref, _ref2, _ref3, _ref4;
    if (n == null) {
      n = 1;
    }
    if (this._static_size_check(false)) {
      return;
    }
    for (i = index, _ref = Math.min(index + n, this.length); (index <= _ref ? i < _ref : i > _ref); (index <= _ref ? i += 1 : i -= 1)) {
      this.rem_attr(i);
    }
    for (i = index, _ref2 = this.length - n; (index <= _ref2 ? i < _ref2 : i > _ref2); (index <= _ref2 ? i += 1 : i -= 1)) {
      this[i] = this[i + n];
    }
    for (i = _ref3 = this.length - n, _ref4 = this.length; (_ref3 <= _ref4 ? i < _ref4 : i > _ref4); (_ref3 <= _ref4 ? i += 1 : i -= 1)) {
      delete this[i];
    }
    this.length -= n;
    return this._signal_change();
  };
  Lst.prototype.insert = function(index, list) {
    var i, l, o, _i, _j, _len, _len2, _results;
    if (list.length) {
      l = Math.max(this.length - index, 0);
      o = (function() {
        var _results;
        _results = [];
        for (i = 0; (0 <= l ? i < l : i > l); (0 <= l ? i += 1 : i -= 1)) {
          _results.push(this.pop());
        }
        return _results;
      }).call(this);
      o.reverse();
      for (_i = 0, _len = list.length; _i < _len; _i++) {
        l = list[_i];
        this.push(l);
      }
      _results = [];
      for (_j = 0, _len2 = o.length; _j < _len2; _j++) {
        l = o[_j];
        _results.push(this.push(l));
      }
      return _results;
    }
  };
  Lst.prototype.set_or_push = function(index, val) {
    if (index < this.length) {
      return this.mod_attr(index, val);
    } else if (index === this.length) {
      return this.push(val);
    }
  };
  Lst.prototype.trim = function(size) {
    var _results;
    _results = [];
    while (this.length > size) {
      _results.push(this.pop());
    }
    return _results;
  };
  Lst.prototype.join = function(sep) {
    return this.get().join(sep);
  };
  Lst.prototype.deep_copy = function() {
    var i, res, _ref;
    res = new Lst;
    for (i = 0, _ref = this.length; (0 <= _ref ? i < _ref : i > _ref); (0 <= _ref ? i += 1 : i -= 1)) {
      res.push(this[i].deep_copy());
    }
    return res;
  };
  Lst.prototype.back = function() {
    return this[this.length - 1];
  };
  Lst.prototype.real_change = function() {
    var a, _i, _len;
    if (this.has_been_directly_modified()) {
      return true;
    }
    for (_i = 0, _len = this.length; _i < _len; _i++) {
      a = this[_i];
      if (a.real_change()) {
        return true;
      }
    }
    return false;
  };
  Lst.prototype._set = function(value) {
    var change, p, s, _ref;
    change = this.length !== value.length;
    s = this.static_length();
    if (s >= 0 && change) {
      console.error("resizing a static array (type " + (Model.get_object_class(this)) + ") is forbidden");
    }
    for (p = 0, _ref = value.length; (0 <= _ref ? p < _ref : p > _ref); (0 <= _ref ? p += 1 : p -= 1)) {
      if (p < this.length) {
        change |= this[p].set(value[p]);
      } else if (s < 0) {
        this.push(value[p]);
      }
    }
    if (s < 0) {
      while (this.length > value.length) {
        this.pop();
      }
      this.length = value.length;
    }
    return change;
  };
  Lst.prototype._get_flat_model_map = function(map, date) {
    var obj, _i, _len, _results;
    map[this.model_id] = this;
    _results = [];
    for (_i = 0, _len = this.length; _i < _len; _i++) {
      obj = this[_i];
      _results.push(!(map[obj.model_id] != null) ? obj._date_last_modification > date ? obj._get_flat_model_map(map, date) : void 0 : void 0);
    }
    return _results;
  };
  Lst.prototype._get_fs_data = function(out) {
    var obj, str;
    FileSystem.set_server_id_if_necessary(out, this);
    str = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = this.length; _i < _len; _i++) {
        obj = this[_i];
        FileSystem.set_server_id_if_necessary(out, obj);
        _results.push(obj._server_id);
      }
      return _results;
    }).call(this);
    return out.mod += "C " + this._server_id + " " + (str.join(",")) + " ";
  };
  Lst.prototype._get_state = function() {
    var obj, str;
    str = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = this.length; _i < _len; _i++) {
        obj = this[_i];
        _results.push(obj.model_id);
      }
      return _results;
    }).call(this);
    return str.join(",");
  };
  Lst.prototype._set_state = function(str, map) {
    var attr, k_id, l_id, _ref, _ref2, _ref3, _results;
    l_id = str.split(",").filter(function(x) {
      return x.length;
    });
    while (this.length > l_id.length) {
      this.pop();
    }
    for (attr = 0, _ref = this.length; (0 <= _ref ? attr < _ref : attr > _ref); (0 <= _ref ? attr += 1 : attr -= 1)) {
      k_id = l_id[attr];
      if (map[k_id].buff != null) {
        if (map[k_id].buff !== this[attr]) {
          this.mod_attr(attr, map[k_id].buff);
        }
      } else if (!this[attr]._set_state_if_same_type(k_id, map)) {
        this.mod_attr(attr, Model._new_model_from_state(k_id, map));
      }
    }
    _results = [];
    for (attr = _ref2 = this.length, _ref3 = l_id.length; (_ref2 <= _ref3 ? attr < _ref3 : attr > _ref3); (_ref2 <= _ref3 ? attr += 1 : attr -= 1)) {
      k_id = l_id[attr];
      _results.push(map[k_id].buff != null ? this.push(map[k_id].buff) : this.push(Model._new_model_from_state(k_id, map)));
    }
    return _results;
  };
  Lst.prototype._static_size_check = function(force) {
    if (this.static_length() >= 0 && !force) {
      console.error("resizing a static array (type " + (Model.get_object_class(this)) + ") is forbidden");
      return true;
    }
    return false;
  };
  return Lst;
})();var Str;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
Str = (function() {
  __extends(Str, Obj);
  function Str(data) {
    Str.__super__.constructor.call(this);
    this._data = "";
    this.length = 0;
    if (data != null) {
      this._set(data);
    }
  }
  Str.prototype.toggle = function(str, space) {
    var i, l;
    if (space == null) {
      space = " ";
    }
    l = this._data.split(space);
    i = l.indexOf(str);
    if (i < 0) {
      l.push(str);
    } else {
      l.splice(i, 1);
    }
    return this.set(l.join(" "));
  };
  Str.prototype.contains = function(str) {
    return this._data.indexOf(str) >= 0;
  };
  Str.prototype.equals = function(str) {
    return this._data === str.toString();
  };
  Str.prototype.ends_with = function(str) {
    var l;
    l = this._data.match(str + "$");
    return (l != null ? l.length : void 0) && l[0] === str;
  };
  Str.prototype.deep_copy = function() {
    return new Str(this._data + "");
  };
  Str.prototype._get_fs_data = function(out) {
    FileSystem.set_server_id_if_necessary(out, this);
    return out.mod += "C " + this._server_id + " " + (encodeURI(this._data)) + " ";
  };
  Str.prototype._set = function(value) {
    var n;
    if (!(value != null)) {
      return this._set("");
    }
    n = value.toString();
    if (this._data !== n) {
      this._data = n;
      this.length = this._data.length;
      return true;
    }
    return false;
  };
  Str.prototype._get_state = function() {
    return encodeURI(this._data);
  };
  Str.prototype._set_state = function(str, map) {
    return this.set(decodeURIComponent(str));
  };
  return Str;
})();var View, bind;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
View = (function() {
  View._cur_view_id = 0;
  function View(m, onchange_construction) {
    var i, _i, _len;
    if (onchange_construction == null) {
      onchange_construction = true;
    }
    this.view_id = View._cur_view_id;
    View._cur_view_id += 1;
    this._models = [];
    if (m instanceof Model) {
      m.bind(this, onchange_construction);
    } else if (m.length != null) {
      for (_i = 0, _len = m.length; _i < _len; _i++) {
        i = m[_i];
        i.bind(this, onchange_construction);
      }
    } else if (m != null) {
      console.error("View constructor doesn't know what to do with", m);
    }
  }
  View.prototype.destructor = function() {
    var i, m, _i, _len, _ref, _results;
    _ref = this._models;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      m = _ref[_i];
      i = m._views.indexOf(this);
      _results.push(i >= 0 ? m._views.splice(i, 1) : void 0);
    }
    return _results;
  };
  View.prototype.onchange = function() {};
  return View;
})();
bind = __bind(function(m, f) {
  var i, _i, _len, _results;
  if (m instanceof Model) {
    return m.bind(f);
  } else {
    _results = [];
    for (_i = 0, _len = m.length; _i < _len; _i++) {
      i = m[_i];
      _results.push(i.bind(f));
    }
    return _results;
  }
}, this);var Bool;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
Bool = (function() {
  __extends(Bool, Obj);
  function Bool(data) {
    Bool.__super__.constructor.call(this);
    this._data = false;
    if (data != null) {
      this._set(data);
    }
  }
  Bool.prototype.toggle = function() {
    return this.set(!this._data);
  };
  Bool.prototype.toBoolean = function() {
    return this._data;
  };
  Bool.prototype.deep_copy = function() {
    return new Bool(this._data);
  };
  Bool.prototype._set = function(value) {
    var n;
    if (n instanceof Model) {
      n = value.toBoolean();
    } else if (value === "false") {
      n = false;
    } else if (value === "true") {
      n = true;
    } else {
      n = Boolean(value);
    }
    if (this._data !== n) {
      this._data = n;
      return true;
    }
    return false;
  };
  Bool.prototype._get_fs_data = function(out) {
    FileSystem.set_server_id_if_necessary(out, this);
    return out.mod += "C " + this._server_id + " " + (1 * Boolean(this._data)) + " ";
  };
  return Bool;
})();var Button;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
Button = (function() {
  __extends(Button, Model);
  function Button(label_off, label_on, state, disabled) {
    if (label_off == null) {
      label_off = "Submit";
    }
    if (label_on == null) {
      label_on = label_off;
    }
    if (state == null) {
      state = false;
    }
    if (disabled == null) {
      disabled = false;
    }
    Button.__super__.constructor.call(this);
    this.add_attr({
      disabled: disabled,
      state: state,
      label: [label_off, label_on]
    });
  }
  Button.prototype.get = function() {
    return this.state.get();
  };
  Button.prototype.txt = function() {
    return this.label[this.state.get() * 1];
  };
  Button.prototype.equals = function(a) {
    return this.state.equals(a);
  };
  Button.prototype._set = function(state) {
    if (this.change_allowed(state)) {
      return this.state.set(state);
    }
  };
  Button.prototype.toggle = function() {
    return this.set(!this.get());
  };
  Button.prototype.change_allowed = function(state) {
    return 1;
  };
  return Button;
})();var Text;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
Text = (function() {
  __extends(Text, Str);
  function Text(data) {
    Text.__super__.constructor.call(this);
    this._data = "";
    this.length = 0;
    if (data != null) {
      this._set(data);
    }
  }
  Text.prototype.toggle = function(str, space) {
    var i, l;
    if (space == null) {
      space = " ";
    }
    l = this._data.split(space);
    i = l.indexOf(str);
    if (i < 0) {
      l.push(str);
    } else {
      l.splice(i, 1);
    }
    return this.set(l.join(" "));
  };
  Text.prototype.contains = function(str) {
    return this._data.indexOf(str) >= 0;
  };
  Text.prototype.equals = function(str) {
    return this._data === str.toString();
  };
  Text.prototype.ends_with = function(str) {
    var l;
    l = this._data.match(str + "$");
    return (l != null ? l.length : void 0) && l[0] === str;
  };
  Text.prototype.deep_copy = function() {
    return new Str(this._data + "");
  };
  Text.prototype._get_fs_data = function(out) {
    FileSystem.set_server_id_if_necessary(out, this);
    return out.mod += "C " + this._server_id + " " + (encodeURI(this._data)) + " ";
  };
  Text.prototype._set = function(value) {
    var n;
    if (!(value != null)) {
      return this._set("");
    }
    n = value.toString();
    if (this._data !== n) {
      this._data = n;
      this.length = this._data.length;
      return true;
    }
    return false;
  };
  Text.prototype._get_state = function() {
    return encodeURI(this._data);
  };
  Text.prototype._set_state = function(str, map) {
    return this.set(decodeURIComponent(str));
  };
  return Text;
})();var ConstOrNotModel;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
ConstOrNotModel = (function() {
  __extends(ConstOrNotModel, Model);
  function ConstOrNotModel(bool, model, check_disabled) {
    if (check_disabled == null) {
      check_disabled = true;
    }
    ConstOrNotModel.__super__.constructor.call(this);
    this.add_attr({
      bool: bool,
      model: model,
      check_disabled: check_disabled
    });
  }
  ConstOrNotModel.prototype.get = function() {
    var _ref;
    return (_ref = this.model) != null ? _ref.get() : void 0;
  };
  ConstOrNotModel.prototype.set = function(value) {
    var _ref;
    return (_ref = this.model) != null ? _ref.set(value) : void 0;
  };
  ConstOrNotModel.prototype.toString = function() {
    var _ref;
    return (_ref = this.model) != null ? _ref.toString() : void 0;
  };
  return ConstOrNotModel;
})();var ConstrainedVal;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
ConstrainedVal = (function() {
  __extends(ConstrainedVal, Model);
  function ConstrainedVal(value, params) {
    if (params == null) {
      params = {};
    }
    ConstrainedVal.__super__.constructor.call(this);
    this.add_attr({
      val: value || 0,
      _min: params.min != null ? params.min : 0,
      _max: params.max != null ? params.max : 100,
      _div: params.div != null ? params.div : 0
    });
  }
  ConstrainedVal.prototype.get = function() {
    return this.val.get();
  };
  ConstrainedVal.prototype.ratio = function() {
    return (this.val.get() - this._min.get()) / this.delta();
  };
  ConstrainedVal.prototype.delta = function() {
    return this._max.get() - this._min.get();
  };
  ConstrainedVal.prototype._set = function(value) {
    var res;
    if (value instanceof ConstrainedVal) {
      return this.val._set(value.get());
    }
    res = this.val.set(value);
    this._check_val();
    return res;
  };
  ConstrainedVal.prototype._check_val = function() {
    var d, m, n, r, s, v;
    v = this.val.get();
    m = this._min.get();
    n = this._max.get();
    d = this._div.get();
    if (v < m) {
      this.val.set(m);
    }
    if (v > n) {
      this.val.set(n);
    }
    if (d) {
      s = (n - m) / d;
      r = m + Math.round((this.val.get() - m) / s) * s;
      return this.val.set(r);
    }
  };
  return ConstrainedVal;
})();var Choice;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
Choice = (function() {
  __extends(Choice, Model);
  function Choice(data, initial_list) {
    if (initial_list == null) {
      initial_list = [];
    }
    Choice.__super__.constructor.call(this);
    this.add_attr({
      num: 0,
      lst: initial_list
    });
    if (data != null) {
      this.num.set(data);
    }
  }
  Choice.prototype.filter = function(obj) {
    return true;
  };
  Choice.prototype.item = function() {
    return this._nlst()[this.num.get()];
  };
  Choice.prototype.get = function() {
    var _ref;
    return (_ref = this.item()) != null ? _ref.get() : void 0;
  };
  Choice.prototype.toString = function() {
    var _ref;
    return (_ref = this.item()) != null ? _ref.toString() : void 0;
  };
  Choice.prototype.equals = function(a) {
    if (a instanceof Choice) {
      return Choice.__super__.equals.call(this, a);
    } else {
      return this._nlst()[this.num.get()].equals(a);
    }
  };
  Choice.prototype._set = function(value) {
    var i, j, _len, _ref;
    _ref = this._nlst();
    for (j = 0, _len = _ref.length; j < _len; j++) {
      i = _ref[j];
      if (i.equals(value)) {
        return this.num.set(j);
      }
    }
    return this.num.set(value);
  };
  Choice.prototype._nlst = function() {
    var l, _i, _len, _ref, _results;
    _ref = this.lst;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      l = _ref[_i];
      if (this.filter(l)) {
        _results.push(l);
      }
    }
    return _results;
  };
  return Choice;
})();var BindView;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
BindView = (function() {
  __extends(BindView, View);
  function BindView(model, onchange_construction, f) {
    this.f = f;
    BindView.__super__.constructor.call(this, model, onchange_construction);
  }
  BindView.prototype.onchange = function() {
    return this.f();
  };
  return BindView;
})();var Val;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
Val = (function() {
  __extends(Val, Obj);
  function Val(data) {
    Val.__super__.constructor.call(this);
    this._data = 0;
    if (data != null) {
      this._set(data);
    }
  }
  Val.prototype.toggle = function() {
    return this.set(!this._data);
  };
  Val.prototype.toBoolean = function() {
    return Boolean(this._data);
  };
  Val.prototype.deep_copy = function() {
    return new Val(this._data);
  };
  Val.prototype.add = function(v) {
    if (v) {
      this._data += v;
      return this._signal_change();
    }
  };
  Val.prototype._set = function(value) {
    var n;
    if (typeof value === "string") {
      if (value.slice(0, 2) === "0x") {
        n = parseInt(value, 16);
      } else {
        n = parseFloat(value);
        if (isNaN(n)) {
          n = parseInt(value);
        }
        if (isNaN(n)) {
          console.log("Don't know how to transform " + value + " to a Val");
        }
      }
    } else if (typeof value === "boolean") {
      n = 1 * value;
    } else if (value instanceof Val) {
      n = value._data;
    } else {
      n = value;
    }
    if (this._data !== n) {
      this._data = n;
      return true;
    }
    return false;
  };
  return Val;
})();var Vec;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
Vec = (function() {
  __extends(Vec, Lst);
  function Vec(data) {
    Vec.__super__.constructor.call(this, data);
  }
  Vec.prototype.base_type = function() {
    return Val;
  };
  Vec.prototype._underlying_fs_type = function() {
    return "Lst";
  };
  return Vec;
})();