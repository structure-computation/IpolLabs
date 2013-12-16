var test_TreeView;

test_TreeView = function() {
  var d, v;
  d = new Lst([
    {
      _name: "root",
      _children: [
        {
          _name: "child_0 which accepts child_1 as child",
          _viewable: true,
          _ico: "../plugins/ModelEditor/img/cross.png",
          accept_child: function(ch) {
            return ch._name.equals("child_1");
          }
        }, {
          _name: "child_1",
          _viewable: true
        }, {
          _name: "child_2",
          _viewable: true
        }, {
          _name: "child_3",
          _viewable: true
        }
      ],
      accept_child: function(ch) {
        return true;
      }
    }
  ]);
  v = new TreeView(document.body, d);
  v.visibility_context.set("a");
  new_dom_element({
    parentNode: document.body,
    nodeName: "input",
    type: "button",
    value: "vc a",
    onclick: function() {
      return v.visibility_context.set("a");
    },
    style: {
      marginTop: 100
    }
  });
  return new_dom_element({
    parentNode: document.body,
    nodeName: "input",
    type: "button",
    value: "vc b",
    onclick: function() {
      return v.visibility_context.set("b");
    }
  });
};
