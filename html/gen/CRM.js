var ActivityItem,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

ActivityItem = (function(_super) {

  __extends(ActivityItem, _super);

  function ActivityItem(name, id_func, name_var, bound0, bound1) {
    if (name == null) name = "function(x)";
    if (id_func == null) id_func = -1;
    if (bound0 == null) bound0 = -10;
    if (bound1 == null) bound1 = 10;
    ActivityItem.__super__.constructor.call(this);
    this._name.set(name);
    this._ico.set("data:image/png;base64,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");
    this._viewable.set(false);
    this.add_attr;
  }

  return ActivityItem;

})(TreeItem);
var ContactCollectionItem,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

ContactCollectionItem = (function(_super) {

  __extends(ContactCollectionItem, _super);

  function ContactCollectionItem(name) {
    if (name == null) name = "Contact_list";
    ContactCollectionItem.__super__.constructor.call(this);
    this._name.set(name);
    this._viewable.set(false);
    this.add_attr({
      _name: name
    });
  }

  ContactCollectionItem.prototype.accept_child = function(ch) {
    return ch instanceof ContactItem;
  };

  ContactCollectionItem.prototype.add_collection_item = function() {
    var id_child, name_temp;
    id_child = this.ask_for_id_collection_child();
    name_temp = this._name + "_" + id_child.toString();
    return this.add_child(new ContactItem(name_temp, id_child));
  };

  return ContactCollectionItem;

})(CollectionTreeItem);
var AccountCollectionItem,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

AccountCollectionItem = (function(_super) {

  __extends(AccountCollectionItem, _super);

  function AccountCollectionItem(name) {
    if (name == null) name = "Contact_list";
    AccountCollectionItem.__super__.constructor.call(this);
    this._name.set(name + "_list");
    this._viewable.set(false);
    this.add_attr({
      _name: name
    });
  }

  AccountCollectionItem.prototype.accept_child = function(ch) {
    return ch instanceof ContactItem;
  };

  AccountCollectionItem.prototype.add_collection_item = function() {
    var id_child, name_temp;
    id_child = this.ask_for_id_collection_child();
    name_temp = this._name + "_" + id_child.toString();
    return this.add_child(new AccountItem(name_temp, id_child));
  };

  return AccountCollectionItem;

})(CollectionTreeItem);
var CRMItem,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

CRMItem = (function(_super) {

  __extends(CRMItem, _super);

  function CRMItem(name) {
    if (name == null) name = "Contact_list";
    CRMItem.__super__.constructor.call(this);
    this._name.set(name);
    this._viewable.set(false);
    this.add_child(new ContactCollectionItem("Prospect"));
    this.add_child(new AccountCollectionItem("Account"));
    this.add_child(new ContactCollectionItem("Contacs"));
    this.add_child(new ContactCollectionItem("Acivity"));
  }

  CRMItem.prototype.accept_child = function(ch) {
    return false;
  };

  return CRMItem;

})(TreeItem);
var ProspectItem,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

ProspectItem = (function(_super) {

  __extends(ProspectItem, _super);

  function ProspectItem(name) {
    if (name == null) name = "Prospect";
    ProspectItem.__super__.constructor.call(this);
    this._name.set(name);
    this._viewable.set(false);
    this.add_attr({
      _id: id,
      FirstName: name,
      LastName: "",
      Title: "",
      email: "",
      phone_1: "",
      phone_2: "",
      Web_site: ""
    });
  }

  return ProspectItem;

})(TreeItem);
var AccountItem,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

AccountItem = (function(_super) {

  __extends(AccountItem, _super);

  function AccountItem(name, id) {
    if (name == null) name = "Account_test";
    if (id == null) id = 0;
    AccountItem.__super__.constructor.call(this);
    this._name.set(name);
    this._viewable.set(false);
    this.add_attr({
      name: "new account",
      description: "new account"
    });
  }

  AccountItem.prototype.accept_child = function(ch) {};

  AccountItem.prototype.get_model_editor_parameters = function(res) {
    return res.model_editor["description"] = ModelEditorItem_TextArea;
  };

  return AccountItem;

})(TreeItem);
var ContactItem,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

