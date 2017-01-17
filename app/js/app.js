var app = {
  "api": {
    pubKey: "e5e525c75274a0cd954ec98993d606c2"
  },
  "browser": browserDetect()
};

function browserDetect() {
  var obj = {};

  obj.userAgent = navigator.userAgent.toLowerCase();
  obj.eventDevice = obj.userAgent.match(/(iphone|ipod|ipad)/)  ? "touchstart" : "click";
  obj.mobileVer = $("body").innerWidth() < 900 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? true : false;

  if(obj.mobileVer) {
    $("body").addClass("mobile-ver");
  }

  return obj;
}

$(()=> {

  function runApp() {
    runGrid();
    searchOptions();
  }

  runApp();
});
