app.renderGrid = (arrayContent, node)=> {
  console.log(arrayContent);
  var template = "",
      rejected = 0;
  for (var i = 0; i < arrayContent.length; i++) {
    if(arrayContent[i].thumbnail.path.indexOf("image_not_available") < 0) {
      if(node === "#detail") {
        template += `<div class="detail">
                    <img src="${arrayContent[i].thumbnail.path}.${arrayContent[i].thumbnail.extension}">
                    <h3>${arrayContent[i].name}</h3>
                    <h4>Series</h4>
                    <ul></ul>
                    </div>`
      } else {
        template += `<li ui-ref="${arrayContent[i].id}"><div class="card">
                    <img src="${arrayContent[i].thumbnail.path}.${arrayContent[i].thumbnail.extension}">
                    <h3>${arrayContent[i].name}</h3></div></li>`
      }
    } else {
      rejected++
    }
  }
  if (rejected < arrayContent.length) {
    $(node).html(template);
    $(node + " li").on("click", (e)=> {
      console.log(e.currentTarget);
      app.runGrid("characters/" + $(e.currentTarget).attr("ui-ref"), [], "#detail");
    });
  } else {
    $(node).html('<h1 class="empty-search">No pudimos encontrar nada</h1>');
  }
}

app.runGrid = (url, parameters, node)=> {
  app.callApi(url, parameters).then(
    (returndata)=> app.renderGrid(returndata, node)
  );
}
