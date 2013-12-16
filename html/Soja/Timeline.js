var Timeline;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
Timeline = (function() {
  __extends(Timeline, View);
  function Timeline(el, tree_app, params) {
    var key, val;
    this.el = el;
    this.tree_app = tree_app;
    if (params == null) {
      params = {};
    }
    this.modules = this.tree_app.data.modules;
    Timeline.__super__.constructor.call(this, this.modules);
    this.tree_app.data.focus.bind(this);
    for (key in params) {
      val = params[key];
      this[key] = val;
    }
    this.div = new_dom_element({
      id: "timeline"
    });
  }
  Timeline.prototype.onchange = function() {
    var m, _i, _len, _ref, _results;
    this.el.appendChild(this.div);
    while (this.div.firstChild != null) {
      this.div.removeChild(this.div.firstChild);
    }
    _ref = this.modules;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      m = _ref[_i];
      if ((m.timeline != null) && m.timeline === true) {
        if ((m.visible != null) && m.visible === false) {
          continue;
        }
        _results.push(__bind(function(m) {
          var act, current_picture_name, j, player_button, speed, speed_container, speed_txt, _len2, _ref2, _results2;
          speed_container = new_dom_element({
            parentNode: this.div,
            nodeName: "span",
            className: "timeline_speed"
          });
          speed = new_model_editor({
            el: speed_container,
            model: m.img_per_sec,
            item_type: ModelEditorItem_Input,
            item_width: ''
          });
          speed_txt = new_dom_element({
            parentNode: speed_container,
            nodeName: "span",
            className: "timeline_speed_txt",
            txt: "img/s"
          });
          current_picture_name = new_dom_element({
            parentNode: this.div,
            nodeName: "span",
            className: "timeline_current_picture_name",
            txt: "Picture " + this.tree_app.data.time.get()
          });
          player_button = new_dom_element({
            parentNode: this.div,
            id: "timeline_player_button"
          });
          _ref2 = m.actions;
          _results2 = [];
          for (j = 0, _len2 = _ref2.length; j < _len2; j++) {
            act = _ref2[j];
            if (act.vis !== false) {
              _results2.push(__bind(function(act) {
                var editor, key, scroll_pane, span_container;
                if (act.mod != null) {
                  scroll_pane = new_dom_element({
                    parentNode: this.div,
                    className: "timeline_scroll_pane"
                  });
                  return editor = new_model_editor({
                    el: scroll_pane,
                    model: act.mod(this.tree_app)
                  });
                } else {
                  key = this.key_as_string(act);
                  span_container = new_dom_element({
                    parentNode: player_button,
                    nodeName: "span"
                  });
                  return span_container = new_dom_element({
                    parentNode: span_container,
                    nodeName: "img",
                    src: act.ico,
                    alt: act.txt,
                    title: act.txt + key,
                    onmousedown: __bind(function(evt) {
                      return act.fun(evt, this.tree_app);
                    }, this)
                  });
                }
              }, this)(act));
            }
          }
          return _results2;
        }, this)(m));
      }
    }
    return _results;
  };
  Timeline.prototype.key_as_string = function(act) {
    var i, k, key, _len, _ref;
    key = '';
    if (act.key != null) {
      key = ' (';
      _ref = act.key;
      for (i = 0, _len = _ref.length; i < _len; i++) {
        k = _ref[i];
        if (i >= 1) {
          key += ' or ';
        }
        key += k;
      }
      key += ')';
    }
    return key;
  };
  return Timeline;
})();