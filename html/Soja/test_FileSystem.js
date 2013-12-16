var test_FileSystem;
test_FileSystem = function() {
  var fs;
  FileSystem._disp = true;
  fs = new FileSystem;
  return fs.load("/", function(dir, err) {
    var a, add_ifn, b;
    a = new Model;
    b = new Model;
    new_model_editor({
      el: document.body,
      model: a,
      label: "existing models"
    });
    new_model_editor({
      el: document.body,
      model: b,
      label: "new ones"
    });
    add_ifn = function(name, fun) {
      var f, obj;
      f = dir.find(name);
      if (f != null) {
        return f.load(function(obj, err) {
          console.log("err", err);
          if (!err) {
            return a.add_attr(name, obj);
          }
        });
      } else {
        obj = Model.conv(fun());
        dir.add_file(name, obj);
        return b.add_attr(name, obj);
      }
    };
    console.log(dir.get());
    add_ifn("val", function() {
      return 10;
    });
    add_ifn("con", function() {
      return new ConstrainedVal(0, {
        min: 0,
        max: 100
      });
    });
    add_ifn("str", function() {
      return "txt";
    });
    add_ifn("lst", function() {
      return [1, 2];
    });
    add_ifn("col", function() {
      return new Color;
    });
    add_ifn("bol", function() {
      return new Bool;
    });
    return add_ifn("arr", function() {
      var res;
      res = new TypedArray_Float64([2, 3]);
      res.set_val([0, 0], 1);
      return res;
    });
  });
};