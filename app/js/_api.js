app.callApi = (path, parameters)=> {
  var urlAjax = path.indexOf < 0 ? path : "https://gateway.marvel.com:443/v1/public/" + path;

  for (var i = 0; i < parameters.length; i++) {
    if (i) {
      urlAjax += "&" + parameters[i][0] + "=" + parameters[i][1];
    } else {
      urlAjax += "?" + parameters[i][0] + "=" + parameters[i][1]
    }
  }

  console.log(urlAjax);

  return $.getJSON(urlAjax, {
    apikey: app.api.pubKey
  })
  .then((data)=> {
    return data.data.results
  })
  .fail((err)=> console.log(err));
}
