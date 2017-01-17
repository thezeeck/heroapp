app.callApi = (section, parameters)=> {
  var urlAjax = "https://gateway.marvel.com:443/v1/public/" + section;

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
