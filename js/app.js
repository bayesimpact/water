var agencyData;
function openBudgetPane(agencyId) {
  $('.pane').hide();
  renderBudgetLineChart(agencyId);
}

function openMapPane() {
  $('.pane').hide();
  $('#mapPane').show();
}

$(function () {
  initMap();
  google.charts.load("current", {packages: ["line"]});

  $('#chooseADifferentAgency').click(openMapPane);
});
