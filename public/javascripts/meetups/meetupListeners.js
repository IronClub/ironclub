const meetupAPI = new meetupAPIHandler("http://localhost:3000/meetupAPI");


window.onload = function () {


  meetupMenu.updateEventList(window.meetups, redirectToShow);

  meetupMenu.domElements.searchByNameInput.onkeyup = function () {
    updateMarkers(meetupMenu.getFormObject());
  }

  Array.from(meetupMenu.domElements.filterOptions).forEach((e) => {
    e.onclick = function () {
      meetupMenu.activateFilter(e);
      updateMarkers(meetupMenu.getFormObject());
    }
  })


  meetupMenu.domElements.selectSort.onchange = function () {
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

  meetupMenu.domElements.showGoBackButton.onclick = function () {
    moveTo("menu");
  }

  meetupMenu.domElements.createButton.onclick = function () {
    newEvent = meetupMenu.getAddFormObject();
    if (newEvent.hasOwnProperty("name") && newEvent.hasOwnProperty("description") && newEvent.hasOwnProperty("latitude")) {
      meetupAPI.addEvent(newEvent.name, newEvent.description, newEvent.latitude, newEvent.longitude, newEvent.type);
      moveTo("menu");
    }
  }

  meetupMenu.domElements.deleteButton.onclick = function () {
    meetupAPI.deleteEvent();
  }



  function moveTo(section) {
    switch (section) {
      case "add":
        meetupMenu.loadAddMenu();
        mapEngine.removeAllMarkers();
        break;
      case "menu":
        meetupMenu.loadMenu();
        updateMarkers(meetupMenu.getFormObject());
        break;
    }
  }
  function redirectToShow(event) {
    meetupMenu.loadShowMenu(event, deleteEvent,youAreYou);
  }

  function updateMarkers(queryObject) {
    meetupAPI.getSearchList(queryObject)
      .then(data => {
        meetupMenu.updateEventList(data, redirectToShow);
        mapEngine.loadData(data);
      })
      .catch(err => console.log(err))
  }

  function deleteEvent(eventId) {
    meetupAPI.deleteEvent(eventId);
  }

  function youAreYou(userId){
    return meetupAPI.youAreYou(userId)
    .then(({iamI}) => {
      console.log(iamI);
     return iamI;
    })
  }
}