var map;
var pwsid;

$(window).resize(function () { map = null; });  // Clear map object on resize to triger redraw.

function initMap() {
  if (map) {
    return;
  }

  $('#mapContainer').css('height', ($(window).height() - 330) + 'px');

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.9, lng: -120.7},
    zoom: 8
  });

  // Zoom into user location if possible.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(pos) {
      var userLocation = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      };
      map.setCenter(userLocation);
      map.setZoom(10);
    });
  }

  // Load water supplier GeoJSON data.
  $.getJSON('data/water-suppliers.geojson', null, function (data) {
    // Add GeoJSON regions and style them.
    var regions = data.features.filter(function (x) { return usageData['CA' + x.properties.pwsid]; });

    map.data.addGeoJson({type: 'FeatureCollection', features: regions});

    map.data.setStyle(function(feature) {
      var id = parseInt(feature.getProperty('pwsid'));
      var color = ['#09C', '#393', '#39C', '#039'][(id % 123) % 4];

      return {
        fillColor: color,
        strokeColor: color,
        strokeWeight: 2
      };
    });

    // Add mouseover & click events.
    var infoWindow = new google.maps.InfoWindow();

    map.data.addListener('mouseover', function (event) {
      var id = event.feature.getProperty('pwsid');
      var name = formatAgencyName(event.feature.getProperty('pwsname'))

      map.data.overrideStyle(event.feature, {strokeWeight: 4});

      infoWindow.open(map);
      infoWindow.setPosition(event.latLng);
      infoWindow.setContent('<div id="infoWindow" onClick="openBudgetPane(\'' + id + '\',\'' + name + '\')">' + name + '</div>');

      google.maps.event.addListenerOnce(map, 'mousemove', function() {
        map.data.revertStyle();
        infoWindow.close();
      });
    });

    map.data.addListener('click', function (event) {
      openBudgetPane(event.feature.getProperty('pwsid'), formatAgencyName(event.feature.getProperty('pwsname')));
    });

    // Wait a bit for things to render, then hide the spinner.
    setTimeout(function () {
      $('#mapSpinner').hide();
    }, 1000);
  });
}

function formatAgencyName(rawName) {
  return rawName.replace(/(.*)- city of/i, 'city of $1')
                .replace(/(.*)\, city of/i, 'city of $1')
                .replace(/(.*)\, town of/i, 'town of $1')
                .replace(/([^\s])-([^\s])/g, '$1 - $2')
                .replace(/([^\s])\/([^\s])/g, '$1 / $2')
                .toProperCase()
                .replace('Of', 'of')
                .replace('Csd', 'CSD')
                .replace('Cwd', 'CWD')
                .replace('Cwwd', 'CWWD')
                .replace('Id', 'ID')
                .replace('I.d.', 'ID')
                .replace('Mud', 'MUD')
                .replace('Mwd', 'MWD')
                .replace('Pud', 'PUD')
                .replace('Sd', 'SD')
                .replace('Tud', 'TUD')
                .replace('Wd', 'WD')
                .replace('Wwd', 'WWD')
}
