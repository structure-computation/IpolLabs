var test_1;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
test_1 = function() {
  var Color, c, l;
  Color = (function() {
    __extends(Color, Model);
    function Color() {
      Color.__super__.constructor.call(this);
      this.add_attr({
        r: new ConstrainedVal(150, {
          min: 0,
          max: 255
        }),
        g: new ConstrainedVal(100, {
          min: 0,
          max: 255
        }),
        b: new ConstrainedVal(100, {
          min: 0,
          max: 255
        })
      });
    }
    Color.prototype.lum = function() {
      return (this.r.get() + this.g.get() + this.b.get()) / 3;
    };
    return Color;
  })();
  c = new Color;
  new_model_editor({
    el: new_dom_element({
      parentNode: document.body,
      style: {
        width: 300,
        marginBottom: 10
      }
    }),
    model: c
  });
  l = new_dom_element({
    parentNode: document.body
  });
  return bind(c, function() {
    return l.innerHTML = "Luminance = " + (c.lum());
  });
};