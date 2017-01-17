app.renderGrid = (arrayContent, node)=> {
  console.log(arrayContent);
  var template = "",
      rejected = 0;
  for (var i = 0; i < arrayContent.length; i++) {
    if(arrayContent[i].thumbnail.path.indexOf("image_not_available") < 0) {
      template += `<li ui-ref="${arrayContent[i].resourceURI + app.api.pubKey}"><div class="card">
                  <img src="${arrayContent[i].thumbnail.path}.${arrayContent[i].thumbnail.extension}">
                  <h3>${arrayContent[i].name}</h3></div></li>`
    } else {
      rejected++
    }
  }
  if (rejected < arrayContent.length) {
    $(node).html(template);
    $(node + " li").on("click", (e)=> {
      console.log(e.currentTarget);
    });
  } else {
    $(node).html('<h1 class="empty-search">No pudimos encontrar nada</h1>');
  }
}

function runGrid() {
  app.callApi("characters", [["orderBy", "-modified"], ["limit", 100]]).then(
    (returndata)=> app.renderGrid(returndata, "#gridHome")
  );
}
