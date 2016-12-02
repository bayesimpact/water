function renderBudgetLineChart(agencyId) {
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

    var visualization = new google.charts.Line($('#budgetViz')[0]);

    var data = new google.visualization.DataTable();
    data.addColumn('date', 'Month');
    data.addColumn('number', 'Projected (' + currentYearStart + '-' + (currentYearStart + 1).toString().slice(2) + ')');
    data.addColumn('number', 'Actual (' + currentYearStart + '-' + (currentYearStart + 1).toString().slice(2) + ')');
    data.addColumn('number', 'Actual Last Year (' + (currentYearStart - 1) + '-' + currentYearStart.toString().slice(2) + ')');
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
        data.addRow([new Date(year, month - 1), thisYearRunningTotal, null, lastYearRunningTotal, annualTarget]);
      } else {
        thisYearRunningTotal += agencyData.totalUsage[year + '-' + month.padLeft(2)];
        data.addRow([new Date(year, month - 1), nextMonthProjected ? thisYearRunningTotal : null, thisYearRunningTotal, lastYearRunningTotal, annualTarget]);
      }
    });

    var dateFormatter = new google.visualization.DateFormat({
        pattern: "'October through 'MMMM"
    });
    dateFormatter.format(data, 0);

    console.log(data.toJSON());

    var options = {
      title: 'Water Usage for ' + agencyData.agencyName,
      width: 900,
      height: 600,
      chartArea: {height: '80%'},
      hAxis: {
        title: 'Month of the water year (Oct - Sep)',
        format: 'MMM',
        gridlines: {count: 12}
      },
      vAxis: {
        title: 'Cumulative consumption (gallons per capita)',
        gridlines: {count: 10}
      },
      series: {
        0: {
          // Projected
          color: '#0000ff',
          lineDashStyle: [4, 4],
          lineWidth: 4
        },
        1: {
          // Actual
          color: '#0000ff',
          lineWidth: 4
        },
        2: {
          // Last year
          color: '#8888ff'
        },
        3: {
          // Target
          color: 'black'
        }
      },
      curveType: 'function'
    }

    visualization.draw(data, options);
  });
}
