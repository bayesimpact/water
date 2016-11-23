function openBudgetPane(agencyId) {
  $('.pane').hide();
  $('#budgetPane').show();
  $('#budgetPane #agencyName').text(agencyId);
}

function openMapPane() {
  $('.pane').hide();
  $('#mapPane').show();
}

$(function () {
  initMap();

  $('#chooseADifferentAgency').click(openMapPane);
})