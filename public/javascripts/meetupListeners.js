const charactersAPI = new meetupAPIHandler("http://localhost:3000/meetupAPI");



window.onload = function () {


  document.getElementById('btn-meetup-search').onclick = function () {

    let formObject = getFormObject();
    charactersAPI.getSearchList(formObject)
      .then(data => {
        console.log(window.meetups);

        // window.meetups = data;
        // loadData(document.getElementById("map"))
      })
      
      














      
      .catch (err => console.log(err))
  }

  function getFormObject() {
    let query = {};
    let nameInput = document.getElementById("meetup-name");
    if (nameInput.value !== '') {
      query.name = nameInput.value;
    }
    return query;
  }
}