ContactItem = (function(_super) {

  __extends(ContactItem, _super);

  function ContactItem(name, id) {
    if (name == null) name = "function(x,y)";
    if (id == null) id = 0;
    ContactItem.__super__.constructor.call(this);
    this._name.set(name);
    this._ico.set("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAAd0SU1FB9wLHBAiEGIUWvYAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAIH0lEQVRYw92XeXDV1RXHP/f3lryXtyV5ScjCC1sIWVgCAUFCgKKURY0spSpFQEZQWsFBnaodxU4rRZSyaacjUFSsQ1EQhqI4CBOWsCeIQMIOCQnZyPpe3stbf7d/JNGgAfJPZzo9M7+59/7O+Z37/Z3zvfeeC/+LIiXMj+6C4dT3ATg0pwu2xsdbHd9PAgfvHM8ahN5hxWzQYENnshHVz8z8rzV3oG1r9sxGjExEH2XAoAUjequRjKf0d0z8/Ld3+Bd3i8DiMYTfqKRPqZOhFU4GOn1EB4RBxRhZRcLgI6SMP8LuJXW8XQFvJJA3A82eUtI2FzHE6cPuDWJQNQaVyN5V2BK/Y+DkK+xY0gLA+ipYEHfvSLwwkty+Vk4BZ4BCoAA40frovifjqZV8fN3cbv/OWGyzM9gMfA+carMvAE4THnuM1ClLWLA96qfzKHcDYBLUR1r1lWgtxWj0BxSFb2NNXNYIPBBoomj3OC41Dm+3DyZiqnDTB3ChaJvRmUuNOkp0Ck48NSo3Ds+haN9Ult8KA6BKdg5ANrS2wxWKLRHd19Dv8RUEfS+rKq//ezHL+5hoUEABl5fyxl4A8hYiOYI+50oxAoLwbrcZNX9Tup1302I4ZdYRwlfnobp8Ovs3xgIQJ+4e/ndG3HV1GIdFsEUL+ejsBbxxOgegYAG61ZN4ETiBYjxGwti1SKkB2DaVnIxodgJHsAw8w7SlmR1J2WkKXv3iTkK+Ph79lAx6ThvAwosuooMQTu+HCxgdXwjwr7Mo56vJBEIYzAHiUioQIgSQm0y9TqERELiqJCajpSP5tZ0BEI62FTOY7IwoHi1uQFoNRAeDpHi0Ng3d0vaSOWEjv4z3SPkLNr+VZ/p0EymAitA0Ez/8CqwHwB9AET/8qBZUqXaJhFKir/Ez6lYT04AJTi8DPEGdAUd2AdP+sIat864CsCuPvhoyCm8RBgiE1smMeZfa/ey9iskbpJV41niBy+tCCHlfAPyDcG+Amy6VL+MtXNYoqBBSKT3Qj0sncumxpDXHHyJO55PZIAmihAssaS7mcLHdTYGH+JCCHZDE2t24m11dioD7PE4RYhcKK+pVFi4cwma7UXUR8ERQuP9pFk5IEFKS50ecaSILCKHXBeiRXNaefynhwi161TVhARQ01suE4t33BZA/F8xrUL+6hltVafS5aXx/Pd9adNQCkvoCA35bf7kRlryOubSMFEAiFQ/RY4rb/eTNJb2ymUF1AVRAT2LvAua90txxC1fa+w+ljPkBwKiPgT9fAKBkddvLi4SHRDtpFYki/DwL2iIGHqls+xFF18LCJy60+TT8vZCJF2tIBUIkPOgGeYTZwtPK9E72gRdmDDHPmTYuu30Nd5SZqbwWoecAcJjYnBP8cVscwIbxLAaOooTlkzD5UwDfUszTB/BSlIF84DAYCxn67GI+lqaf+tV2YL3mr0+dzl65U7OC8JibmONO4qmtsBuDJqPCiG2XSfKrbd+kjtrFmZY6gGNOBgMqMijxnIs063gv/j3617dgBVRAR/LYfFInb2eucLMkH1aP+jmA9ZMwXq5iYlUg5CFQGwVMBkRdK2VUECGQkv5PniBr0Do56El1WRr2gx/RtzX/IWgsi2iGkQSQQAitSZKUncfoF9eyaWIVjIQF2bC6kwjYHHiNXrb1icRf4aJfS7ADQYVOYomrIGPK1xxd9xVCqBVv8ejS5bylak21ArdPdiS0og9h7l5O8kNfnihcn78oJjb8ZNZzBgo/9JImoEJCQgcOrJz6cz48PYi4eKuSTuTgftm/XWebnhWhJfsvPwD+21gWCcRh7Z9qJhfmYBjRnd4mnZJJ1IBUlklju90nuYzum5S+n/SZszrjlgLwyo7WQdmqHxWb9+Ma5lD7E2ya3Lxv9dRDRY2/5+q2ReSu7Qlw3ks/tElKMDfmwj5BtKrygCbMMMHgu5nLhonjY3aUmF/KImvdcZ4rd9420lSVxdiX4+9ZDzhe+rFfvYxYTzPjdUrg1+ed5p7xkSLGVHN6FnW3n9gnpb6mmh7SMdi//buRwf3lYvnJBsc8n9nu7mVoirc0nnvz9vsbZmQmo3P7sbT4zZWY7ZeQQfd9CxJZ19r+8xw2p0/pFohMPxKqPLvi+yfkZxEGKqltsKfmDe31XRkGYmNv1O489sje69pkHnl3q6+q7INnHmBTf4PXQtEFx5hJWfVWDU56PXiNDz7fwqF1DfAg9zyOhb0tHW7sfkNid7TRxQjRsqOEbqEQBmIclXUHq1LKg2gxpBQXVJKF0Ht48ckCALfE2hjSBrHaXFv3nI1pVsyJ6MQNHqa1Hiw6escmdNezoNFDdF2tJxx/U9Sr36yN+uQsw9ymHlEkxh7PP1mXoIKWweOuRYTRglT1fLY76Ytcos+W8Ngln6Wa7Cmnaq8GYqQ+OhZnwCkgCECGuH9NKGuw+DQk1QZkVQJX+m+e+dqqvBrraE/C8N0sfqbgQqM3Uxh72xnhKM6I4bM0u7dGv+X5hXP2hi076uzZQ+0+bCMf5eYbjHh1oWoXTaW/kaNfGdTZXJ0WJCVLsbQ0ktQS1assNjXn8/q9a5yu8JgQPR64TLYI+EewnrDoLST4r8/ZTmBvqnyz5NKtGI9iEh6RVK1dvOVGUAiifqU5rr/S8jtCPhst/vIu3YgAlj9Mek53zTckjl6FlLaONtu7eLsakTO2c0WZvHsE2rlxO4gnoLfl4zOfBpo62kzvIoDjhw90rnCI+6cgJLmJJmwVGAOdHpv/zUvpY45OFMWS/1v5D/lyMtiyddg2AAAAAElFTkSuQmCC");
    this._viewable.set(false);
    this.add_attr({
      _id: id,
      FirstName: name,
      LastName: "",
      Title: "",
      email: "",
      phone_1: "",
      phone_2: "",
      Web_site: ""
    });
  }

  ContactItem.prototype.accept_child = function(ch) {};

  return ContactItem;

})(TreeItem);
var Function,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

