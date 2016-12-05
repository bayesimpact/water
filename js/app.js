var usageData;

function startApp() {
  $.getJSON('data/usage.json', null, function (data) {
    usageData = data;

    if (window.location.hash.indexOf('/') > -1) {
      var agencyParts = window.location.hash.split('#')[1].split('/');
      openBudgetPane(agencyParts[0], agencyParts[1].replace(/_/g, " "));
    } else {
      $('ul.tabs').tabs('select_tab', 'mapPane');
      initMap();
    }
  });
}

var agencyHash = "";
function openBudgetPane(agencyId, agencyName) {
  window.location.hash = agencyHash = agencyId + "/" + agencyName.replace(/ /g, "_");
  $('ul.tabs li').removeClass('disabled');
  $('ul.tabs').tabs('select_tab', 'budgetPane');
  renderBudget(agencyId, agencyName);
}

$(function () {
  google.charts.load("current", {packages: ["corechart"]});
  google.charts.setOnLoadCallback(startApp);

  $('#logo').click(function () { $('#mapTab').click(); });

  $('#mapTab').click(function () {
    window.location.hash = "";
    initMap();
  });

  $('#budgetTab').click(function () {
    window.location.hash = agencyHash;
  });
});
