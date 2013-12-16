var UnvReaderItem2D;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
UnvReaderItem2D = (function() {
  __extends(UnvReaderItem2D, TreeItem_Computable);
  function UnvReaderItem2D(name) {
    if (name == null) {
      name = "UnvReader_2D";
    }
    UnvReaderItem2D.__super__.constructor.call(this);
    this._name.set(name);
    this._ico.set("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAAd0SU1FB9wLHBAhCS1SofUAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAHyklEQVRYw+2XW1RU1xnHf+ecuTAzDMMdFQRBQCPKJYiKtZpWxSjaxBQrUWNbq1bTpV1tmqa2Jq6saEyMNsvYstqERE2bVINtdWkuKmhMVJpovKDEGyAKDAIiA8wFZs6Z3QfAqEBiH/qW72Xvc/be3/+3L9++wLf2DfbijH4KJj33/xO9uLb3v9UPIQcFhOj5nUe+t+ytnPt0nPQLEOLr6xQ89lX+7XkEZA4kLjGMrAgzuTpZP5fghBkMHD2CNRUBAGxrBuD8PKTnxhAWbCQ5QGGkDKnIhlFYo4eRtSz8trApF65+A8QnK9AtzyYxK5olMUHsNMqcBM4Cp4AzWKM/Jm3+Eo4IY0+b13MwLXuQ3xoVSvQyJyQ4i6Q7gzG4hIiUDYxdNoFVn+oAmFB4W0vXF0CgILTeweLTdUxXQUM2uJH99SZZtXhU9LTX6bhcvIw3iiqBQwCVCpZ6J1M6NcxAJ6AhVIlOh4Umx2SESMU6YB0nxDGyJD9CgCQh9wWQMQKPXpLazJagDmyxn2CNKkRv2Tx8IH+ND+KWIiHwNHRQcTIHuqY1ZTgDKuyEAxoBtlZiMvdEmNk+0MpVg0InN78M42bFQl55MxQAqUurTwDpSdptIbZ/JccO3sTE1RtordlGZ2vx6Rp2Tkmkzqh0V/S16wF8G1GoJ63ciQY6BWtiDTUn/9TkpmBeCv+OMtMOeKmvSsdVFc4dBL0AfMe70sJjjosnL5S/x96l9p4yITBW3MTi83dPX9zYCwBb9qGcqiYdUAkIEoQn3USS2gFWpnMp1EQTINFUo8dmCUUIqcdnLwD9eHhq7S9vf6/KNveIK/lpPPlFPTE+PzKDJrWRlvUBgGMg+tpW0gA/ss5FeHJFT/vYYFRZQgXA3+FHlpQ79fqcgk2rN+PY0ZVfX+rGt4HIKUP5/f5LzGzzEYAlXubBWRtZk2IXdj3TxjH4zFVCAIEit5O16DZAWQ1GVUUPgDFEpkP1AOJrAfYuheD8rvxrjzI6YwMvHK1miqMTC7ZhKqmznmf+U4cArmzySS2nyKzowA86GSmyjU1x5T2+PmwktAOsgCA8WqPV1YYk9R+Ghfkw63UQAnlJJnkbinmizkmwADMx2RdIGreRn//xHPmSBlDwIQgrqYCG0eInPqMFSWrp8Vd1kyGajwhAYDXV4tOc/U7Bzh/D4h2gbiZwXgYr/lnOilonIcJg0zNidhEZeb/m8KtnesQBvrMcXYOTTMAPeLAlnL+9aPcSdamF4VfbkAEFa+J5kha4exbVXVZX0JXeegnLokxW2nR8DhzDNvQA41Y8Srm4e7R2twNQs5PEIXo+A45iCt3L6taJPVVWjOWRYSEc7iqLP03O01PvjIBeJgTKMznkDrZwEjhGRMoecl783lcbRPeARefC/HUAfLyEBUApKEexjtqBEMEAL+UyJnMQu4DjwH9I+eFfmPP3QQDsd/W9BjbMZMDFan5S48KLOQIMprMcedYDdPVK+LtjVQFVOw6ou88wEvCj6AURserQAVJ0ZCwLt3xKbl0bVsBPaKqTsPjtFC3o2lOmWXoDCIG88XEeOFFFMtCGuwncTVOBGXeGDaBgszTi8D4mBGJuCqMBgdYBVe/HV8L2StAAFSSNwDgHSQ/9mSOvlCJthINumGruDeD4AwZaGG5Xaew+TPozPbqYw1Q+7OXU2gGnr6ACLgkUARJIHiTJh6T3EjaskvFPbGPP02VIr8Hqc3eJ33EkwO4cdEfqSXn1HJHdK5ruVO0GVbrzkLfzOrvmVol6AuOTGdOqEu7xEuTVMPgVs4Y5yk78pIuUbbvSC3/Keihedc+NZnLfXd2aR0h6QmI2Y9eEA2yZQ0yIMXwMqz6yiqKAMCA7eeJPk0cGkw4BmaQujhNiq2Ha0LBxxM5LABDrsIwKJoOkR0bzg7dM92rIAItK+gY4fplZLr+yg466yQCXrrHCbwp9B4c7vvqcNkGBgmb71ZfdRvPCQRbfJuo+X//9n53N7RTeQryO5QBvHmNsh860Bb0hn6hoc58A/YSkodFNeKNquY418jpAZTXBalRiI3bt2r6jvsF+aG8OjD3tGZ338txErZTWa6E35PTQAK29DG+TXChaYorOMqkhIKWD2Mx3eWNa830DUEhYp5/BrT5TLeaHm4Qg6rKTILcusBJLnueimwcwDFEo2P43+0dvN7l1BILZE58VczlMogGDailZ9qtpNVpQdps1Ya+88pkvAdjXfn8ARbuxtToZQEhYPfu/W3swnwynn3BhSawsescl19qJZXCal2xqnp2OqbnTOIKgEe5dS/XlQZE02CRX3IXSc9Ov65McpM465J8hdQAw03p/ADo9sqQgYy9LjIwd+pvlJXJ+S4cugrjYK3lV42NP2QkWoRHXkSQ1O5vICrscQUJSi1madEszUGdqro67dMMV5wwafsC8Y0HX+fBF79uwrj+A2TOp/MdltoY66sbd9I5sHjIwpLHBZaj1Kv4TbR9U6xtVDqCLPg8QIjBWtrIbc/BnALKXMpvsff8GlhrSHi92S5KAH0GmdP8A0mI6n59MSXmtr/SWaZhv9AgnNfWS3ulyOR3XPIoqsRllkBdAp1HVromNeM2dAHqNcpuJdQQE+Zid6+FdwL4TBr13fw8Yz8H/5R11z7Aqc3pXWVj87Ru3X/sv2Bv3U6+x1DgAAAAASUVORK5CYII=");
    this._viewable.set(false);
    this.add_output(new SketchItem);
  }
  UnvReaderItem2D.prototype.accept_child = function(ch) {
    return ch instanceof FileItem;
  };
  UnvReaderItem2D.prototype.sub_canvas_items = function() {
    return [];
  };
  UnvReaderItem2D.prototype.z_index = function() {};
  UnvReaderItem2D.prototype.disp_only_in_model_editor = function() {};
  return UnvReaderItem2D;
})();