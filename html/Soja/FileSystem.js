var FileSystem;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
FileSystem = (function() {
  FileSystem._cur_tmp_server_id = 0;
  FileSystem._sig_server = true;
  FileSystem._disp = false;
  FileSystem._objects_to_send = {};
  FileSystem._timer_send = void 0;
  FileSystem._timer_chan = void 0;
  FileSystem._nb_callbacks = 0;
  FileSystem._callbacks = {};
  FileSystem._nb_insts = 0;
  FileSystem._insts = {};
  FileSystem._files_to_upload = {};
  FileSystem._ptr_to_update = {};
  FileSystem._tmp_objects = {};
  FileSystem._objects = {};
  FileSystem.url_com = "/sceen/_";
  FileSystem.url_upload = "/sceen/upload";
  function FileSystem() {
    this._data_to_send = "";
    this._session_num = -2;
    this._num_inst = FileSystem._nb_insts++;
    FileSystem._insts[this._num_inst] = this;
    this.send("S " + this._num_inst + " ");
  }
  FileSystem.prototype.load = function(path, callback) {
    FileSystem._send_chan();
    this.send("L " + FileSystem._nb_callbacks + " " + (encodeURI(path)) + " ");
    FileSystem._callbacks[FileSystem._nb_callbacks] = callback;
    return FileSystem._nb_callbacks++;
  };
  FileSystem.prototype.load_or_make_dir = function(dir, callback) {
    return this.load(dir, __bind(function(res, err) {
      var lst, nir, oir, v;
      if (err) {
        lst = (function() {
          var _i, _len, _ref, _results;
          _ref = dir.split('/');
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            v = _ref[_i];
            if (v.length) {
              _results.push(v);
            }
          }
          return _results;
        })();
        nir = lst.pop();
        oir = "/" + lst.join("/");
        return this.load_or_make_dir(oir, __bind(function(n_res, n_err) {
          var n_dir;
          n_dir = new Directory;
          n_res.add_file(nir, n_dir);
          return callback(n_dir, n_err);
        }, this));
      } else {
        return callback(res, err);
      }
    }, this));
  };
  FileSystem.prototype.load_ptr = function(ptr, callback) {
    FileSystem._send_chan();
    this.send("l " + FileSystem._nb_callbacks + " " + ptr + " ");
    FileSystem._callbacks[FileSystem._nb_callbacks] = callback;
    return FileSystem._nb_callbacks++;
  };
  FileSystem.prototype.send = function(data) {
    this._data_to_send += data;
    if (!(FileSystem._timer_send != null)) {
      return FileSystem._timer_send = setTimeout(FileSystem._timeout_send_func, 1);
    }
  };
  FileSystem.prototype.make_channel = function() {
    var xhr_object;
    xhr_object = FileSystem._my_xml_http_request();
    xhr_object.open('GET', FileSystem.url_com + ("?s=" + this._session_num), true);
    xhr_object.onreadystatechange = function() {
      var _w;
      if (this.readyState === 4 && this.status === 200) {
        if (FileSystem._disp) {
          console.log("chan ->", this.responseText);
        }
        _w = function(sid, obj) {
          if ((sid != null) && (obj != null)) {
            obj._server_id = sid;
            return FileSystem._objects[sid] = obj;
          }
        };
        FileSystem._sig_server = false;
        eval(this.responseText);
        return FileSystem._sig_server = true;
      }
    };
    return xhr_object.send();
  };
  FileSystem.get_inst = function() {
    var i, k, _ref;
    _ref = FileSystem._insts;
    for (k in _ref) {
      i = _ref[k];
      return i;
    }
    return new FileSystem;
  };
  FileSystem.set_server_id_if_necessary = function(out, obj) {
    var ncl;
    if (!(obj._server_id != null)) {
      obj._server_id = FileSystem._get_new_tmp_server_id();
      FileSystem._tmp_objects[obj._server_id] = obj;
      ncl = Model.get_object_class(obj);
      if (obj._underlying_fs_type != null) {
        out.mod += "T " + obj._server_id + " " + ncl + " ";
        ncl = obj._underlying_fs_type();
      }
      out.cre += "N " + obj._server_id + " " + ncl + " ";
      return obj._get_fs_data(out);
    }
  };
  FileSystem.signal_change = function(m) {
    if (FileSystem._sig_server) {
      FileSystem._objects_to_send[m.model_id] = m;
      if (FileSystem._timer_chan != null) {
        clearTimeout(FileSystem._timer_chan);
      }
      return FileSystem._timer_chan = setTimeout(FileSystem._timeout_chan_func, 250);
    }
  };
  FileSystem._tmp_id_to_real = function(tmp_id, res) {
    var fs, ptr, tmp, xhr_object;
    tmp = FileSystem._tmp_objects[tmp_id];
    if (!(tmp != null)) {
      console.log(tmp_id);
    }
    FileSystem._objects[res] = tmp;
    tmp._server_id = res;
    delete FileSystem._tmp_objects[tmp_id];
    ptr = FileSystem._ptr_to_update[tmp_id];
    if (ptr != null) {
      delete FileSystem._ptr_to_update[tmp_id];
      ptr.data.value = res;
    }
    if ((FileSystem._files_to_upload[tmp_id] != null) && (tmp.file != null)) {
      delete FileSystem._files_to_upload[tmp_id];
      fs = FileSystem.get_inst();
      xhr_object = FileSystem._my_xml_http_request();
      xhr_object.open('PUT', FileSystem.url_com + ("?s=" + fs._session_num + "&p=" + tmp._server_id), true);
      xhr_object.onreadystatechange = function() {
        var _w;
        if (this.readyState === 4 && this.status === 200) {
          _w = function(sid, obj) {
            if ((sid != null) && (obj != null)) {
              obj._server_id = sid;
              return FileSystem._objects[sid] = obj;
            }
          };
          return eval(this.responseText);
        }
      };
      xhr_object.send(tmp.file);
      return delete tmp.file;
    }
  };
  FileSystem._get_new_tmp_server_id = function() {
    FileSystem._cur_tmp_server_id++;
    if (FileSystem._cur_tmp_server_id % 4 === 0) {
      FileSystem._cur_tmp_server_id++;
    }
    return FileSystem._cur_tmp_server_id;
  };
  FileSystem._send_chan = function() {
    var f, k, out, _ref, _results;
    out = FileSystem._get_chan_data();
    _ref = FileSystem._insts;
    _results = [];
    for (k in _ref) {
      f = _ref[k];
      _results.push(f.send(out));
    }
    return _results;
  };
  FileSystem._timeout_chan_func = function() {
    FileSystem._send_chan();
    return delete FileSystem._timer_chan;
  };
  FileSystem._get_chan_data = function() {
    var model, n, out, _ref;
    out = {
      cre: "",
      mod: ""
    };
    _ref = FileSystem._objects_to_send;
    for (n in _ref) {
      model = _ref[n];
      model._get_fs_data(out);
    }
    FileSystem._objects_to_send = {};
    return out.cre + out.mod;
  };
  FileSystem._timeout_send_func = function() {
    var f, k, out, xhr_object, _ref, _ref2;
    out = FileSystem._get_chan_data();
    _ref = FileSystem._insts;
    for (k in _ref) {
      f = _ref[k];
      f._data_to_send += out;
    }
    _ref2 = FileSystem._insts;
    for (k in _ref2) {
      f = _ref2[k];
      if (f._data_to_send.length) {
        if (f._session_num === -1) {
          continue;
        }
        if (f._session_num === -2) {
          f._session_num = -1;
        } else {
          f._data_to_send = ("s " + f._session_num + " ") + f._data_to_send;
        }
        xhr_object = FileSystem._my_xml_http_request();
        xhr_object.open('POST', FileSystem.url_com, true);
        xhr_object.onreadystatechange = function() {
          var c, _c, _i, _len, _results, _w;
          if (this.readyState === 4 && this.status === 200) {
            if (FileSystem._disp) {
              console.log("resp ->", this.responseText);
            }
            _c = [];
            _w = function(sid, obj) {
              if ((sid != null) && (obj != null)) {
                obj._server_id = sid;
                return FileSystem._objects[sid] = obj;
              }
            };
            FileSystem._sig_server = false;
            eval(this.responseText);
            FileSystem._sig_server = true;
            _results = [];
            for (_i = 0, _len = _c.length; _i < _len; _i++) {
              c = _c[_i];
              _results.push(FileSystem._callbacks[c[0]](FileSystem._objects[c[1]], c[2]));
            }
            return _results;
          }
        };
        if (FileSystem._disp) {
          console.log("sent ->", f._data_to_send + "E ");
        }
        xhr_object.setRequestHeader('Content-Type', 'text/plain');
        xhr_object.send(f._data_to_send + "E ");
        f._data_to_send = "";
      }
    }
    FileSystem._objects_to_send = {};
    return delete FileSystem._timer_send;
  };
  FileSystem._my_xml_http_request = function() {
    if (window.XMLHttpRequest) {
      return new XMLHttpRequest;
    }
    if (window.ActiveXObject) {
      return new ActiveXObject('Microsoft.XMLHTTP');
    }
    return alert('Your browser does not seem to support XMLHTTPRequest objects...');
  };
  return FileSystem;
})();var File;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
File = (function() {
  __extends(File, Model);
  function File(name, ptr_or_model, info) {
    var cp_info, key, val;
    if (name == null) {
      name = "";
    }
    if (ptr_or_model == null) {
      ptr_or_model = 0;
    }
    if (info == null) {
      info = {};
    }
    File.__super__.constructor.call(this);
    cp_info = {};
    for (key in info) {
      val = info[key];
      cp_info[key] = val;
    }
    if (ptr_or_model instanceof Model) {
      if (!(cp_info.model_type != null)) {
        cp_info.model_type = Model.get_object_class(ptr_or_model);
      }
      if (typeof ptr_or_model.get_file_info === "function") {
        ptr_or_model.get_file_info(cp_info);
      }
    }
    this.add_attr({
      name: name,
      _ptr: new Ptr(ptr_or_model),
      _info: cp_info
    });
  }
  File.prototype.load = function(callback) {
    return this._ptr.load(callback);
  };
  return File;
})();var Path;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
Path = (function() {
  __extends(Path, Model);
  function Path(file) {
    var size;
    this.file = file;
    Path.__super__.constructor.call(this);
    size = this.file != null ? this.file.fileSize != null ? this.file.fileSize : this.file.size : 0;
    this.add_attr({
      remaining: size,
      to_upload: size
    });
  }
  Path.prototype.get_file_info = function(info) {
    info.remaining = this.remaining;
    return info.to_upload = this.to_upload;
  };
  Path.prototype._get_fs_data = function(out) {
    Path.__super__._get_fs_data.call(this, out);
    if ((this.file != null) && this._server_id & 3) {
      return FileSystem._files_to_upload[this._server_id] = this;
    }
  };
  return Path;
})();var Ptr;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
Ptr = (function() {
  __extends(Ptr, Model);
  function Ptr(model) {
    Ptr.__super__.constructor.call(this);
    this.data = {};
    this._set(model);
  }
  Ptr.prototype.load = function(callback) {
    var _ref;
    if (this.data.model != null) {
      return callback(this.data.model, false);
    } else {
      return (_ref = FileSystem.get_inst()) != null ? _ref.load_ptr(this.data.value, callback) : void 0;
    }
  };
  Ptr.prototype._get_fs_data = function(out) {
    FileSystem.set_server_id_if_necessary(out, this);
    if (this.data.model != null) {
      FileSystem.set_server_id_if_necessary(out, this.data.model);
      out.mod += "C " + this._server_id + " " + this.data.model._server_id + " ";
      this.data.value = this.data.model._server_id;
      if (this.data.model._server_id & 3) {
        return FileSystem._ptr_to_update[this.data.model._server_id] = this;
      }
    } else {
      return out.mod += "C " + this._server_id + " " + this.data.value + " ";
    }
  };
  Ptr.prototype._set = function(model) {
    var res;
    if (typeof model === "number") {
      res = this.data.value !== model;
      this.data = {
        value: model
      };
      return res;
    }
    if (model instanceof Model) {
      res = this.data.value !== model._server_id;
      this.data = {
        model: model,
        value: model._server_id
      };
      return res;
    }
    return false;
  };
  Ptr.prototype._get_state = function() {
    return this._data;
  };
  Ptr.prototype._set_state = function(str, map) {
    return this.set(str);
  };
  return Ptr;
})();var Directory;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
Directory = (function() {
  __extends(Directory, Lst);
  function Directory() {
    Directory.__super__.constructor.call(this);
  }
  Directory.prototype.base_type = function() {
    return File;
  };
  Directory.prototype.find = function(name) {
    var f, _i, _len;
    for (_i = 0, _len = this.length; _i < _len; _i++) {
      f = this[_i];
      if (f.name.equals(name)) {
        return f;
      }
    }
    return void 0;
  };
  Directory.prototype.load = function(name, callback) {
    var f;
    f = this.find(name);
    if (f) {
      return f.load(callback);
    } else {
      return callback(void 0, "file does not exist");
    }
  };
  Directory.prototype.has = function(name) {
    var f, _i, _len;
    for (_i = 0, _len = this.length; _i < _len; _i++) {
      f = this[_i];
      if (f.name.equals(name)) {
        return true;
      }
    }
    return false;
  };
  Directory.prototype.add_file = function(name, obj, params) {
    var o, res;
    if (params == null) {
      params = {};
    }
    o = this.find(name);
    if (o != null) {
      return o;
    }
    res = new File(name, obj, params);
    this.push(res);
    return res;
  };
  Directory.prototype.get_file_info = function(info) {
    return info.icon = "folder";
  };
  return Directory;
})();var ModelEditorItem_Directory;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
ModelEditorItem_Directory = (function() {
  var sort_dir, sort_numerically;
  __extends(ModelEditorItem_Directory, ModelEditorItem);
  ModelEditorItem_Directory._action_list = {
    "Directory": [
      function(file, path, browser) {
        return browser.load_folder(file);
      }
    ]
  };
  function ModelEditorItem_Directory(params) {
    var key_map;
    ModelEditorItem_Directory.__super__.constructor.call(this, params);
    this.use_breadcrumb = params.use_breadcrumb != null ? params.use_breadcrumb : true;
    this.use_icons = params.use_icons != null ? params.use_icons : true;
    this.initial_path = params.initial_path != null ? params.initial_path : "Root";
    this.use_upload = params.use_upload != null ? params.use_upload : true;
    this.display = params.display != null ? params.display : "all";
    this.breadcrumb = new Lst;
    this.breadcrumb.push(this.model);
    this.breadcrumb.bind(this);
    this.initial_path = this.make_initial_path_as_dom(this.initial_path);
    this.index_sorted = new Lst;
    this.selected_file = new Lst;
    this.clipboard = new Lst;
    this.selected_file.bind(this);
    this.clipboard.bind(this);
    this.allow_shortkey = false;
    this.line_height = 30;
    this.ed.ondrop = __bind(function(evt) {
      return this.cancel_natural_hotkeys(evt);
    }, this);
    this.container = new_dom_element({
      parentNode: this.ed,
      nodeName: "div",
      className: "directory_container",
      ondragover: __bind(function(evt) {
        return false;
      }, this),
      ondragout: __bind(function(evt) {
        return false;
      }, this),
      ondragleave: __bind(function(evt) {
        return false;
      }, this),
      ondrop: __bind(function(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        this.handle_files(evt.dataTransfer.files);
        this.cancel_natural_hotkeys(evt);
        return false;
      }, this)
    });
    if (this.use_icons) {
      this.icon_scene = new_dom_element({
        parentNode: this.container,
        nodeName: "div",
        className: "icon_scene"
      });
      this.icon_up = new_dom_element({
        parentNode: this.icon_scene,
        nodeName: "img",
        src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADNUlEQVRIiaWW32scVRTHP/fcu1OlFNOfq1aK1aSg0DJGKP7CZpNYUBD/hQgGU1ta6Vuf+tYn6ZsPK0r0D1ApFqUldQql9kWbtJSKiArJ2iRN22zNSrPZmXt9uDO7m2R3SeKFw70MzPd7vud77pnBOceaV5FRijiKjK79pXWAv/HNm+7z8S/d01/tXjOJXit4IT8wdKznY0qVaXq3HuRudTacOzz7LOc59/8Iioz25fuHjvQcY3zuJuP3bhIEAQd3vcL80nw4M3inI0lnghR8pOcol0s/8fvCn8SScK96n0fJIq/ueo1yrRzODk6HvMsFzrO4EkI551BKrQTuAr7ty/f3jew7SlS6yuS/JRISEhw4C8qx8/GddHft5bupr7nx4PoEjgIjlDsTePCoL98fftA9woXJiLml+8QuxjqLdRaHA+VQKDYHm9m//QV+mDrHjbnrEyQUON4gkRaZR4X8QDjcfWQZeOIsiUtSFXF6jqnUFrj14Dbv7HmPcFtvSELEJ3StVtAEPvTcMBenfmS+9pCaS8FcgiXBOkvVLRHbGqIUIoJWwpZgCy/tOMDYH98z/vcvE1gKnKLsCT5TXUDUnx8M339+mIuTl5mPy8QuZubRXSq1Cgu1ClVb9Z0hghad7o0IdMDLO0J+/usav925PYGlYFIl0cCTg+FH+04wWSmxd9sechWDxXJl+hoO50G0xogPf/ZEbz1TQJRCKYUoxeEX30ashL9O3YoygvDSzBiXZsaWWXKm9yxbH3uCh0v/NMCX7QajBaM1n0ZnweIjITuHnuBDVvQpUMT5jDRaGqA5bTCS7jp7piEGTq/GMauAs2VBKZWWRuqlMaLJGVMn8LvxWbdY7QliUKiGoVpjtAduFcTrJUi8AhHB1EM3lcUQZEpEtyWQ1o+9AlEKrQRRXkVmaHPmgcl5BW1K1JEgU9Do+WYfUi+M92L9ChLvgagmH+pe+BbNaUOgcxskiAEFosSPhIyoXq6mEL3BEpHdTkEk86IR2X3QGzI5AaW8D9kIkJRM14ka84g2/w4d7wEoDj31OlW7WL9cWef4Fs2xyeQQ1T7P1l80gJO4+mxpFa0y/mL1qPgP7488BMECRR8AAAAASUVORK5CYII=",
        alt: "Parent",
        title: "Parent",
        onclick: __bind(function(evt) {
          return this.load_model_from_breadcrumb(this.breadcrumb.length - 2);
        }, this)
      });
      this.icon_new_folder = new_dom_element({
        parentNode: this.icon_scene,
        nodeName: "img",
        src: "data:image/png;base64,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",
        alt: "New folder",
        title: "New folder",
        onclick: __bind(function(evt) {
          var t;
          t = new Directory;
          return this.model.add_file("New folder", t);
        }, this)
      });
      this.icon_cut = new_dom_element({
        parentNode: this.icon_scene,
        nodeName: "img",
        src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAsNJREFUeNrsWUFknEEU3j/LEn5CWEJOYSukQihhKaUspZQQlpx6CiGEEHLKaQml5Lq99FDpJfS0JFRKhdBDhRBCqlWWkMhKdbVaje33+P56fr+/m53ZzG7M8JnZmXmz75s3++a92aDVamVuQxnI3JLiiXginogn4ol4Ip6ICZEgCEaAx6YKYI0ykHdpkVGgCiVCAxLDqDYAp0TyJLNusMYzYAQIjc+WRL+dAKUo4sAfaXcgf5/ygrFO9fi3ngGRvFLkCMhdQzYHnFD2B5A1JTJgYMlzVB/5cQJYvYb4GlBgewdrXTk7WtzZOWWVX8B4GzKTnBvJFU2tYXS0lGJ7Sqm9/8zNAvtq/qYNEraIFGI7vJAyd1HNu5DfWc8QoYKrSsFLccsJc8RVf1fz5m2RsElEvNCBUvJNwpxau0fQGREqOs07JVJ2Ro2VY05homeJUOHnSuE6MEzUVf+6bRKCwOa7FuOuQ7mp2fWC9TzrT8BdfOdv6+GvdRNnMo/U7sfxsBvWMLrZUzZmB9WrhKHXGHvXrXwk6MaTKcPzE/4+pDSAO/iuRr9liKOx0DxkX/+kurCGhCFV3i1RyTEJy/aTRRaYq8RLkWPdKYYeaoXuNro3llUY8pI5i2CTfTL2FPigPu8CD5xciDwq21SmyljrVLnZWkLUu6vGz4AKsGXrtjexhDSWVd9sWlTL3PyCc2ZVfyXaEBdEDnkscqpviAp9TZH7zN0fVH0h0926iwtxHPiiQw20v7E5lCIn90oTc38quaasRYvduNdqxN+i4Fojd9tMkWvG3LImeO6CiIQa8tJYUn2TrN+nyMljRQi5gtqAEq3x9sbdL3OPFj3VDHBP5eLFFLknnLPNCLnENSSPmXL1rlVJiG432pCrJcgtOU2sRAHgmJfhWpsyg3zvPaMVyz2XWPn/RzwRT8QT8UQ8kX4tfwUYAGsZeMHhw+7EAAAAAElFTkSuQmCC",
        alt: "cut",
        title: "Cut",
        onclick: __bind(function(evt) {
          return this.cut();
        }, this)
      });
      this.icon_copy = new_dom_element({
        parentNode: this.icon_scene,
        nodeName: "img",
        src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA61pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wUmlnaHRzPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvcmlnaHRzLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcFJpZ2h0czpNYXJrZWQ9IkZhbHNlIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InV1aWQ6QUUzRjQ2MDg4Rjg5REUxMUE4NjA5OUYxMjFBMjA0MjkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTQ3MjMwNDNCNUVGMTFFMEJBQTNCQkU0RDdCMTM1MUQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTQ3MjMwNDJCNUVGMTFFMEJBQTNCQkU0RDdCMTM1MUQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MzJFQjk0NERFRkI1RTAxMTlBQjRBRkQ5MDM5RjM1RUIiIHN0UmVmOmRvY3VtZW50SUQ9InV1aWQ6QUUzRjQ2MDg4Rjg5REUxMUE4NjA5OUYxMjFBMjA0MjkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7ANUMQAAAByklEQVR42uRXy0rDUBCdaBEVS62UtrYgQm23deWiP+Ff6zeIuBUsUREfaXIf44ylGCTJpHcKXXghJBAmc+55JJMIEWGbawe2vBqri5v7OfZaB8EPenpLYDbuRsEAuq19OOscBQNAQB0DbAWNHUJrG7ktgMqQWgCemnsFgNDanAQEwKNCgg0A0EjAtQ/zd1w3KTkJQMUAl0opKkpKjgFPD/EKBryYhKL7vwx4nQe4VpSwCgAqnFy3vuj+RhmQ6hElD/hwDzhrRAkqATB4FyiBcw4y60QGfLUJwxiw1lKdA5OlYoqw4L7qTcjNefd8NsbIDHhBgnVS4KippeZ8NqR/mmViPW7qW8BNh6e9JQusP+2+3V5oGfA1NCSQTDkdKTVN0wy+kuTnfNJqih7ipJQz4PnAWs2NySB+fqHGKSTJAoaDvpigVVIq3oTl8wA3d440t2w4A9ZYiOOYmicwGV+IO88npRTA66cp/Fgsm7slAGrMNLLjd80HXE6nou5/k1IK4PpqJE60t3eP2Kfhte4UVJSU8pmw5tChTYoKgDYph1FGLB8rGFAkpdvci6rH8po/HyFJGQ06kfxfUGOFJGU6Oa80d/Tv/46/BRgAiCASD+Xq5g4AAAAASUVORK5CYII=",
        alt: "copy",
        title: "Copy",
        onclick: __bind(function(evt) {
          return this.copy();
        }, this)
      });
      this.icon_paste = new_dom_element({
        parentNode: this.icon_scene,
        nodeName: "img",
        src: "data:image/png;base64,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",
        alt: "paste",
        title: "Paste",
        onclick: __bind(function(evt) {
          return this.paste();
        }, this)
      });
      this.icon_del_folder = new_dom_element({
        parentNode: this.icon_scene,
        nodeName: "img",
        src: "data:image/png;base64,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",
        alt: "Delete",
        title: "Delete",
        onclick: __bind(function(evt) {
          return this.delete_file();
        }, this),
        ondragover: __bind(function(evt) {
          return false;
        }, this),
        ondrop: __bind(function(evt) {
          this.delete_file();
          evt.stopPropagation();
          return false;
        }, this)
      });
    }
    if (this.use_upload) {
      this.upload_form = new_dom_element({
        parentNode: this.icon_scene,
        nodeName: "form"
      });
      this.txt_upload = new_dom_element({
        parentNode: this.icon_scene,
        nodeName: "span",
        txt: "Add new file(s) "
      });
      this.upload = new_dom_element({
        parentNode: this.icon_scene,
        nodeName: "input",
        type: "file",
        multiple: "true",
        onchange: __bind(function(evt) {
          return this.handle_files(this.upload.files);
        }, this)
      });
    }
    if (this.use_breadcrumb) {
      this.breadcrumb_dom = new_dom_element({
        parentNode: this.container,
        nodeName: "div"
      });
    }
    this.all_file_container = new_dom_element({
      parentNode: this.container,
      nodeName: "div"
    });
    key_map = {
      8: __bind(function(evt) {
        return this.load_model_from_breadcrumb(this.breadcrumb.length - 2);
      }, this),
      13: __bind(function(evt) {
        var ind_sel_file, index, _i, _len, _ref, _results;
        if (this.selected_file.length > 0) {
          _ref = this.selected_file.get();
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            ind_sel_file = _ref[_i];
            index = this.search_ord_index_from_id(ind_sel_file);
            _results.push(this.open(this.model[index], this.path()));
          }
          return _results;
        }
      }, this),
      37: __bind(function(evt) {
        var ind, index_last_file_selected;
        if (this.selected_file.length > 0) {
          if (evt.shiftKey) {
            index_last_file_selected = this.selected_file[this.selected_file.length - 1].get();
            if (!(this.reference_file != null)) {
              this.selected_file.clear();
              this.selected_file.push(index_last_file_selected);
              this.reference_file = index_last_file_selected;
            }
            if (index_last_file_selected > 0) {
              if (index_last_file_selected <= this.reference_file) {
                return this.selected_file.push(index_last_file_selected - 1);
              } else {
                return this.selected_file.pop();
              }
            }
          } else {
            ind = this.selected_file[this.selected_file.length - 1].get();
            if (ind !== 0) {
              this.selected_file.clear();
              this.selected_file.push(ind - 1);
            } else {
              this.selected_file.clear();
              this.selected_file.push(0);
            }
            return this.reference_file = void 0;
          }
        } else {
          this.selected_file.push(0);
          return this.reference_file = void 0;
        }
      }, this),
      38: __bind(function(evt) {
        if (evt.altKey) {
          return this.load_model_from_breadcrumb(this.breadcrumb.length - 2);
        }
      }, this),
      39: __bind(function(evt) {
        var ind, index_last_file_selected;
        if (this.selected_file.length > 0) {
          if (evt.shiftKey) {
            index_last_file_selected = this.selected_file[this.selected_file.length - 1].get();
            if (!(this.reference_file != null)) {
              this.selected_file.clear();
              this.selected_file.push(index_last_file_selected);
              this.reference_file = index_last_file_selected;
            }
            if (index_last_file_selected < this.model.length - 1) {
              if (index_last_file_selected >= this.reference_file) {
                return this.selected_file.push(index_last_file_selected + 1);
              } else {
                return this.selected_file.pop();
              }
            }
          } else {
            ind = this.selected_file[this.selected_file.length - 1].get();
            if (ind < this.model.length - 1) {
              this.selected_file.clear();
              this.selected_file.push(ind + 1);
            } else {
              this.selected_file.clear();
              this.selected_file.push(this.model.length - 1);
            }
            return this.reference_file = void 0;
          }
        } else {
          return this.selected_file.push(0);
        }
      }, this),
      40: __bind(function(evt) {
        var ind_sel_file, index, _i, _len, _ref, _results;
        if (evt.altKey) {
          if (this.selected_file.length > 0) {
            _ref = this.selected_file.get();
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              ind_sel_file = _ref[_i];
              index = this.search_ord_index_from_id(ind_sel_file);
              _results.push(this.open(this.model[index], this.path()));
            }
            return _results;
          }
        }
      }, this),
      65: __bind(function(evt) {
        var child, i, _len, _ref, _results;
        if (evt.ctrlKey) {
          this.selected_file.clear();
          _ref = this.model;
          _results = [];
          for (i = 0, _len = _ref.length; i < _len; i++) {
            child = _ref[i];
            _results.push(this.selected_file.push(i));
          }
          return _results;
        }
      }, this),
      88: __bind(function(evt) {
        if (evt.ctrlKey) {
          return this.cut();
        }
      }, this),
      67: __bind(function(evt) {
        if (evt.ctrlKey) {
          return this.copy();
        }
      }, this),
      86: __bind(function(evt) {
        if (evt.ctrlKey) {
          return this.paste();
        }
      }, this),
      46: __bind(function(evt) {
        return this.delete_file();
      }, this),
      113: __bind(function(evt) {
        var file_contain, _ref;
        file_contain = (_ref = document.getElementsByClassName('selected_file')[0]) != null ? _ref.getElementsByClassName('linkDirectory') : void 0;
        if ((file_contain != null) && file_contain.length > 0) {
          return this.rename_file(file_contain[0], this.model[this.search_ord_index_from_id(this.selected_file[0].get())]);
        }
      }, this)
    };
    document.onkeydown = __bind(function(evt) {
      if (this.allow_shortkey === true) {
        if (key_map[evt.keyCode] != null) {
          evt.stopPropagation();
          evt.preventDefault();
          key_map[evt.keyCode](evt);
          return true;
        }
      }
    }, this);
  }
  ModelEditorItem_Directory.prototype.cut = function() {
    var ind_children, real_ind, _i, _len, _ref;
    if (this.selected_file.length > 0) {
      this.clipboard.clear();
      _ref = this.selected_file.get();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ind_children = _ref[_i];
        real_ind = this.search_ord_index_from_id(ind_children);
        this.clipboard.push(this.model[real_ind]);
      }
      return this.cutroot = this.model;
    }
  };
  ModelEditorItem_Directory.prototype.copy = function() {
    var ind_children, real_ind, _i, _len, _ref;
    if (this.selected_file.length > 0) {
      this.clipboard.clear();
      _ref = this.selected_file.get();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ind_children = _ref[_i];
        real_ind = this.search_ord_index_from_id(ind_children);
        this.clipboard.push(this.model[real_ind]);
      }
      return this.cutroot = void 0;
    }
  };
  ModelEditorItem_Directory.prototype.paste = function() {
    var file, mod, new_file, pos, _i, _j, _len, _len2, _ref, _ref2, _results;
    if (this.cutroot != null) {
      _ref = this.clipboard.get();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        mod = _ref[_i];
        pos = this.cutroot.indexOf(mod);
        if (pos !== -1) {
          this.cutroot.splice(pos, 1);
        }
      }
    }
    _ref2 = this.clipboard;
    _results = [];
    for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
      file = _ref2[_j];
      new_file = file.deep_copy();
      _results.push(this.model.push(new_file));
    }
    return _results;
  };
  ModelEditorItem_Directory.prototype.rename_file = function(file, child_index) {
    this.allow_shortkey = false;
    file.contentEditable = "true";
    file.focus();
    return file.onblur = __bind(function(evt) {
      var title;
      this.allow_shortkey = true;
      title = file.innerHTML;
      child_index.name.set(title);
      file.contentEditable = "false";
      return this.selected_file.clear();
    }, this);
  };
  ModelEditorItem_Directory.prototype.onchange = function() {
    if (this.selected_file.has_been_directly_modified()) {
      this.draw_selected_file();
    }
    if (this.model.has_been_modified() || this.breadcrumb.has_been_modified()) {
      return this.refresh();
    }
  };
  ModelEditorItem_Directory.prototype.refresh = function() {
    this.empty_window();
    this.init();
    return this.draw_selected_file();
  };
  ModelEditorItem_Directory.prototype.empty_window = function() {
    return this.all_file_container.innerHTML = "";
  };
  ModelEditorItem_Directory.prototype.load_folder = function(file) {
    this.model.unbind(this);
    return file._ptr.load(__bind(function(m, err) {
      this.model = m;
      this.model.bind(this);
      this.breadcrumb.push(file);
      return this.selected_file.clear();
    }, this));
  };
  ModelEditorItem_Directory.prototype.open = function(file, path) {
    var l;
    if (file._info.model_type != null) {
      l = ModelEditorItem_Directory._action_list[file._info.model_type];
      if ((l != null) && l.length) {
        return l[0](file, path, this);
      }
    }
  };
  ModelEditorItem_Directory.prototype.handle_files = function(files) {
    var file, fs, _i, _len, _results;
    if (files.length > 0) {
      if (typeof FileSystem != "undefined" && FileSystem !== null) {
        fs = FileSystem.get_inst();
        _results = [];
        for (_i = 0, _len = files.length; _i < _len; _i++) {
          file = files[_i];
          _results.push(this.model.add_file(file.name, new Path(file)));
        }
        return _results;
      }
    }
  };
  ModelEditorItem_Directory.prototype.make_initial_path_as_dom = function(initial_path) {
    var path, reg;
    reg = new RegExp("[\/]+", "g");
    path = initial_path.split(reg);
    return path;
  };
  ModelEditorItem_Directory.prototype.draw_breadcrumb = function() {
    var folder, i, _len, _ref, _results;
    this.breadcrumb_dom.innerHTML = "";
    _ref = this.breadcrumb;
    _results = [];
    for (i = 0, _len = _ref.length; i < _len; i++) {
      folder = _ref[i];
      _results.push(__bind(function(i) {
        var f, l;
        if (i === 0) {
          return f = new_dom_element({
            parentNode: this.breadcrumb_dom,
            nodeName: "span",
            className: "breadcrumb",
            txt: "Root",
            onclick: __bind(function(evt) {
              return this.load_model_from_breadcrumb(0);
            }, this)
          });
        } else {
          l = new_dom_element({
            parentNode: this.breadcrumb_dom,
            nodeName: "span",
            txt: " > "
          });
          return f = new_dom_element({
            parentNode: this.breadcrumb_dom,
            nodeName: "span",
            className: "breadcrumb",
            txt: folder.name,
            onclick: __bind(function(evt) {
              return this.load_model_from_breadcrumb(i);
            }, this)
          });
        }
      }, this)(i));
    }
    return _results;
  };
  ModelEditorItem_Directory.prototype.load_model_from_breadcrumb = function(ind) {
    if (ind !== -1) {
      this.delete_breadcrumb_from_index(ind);
      if (ind === 0) {
        return this.model = this.breadcrumb[0];
      } else {
        return this.breadcrumb[ind]._ptr.load(__bind(function(m, err) {
          return this.model = m;
        }, this));
      }
    }
  };
  ModelEditorItem_Directory.prototype.delete_breadcrumb_from_index = function(index) {
    var i, _ref, _results;
    _results = [];
    for (i = _ref = this.breadcrumb.length - 1; (_ref <= index ? i < index : i > index); (_ref <= index ? i += 1 : i -= 1)) {
      _results.push(this.breadcrumb.pop());
    }
    return _results;
  };
  ModelEditorItem_Directory.prototype.search_ord_index_from_id = function(id) {
    var i, id_, pos, sorted, _i, _len, _ref;
    sorted = this.model.sorted(sort_dir);
    id_ = this.index_sorted[id];
    _ref = this.model;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      i = _ref[_i];
      pos = this.model.indexOf(sorted[id_]);
      if (pos !== -1) {
        return pos;
      }
    }
  };
  sort_numerically = function(a, b) {
    return a - b;
  };
  ModelEditorItem_Directory.prototype.delete_file = function() {
    var i, index, index_array, _i, _len, _ref, _ref2;
    if (this.selected_file.length) {
      index_array = [];
      _ref = this.selected_file.get();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        index = this.search_ord_index_from_id(i);
        index_array.push(index);
      }
      index_array.sort(this.sort_numerically);
      for (i = _ref2 = index_array.length - 1; (_ref2 <= 0 ? i <= 0 : i >= 0); (_ref2 <= 0 ? i += 1 : i -= 1)) {
        this.model.splice(index_array[i], 1);
      }
      return this.selected_file.clear();
    }
  };
  ModelEditorItem_Directory.prototype.draw_selected_file = function() {
    var file, file_contain, j, _len, _results;
    file_contain = document.getElementsByClassName('file_container');
    _results = [];
    for (j = 0, _len = file_contain.length; j < _len; j++) {
      file = file_contain[j];
      _results.push(parseInt(this.selected_file.indexOf(j)) !== -1 ? add_class(file, 'selected_file') : rem_class(file, 'selected_file'));
    }
    return _results;
  };
  ModelEditorItem_Directory.prototype.cancel_natural_hotkeys = function(evt) {
    if (!evt) {
      evt = window.event;
    }
    evt.cancelBubble = true;
    if (typeof evt.stopPropagation === "function") {
      evt.stopPropagation();
    }
    if (typeof evt.preventDefault === "function") {
      evt.preventDefault();
    }
    if (typeof evt.stopImmediatePropagation === "function") {
      evt.stopImmediatePropagation();
    }
    return false;
  };
  sort_dir = function(a, b) {
    if (a.name.get().toLowerCase() > b.name.get().toLowerCase()) {
      return 1;
    } else {
      return -1;
    }
  };
  ModelEditorItem_Directory.prototype.init = function() {
    var bottom, elem, i, sorted, _fn, _len, _len2, _len3, _sorted;
    _sorted = this.model.sorted(sort_dir);
    this.index_sorted.clear();
    sorted = new Array;
    if (this.display === "all") {
      for (i = 0, _len = _sorted.length; i < _len; i++) {
        elem = _sorted[i];
        if (elem._info.model_type.get() !== "Session") {
          sorted.push(elem);
          this.index_sorted.push(i);
        }
      }
    } else if (this.display === "Session") {
      for (i = 0, _len2 = _sorted.length; i < _len2; i++) {
        elem = _sorted[i];
        if (elem._info.model_type.get() === "Session") {
          sorted.push(elem);
          this.index_sorted.push(i);
        }
      }
    }
    this.allow_shortkey = true;
    _fn = __bind(function(elem, i) {
      var file_container, picture_container, r, stext, text, u, _ref, _ref2;
      file_container = new_dom_element({
        parentNode: this.all_file_container,
        nodeName: "div",
        className: "file_container",
        ondragstart: __bind(function(evt) {
          if (document.getElementById('popup_closer') != null) {
            this.popup_closer_zindex = document.getElementById('popup_closer').style.zIndex;
            document.getElementById('popup_closer').style.zIndex = -1;
          }
          this.drag_source = [];
          this.drag_source = this.selected_file.slice(0);
          if (parseInt(this.selected_file.indexOf(i)) === -1) {
            this.drag_source.push(i);
          }
          evt.dataTransfer.effectAllowed = evt.ctrlKey ? "copy" : "move";
          console.log(this.drag_source.get(), this.selected_file);
          return evt.dataTransfer.setData('text/plain', this.selected_file.get());
        }, this),
        ondragover: __bind(function(evt) {
          return false;
        }, this),
        ondragend: __bind(function(evt) {
          if (document.getElementById('popup_closer') != null) {
            return document.getElementById('popup_closer').style.zIndex = this.popup_closer_zindex;
          }
        }, this),
        ondrop: __bind(function(evt) {
          var ind, index, sorted_ind, _i, _j, _len, _len2, _ref, _ref2;
          if (sorted[i]._info.model_type.get() === "Directory") {
            _ref = this.drag_source.get();
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              ind = _ref[_i];
              if (sorted[ind] === sorted[i]) {
                return false;
              }
              sorted[i]._ptr.load(__bind(function(m, err) {
                return m.push(sorted[ind]);
              }, this));
            }
            _ref2 = this.drag_source.get();
            for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
              sorted_ind = _ref2[_j];
              index = this.search_ord_index_from_id(sorted_ind);
              this.model.splice(index, 1);
            }
            this.selected_file.clear();
          } else {
            evt.stopPropagation();
            evt.preventDefault();
            this.handle_files(evt.dataTransfer.files);
          }
          return this.cancel_natural_hotkeys(evt);
        }, this),
        onmousedown: __bind(function(evt) {
          var ind, index_last_file_selected, j, _results;
          if (evt.ctrlKey) {
            ind = parseInt(this.selected_file.indexOf(i));
            if (ind !== -1) {
              return this.selected_file.splice(ind, 1);
            } else {
              return this.selected_file.push(i);
            }
          } else if (evt.shiftKey) {
            if (this.selected_file.length === 0) {
              return this.selected_file.push(i);
            } else {
              index_last_file_selected = this.selected_file[this.selected_file.length - 1].get();
              this.selected_file.clear();
              _results = [];
              for (j = index_last_file_selected; (index_last_file_selected <= i ? j <= i : j >= i); (index_last_file_selected <= i ? j += 1 : j -= 1)) {
                _results.push(this.selected_file.push(j));
              }
              return _results;
            }
          } else {
            this.selected_file.clear();
            return this.selected_file.push(i);
          }
        }, this)
      });
      if (elem._info.img != null) {
        picture_container = new_dom_element({
          parentNode: file_container,
          nodeName: "span",
          ondblclick: __bind(function(evt) {
            this.open(sorted[i], this.path());
            return this.cancel_natural_hotkeys(evt);
          }, this),
          style: {
            maxWidth: 100,
            height: 100,
            display: "inline-block"
          }
        });
        this.picture = new_dom_element({
          parentNode: picture_container,
          className: "picture",
          nodeName: "img",
          src: elem._info.img.get(),
          alt: elem.name.get(),
          title: elem.name.get(),
          style: {
            maxWidth: 100,
            maxHeight: 100
          }
        });
      } else if (elem._info.icon != null) {
        this.picture = new_dom_element({
          parentNode: file_container,
          className: "picture" + " " + "icon_" + elem._info.icon.get() + "_128",
          title: elem.name.get(),
          ondblclick: __bind(function(evt) {
            this.open(sorted[i], this.path());
            return this.cancel_natural_hotkeys(evt);
          }, this),
          width: 100,
          height: 100
        });
      } else {
        this.picture = new_dom_element({
          parentNode: file_container,
          nodeName: "img",
          src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAN1gAADdYBkG95nAAAAAd0SU1FB90LCAwrKJrPEFgAAAoESURBVHja7V1dbBTXGT137vzs+i9x/APYyKlgARtU10mVFqSiSs1LERJtIgSxmipEUUBp08pxpaYqKlJBFUqLZFVq0qhCqtqqCm1fguqHBlBeIJSHKLFcjMwmhQZcMPbaDbF3Z/HMvV8fZma969iQ7HpnPcv9pJGQ2ZXX99zznXO+Ox4DqlSpWrr4533Dhg0b0NTUhOnp6Uj/4N3d3WhtbcXExMSK+lys2DcmEolvSim/AaAeAK3w9WeWZbXput5MRB8R0RsjIyN/B4CNGzcimUxGm1YtLS29AwMD72cyGUkRqY8//pjeffddOnPmDB05cmR23759/+ju7n4s+Jm2bNkSWTwe2rVr1wkiIiklua4rhRC00i8pJRGRtG2bLly4QKlUik6ePDmVSCT6AdQAwI4dOyIJSOcrr7zyTyIiIUQkwFh4pVIpOTw8TK4Q9O8rV7J79+59E8DaQCMrWXoR77EA6EQEKSWL4o6Kx+MsnU5jZmYGa9eutX77+uvfam9vXzc4OPjtZDJ5xddIfPjhh6F/Nq04I+BpOGMsklcsFgNJiaxtg6Skuro6HD5y5It79uw5bVnW1wBUBIxiAQERQESRvuI1NUjPzgIAE0KQbhj045dfXjcwMPDnWCz2JAB0dnZGomXlAUNR7FhgjKG+vh5jY2NY29EBEDESggxdx3eefrpjznFee+3VV63R0dE3Ojs7MTo6utIBIYAIkRQQfyPV1dVhcnISkBLkfY0BgGEY9Nxzz62a+eST106cOGGMjIz8Mcy8ohfdsiLMEACoq62FnclA5G8sv51xzqmvr+/B+vr6gWPHjtWMjY39LplMyhWrIbnPz1gkLwCI19QAjHnCHuwyj/tMSgmmabTv2WcfOnTo0OGOjo7nAaCrq2slawgBUkazZQHQdB319fW4ffs24vE4RD7b/fbFNQ179uxpSaUmj5448Zfs8PDwHwBg06ZNuHz58soChAi53RbFkkQwTRPT09NYvWZNjiEoHMyRrut48cUfNN65M/frmZkZ4+rVq8cvX75ctpxSkstiEdYQANB1HXNzcwVgLNh1TBIRY4xeeumlBxobG39x8ODB2+l0+m/lyila8aQnyIhnEc45XNeFDJxWYFSCK9AUIjDGqLe3t7Wvr++Xzc3NjwXOawUFQ4ABkWeI4ziQUnoOS8ocWNIbDXlfk5IREYvFYnjmmWe+8Pjjj/8+kUg8nEwm0dPTs6zAlOCy8nZSBC+SEoauQwgxzxqfIfmua74fAFJKWtPWhv7+/i3t7e1/Wr169cNDQ0MwTXOF2F6wyFpfAsA5h+M4EH7LyoGwUODnWxhzHYe6urpw9OjRbY2Njcc6OjpaLl68WHlAiACQ9KxvFC9fQ6QQkELkQiF8hhS0rDzdkUTMcRx0dnbyXx07tquuru6niUQiDgCbN2+ubMuiCIdDCjTEdXMMCYAgH7CCluUDwjyBBxGxrVu3mvv37/9ePB7//iOPPIJLly6hp6enQi6LCj9oFC9d13MsYN65AtiCbJUPAmMM8P+fMQbOGHp7e82dO3f+LJVK/RAAhoaGSjrk0kuQ9GjnEL9lgTFks1k4jgOmad5Ccw6uadB1vQCg/NmdL/5kmibr6+trGB8f/9GpU6fGb9y48deWlhZ88MEH4Q4XQQQZXTjAAOiGASkEJiYnYdt2QUhkmgYQYFomTNOEaRgwTBM18Tji8Th0XQfnnJGX+Onnhw93TE5O9jPGhs6fP5989NFH8d5774XEEMZyziOqWUQKgTWrVuG/zc2YGB+HkBKOM4dMxoadzSJr27BtG7ad9cByHHDOYRoGamtr0dzSjNbWVqxtb0dbWxtrfPAB9Pf3f+XQoUP9tm2/MDU1RaExhGF+jhXleRbjHF/duhVCCAgh4DgO0uk0ZmdnkU5nkE6nYdsZpNMZ2HYGtp1FNmvjzp05TKWmMDU1jWsfXUNtbQ0aGhqwfft2tnv37u8eP3784sjIyG+6u7sxPDwc0iwrsIkRL+G6HiBSQtM0cM5hGCYsy4HrWp7oE0HTGHTdQCwWy4VJzjl0XYdlmbAsi86de4dt3bat5uzZsz9xHOed4eHh90MSdSpgS5SLCjoxg2EYMAwHrmvCsqQ3VvEsjB8kDf9rwet1HyiLNTU1YeLWBJ544sm2ixf/9QKA/aGJesCOamBJfhmGAdM0IYTw2SHhuV3PdZmmyGNNwCgdpmnBMAysX78Otm2z9evXf9m2sw9fv379o9AYUi1gBBmD/LxhWRakJG+Ayhg03wI7jgvXdUE0zxBN02EYHKZpwjBMcF2nTRs3snXr1ptnz55rAhAGIEFOR9UBEmhDPG6BMUDTNB8QA4bhQgjXfx2gaQya5umIxxIThmkyzjna29uys7OzItQcUk0M0YKRSg4UHbEY84Wbw3E8MISQCxjCc23LMDzRJxCkpKIktqQj3GqpYGMFqTyfKQE7XNeZP8zKe/28jhi5f5fSPIq3vYxyPbeqWhcAuQAkzjVwbvna8mlAFr4fjMIHhOT8Tqq2ym0yIlAwVPSLc74owwp0SIbOkGqS9MX7MVsqqyzmNwNmzJ/Do9i+VfR5CCNUJTsWzuxyY/lgZLQADLYAJG9cXwENkZBV27LuNccrmOktwiJZwhy8BNuL+7LoM76o2H1a/Jk67j92fFYLXYrC6qVsFQXIEpkmfA2Z3wUKlKU8KCmGREtolllDFDvKsyYl/dKnqrsIe5HLo1d6R6halpbFlO29p+1lYTKE7suU/tnbVSVclmpZZani7stipGzvPWwvYyFOez0cVMtaumNQBWZZCouyrE1Jd50oYV96bUIPhqrKs0YltCzFjnKsS8nDRQXK4msTclK/j48My7w+JbksxY6lWlYFXZaqRQCpyBFuQRBStVxV8kMwVS3uskI+D6Gquvt9uQGBmvZWT5X2RDkFxrKm9NJsr3JZZXFZmlrCKmhZCx81rmr5wqFiSDXkEHWTw71zSMVuJVWgLL42FRB1BUQ51kZNe1eQoJcWDFUOKUsOUaOTaskharh49wWqyH1ZCpDl1xB1pl42lxVyDiGoHFKOQKDuyypbUg/dZam2VY51KXF0ooR9uXtWSX82TzHkbvoaKkP8P90gq+sBZsurIaHf5KA0ZEVpCCkNufskI2zbq0YnS7csUMWGiwqQ5V4TdZND2YQ91JZF6jzkbmCE/fsh+c+qVfXpYmDQNG3h8zHL1rJmbt68OatzHVJK8r+xKr+klKQbBpue/l8WQDYMQG6+9dbp/xw4sD9bU1MTc4WrtD2vTNNktp1xTp8+PQZgMgxAMrdujZ98/vkDzU89tfdLDQ0NhtISv1UxBtu2xeDg4Oi1a9feBpD6/O2uuIpxzr8uhEwAZCkoCmqOc35LCPE2gCnOOYQQZQckeG8rgGYAChSvHAC3AYwDmFPLoUqVqiqv/wNXWtdcO0nYgwAAAABJRU5ErkJggg==",
          alt: "",
          title: "",
          ondblclick: __bind(function(evt) {
            this.open(sorted[i], this.path());
            return this.cancel_natural_hotkeys(evt);
          }, this)
        });
      }
      stext = "";
      if ((_ref = elem._info) != null ? (_ref2 = _ref.remaining) != null ? _ref2.get() : void 0 : void 0) {
        r = elem._info.remaining.get();
        u = elem._info.to_upload.get();
        stext += " (" + ((100 * (u - r) / u).toFixed(0)) + "%)";
      }
      return text = new_dom_element({
        parentNode: file_container,
        className: "linkDirectory",
        nodeName: "div",
        txt: elem.name.get() + stext,
        onclick: __bind(function(evt) {
          return this.rename_file(text, sorted[i]);
        }, this)
      });
    }, this);
    for (i = 0, _len3 = sorted.length; i < _len3; i++) {
      elem = sorted[i];
      _fn(elem, i);
    }
    if (this.use_breadcrumb) {
      this.draw_breadcrumb();
    }
    return bottom = new_dom_element({
      parentNode: this.all_file_container,
      nodeName: "div",
      style: {
        clear: "both"
      }
    });
  };
  ModelEditorItem_Directory.prototype.path = function() {
    return "test_need_to_be_complete";
  };
  ModelEditorItem_Directory.add_action = function(model_type, fun) {
    if (!(ModelEditorItem_Directory._action_list[model_type] != null)) {
      ModelEditorItem_Directory._action_list[model_type] = [];
    }
    return ModelEditorItem_Directory._action_list[model_type].push(fun);
  };
  return ModelEditorItem_Directory;
})();
ModelEditorItem.default_types.unshift(function(model) {
  if (model instanceof Directory) {
    return ModelEditorItem_Directory;
  }
});