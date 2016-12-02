function openBudgetPane(agencyId) {
  $('ul.tabs li').removeClass('disabled');
  $('ul.tabs').tabs('select_tab', 'budgetPane');
  renderBudgetLineChart(agencyId);
}

$(function () {
  google.charts.load("current", {packages: ["corechart"]});

  $('.deselect-agency-button').click(function () {
    $('ul.tabs').tabs('select_tab', 'mapPane');
    $('ul.tabs li:not(:first-child)').addClass('disabled');
  });

  initMap();
});
