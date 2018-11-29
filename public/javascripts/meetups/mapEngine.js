

const mapEngine = {

  map: new google.maps.Map(
    document.getElementById('map'), {
      zoom: 12,
      center: {
        lat: 40.4197351,
        lng: -3.7040427
      }
    }
  ),

  meetups: [],

  markers: [],

  geolocateMe: function () {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        }, () => reject('Error in the geolocation service.'));
      } else {
        reject('Browser does not support geolocation.');
      }
    })
  },

  addMarker: function (title, position, map, label) {
    this.markers.push(new google.maps.Marker({
      position,
      map,
      title,
      label
    }));
  },
  
  removeAllMarkers: function () {
    this.markers.forEach(marker => {
      marker.setMap(null);
    })
    this.markers = [];
  },
  loadData: function (markers) {
    this.removeAllMarkers();
    markers.forEach((r, i) => {
      this.addMarker(r.name, {
        lat: r.location.coordinates[0],
        lng: r.location.coordinates[1],
        label: i
      }, this.map, `${i + 1}`)
    });
  },


}

// const geolocateMe = () => {
//   return new Promise( (resolve, reject) => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         resolve({
//           lat: position.coords.latitude,
//           lng: position.coords.longitude
//         });
//       }, () => reject('Error in the geolocation service.'));
//     } else {
//       reject('Browser does not support geolocation.');
//     }
//   })
// }

// const addMarker = (title, position, map,label) => {
//   return new google.maps.Marker({
//     position,
//     map,
//     title,
//     label
//   });
// }