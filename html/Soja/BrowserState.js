var BrowserState;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
BrowserState = (function() {
  __extends(BrowserState, Model);
  BrowserState.inst = [];
  BrowserState.init = false;
  function BrowserState() {
    BrowserState.__super__.constructor.call(this);
    this.add_attr({
      window_size: [0, 0],
      location: {
        hash: "",
        host: "",
        hostname: "",
        href: "",
        pathname: "",
        port: "",
        protocol: "",
        search: ""
      }
    });
    BrowserState.inst.push(this);
    if (!BrowserState.init) {
      BrowserState.init = true;
      window.onresize = BrowserState.onresize;
      window.onhashchange = BrowserState.onhashchange;
    }
    window.onresize();
    window.onhashchange();
  }
  BrowserState.onresize = function() {
    var inst, _i, _len, _ref, _results;
    _ref = BrowserState.inst;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      inst = _ref[_i];
      _results.push(inst.window_size.set([window.innerWidth, window.innerHeight]));
    }
    return _results;
  };
  BrowserState.onhashchange = function() {
    var inst, _i, _len, _ref, _results;
    _ref = BrowserState.inst;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      inst = _ref[_i];
      inst.location.hash.set(location.hash);
      inst.location.host.set(location.host);
      inst.location.hostname.set(location.hostname);
      inst.location.href.set(location.href);
      inst.location.pathname.set(location.pathname);
      inst.location.port.set(location.port);
      inst.location.protocol.set(location.protocol);
      _results.push(inst.location.search.set(location.search));
    }
    return _results;
  };
  return BrowserState;
})();