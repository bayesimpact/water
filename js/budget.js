function renderBudget(agencyId, agencyName) {
  $('#budget').hide();
  $('#budgetSpinner').show();

  // Extract data from JSON.

  console.log(agencyId);
  var agencyData = usageData['CA' + agencyId];

  $('#budgetPane').show();
  $('#budgetPane #agencyName').text(agencyName);
  $('#budgetViz').html('');
  //$('#budgetViz').text(JSON.stringify(agencyData));

  var lastReportedDate = Object.keys(agencyData.totalUsage).sort().pop();
  var lastReportedMonth = parseInt(lastReportedDate.split("-")[1]);
  var lastReportedYear = parseInt(lastReportedDate.split("-")[0]);
  var currentYearStart = (lastReportedMonth >= 10) ? lastReportedYear : lastReportedYear - 1;
  var annualTarget = agencyData.annualTarget;

  var visualization = new google.visualization.LineChart($('#budgetViz')[0]);

  // Generate data for charts.

  var data = new google.visualization.DataTable();
  data.addColumn('date', 'Month');
  data.addColumn('number', currentYearStart + '-' + (currentYearStart + 1).toString().slice(2) + ' projected');
  data.addColumn('number', currentYearStart + '-' + (currentYearStart + 1).toString().slice(2));
  data.addColumn('number', (currentYearStart - 1) + '-' + currentYearStart.toString().slice(2));
  data.addColumn('number', 'annual target (2016)');

  var lastYearRunningTotal = 0;
  var thisYearRunningTotal = 0;

  data.addRow([new Date(currentYearStart, 9), null, 0, 0, Math.round(annualTarget)]);

  [10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9].forEach(function (month) {
    var year = (month >= 10) ? currentYearStart : currentYearStart + 1;

    var nextMonth = (month % 12) + 1;
    var nextMonthsYear = (month == 12) ? year + 1 : year;

    var thisMonthProjected = ((year + '-' + month.padLeft(2)) > lastReportedDate);
    var nextMonthProjected = ((nextMonthsYear + '-' + nextMonth.padLeft(2)) > lastReportedDate);

    lastYearRunningTotal += agencyData.totalUsage[(year - 1) + '-' + month.padLeft(2)];

    if (thisMonthProjected) {
      thisYearRunningTotal += agencyData.monthlyPrediction[month.padLeft(2)];
      data.addRow([
        new Date(year, month),
        Math.round(thisYearRunningTotal),
        null,
        Math.round(lastYearRunningTotal),
        Math.round(annualTarget)
      ]);
    } else {
      thisYearRunningTotal += agencyData.totalUsage[year + '-' + month.padLeft(2)];
      data.addRow([
        new Date(year, month),
        nextMonthProjected ? Math.round(thisYearRunningTotal) : null,
        Math.round(thisYearRunningTotal),
        Math.round(lastYearRunningTotal),
        Math.round(annualTarget)
      ]);
    }
  });

  var dateFormatter = new google.visualization.DateFormat({
      pattern: "'October through 'MMMM"
  });
  dateFormatter.format(data, 0);

  console.log(data.toJSON());

  // Format sidebar cards.

  var projectedPct = Math.round((thisYearRunningTotal / annualTarget - 1) * 1000) / 10;
  var lastYearPct = Math.round((lastYearRunningTotal / annualTarget - 1) * 1000) / 10;

  $('#totalBudget').text(((0).toLocaleString ? Math.round(annualTarget).toLocaleString() : Math.round(annualTarget)) + " gal. / capita");

  if (projectedPct > 0) {
    $('#projectedPct').text(projectedPct == 0 ? "EXACTLY AT" : projectedPct + "% OVER");
    $('#thisYearCard').removeClass('under').addClass('over');
  } else {
    $('#projectedPct').text(-projectedPct + "% UNDER");
    $('#thisYearCard').removeClass('over').addClass('under');
  }

  if (lastYearPct > 0) {
    $('#lastYearPct').text(lastYearPct == 0 ? "EXACTLY AT" : lastYearPct + "% OVER");
    $('#lastYearCard').removeClass('under').addClass('over');
  } else {
    $('#lastYearPct').text(-lastYearPct + "% UNDER");
    $('#lastYearCard').removeClass('over').addClass('under');
  }

  // Render the chart.

  var options = {
    title: 'Water Usage for ' + agencyName,
    titleTextStyle: {
        fontSize: 24,
    },
    fontName: "Lato",
    width: "100%",
    height: 500,
    chartArea: {width: '80%', height: '80%'},
    legend: {position: 'top'},
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
        color: '#2574A9',
        lineDashStyle: [4, 4],
        lineWidth: 4
      },
      1: {
        // Actual
        color: '#2574A9',
        lineWidth: 4
      },
      2: {
        // Last year
        color: '#7dbae3',
        lineWidth: 2
      },
      3: {
        // Target
        color: 'black',
        lineWidth: 1
      }
    },
    curveType: 'function'
  }

  $('#budgetSpinner').hide();
  $('#budget').show();

  visualization.draw(data, options);

  $(window).resize(function () { visualization.draw(data, options); });
}
