var ModelEditorItem_Color;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
ModelEditorItem_Color = (function() {
  __extends(ModelEditorItem_Color, ModelEditorItem);
  function ModelEditorItem_Color(params) {
    ModelEditorItem_Color.__super__.constructor.call(this, params);
    this.container = new_dom_element({
      parentNode: this.ed,
      nodeName: "span",
      className: "ModelEditorColorSelectorBackground"
    });
    this.color_selector = new_dom_element({
      parentNode: this.container,
      nodeName: "span",
      className: "ModelEditorColorSelector",
      txt: ".",
      style: {
        display: "inline-block",
        color: "rgba(0,0,0,0)",
        width: this.ew + "%"
      },
      onclick: __bind(function(evt) {
        var p;
        if (!(this.d != null)) {
          this.d = new_dom_element();
          this.item_cp = new ModelEditorItem_ColorPicker({
            el: this.d,
            model: this.model,
            parent: this
          });
        }
        p = new_popup(this.label || "Color picker", {
          event: evt
        });
        return p.appendChild(this.d);
      }, this)
    });
  }
  ModelEditorItem_Color.prototype.onchange = function() {
    return this.color_selector.style.background = this.model.to_hex();
  };
  return ModelEditorItem_Color;
})();
ModelEditorItem.default_types.push(function(model) {
  if (model instanceof Color) {
    return ModelEditorItem_Color;
  }
});var ModelEditorItem_Gradient;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
ModelEditorItem_Gradient = (function() {
  __extends(ModelEditorItem_Gradient, ModelEditorItem);
  function ModelEditorItem_Gradient(params) {
    ModelEditorItem_Gradient.__super__.constructor.call(this, params);
    this.canvas = new_dom_element({
      parentNode: this.ed,
      nodeName: "canvas",
      className: "ModelEditorGradientSelector",
      style: {
        width: this.ew + "%",
        height: 20
      },
      onclick: __bind(function(evt) {
        var p;
        if (this.spec_click != null) {
          return this.spec_click(evt);
        } else if (!this.forbid_picker) {
          p = new_popup(this.label || "Gradient picker", {
            event: evt
          });
          p.appendChild(this.d);
          return this.gp.build_color_picker();
        }
      }, this)
    });
    if (!this.forbid_picker) {
      this.d = new_dom_element();
      this.gp = new ModelEditorItem_GradientPicker({
        el: this.d,
        model: this.model,
        parent: this
      });
    }
    if (this.forbid_picker) {
      add_class(this.canvas, "predefinedGradient");
    }
  }
  ModelEditorItem_Gradient.prototype.onchange = function() {
    var c, ctx, left_to_right, lineargradient, _i, _len, _ref;
    ctx = this.canvas.getContext('2d');
    lineargradient = ctx.createLinearGradient(0, 0, this.canvas.width, 0);
    left_to_right = 1;
    _ref = this.model.color_stop;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      c = _ref[_i];
      lineargradient.addColorStop(left_to_right - c.position.get(), 'rgba(' + c.color.r.get() + ',' + c.color.g.get() + ',' + c.color.b.get() + ',' + c.color.a.get() + ')');
    }
    ctx.fillStyle = lineargradient;
    return ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  };
  return ModelEditorItem_Gradient;
})();
ModelEditorItem.default_types.push(function(model) {
  if (model instanceof Gradient) {
    return ModelEditorItem_Gradient;
  }
});var ColorPickerImg;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
ColorPickerImg = (function() {
  __extends(ColorPickerImg, ModelEditorItem);
  function ColorPickerImg(params) {
    var _height, _margin_left, _margin_top, _src, _width;
    ColorPickerImg.__super__.constructor.call(this, params);
    this.container = new_dom_element({
      parentNode: this.ed,
      className: "ModelEditorColorSelector",
      style: {
        display: "inline-block",
        width: this.ew + "%"
      },
      onclick: __bind(function(evt) {}, this)
    });
    _src = "";
    if (this.picker_pos === 'bottom') {
      _src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAARCAYAAAAL4VbbAAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sKCgwrM1Ga25IAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAABm0lEQVQoz42QTWsTURSGn3Mn7QyjRiwEYgQR1I3ipgbMRwtZzULEX2BdCs2+7jpJf0LdhQaZ0t/g5m5t+sHshChq8xvuqkOinVw3M6MlFvrCuzjvOec9HxhjxBhDxgda6wFgtdadTPPyPMYYJw+01oN6vW63t0ObNfSNMa/yvAJS4F4cx4MgCN5tbLzF9Tx2dz8QBEEvjuM6cBcAY8x9rfWgWq3+CsOejfYP7LfvE6L9AxuGPVur1fIJSKfT+Tgej99sbnaXHj56zItGW8hwejKyk7OfDId7RFG0I0qp+dbWe3ny9BmN5t/CHCfHIzs5+8FwuId0u13baK7RbK0tFOY4Pjq0X8dfUK7r0mqvi4hwFVvtdSmXy5QqlQoiiuugBKDU/zdI0xTHcYpYAYgo0jTFdT1EVEGg0Apna+c4jsNsNl1w/1dTAI7jXMtZAdy64bK8VCJJzrm4+F18ASBJzrnpL18+8HbZL8bN5zY72ru0kmit+0BvdfW53FlZWfjCdDrjaPTZWmtfC4DW+lOSJC9937/qxTtBEPT/APAHvhsShFl7AAAAAElFTkSuQmCC";
    }
    if (this.picker_pos === 'top') {
      _src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAARCAYAAAAL4VbbAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sKCwkPLn0D82MAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAABh0lEQVQoz42QwWoaURSGv3sdmzCS0GZlLJQ+Q+qipSBduSilL+IzZDTQujcgKE3DxDxDN2ebGH2DUNEncHHBJNZxMp4umhm0bSA/nMX9///855xrAETkx3w+/+j7Po/gqFqtNoyINID6wcEb82JvD4AkScjlcgAsFhFX/QtV1c+m2WxqrVYz6zGrlWLtBkW73VYvFW9uf7GM7wHI558BEMdLAJ7vFgCwADd3Ecv4Ht8v4Hl5VBVVBcD3C9zO/zR56ztG0eKfy9Y5C2CMJUkStra2McZmBWRclqy6elJyduD/YIzd0LzpdIrqiqfARlH26TxWV/0Lnc1meJ1OR3d2do2q6tt3783facNBXyfjEb1eD1upVMLT0+/xZDxiOLjcmDAcXOpkPOLk5BthGB7hnHslIt1isbgMgrqGZ+d6/XNCeHauQVDXUqmkItJwzoFzDufcSxHpAtpqHeuXr01ttY4VSI37qTn30ICIdMvlsh4eBuvGT6mOc86kD+fc63SCiHx44LZT/TfFMxnQNUaP0gAAAABJRU5ErkJggg==";
    }
    if (this.picker_pos === 'left') {
      _src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAALCAYAAACZIGYHAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sKCwkQJ8mFRVkAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAABoUlEQVQoz42Sz2oTURjFf3cmEZk0RfsEgrpR3FSGpq0E3Aw04BtIwM1IDdh9FE1cZF9XKU1LyAsERDd3JdSklZkn0MSF4Cq7JMbMnzvXjRNipdLf5izO4XD4+ASAlLLm+/5rLmA0GhEEAc1mUxeLxXa3260B3wETSDJSyg9AqVKpiCTRTH4GKKUQwkDrhCTRaJ3Q753ofH5VHB8fPfY8L7Jt+w3wA8CYzWal9fX7AmAy/UUYhgDEcfTXms2tB+LO3Xvs7j7LlsvlJ57nvUo9w7Isrq+tARBGMZaVA1joMoXNbXHz1m1c92nWcRzX87wD4EbmfDBdkup5NgrbQmut9/ffUq1W3UajgQGglCJJNNnsFS7DRmFLTKZTdnZKOI7jZgBM08QwBJfl81lf51dWePmiipTyobFsRlFIHEcopRb6b0FPfxsO2Nt7jpSybtv2RwNgPg8WIcvKYZrmQpc5O+3p4eArrdZhWuADVw2g3u+daIBrq7kLD3va/6SHgy+0Woe02+26bdsHwHtgLv587CPf99/97w7j8ZhOp5MW1Ja93+hxwv/F38EpAAAAAElFTkSuQmCC";
    }
    if (this.picker_pos === 'right') {
      _src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAALCAYAAACZIGYHAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sKCwkQFQFSFNkAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAABpUlEQVQoz42SQWsTQRiGn5npJrJJU1vIQQQRbPWgeNqlscWDl4F6EHIOLNtatznZsznYpP0F9VbsvxA87Eli1STjP7D1L+zBHmo2k/UQExKr0ufyDh98DzPDK5IkEYAELHCrWq022+12WK/XRT6fp1wu8y88z2tprZsiSZLx7KYx5nWtVtvc2nru3H/wkLX1x0IIiZQCISRZNkQpxXwhj5SCbrebAe8nEmPMURAEm1G049xZvvtbMFqWUmCtRSmFtZacM8dCySVNB5ycfMwkcNsYc6S1jkaCFSqP1sWfV3fdwiT76QCAxaUlXNdlzhjzqtFoRIeHb1i4vshq5bIAoN/vz+Q0UmsdbWw85cf5OauVNcEVcJwcw2GGtXYkieP4ycHBPvPFIt3O54wrIqVAKTU6+77/IY7j1u7uS76fndLtfLokstYyGKSTTNPZJ0ngmu/7X+M4bh0fv+Xs9BudL7MipRSuW5jkmIuLnwBM9+SGMWYnDMO97e0XLK/c+2tPhJAU3RyOo+j1elmWZa1pybgvzTAM94IgoFQq/fdfPM97prV+9wvs56UsZC2ExAAAAABJRU5ErkJggg==";
    }
    this.picture = new_dom_element({
      parentNode: this.container,
      nodeName: "img",
      src: _src,
      style: {
        position: "relative",
        zIndex: "4",
        color: "rgba(0,0,0,0)"
      }
    });
    if (this.picker_pos === 'bottom') {
      _margin_top = "-12px";
      _width = "10px";
      _height = "11px";
    }
    if (this.picker_pos === 'top') {
      _margin_top = "-16px";
      _width = "10px";
      _height = "11px";
    }
    if (this.picker_pos === 'left') {
      _margin_top = "-10px";
      _margin_left = "1px";
      _width = "13px";
      _height = "9px";
    }
    if (this.picker_pos === 'right') {
      _margin_top = "-10px";
      _margin_left = "4px";
      _width = "13px";
      _height = "9px";
    }
    this.color = new_dom_element({
      parentNode: this.container,
      style: {
        position: "relative",
        zIndex: "3",
        marginTop: _margin_top,
        marginLeft: _margin_left,
        width: _width,
        height: _height
      }
    });
  }
  ColorPickerImg.prototype.onchange = function() {
    return this.color.style.background = this.model.to_hex();
  };
  return ColorPickerImg;
})();var ModelEditorItem_GradientPicker;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
ModelEditorItem_GradientPicker = (function() {
  __extends(ModelEditorItem_GradientPicker, ModelEditorItem);
  function ModelEditorItem_GradientPicker(params) {
    this.add_color_picker = __bind(this.add_color_picker, this);
    this._focus_color = __bind(this._focus_color, this);
    this.remove_color_picker = __bind(this.remove_color_picker, this);
    this.create_color_picker = __bind(this.create_color_picker, this);
    this.build_color_picker = __bind(this.build_color_picker, this);
    this.save_current_gradient = __bind(this.save_current_gradient, this);
    this.apply_predefined_gradient = __bind(this.apply_predefined_gradient, this);    ModelEditorItem_GradientPicker.__super__.constructor.call(this, params);
    this.predef_grad = new Lst;
    this.popupWidth = 535;
    this.picker_pos = "right";
    if (this.picker_pos === 'right' || this.picker_pos === 'left') {
      this.way = 'vertical';
      this.canvasContainerWidth = "5%";
      this.canvasWidth = 100;
      this.canvasHeight = 350;
    } else {
      this.way = 'horizontal';
      this.canvasWidth = 80;
      this.canvasHeight = 20;
      this.canvasContainerWidth = this.ew - 1.5 + "%";
    }
    this.container = new_dom_element({
      parentNode: this.ed,
      nodeName: "div",
      className: "containerGradientPicker",
      style: {
        width: this.popupWidth,
        minHeight: this.canvasHeight + 3,
        display: "inline-block"
      }
    });
    this.rightContainer = new_dom_element({
      parentNode: this.container,
      nodeName: "div",
      className: "rightContainer"
    });
    this.colorPicker = new_dom_element({
      parentNode: this.rightContainer,
      className: "inlineColorPicker"
    });
    new ModelEditorItem_ColorPicker({
      el: this.colorPicker,
      model: this.model.color_stop[0].color
    });
    new_dom_element({
      parentNode: this.rightContainer,
      nodeName: "hr",
      style: {
        marginRight: "12px"
      }
    });
    this.containerPreDefinedGradient = new_dom_element({
      parentNode: this.rightContainer,
      nodeName: "div",
      className: "containerPreDefinedGradient",
      txt: "Predefined gradient"
    });
    new_dom_element({
      parentNode: this.containerPreDefinedGradient,
      nodeName: "br"
    });
    this.build_predefined_gradient();
    this.savePreDefinedGradient = new_dom_element({
      parentNode: this.rightContainer,
      nodeName: "a",
      href: "javascript:void(0)",
      onclick: __bind(function(e) {
        return this.save_current_gradient(e);
      }, this),
      className: "savePredefinedGradient"
    });
    this.savePreDefinedGradientImg = new_dom_element({
      parentNode: this.savePreDefinedGradient,
      nodeName: "img",
      src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAUCAIAAACS+POVAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sKFA4BHCZi3iEAAACKSURBVEjHY/z//z8DEvj79++vX79+/fr18+fPX8QBZJW/f/+mRDsTw2ACo67BDVjoY82dyVuQuWz+eqMxNZpusIB9pdPwyP7aeImBgYGNgYGNgYGHgeG5Af9oTI2mGwYGBgan7izkyuha7zq08ga5nmJg+DUaU6PpBgtQyfVBadTAEspoTA1R1wAAX6ixHh6n9uUAAAAASUVORK5CYII=",
      alt: "Save Current Gradient",
      title: "Save Current Gradient"
    });
    this.canvasContainer = new_dom_element({
      parentNode: this.container,
      className: "canvasContainer",
      style: {
        width: this.canvasContainerWidth,
        position: "absolute"
      }
    });
    this.canvas = new_dom_element({
      parentNode: this.canvasContainer,
      nodeName: "canvas",
      className: "gradientPicker",
      style: {
        display: "inline-block",
        width: this.canvasWidth + "%",
        height: this.canvasHeight
      },
      onclick: __bind(function(e) {
        return this.add_color_picker(e);
      }, this)
    });
    this.build_color_picker();
  }
  ModelEditorItem_GradientPicker.prototype.onchange = function() {
    var c, ctx, lineargradient, _i, _len, _ref;
    ctx = this.canvas.getContext('2d');
    if (this.way === 'vertical') {
      lineargradient = ctx.createLinearGradient(0, 0, 0, this.canvas.height);
    } else {
      lineargradient = ctx.createLinearGradient(0, 0, this.canvas.width, 0);
    }
    _ref = this.model.color_stop;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      c = _ref[_i];
      lineargradient.addColorStop(c.position.get(), c.color.to_rgba());
    }
    ctx.fillStyle = lineargradient;
    return ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  };
  ModelEditorItem_GradientPicker.prototype.apply_predefined_gradient = function(index) {
    var col, _i, _j, _len, _len2, _ref, _ref2;
    _ref = this.model.color_stop;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      col = _ref[_i];
      this.model.remove_color(col);
    }
    _ref2 = this.predef_grad[index].color_stop.get();
    for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
      col = _ref2[_j];
      this.model.add_color([col.color.r, col.color.g, col.color.b, col.color.a], col.position);
    }
    return this.build_color_picker();
  };
  ModelEditorItem_GradientPicker.prototype.build_predefined_gradient = function() {
    var i, j, m, _fn, _i, _len, _ref, _results;
    m = new Gradient;
    m.add_color([255, 255, 255, 255], 0);
    m.add_color([0, 0, 0, 255], 1);
    this.predef_grad.push(m);
    m = new Gradient;
    m.add_color([255, 0, 0, 255], 0);
    m.add_color([255, 255, 255, 255], 0.5);
    m.add_color([0, 0, 255, 255], 1);
    this.predef_grad.push(m);
    m = new Gradient;
    m.add_color([255, 255, 255, 255], 0);
    m.add_color([255, 255, 0, 255], 0.33);
    m.add_color([255, 0, 0, 255], 0.67);
    m.add_color([0, 0, 0, 255], 1);
    this.predef_grad.push(m);
    m = new Gradient;
    m.add_color([255, 0, 0, 255], 0);
    m.add_color([255, 255, 0, 255], 0.25);
    m.add_color([0, 255, 0, 255], 0.5);
    m.add_color([0, 255, 255, 255], 0.75);
    m.add_color([0, 0, 255, 255], 1);
    this.predef_grad.push(m);
    j = 0;
    _ref = this.predef_grad;
    _fn = __bind(function(j) {
      return new ModelEditorItem_Gradient({
        el: this.containerPreDefinedGradient,
        model: i,
        forbid_picker: true,
        item_width: 48,
        spec_click: __bind(function(evt) {
          return this.apply_predefined_gradient(j);
        }, this)
      });
    }, this);
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      i = _ref[_i];
      _fn(j);
      _results.push(j++);
    }
    return _results;
  };
  ModelEditorItem_GradientPicker.prototype.save_current_gradient = function(e) {
    var col, index, m, _i, _len, _ref;
    m = new Gradient;
    _ref = this.model.color_stop;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      col = _ref[_i];
      m.add_color([col.color.r, col.color.g, col.color.b, col.color.a], col.position);
    }
    index = this.predef_grad.length;
    new ModelEditorItem_Gradient({
      el: this.containerPreDefinedGradient,
      model: m,
      forbid_picker: true,
      item_width: 48,
      spec_click: __bind(function(evt) {
        return this.apply_predefined_gradient(index);
      }, this)
    });
    this.predef_grad.push(m);
    return this.build_color_picker();
  };
  ModelEditorItem_GradientPicker.prototype.build_color_picker = function() {
    var elem, i, _ref;
    while (this.canvasContainer.children.length > 1) {
      elem = this.canvasContainer.children[1];
      this.canvasContainer.removeChild(elem);
    }
    for (i = 0, _ref = this.model.color_stop.length; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
      this.create_color_picker(i);
    }
    return this._focus_color(0);
  };
  ModelEditorItem_GradientPicker.prototype.create_color_picker = function(index) {
    var cPHeight, cPWidth, color_picker_height, color_picker_width, del_picker, dragging, old_x, old_y, pos, pos_left, pos_top, _drag_end_func, _drag_evt_func;
    old_y = 0;
    old_x = 0;
    pos = 0;
    del_picker = false;
    dragging = false;
    color_picker_width = 2;
    color_picker_height = 10;
    cPHeight = parseInt(getComputedStyle(this.canvas).height);
    cPWidth = parseInt(getComputedStyle(this.canvas).width);
    if (this.way === 'horizontal') {
      pos_left = this.model.color_stop[index].position.get() * this.canvasWidth - color_picker_width / 2 + "%";
      if (this.picker_pos === 'top') {
        pos_top = "-9px";
      }
      if (this.picker_pos === 'bottom') {
        pos_top = (parseInt(getComputedStyle(this.canvas).height)) - 5 + "px";
      }
    }
    if (this.way === 'vertical') {
      pos_top = this.model.color_stop[index].position.get() * this.canvasHeight - color_picker_height / 2 + "px";
      if (this.picker_pos === 'left') {
        pos_left = '-10px';
      }
      if (this.picker_pos === 'right') {
        pos_left = (parseInt(getComputedStyle(this.canvas).width)) - 4 + "px";
      }
    }
    this.cp = new_dom_element({
      parentNode: this.canvasContainer,
      nodeName: "div",
      id: "cp" + index,
      style: {
        position: "absolute",
        top: pos_top,
        left: pos_left,
        width: color_picker_width + "%",
        height: color_picker_height + "px",
        cursor: "pointer"
      },
      onmousedown: __bind(function(evt) {
        old_x = evt.clientX;
        old_y = evt.clientY;
        if (this.way === 'vertical') {
          pos = this.model.color_stop[index].position.get() * cPHeight;
        } else {
          pos = this.model.color_stop[index].position.get() * cPWidth;
        }
        document.addEventListener("mousemove", _drag_evt_func, true);
        document.addEventListener("mouseup", _drag_end_func, true);
        if (typeof evt.preventDefault === "function") {
          evt.preventDefault();
        }
        this.cp.style.border;
        return this._focus_color(index);
      }, this)
    });
    new ColorPickerImg({
      el: this.cp,
      model: this.model.color_stop[index].color,
      picker_pos: this.picker_pos
    });
    _drag_evt_func = __bind(function(evt) {
      var ccWidth, currentControler, decal, newPos;
      currentControler = document.getElementById('cp' + index);
      if (this.way === 'vertical') {
        decal = Math.abs(evt.clientX - old_x);
      } else {
        decal = Math.abs(evt.clientY - old_y);
      }
      if (decal > 50) {
        currentControler.style.opacity = 0.2;
        currentControler.style.border = "medium solid red";
        del_picker = true;
      } else {
        currentControler.style.opacity = 1;
        currentControler.style.border = "none";
        del_picker = false;
      }
      if (this.way === 'vertical') {
        pos += evt.clientY - old_y;
        newPos = pos / cPHeight;
      } else {
        pos += evt.clientX - old_x;
        newPos = pos / cPWidth;
      }
      if (newPos > 1) {
        newPos = 1;
        if (this.way === 'vertical') {
          pos = cPHeight;
        } else {
          pos = cPWidth;
        }
      }
      if (newPos < 0) {
        newPos = 0;
        pos = 0;
      }
      this.model.color_stop[index].position.set(newPos);
      if (this.way === 'vertical') {
        currentControler.style.top = pos - color_picker_height / 2;
        old_y = evt.clientY;
      } else {
        ccWidth = parseInt(getComputedStyle(currentControler).width);
        currentControler.style.left = pos - ccWidth / 2;
        old_x = evt.clientX;
      }
      return typeof evt.preventDefault === "function" ? evt.preventDefault() : void 0;
    }, this);
    return _drag_end_func = __bind(function(evt) {
      var currentControler, i, _ref, _ref2, _ref3, _results;
      currentControler = document.getElementById('cp' + index);
      if (typeof document.detachEvent === "function") {
        document.detachEvent("onmousemove", _drag_evt_func);
      }
      if (typeof document.detachEvent === "function") {
        document.detachEvent("onmouseup", _drag_end_func);
      }
      if (typeof document.removeEventListener === "function") {
        document.removeEventListener("mousemove", _drag_evt_func, true);
      }
      if (typeof document.removeEventListener === "function") {
        document.removeEventListener("mouseup", _drag_end_func, true);
      }
      if (del_picker === true) {
        this.remove_color_picker(index);
        this.model.remove_color(index);
        if (index !== this.model.color_stop.length) {
          for (i = _ref = index + 1, _ref2 = this.model.color_stop.length; _ref <= _ref2 ? i <= _ref2 : i >= _ref2; _ref <= _ref2 ? i++ : i--) {
            this.remove_color_picker(i);
          }
          _results = [];
          for (i = index, _ref3 = this.model.color_stop.length; index <= _ref3 ? i <= _ref3 : i >= _ref3; index <= _ref3 ? i++ : i--) {
            _results.push(this.create_color_picker(i));
          }
          return _results;
        }
      }
    }, this);
  };
  ModelEditorItem_GradientPicker.prototype.remove_color_picker = function(index) {
    var currentControler;
    currentControler = document.getElementById('cp' + index);
    this.canvasContainer.removeChild(currentControler);
    if (document.getElementById('cp0') !== "undefined") {
      return this._focus_color(0);
    }
  };
  ModelEditorItem_GradientPicker.prototype._focus_color = function(index) {
    this.colorPicker.removeChild(this.colorPicker.firstChild);
    return new ModelEditorItem_ColorPicker({
      el: this.colorPicker,
      model: this.model.color_stop[index].color
    });
  };
  ModelEditorItem_GradientPicker.prototype.add_color_picker = function(e) {
    var indexColorStop, pos, rgba, _ref;
    _ref = this.find_color_by_event(e), rgba = _ref[0], pos = _ref[1];
    indexColorStop = this.model.color_stop.length;
    this.model.add_color([rgba[0], rgba[1], rgba[2], rgba[3]], pos);
    this.create_color_picker(indexColorStop);
    return this._focus_color(indexColorStop);
  };
  ModelEditorItem_GradientPicker.prototype.find_color_by_event = function(e) {
    var a, b, cPHeight, cPWidth, canvasDataPicked, coord, ctxPicked, g, idxPicked, pos, r;
    ctxPicked = this.canvas.getContext('2d');
    cPWidth = parseInt(getComputedStyle(this.canvas).width);
    cPHeight = parseInt(getComputedStyle(this.canvas).height);
    canvasDataPicked = ctxPicked.getImageData(0, 0, this.canvas.width, this.canvas.height);
    coord = this.get_cursor_position(e);
    if (this.way === 'vertical') {
      idxPicked = Math.round(coord[1] * 45000 / cPHeight) * 4;
    } else {
      idxPicked = Math.round(300 * coord[0] / cPWidth) * 4;
    }
    r = canvasDataPicked.data[idxPicked + 0];
    g = canvasDataPicked.data[idxPicked + 1];
    b = canvasDataPicked.data[idxPicked + 2];
    a = canvasDataPicked.data[idxPicked + 3];
    if (this.way === 'vertical') {
      pos = coord[1] / cPHeight;
    } else {
      pos = coord[0] / cPWidth;
    }
    return [[r, g, b, a], pos];
  };
  ModelEditorItem_GradientPicker.prototype.get_cursor_position = function(event) {
    var canOffset, x, y;
    canOffset = [get_left(this.canvas), get_top(this.canvas)];
    x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - Math.floor(canOffset[0]);
    y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop - Math.floor(canOffset[1]) - 1;
    return [x, y];
  };
  return ModelEditorItem_GradientPicker;
})();var ModelEditorItem_ColorPicker;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
ModelEditorItem_ColorPicker = (function() {
  __extends(ModelEditorItem_ColorPicker, ModelEditorItem);
  function ModelEditorItem_ColorPicker(params) {
    var base, baseLeft;
    ModelEditorItem_ColorPicker.__super__.constructor.call(this, params);
    this.sat_size = 200;
    base = new_dom_element({
      parentNode: this.ed,
      style: {
        position: "relative"
      }
    });
    baseLeft = new_dom_element({
      parentNode: base,
      style: {
        position: "relative",
        display: "inline-block"
      }
    });
    this._init_sat(baseLeft);
    this._init_val(baseLeft);
    this._init_edt(base);
    this._old_h = -1;
    this._old_s = -1;
  }
  ModelEditorItem_ColorPicker.prototype.onchange = function() {
    var bb, be, ctx, gb, ge, h, lineargradient, rb, re, s, v, _ref, _ref2, _ref3;
    this.new_color_block.style.background = this.model.to_hex();
    _ref = this.model.to_hsv(), h = _ref[0], s = _ref[1], v = _ref[2];
    this.value_cur.style.top = (1 - v) * this.sat_size - 5;
    if (this._old_h !== h || this._old_s !== s) {
      this._old_h = h;
      this._old_s = s;
      this.sat_lum_cur.style.left = (this.sat_lum.width - 1) * h - 5;
      this.sat_lum_cur.style.top = (this.sat_lum.height - 1) * (1 - s) - 5;
      ctx = this.val_can.getContext('2d');
      _ref2 = Color.hsv_to_rgb(h, s, 1), rb = _ref2[0], gb = _ref2[1], bb = _ref2[2];
      _ref3 = Color.hsv_to_rgb(h, s, 0), re = _ref3[0], ge = _ref3[1], be = _ref3[2];
      lineargradient = ctx.createLinearGradient(0, 0, 0, this.sat_lum.height);
      lineargradient.addColorStop(0, "rgb(" + rb + "," + gb + "," + bb + ")");
      lineargradient.addColorStop(1, "rgb(" + re + "," + ge + "," + be + ")");
      ctx.fillStyle = lineargradient;
      return ctx.fillRect(0, 0, this.sat_lum.width, this.sat_lum.height);
    }
  };
  ModelEditorItem_ColorPicker.prototype._init_sat = function(base) {
    var bb, be, ctx, gb, ge, h, lineargradient, rb, re, x, _ref, _ref2, _ref3, _results, _sat_end_func, _sat_evt_func;
    _sat_evt_func = __bind(function(evt) {
      var b, g, h, r, s, v, x, y, _ref, _ref2;
      x = evt.clientX - get_left(this.sat_lum);
      y = evt.clientY - get_top(this.sat_lum);
      _ref = this.model.to_hsv(), h = _ref[0], s = _ref[1], v = _ref[2];
      h = x / (this.sat_lum.width - 1.0);
      s = 1 - y / (this.sat_lum.height - 1.0);
      h = Math.max(0.0, Math.min(1.0, h));
      s = Math.max(0.0, Math.min(1.0, s));
      _ref2 = Color.hsv_to_rgb(h, s, v), r = _ref2[0], g = _ref2[1], b = _ref2[2];
      this.model.r.set(r);
      this.model.g.set(g);
      this.model.b.set(b);
      return typeof evt.preventDefault === "function" ? evt.preventDefault() : void 0;
    }, this);
    _sat_end_func = function(evt) {
      if (typeof document.detachEvent === "function") {
        document.detachEvent("onmousemove", _sat_evt_func);
      }
      if (typeof document.detachEvent === "function") {
        document.detachEvent("onmouseup", _sat_end_func);
      }
      if (typeof document.removeEventListener === "function") {
        document.removeEventListener("mousemove", _sat_evt_func, true);
      }
      return typeof document.removeEventListener === "function" ? document.removeEventListener("mouseup", _sat_end_func, true) : void 0;
    };
    this.sat_lum = new_dom_element({
      parentNode: base,
      nodeName: "canvas",
      width: this.sat_size,
      height: this.sat_size,
      onmousedown: __bind(function(evt) {
        document.addEventListener("mousemove", _sat_evt_func, true);
        document.addEventListener("mouseup", _sat_end_func, true);
        return _sat_evt_func(evt);
      }, this)
    });
    this.sat_lum_cur = new_dom_element({
      parentNode: base,
      className: "ColorPickerSatLumSelect",
      style: {
        position: "absolute"
      }
    });
    ctx = this.sat_lum.getContext('2d');
    _results = [];
    for (x = 0, _ref = this.sat_lum.width; 0 <= _ref ? x < _ref : x > _ref; 0 <= _ref ? x++ : x--) {
      h = x / (this.sat_lum.width - 1.0);
      _ref2 = Color.hsv_to_rgb(h, 1, 1), rb = _ref2[0], gb = _ref2[1], bb = _ref2[2];
      _ref3 = Color.hsv_to_rgb(h, 0, 1), re = _ref3[0], ge = _ref3[1], be = _ref3[2];
      lineargradient = ctx.createLinearGradient(0, 0, 0, this.sat_lum.height);
      lineargradient.addColorStop(0, "rgb(" + rb + "," + gb + "," + bb + ")");
      lineargradient.addColorStop(1, "rgb(" + re + "," + ge + "," + be + ")");
      ctx.fillStyle = lineargradient;
      _results.push(ctx.fillRect(x, 0, x, this.sat_lum.height));
    }
    return _results;
  };
  ModelEditorItem_ColorPicker.prototype._init_val = function(base) {
    var _val_end_func, _val_evt_func;
    _val_evt_func = __bind(function(evt) {
      var b, g, h, r, s, v, y, _ref, _ref2;
      y = evt.clientY - get_top(this.sat_lum);
      _ref = this.model.to_hsv(), h = _ref[0], s = _ref[1], v = _ref[2];
      v = 1 - y / (this.sat_lum.height - 1.0);
      v = Math.max(0.0, Math.min(1.0, v));
      _ref2 = Color.hsv_to_rgb(h, s, v), r = _ref2[0], g = _ref2[1], b = _ref2[2];
      this.model.r.set(r);
      this.model.g.set(g);
      this.model.b.set(b);
      return typeof evt.preventDefault === "function" ? evt.preventDefault() : void 0;
    }, this);
    _val_end_func = function(evt) {
      if (typeof document.detachEvent === "function") {
        document.detachEvent("onmousemove", _val_evt_func);
      }
      if (typeof document.detachEvent === "function") {
        document.detachEvent("onmouseup", _val_end_func);
      }
      if (typeof document.removeEventListener === "function") {
        document.removeEventListener("mousemove", _val_evt_func, true);
      }
      return typeof document.removeEventListener === "function" ? document.removeEventListener("mouseup", _val_end_func, true) : void 0;
    };
    this.val_can = new_dom_element({
      parentNode: base,
      nodeName: "canvas",
      width: 23,
      height: this.sat_size,
      onmousedown: __bind(function(evt) {
        document.addEventListener("mousemove", _val_evt_func, true);
        document.addEventListener("mouseup", _val_end_func, true);
        return _val_evt_func(evt);
      }, this),
      style: {
        marginLeft: 10
      }
    });
    return this.value_cur = new_dom_element({
      parentNode: base,
      className: "ColorPickerChromiSelect",
      style: {
        position: "absolute",
        left: 204
      }
    });
  };
  ModelEditorItem_ColorPicker.prototype._init_edt = function(base) {
    var ed;
    ed = new_dom_element({
      parentNode: base,
      nodeName: "span",
      style: {
        marginLeft: 10,
        display: "inline-block",
        width: 200
      }
    });
    this.old_color_block = new_dom_element({
      parentNode: ed,
      nodeName: "span",
      style: {
        display: "inline-block",
        marginBottom: 15,
        width: "49%",
        height: 100,
        background: this.model.to_hex()
      }
    });
    this.new_color_block = new_dom_element({
      parentNode: ed,
      nodeName: "span",
      style: {
        display: "inline-block",
        marginLeft: "2%",
        marginBottom: 15,
        width: "49%",
        height: 100
      }
    });
    new_model_editor({
      el: ed,
      model: this.model.r,
      label: "R",
      label_ratio: 0.1
    });
    new_model_editor({
      el: ed,
      model: this.model.g,
      label: "G",
      label_ratio: 0.1
    });
    new_model_editor({
      el: ed,
      model: this.model.b,
      label: "B",
      label_ratio: 0.1
    });
    new_model_editor({
      el: ed,
      model: this.model.a,
      label: "A",
      label_ratio: 0.1
    });
    return new_dom_element({
      parentNode: ed,
      style: {
        display: "inline-block",
        width: 1,
        height: 1
      }
    });
  };
  return ModelEditorItem_ColorPicker;
})();var Color;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
Color = (function() {
  __extends(Color, Model);
  function Color(r, g, b, a) {
    if (r == null) {
      r = 0;
    }
    if (g == null) {
      g = 0;
    }
    if (b == null) {
      b = 0;
    }
    if (a == null) {
      a = 255;
    }
    Color.__super__.constructor.call(this);
    this.add_attr({
      r: new ConstrainedVal(r, {
        min: 0,
        max: 255,
        div: 255
      }),
      g: new ConstrainedVal(g, {
        min: 0,
        max: 255,
        div: 255
      }),
      b: new ConstrainedVal(b, {
        min: 0,
        max: 255,
        div: 255
      }),
      a: new ConstrainedVal(a, {
        min: 0,
        max: 255,
        div: 255
      })
    });
  }
  Color.prototype.to_hex = function() {
    return "#" + Color._ts(this.r) + Color._ts(this.g) + Color._ts(this.b);
  };
  Color.prototype.to_rgba = function() {
    return "rgba(" + (this.r.get()) + ", " + (this.g.get()) + ", " + (this.b.get()) + ", " + (this.a.get()) + ")";
  };
  Color.prototype.to_hsv = function() {
    return Color.rgb_to_hsv(this.r.get(), this.g.get(), this.b.get());
  };
  Color.prototype._set = function(val) {
    if (val instanceof Color) {
      this.r.set(val.r);
      this.g.set(val.g);
      this.b.set(val.b);
      return this.a.set(val.a);
    } else if (typeof val === 'string' && val[0] === "#") {
      if (val.length === 4) {
        this.r.set("0x" + val.slice(1, 2) + val.slice(1, 2));
        this.g.set("0x" + val.slice(2, 3) + val.slice(2, 3));
        this.b.set("0x" + val.slice(3, 4) + val.slice(3, 4));
        return this.a.set(255);
      } else if (val.length === 7) {
        this.r.set("0x" + val.slice(1, 3));
        this.g.set("0x" + val.slice(3, 5));
        this.b.set("0x" + val.slice(5, 7));
        return this.a.set(255);
      } else {
        return console.error("get color " + val);
      }
    } else {
      return console.error("get color " + val);
    }
  };
  Color.rgb_to_hsv = function(r, g, b) {
    var del, h, max, min, s;
    r /= 255.0;
    g /= 255.0;
    b /= 255.0;
    min = Math.min(r, g, b);
    max = Math.max(r, g, b);
    del = max - min;
    if (max) {
      s = del / max;
    } else {
      return [0, 0, 0];
    }
    del += !del;
    if (r === max) {
      h = (g - b) / del;
    } else if (g === max) {
      h = 2 + (b - r) / del;
    } else {
      h = 4 + (r - g) / del;
    }
    h *= 60.0 / 360.0;
    if (h < 0) {
      h += 1;
    }
    return [h, s, max];
  };
  Color.hsv_to_rgb = function(h, s, v) {
    var f, i, m, n;
    h *= 6;
    i = Math.floor(h);
    f = h - i;
    if (!(i & 1)) {
      f = 1 - f;
    }
    m = Math.round(255 * v * (1 - s));
    n = Math.round(255 * v * (1 - s * f));
    v = Math.round(255 * v);
    switch (i) {
      case 1:
        return [n, v, m];
      case 2:
        return [m, v, n];
      case 3:
        return [m, n, v];
      case 4:
        return [n, m, v];
      case 5:
        return [v, m, n];
      default:
        return [v, n, m];
    }
  };
  Color._ts = function(v) {
    var r;
    r = v.get().toString(16);
    if (r.length === 1) {
      r = "0" + r;
    }
    return r;
  };
  return Color;
})();var Gradient,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

