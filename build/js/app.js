"use strict";

$(function () {

  var app = {
    "api": {}
  };

  // function browserDetect() {
  //   var obj = {};
  //
  //   obj.userAgent = navigator.userAgent.toLowerCase();
  //   obj.eventDevice = obj.userAgent.match(/(iphone|ipod|ipad)/)  ? "touchstart" : "click";
  //   obj.mobileVer = $("body").innerWidth() < 900 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? true : false;
  //
  //   if (app.browser.mobileVer) {
  //     $("body").addClass("mobile-ver");
  //   }
  //
  //   return obj;
  // }

  app.callApi = function (section, node) {
    var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;
    var filter = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
    var order = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "-modified";

    var pubKey = "e5e525c75274a0cd954ec98993d606c2",
        limitAjax = "&limit=" + limit,
        url = "https://gateway.marvel.com:443/v1/public/",
        orderAjax = "?orderBy=" + order,
        urlAjax = url + section + orderAjax + limitAjax;

    $.getJSON(urlAjax, {
      apikey: pubKey
    }).done(function (data) {
      console.log(data.data.results);
      app.renderGrid(data.data.results, node);
    }).fail(function (err) {
      return console.log(err);
    });
  };

  app.renderGrid = function (arrayContent, node) {
    var template = "";
    for (var i = 0; i < arrayContent.length; i++) {
      if (arrayContent[i].thumbnail.path.indexOf("image_not_available") < 0) {
        template += "<li ui-url=\"" + arrayContent[i].resourceURI + "\">\n                    <img src=\"" + arrayContent[i].thumbnail.path + "." + arrayContent[i].thumbnail.extension + "\">\n                    <h3>" + arrayContent[i].name + "</h3>\n                    </li>";
      }
    }
    $(node).append(template);
  };

  app.callApi("characters", "#gridHome");
});
//# sourceMappingURL=app.js.map
