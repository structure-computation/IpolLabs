var test_ScriptEditor;
test_ScriptEditor = function() {
  var body, editor, lst_variables, lst_variables_value, model, old_lst_variables;
  model = new Model({
    text_editor: new StrLanguage("Class Steel\n    Poisson := 0.28\n    Young := 210\n", "javascript", this.parse_code_onchange)
  });
  body = new_dom_element({
    parentNode: document.body
  });
  editor = new_model_editor({
    el: body,
    model: model,
    item_width: 60
  });
  lst_variables = new Lst;
  old_lst_variables = new Lst;
  lst_variables_value = new Lst;
  console.log(this);
  return {
    parse_code_onchange: function() {
      var attr, i, reg, variable, variable_value, _i, _len, _results;
      for (_i = 0, _len = lst_variables.length; _i < _len; _i++) {
        attr = lst_variables[_i];
        rem_attr(attr.get());
      }
      lst_variables.clear();
      reg = /(\w+?) *:= *([0-9\.]+)/g;
      i = 0;
      _results = [];
      while (reg.exec(this.code.get())) {
        if (i > 1000) {
          console.error('Too much variables');
          break;
        }
        console.log('variable ', RegExp.$1, ' found, value :', RegExp.$2);
        variable = RegExp.$1;
        variable_value = parseFloat(RegExp.$2);
        if (!(this[variable] != null)) {
          this.add_attr(variable, [variable_value, false]);
          this.lst_variables.push(variable);
        } else {
          this.set_attr(this[variable], variable_value);
        }
        _results.push(i++);
      }
      return _results;
    }
  };
};