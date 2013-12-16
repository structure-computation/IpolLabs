var add_class, get_left, get_top, new_dom_element, new_popup, rem_class, _index_current_popup,
  __indexOf = Array.prototype.indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

new_dom_element = function(params, nodeName) {
  var k, n, name, v, val;
  if (params == null) params = {};
  if (nodeName == null) nodeName = "div";
  n = document.createElement(params.nodeName || nodeName);
  for (name in params) {
    val = params[name];
    switch (name) {
      case "parentNode":
        val.appendChild(n);
        break;
      case "nodeName":
        void 0;
        break;
      case "style":
        for (k in val) {
          v = val[k];
          n.style[k] = v;
        }
        break;
      case "txt":
        n.innerHTML = val;
        break;
      default:
        n[name] = val;
    }
  }
  return n;
};

add_class = function(obj, src) {
  var old, p_1;
  if (typeof src === "string") return add_class(obj, src.split(" "));
  old = (obj.className || "").split(" ");
  p_1 = src.filter(function(x) {
    return __indexOf.call(old, x) < 0;
  });
  return obj.className = (old.concat(p_1)).filter(function(x) {
    return x;
  }).join(" ");
};

rem_class = function(obj, src) {
  var old;
  if (typeof src === "string") return rem_class(obj, src.split(" "));
  old = (obj.className || "").split(" ");
  return obj.className = (old.filter(function(x) {
    return __indexOf.call(src, x) < 0;
  })).join(" ");
};

get_left = function(l) {
  if (l.offsetParent != null) {
    return l.offsetLeft + get_left(l.offsetParent);
  } else {
    return l.offsetLeft;
  }
};

get_top = function(l) {
  if (l.offsetParent != null) {
    return l.offsetTop + get_top(l.offsetParent);
  } else {
    return l.offsetTop;
  }
};

_index_current_popup = 100;

new_popup = function(title, params) {
  var b, clientX, clientY, close_element, extention, height, old_x, old_y, repos, res, t, top_x, top_y, w, width, _drag_end_func, _drag_evt_func;
  if (params == null) params = {};
  b = new_dom_element({
    parentNode: document.body,
    id: "popup_closer",
    onmousedown: function() {
      if (typeof params.onclose === "function") params.onclose();
      document.body.removeChild(b);
      return document.body.removeChild(w);
    },
    ondrop: function(evt) {
      if (!evt) evt = window.event;
      evt.cancelBubble = true;
      if (typeof evt.stopPropagation === "function") evt.stopPropagation();
      if (typeof evt.preventDefault === "function") evt.preventDefault();
      if (typeof evt.stopImmediatePropagation === "function") {
        evt.stopImmediatePropagation();
      }
      return false;
    },
    style: {
      position: "fixed",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      background: params.fixed_opacity || "#000",
      opacity: params.fixed_opacity || 0,
      zIndex: _index_current_popup
    }
  });
  if ((params.event != null) && params.event.clientX) {
    clientX = params.event.clientX;
    clientY = params.event.clientY;
  } else {
    clientX = window.innerWidth / 2 - 10;
    clientY = window.innerHeight / 2 - 10;
  }
  top_x = params.top_x || -1000;
  top_y = params.top_y || -1000;
  old_x = 0;
  old_y = 0;
  w = void 0;
  if (params.width != null) width = params.width;
  if (params.height != null) height = params.height;
  repos = function() {
    top_x = clientX - w.clientWidth / 2;
    top_y = clientY - w.clientHeight / 2;
    if ((top_x + w.clientWidth) > window.innerWidth) {
      top_x = window.innerWidth - w.clientWidth - 50;
    }
    if ((top_y + w.clientHeight) > window.innerHeight) {
      top_y = window.innerHeight - w.clientHeight + 50;
    }
    if (top_x < 50) top_x = 50;
    if (top_y < 50) top_y = 50;
    w.style.left = top_x;
    return w.style.top = top_y;
  };
  _drag_evt_func = function(evt) {
    top_x += evt.clientX - old_x;
    top_y += evt.clientY - old_y;
    w.style.left = top_x;
    w.style.top = top_y;
    old_x = evt.clientX;
    old_y = evt.clientY;
    return typeof evt.preventDefault === "function" ? evt.preventDefault() : void 0;
  };
  _drag_end_func = function(evt) {
    if (typeof document.detachEvent === "function") {
      document.detachEvent("onmousemove", _drag_evt_func);
    }
    if (typeof document.detachEvent === "function") {
      document.detachEvent("onmouseup", _drag_end_func);
    }
    if (typeof document.removeEventListener === "function") {
      document.removeEventListener("mousemove", _drag_evt_func, true);
    }
    return typeof document.removeEventListener === "function" ? document.removeEventListener("mouseup", _drag_end_func, true) : void 0;
  };
  extention = "px";
  if (!params.top_x) {
    setTimeout(repos, 1);
    extention = "%";
  }
  w = new_dom_element({
    parentNode: document.body,
    className: "Popup",
    style: {
      position: "absolute",
      left: top_x,
      top: top_y,
      width: width + extention,
      height: height + extention,
      zIndex: _index_current_popup + 1
    }
  });
  _index_current_popup += 2;
  close_element = new_dom_element({
    parentNode: w,
    className: "PopupClose",
    txt: "Close",
    onmousedown: function(evt) {
      if (typeof params.onclose === "function") params.onclose();
      document.body.removeChild(b);
      return document.body.removeChild(w);
    }
  });
  if (title) {
    t = new_dom_element({
      parentNode: w,
      className: "PopupTitle",
      innerHTML: title,
      onmousedown: function(evt) {
        old_x = evt.clientX;
        old_y = evt.clientY;
        top_x = parseInt(w.style.left);
        top_y = parseInt(w.style.top);
        document.addEventListener("mousemove", _drag_evt_func, true);
        document.addEventListener("mouseup", _drag_end_func, true);
        return typeof evt.preventDefault === "function" ? evt.preventDefault() : void 0;
      }
    });
  }
  res = new_dom_element({
    parentNode: w,
    className: "PopupWindow",
    style: {
      padding: "6px"
    }
  });
  if (params.child != null) res.appendChild(params.child);
  return res;
};
