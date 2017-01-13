$(()=> {

  var app = {
    "api": {}
  };

  app.callApi = (section, node, limit = 100, filter = "", order = "-modified")=> {
    var pubKey = "e5e525c75274a0cd954ec98993d606c2",
        limitAjax = "&limit=" + limit,
        url = "https://gateway.marvel.com:443/v1/public/",
        orderAjax = "?orderBy=" + order,
        urlAjax = url + section + orderAjax + limitAjax;

        $.getJSON(urlAjax, {
          apikey: pubKey
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
        template += `<li ui-url="${arrayContent[i].resourceURI}">
                    <img src="${arrayContent[i].thumbnail.path}.${arrayContent[i].thumbnail.extension}">
                    <h3>${arrayContent[i].name}</h3>
                    </li>`
      }
    }
    $(node).append(template);
  }

  app.callApi("characters", "#gridHome");
});