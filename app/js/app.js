$(()=> {

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

    if (obj.mobileVer) {
      $("body").addClass("mobile-ver");
    }

    return obj;
  }

  app.callApi = (section, node, limit = 100, filter = "", order = "-modified")=> {
    var limitAjax = "&limit=" + limit,
        url = "https://gateway.marvel.com:443/v1/public/",
        orderAjax = "?orderBy=" + order,
        urlAjax = url + section + orderAjax + limitAjax;

    $.getJSON(urlAjax, {
      apikey: app.api.pubKey
    })
    .done((data)=> {
      console.log(data.data.results);
      app.renderGrid(data.data.results, node);
    })
    .fail((err)=> console.log(err));
  }

  app.renderGrid = (arrayContent, node)=> {
    var template = "";
    for (var i = 0; i < arrayContent.length; i++) {
      if(arrayContent[i].thumbnail.path.indexOf("image_not_available") < 0) {
        template += `<li ui-ref="${arrayContent[i].resourceURI + app.api.pubKey}"><div class="card">
                    <img src="${arrayContent[i].thumbnail.path}.${arrayContent[i].thumbnail.extension}">
                    <h3>${arrayContent[i].name}</h3></div></li>`
      }
    }
    $(node).append(template);
    $(node + " li").on("click", (e)=> {
      console.log(e.currentTarget);
    });
  }

  function runApp() {
    app.callApi("characters", "#gridHome");

    if (app.browser.mobileVer) {
      $("#serchToggle").on(app.browser.eventDevice, ()=> {
        $("#search").toggleClass("active");
        $("header").toggleClass("active");
      });
    } else {
      $("#serchToggle").on(app.browser.eventDevice, ()=> {
        $("header").toggleClass("active");
      });
    }
  }

  runApp();
});
