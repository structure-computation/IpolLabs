var test_LayoutManager;
test_LayoutManager = function() {
  var l, m;
  m = new LayoutManagerData({
    sep_norm: 0,
    children: [
      {
        panel_id: "main_view",
        strength: 3
      }, {
        sep_norm: 1,
        children: [
          {
            panel_id: "tree_view",
            max_size: [1e5, 500],
            border_s: 6
          }, {
            panel_id: "edit_view"
          }
        ]
      }
    ]
  });
  l = new LayoutManager(document.body, m);
  l.disp_top = 20;
  l.border_size = 16;
  return new_dom_element({
    parentNode: document.body,
    nodeName: "input",
    type: "button",
    value: "Random strengths",
    style: {
      position: "fixed",
      top: 5,
      right: 5
    },
    onclick: function() {
      var i, p, s, _i, _len, _ref, _results;
      _ref = m.panel_ids();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        p = m.find_item_with_panel_id(i);
        s = 0.1 + 0.8 * Math.random();
        _results.push(Animation.set(p.strength, s));
      }
      return _results;
    }
  });
};