Gradient = (function(_super) {

  __extends(Gradient, _super);

  function Gradient(predef) {
    Gradient.__super__.constructor.call(this);
    this.add_attr({
      color_stop: []
    });
    if (predef === "b2w") {
      this.add_color([255, 0, 0, 255], 0);
      this.add_color([0, 255, 0, 255], 0);
      this.add_color([0, 0, 255, 255], 1);
    }
  }

  Gradient.prototype.add_color = function(color, position) {
    if (color == null) color = [0, 0, 0, 255];
    if (position == null) position = 0;
    return this.color_stop.push({
      color: new Color(color[0], color[1], color[2], color[3]),
      position: position
    });
  };

  Gradient.prototype.remove_color = function(position) {
    return this.color_stop.splice(position, 1);
  };

  Gradient.prototype.get_fragment_shader = function(v, m, n) {
    var col, dc, fs, _ref;
    if (m == null) m = "";
    if (n == null) n = "";
    dc = (function() {
      var _i, _len, _ref, _results;
      _ref = this.color_stop;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        col = _ref[_i];
        _results.push([col.position.get(), col.color.r.get() / 255.0, col.color.g.get() / 255.0, col.color.b.get() / 255.0, col.color.a.get() / 255.0]);
      }
      return _results;
    }).call(this);
    dc.sort(function(a, b) {
      return a[0] - b[0];
    });
    fs = "precision mediump float;";
    fs += "varying float " + v + ";";
    if (n.length) fs += "varying vec3 " + n + ";";
    if (m.length) fs += "uniform vec4 " + m + ";";
    fs += "void main( void ) {";
    if (n.length) {
      fs += "    float cm = abs( " + n + "[ 2 ] );";
    } else {
      fs += "    float cm = 1.0;";
    }
    for (col = 1, _ref = dc.length; 1 <= _ref ? col < _ref : col > _ref; 1 <= _ref ? col++ : col--) {
      if (m.length) {
        fs += "                    if ( " + v + " <= float( " + dc[col - 0][0] + " ) ) {\n                        vec4 c1 = vec4( " + m + ".r * float( " + dc[col - 0][1] + " ), " + m + ".g * float( " + dc[col - 0][2] + " ), " + m + ".b * float( " + dc[col - 0][3] + " ), " + m + ".a * float( " + dc[col - 0][4] + " ) );\n                        vec4 c0 = vec4( " + m + ".r * float( " + dc[col - 1][1] + " ), " + m + ".g * float( " + dc[col - 1][2] + " ), " + m + ".b * float( " + dc[col - 1][3] + " ), " + m + ".a * float( " + dc[col - 1][4] + " ) );\n                        gl_FragColor = c0 + ( c1 - c0 ) * ( " + v + " - float( " + dc[col - 1][0] + " ) ) / ( float( " + dc[col - 0][0] + " ) - float( " + dc[col - 1][0] + " ) );\n                        gl_FragColor.r *= cm; gl_FragColor.g *= cm; gl_FragColor.b *= cm;\n                        return;\n                    }\n                ";
      } else {
        fs += "                    if ( " + v + " <= float( " + dc[col - 0][0] + " ) ) {\n                        vec4 c0 = vec4( " + dc[col - 1][1] + ", " + dc[col - 1][2] + ", " + dc[col - 1][3] + ", " + dc[col - 1][4] + " );\n                        vec4 c1 = vec4( " + dc[col - 0][1] + ", " + dc[col - 0][2] + ", " + dc[col - 0][3] + ", " + dc[col - 0][4] + " );\n                        gl_FragColor = c0 + ( c1 - c0 ) * ( " + v + " - float( " + dc[col - 1][0] + " ) ) / ( float( " + dc[col - 0][0] + " ) - float( " + dc[col - 1][0] + " ) );\n                        gl_FragColor.r *= cm; gl_FragColor.g *= cm; gl_FragColor.b *= cm;\n                        return;\n                    }\n                ";
      }
    }
    return fs + "                gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n            }\n        ";
  };

  Gradient.prototype.get_color_from_pos = function(position) {
    var c, col_a, col_b, col_g, col_r, factor, i, ind_color_stop, last_ind, size_of_interval, size_of_new_interval, _len, _ref;
    ind_color_stop = [];
    _ref = this.color_stop;
    for (i = 0, _len = _ref.length; i < _len; i++) {
      c = _ref[i];
      if (c.position.get() >= position) {
        if (i === 0) {
          return [this.color_stop[0].color.r.get(), this.color_stop[0].color.g.get(), this.color_stop[0].color.b.get(), this.color_stop[0].color.a.get()];
        } else {
          ind_color_stop.push(i - 1);
          ind_color_stop.push(i);
        }
        break;
      }
    }
    if (ind_color_stop.length === 0) {
      last_ind = this.color_stop.length - 1;
      return [this.color_stop[last_ind].color.r.get(), this.color_stop[last_ind].color.g.get(), this.color_stop[last_ind].color.b.get(), this.color_stop[last_ind].color.a.get()];
    }
    size_of_interval = Math.abs(this.color_stop[ind_color_stop[1]].position.get() - this.color_stop[ind_color_stop[0]].position.get());
    size_of_new_interval = Math.abs(this.color_stop[ind_color_stop[0]].position.get() - position);
    factor = size_of_interval / size_of_new_interval;
    col_r = this.color_stop[ind_color_stop[0]].color.r.get() - Math.round((Math.abs(this.color_stop[ind_color_stop[1]].color.r.get() - this.color_stop[ind_color_stop[0]].color.r.get())) / factor);
    col_g = this.color_stop[ind_color_stop[0]].color.g.get() - Math.round((Math.abs(this.color_stop[ind_color_stop[1]].color.g.get() - this.color_stop[ind_color_stop[0]].color.g.get())) / factor);
    col_b = this.color_stop[ind_color_stop[0]].color.b.get() - Math.round((Math.abs(this.color_stop[ind_color_stop[1]].color.b.get() - this.color_stop[ind_color_stop[0]].color.b.get())) / factor);
    col_a = this.color_stop[ind_color_stop[0]].color.a.get() - Math.round((Math.abs(this.color_stop[ind_color_stop[1]].color.a.get() - this.color_stop[ind_color_stop[0]].color.a.get())) / factor);
    return [col_r, col_g, col_b, col_a];
  };

  return Gradient;

})(Model);
