var agencyData;
function openBudgetPane(agencyId) {
  $('.pane').hide();

  $.getJSON('data/sample.json', null, function (data) {
    agencyData = data.sampleId;

    $('#budgetPane').show();
    $('#budgetPane #agencyName').text(agencyData.agencyName);
    //$('#budgetViz').text(JSON.stringify(agencyData));

    var lastReportedDate = Object.keys(agencyData.totalUsage).sort().pop();
    var lastReportedMonth = parseInt(lastReportedDate.split("-")[1]);
    var lastReportedYear = parseInt(lastReportedDate.split("-")[0]);
    var currentYearStart = (lastReportedMonth >= 10) ? lastReportedYear : lastReportedYear - 1;
    var annualTarget = agencyData.annualTarget;

    console.log(lastReportedDate);
    console.log(lastReportedMonth);
    console.log(lastReportedYear);
    console.log(currentYearStart);
    console.log(agencyData.totalUsage);

    var visualization = new google.visualization.LineChart($('#budgetViz')[0]);

    var data = new google.visualization.DataTable();
    data.addColumn('date', 'Month');
    data.addColumn('number', 'Actual (water year ' + currentYearStart + '-' + (currentYearStart + 1).toString().slice(2) + ')');
    data.addColumn('number', 'Projected (water year ' + currentYearStart + '-' + (currentYearStart + 1).toString().slice(2) + ')');
    data.addColumn('number', 'Actual Last Year (water year ' + (currentYearStart - 1) + '-' + currentYearStart.toString().slice(2) + ')');
    data.addColumn('number', 'Annual Target');

    var lastYearRunningTotal = 0;
    var thisYearRunningTotal = 0;

    [10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9].forEach(function (month) {
      var year = (month >= 10) ? currentYearStart : currentYearStart + 1;

      var nextMonth = (month % 12) + 1;
      var nextMonthsYear = (month == 12) ? year + 1 : year;

      var thisMonthProjected = ((year + '-' + month.padLeft(2)) > lastReportedDate);
      var nextMonthProjected = ((nextMonthsYear + '-' + nextMonth.padLeft(2)) > lastReportedDate);

      lastYearRunningTotal += agencyData.totalUsage[(year - 1) + '-' + month.padLeft(2)];

      if (thisMonthProjected) {
        thisYearRunningTotal += agencyData.monthlyPrediction[month.padLeft(2)];
        data.addRow([new Date(year, month - 1), null, thisYearRunningTotal, lastYearRunningTotal, annualTarget]);
      } else {
        thisYearRunningTotal += agencyData.totalUsage[year + '-' + month.padLeft(2)];
        data.addRow([new Date(year, month - 1), thisYearRunningTotal, nextMonthProjected ? thisYearRunningTotal : null, lastYearRunningTotal, annualTarget]);
      }
    });

    console.log(data.toJSON());

    var options = {
      title: 'Water Usage for ' + agencyData.agencyName,
      width: 1000,
      height: 800,
      hAxis: {
        title: 'Month of the water year (Oct - Sep)',
        format: 'MMM'
      },
      vAxis: {
        title: 'Cumulative consumption (gallons per capita)'
      },
      series: {
        0: {
          // Actual
          color: '#0000ff',
          lineWidth: 4
        },
        1: {
          // Projected
          color: '#0000ff',
          lineDashStyle: [4, 4],
          lineWidth: 4
        },
        2: {
          // Last year
          color: '#8888ff',
          lineWidth: 2
        },
        3: {
          // Target
          color: 'black',
          lineWidth: 1
        }
      }
    }

    visualization.draw(data, options);
  });
}

function openMapPane() {
  $('.pane').hide();
  $('#mapPane').show();
}

$(function () {
  initMap();
  google.charts.load("current", {packages: ["corechart"]});

  $('#chooseADifferentAgency').click(openMapPane);
});
