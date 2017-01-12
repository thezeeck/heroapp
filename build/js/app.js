"use strict";

$(function () {

  var app = {
    "api": {}
  };

  app.callApi = function (section, node, append) {
    var limit = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 100;
    var filter = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "";
    var order = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "-modified";

    var pubKey = "e5e525c75274a0cd954ec98993d606c2",
        limitAjax = "&limit=" + limit,
        url = "https://gateway.marvel.com:443/v1/public/",
        orderAjax = "?orderBy=" + order,
        urlAjax = url + section + orderAjax + limitAjax;

    $.getJSON(urlAjax, {
      apikey: pubKey
    }).done(function (data) {
      console.log(data.data.results);
      if (append) {
        app.renderGrid(data.data.results, node);
      }
    }).fail(function (err) {
      return console.log(err);
    });
  };

  app.renderGrid = function (arrayContent, node) {
    var template = "";
    for (var i = 0; i < arrayContent.length; i++) {
      if (arrayContent[i].thumbnail.path.indexOf("image_not_available") < 0) {
        template += "<li><img src=\"" + arrayContent[i].thumbnail.path + "." + arrayContent[i].thumbnail.extension + "\"></li>";
      }
    }
    $(node).append(template);
  };

  app.callApi("characters", "#gridHome", true);
});
//# sourceMappingURL=app.js.map
