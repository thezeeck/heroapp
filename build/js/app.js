"use strict";

var app = {
  "api": {
    pubKey: "e5e525c75274a0cd954ec98993d606c2"
  },
  "browser": browserDetect()
};

function browserDetect() {
  var obj = {};

  obj.userAgent = navigator.userAgent.toLowerCase();
  obj.eventDevice = obj.userAgent.match(/(iphone|ipod|ipad)/) ? "touchstart" : "click";
  obj.mobileVer = $("body").innerWidth() < 900 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? true : false;

  if (obj.mobileVer) {
    $("body").addClass("mobile-ver");
  }

  return obj;
}

$(function () {

  app.callApi = function (section, parameters) {
    var urlAjax = "https://gateway.marvel.com:443/v1/public/" + section;

    for (var i = 0; i < parameters.length; i++) {
      if (i) {
        urlAjax += "&" + parameters[i][0] + "=" + parameters[i][1];
      } else {
        urlAjax += "?" + parameters[i][0] + "=" + parameters[i][1];
      }
    }

    console.log(urlAjax);

    return $.getJSON(urlAjax, {
      apikey: app.api.pubKey
    }).then(function (data) {
      return data.data.results;
    }).fail(function (err) {
      return console.log(err);
    });
  };

  app.renderGrid = function (arrayContent, node) {
    console.log(arrayContent);
    var template = "",
        rejected = 0;
    for (var i = 0; i < arrayContent.length; i++) {
      if (arrayContent[i].thumbnail.path.indexOf("image_not_available") < 0) {
        template += "<li ui-ref=\"" + (arrayContent[i].resourceURI + app.api.pubKey) + "\"><div class=\"card\">\n                    <img src=\"" + arrayContent[i].thumbnail.path + "." + arrayContent[i].thumbnail.extension + "\">\n                    <h3>" + arrayContent[i].name + "</h3></div></li>";
      } else {
        rejected++;
      }
    }
    if (rejected < arrayContent.length) {
      $(node).html(template);
      $(node + " li").on("click", function (e) {
        console.log(e.currentTarget);
      });
    } else {
      $(node).html('<h1 class="empty-search">No pudimos encontrar nada</h1>');
    }
  };

  function searchOptions() {

    $("#serchToggle").on(app.browser.eventDevice, function () {
      if ($("#search").hasClass("active")) {
        $("#search").toggleClass("active");
        $("header").toggleClass("active");
        $("#search input")[0].value = "";
        runGrid();
      } else {
        $("#search").toggleClass("active");
        $("header").toggleClass("active");
      }
    });

    $("#search").submit(function (e) {
      e.preventDefault();
      app.callApi("characters", [["nameStartsWith", $("#search input")[0].value], ["orderBy", "-modified"], ["limit", 100]]).then(function (returndata) {
        return app.renderGrid(returndata, "#gridHome");
      });
    });
  }

  function runGrid() {
    app.callApi("characters", [["orderBy", "-modified"], ["limit", 100]]).then(function (returndata) {
      return app.renderGrid(returndata, "#gridHome");
    });
  }

  function runApp() {
    runGrid();
    searchOptions();
  }

  runApp();
});
//# sourceMappingURL=app.js.map
