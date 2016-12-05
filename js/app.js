function openBudgetPane(agencyId, agencyName) {
  window.location.hash = agencyId + "/" + agencyName.replace(/ /g, "_");
  $('ul.tabs li').removeClass('disabled');
  $('ul.tabs').tabs('select_tab', 'budgetPane');
  renderBudget(agencyId, agencyName);
}

function startApp() {
  if (window.location.hash.indexOf('/') > -1) {
    var agencyParts = window.location.hash.split('#')[1].split('/');
    openBudgetPane(agencyParts[0], agencyParts[1].replace(/_/g, " "));
  } else {
    initMap();
  }
}

$(function () {
  google.charts.load("current", {packages: ["corechart"]});
  google.charts.setOnLoadCallback(startApp);

  $('.deselect-agency-button').click(function () {
    window.location.hash = "";
    $('ul.tabs').tabs('select_tab', 'mapPane');
    $('ul.tabs li:not(:first-child)').addClass('disabled');
  });

  $('#mapButton').click(function () {
    initMap();
  });
});
