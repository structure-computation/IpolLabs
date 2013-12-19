var UndoManager;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
UndoManager = (function() {
  function UndoManager(model) {
    this.model = model;
    this.max_patchs = 3;
    this.patch_undo = [];
    this.patch_redo = [];
    this.snapshotok = true;
  }
  UndoManager.prototype.snapshot = function(force) {
    var date, dma, l, lst_0, lst_1, map, mid, mid_0, mid_1, n_data, s, _i, _j, _len, _len2;
    if (force == null) {
      force = false;
    }
    if (this.snapshotok || force) {
      this.snapshotok = false;
      date = this._date_last_snapshot();
      if (this.model._date_last_modification > date) {
        this.patch_redo = [];
        this.patch_undo.push({
          date: Model._counter,
          data: this.model.get_state(date)
        });
      }
      if (this.patch_undo.length > this.max_patchs) {
        lst_0 = this.patch_undo[0].data.split("\n");
        lst_1 = this.patch_undo[1].data.split("\n");
        mid_0 = lst_0.shift();
        mid_1 = lst_1.shift();
        if (mid_0 !== mid_1) {
          console.log("weird");
        }
        map = {};
        for (_i = 0, _len = lst_0.length; _i < _len; _i++) {
          l = lst_0[_i];
          if (l.length) {
            s = l.split(" ");
            map[s[0]] = {
              type: s[1],
              data: s[2]
            };
          }
        }
        n_data = "";
        for (_j = 0, _len2 = lst_1.length; _j < _len2; _j++) {
          l = lst_1[_j];
          if (l.length) {
            s = l.split(" ");
            delete map[s[0]];
          }
        }
        for (mid in map) {
          dma = map[mid];
          this.patch_undo[1].data += "\n" + mid + " " + dma.type + " " + dma.data;
        }
        this.patch_undo.shift();
      }
    }
    if (this._timer_snap != null) {
      clearTimeout(this._timer_snap);
    }
    return this._timer_snap = setTimeout((__bind(function() {
      return this.snapshotok = true;
    }, this)), 250);
  };
  UndoManager.prototype.undo = function(num) {
    var n;
    if (num == null) {
      num = 1;
    }
    this.snapshot(true);
    num = Math.min(num, this.patch_undo.length - 1);
    if (num > 0) {
      for (n = 0; (0 <= num ? n < num : n > num); (0 <= num ? n += 1 : n -= 1)) {
        this.patch_redo.push(this.patch_undo.pop());
      }
      return this._set_state_undo_list();
    }
  };
  UndoManager.prototype.redo = function(num) {
    var date, n;
    if (num == null) {
      num = 1;
    }
    date = this._date_last_snapshot();
    if (this.model._date_last_modification > date) {
      this.patch_redo = [];
    }
    num = Math.min(num, this.patch_redo.length);
    if (num > 0) {
      for (n = 0; (0 <= num ? n < num : n > num); (0 <= num ? n += 1 : n -= 1)) {
        this.patch_undo.push(this.patch_redo.pop());
      }
      return this._set_state_undo_list();
    }
  };
  UndoManager.prototype._set_state_undo_list = function() {
    var l, lst, map, p, s, _i, _j, _len, _len2, _ref;
    map = {};
    _ref = this.patch_undo;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      p = _ref[_i];
      lst = p.data.split("\n");
      lst.shift();
      for (_j = 0, _len2 = lst.length; _j < _len2; _j++) {
        l = lst[_j];
        if (l.length) {
          s = l.split(" ");
          map[s[0]] = {
            type: s[1],
            data: s[2],
            buff: void 0
          };
        }
      }
    }
    this.model._set_state(map[this.model.model_id].data, map);
    if (this.patch_undo.length) {
      return this.patch_undo[this.patch_undo.length - 1].date = Model._counter + 2;
    }
  };
  UndoManager.prototype._date_last_snapshot = function() {
    if (this.patch_undo.length) {
      return this.patch_undo[this.patch_undo.length - 1].date;
    }
    return -1;
  };
  return UndoManager;
})();