function searchOptions() {

  $("#serchToggle").on(app.browser.eventDevice, ()=> {
    if ($("#search").hasClass("active")) {
      $("#search").toggleClass("active");
      $("header").toggleClass("active");
      $("#search input")[0].value = "";
      app.runGrid("characters", [["orderBy", "-modified"], ["limit", 100]], "#gridHome");
    } else {
      $("#search").toggleClass("active");
      $("header").toggleClass("active");
    }
  });


  $("#search").submit((e) => {
    e.preventDefault();
    app.callApi("characters", [
                                ["nameStartsWith", $("#search input")[0].value],
                                ["orderBy", "-modified"],
                                ["limit", 100]
                              ])
      .then(
        (returndata) => app.renderGrid(returndata, "#gridHome")
    );
  });
}
