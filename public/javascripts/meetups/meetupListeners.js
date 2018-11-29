const charactersAPI = new meetupAPIHandler("http://localhost:3000/meetupAPI");


window.onload = function () {


  meetupMenu.domElements.addButton.onclick = function () {
    meetupMenu.loadAddMenu();
  }

  //TODO si pongo onkeydown coge una letra de menos,
  //si pongo onkeypress no me coge el backspace
  meetupMenu.domElements.searchByNameInput.onkeydown = function () {
    updateMarkers(meetupMenu.getFormObject());
  }

  Array.from(meetupMenu.domElements.filterOptions).forEach((e) => {
    e.onclick = function () {
      meetupMenu.activateFilter(e);
      updateMarkers(meetupMenu.getFormObject());
    }
  })

  meetupMenu.domElements.addButton.onclick= function(){
    meetupMenu.loadAddMenu();
    mapEngine.removeAllMarkers();
  }

  meetupMenu.domElements.createButton.onclick= function(){
    meetupMenu.getAddFormObject();
    let newEvent= {};
    Event.add(newEvent);
  }

  // let marker;
  // google.maps.event.addListener(map, "click", function (e) {

  //   //lat and lng is available in e object
  //   const location = {
  //     lat:e.latLng.lat(),
  //     lng:e.latLng.lng()
  //   }
  //   console.log(location);

  //   document.querySelector('input[name=latitude]').value = location.lat;
  //   document.querySelector('input[name=longitude]').value = location.lng;

  //   if(marker){ marker.setMap(null) }
  //   marker = addMarker('Restaurant Position',location, map);

  //   document.querySelector('.locationStatus').innerHTML = "Ready";

  // });



  function updateMarkers(queryObject) {
    charactersAPI.getSearchList(queryObject)
      .then(data => {
        meetupMenu.updateEventList(data);
        mapEngine.loadData(data);
      })
      .catch(err => console.log(err))
  }



}