const meetupAPI = new meetupAPIHandler("http://localhost:3000/meetupAPI");


window.onload = function () {


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

  meetupMenu.domElements.selectSort.onclick = function () {
    updateMarkers(meetupMenu.getFormObject());
  }

  meetupMenu.domElements.addButton.onclick = function () {
    moveTo("add");
  }


  google.maps.event.addListener(mapEngine.map, "click", function (e) {
    if (meetupMenu.domElements.addContainer.style.display === 'block') {
      const location = {
        coordinates: [e.latLng.lat(), e.latLng.lng()]
      }
      meetupMenu.domElements.addLatitude.value = location.coordinates[0];
      meetupMenu.domElements.addLongitude.value = location.coordinates[1];
      mapEngine.loadData([{ name: "Place your event", location }]);
    }
  });


  meetupMenu.domElements.cancelAddButton.onclick = function () {
    moveTo("menu");
  }

  meetupMenu.domElements.createButton.onclick = function () {
    newEvent = meetupMenu.getAddFormObject();
    meetupAPI.addEvent(newEvent.name, newEvent.description, newEvent.latitude, newEvent.longitude);
    moveTo("menu");
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



  function moveTo(section) {
    switch (section) {
      case "add":
        meetupMenu.loadAddMenu();
        meetupMenu.loadAddMenu();
        mapEngine.removeAllMarkers();
        break;
      case "menu":
        meetupMenu.loadMenu();
        updateMarkers(meetupMenu.getFormObject());
        break;
    }
  }
  function redirectToShow(event){
    meetupMenu.loadShowMenu(event);
  }
  function updateMarkers(queryObject) {
    meetupAPI.getSearchList(queryObject)
      .then(data => {
        meetupMenu.updateEventList(data,redirectToShow);
        mapEngine.loadData(data);
      })
      .catch(err => console.log(err))
  }



}