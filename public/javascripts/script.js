

document.addEventListener('DOMContentLoaded', () => {


  // mapEngine.addMarkers(window.meetups);
  mapEngine.loadData(window.meetups);
  meetupMenu.updateEventList(window.meetups);
  

  // geolocateMe()
  //   .then(center => map.setCenter(center))
  //   .catch(e => console.log(e))

}, false);