Function = (function(_super) {

  __extends(Function, _super);

  function Function() {
    var onload,
      _this = this;
    Function.__super__.constructor.call(this);
    this.add_attr({
      _f_t: "t",
      _tmin: 0,
      _tmax: 10,
      _nb_values: 10,
      _v1: new Vec,
      _v2: new Vec,
      _mesh: new Mesh({
        not_editable: true
      })
    });
    onload = function() {
      _this._signal_change();
      if (_this._v2.length === 0) return _this.fill_v1_v2();
    };
    this.bind(function() {
      if (_this._f_t.has_been_modified() || _this._tmin.has_been_modified() || _this._tmax.has_been_modified() || _this._nb_values.has_been_modified()) {
        return _this.make_mesh();
      }
    });
  }

  Function.prototype.fill_v1_v2 = function() {
    var i, str, t, val_f, _ref, _ref2, _results;
    this._v1.clear();
    this._v2.clear();
    for (i = 0, _ref = this._nb_values.get(); 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
      this._v1.push(0);
      this._v2.push(0);
      this._v1[i].set(this._tmin.get() + i * (this._tmax.get() - this._tmin.get()) / (this._nb_values.get() - 1));
    }
    _results = [];
    for (i = 0, _ref2 = this._nb_values.get(); 0 <= _ref2 ? i < _ref2 : i > _ref2; 0 <= _ref2 ? i++ : i--) {
      t = this._v1[i];
      str = "t=" + t + "; val_t = " + this._f_t + ";";
      val_f = eval(str);
      _results.push(this._v2[i].set(val_t));
    }
    return _results;
  };

  Function.prototype.make_mesh = function() {
    var bar, i, liste, _ref, _ref2, _results;
    this.fill_v1_v2();
    this._mesh.points.clear();
    this._mesh._elements.clear();
    for (i = 0, _ref = this._nb_values.get(); 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
      this._mesh.add_point([this._v1[i], this._v2[i], 0]);
    }
    _results = [];
    for (i = 0, _ref2 = this._nb_values.get() - 1; 0 <= _ref2 ? i < _ref2 : i > _ref2; 0 <= _ref2 ? i++ : i--) {
      liste = [i, i + 1];
      bar = new Element_Line(liste);
      _results.push(this._mesh.add_element(bar));
    }
    return _results;
  };

  Function.prototype.information = function(div) {
    var d, i, m, _ref;
    if (!(this.cm != null)) {
      this.txt = new_dom_element({
        parentNode: div
      });
      d = new_dom_element({
        parentNode: div
      });
      this.fill_v1_v2();
      m = new Graph({
        marker: 'bar',
        show_line: false,
        shadow: false,
        marker_size: 2,
        font_size: 10
      });
      for (i = 0, _ref = this._nb_values.get(); 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
        m.points.push([this._v1[i], this._v2[i], 0]);
      }
      m.build_w2b_legend();
      this.cm = new CanvasManager({
        el: d,
        want_aspect_ratio: true,
        padding_ratio: 1.4,
        constrain_zoom: 'x',
        width: '',
        class_name: 'histogramm'
      });
      this.cm.cam.threeD.set(false);
      this.cm.items.push(m);
      this.cm.fit();
    }
    return this.cm.draw();
  };

  return Function;

})(Model);
