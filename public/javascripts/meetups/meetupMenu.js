const meetupMenu = {

  //TODO : hacer objeto para crear
  domElements: {
    addButton: document.getElementById('btn-add-meetup'),
    searchByNameInput: document.getElementById('meetup-name'),
    filterOptions: document.getElementsByClassName('filter-options'),
    eventsList: document.getElementById('events-container'),
    menuContainer: document.getElementById('menu-container'),
    addContainer: document.getElementById('add-container'),
    showContainer: document.getElementById('showEvent-container'),
    selectSort: document.getElementById('select-sort'),
    addButton: document.getElementById("btn-add-meetup"),
    createButton: document.getElementById("btn-create-meetup"),
    cancelAddButton: document.getElementById("btn-cancel-add"),
    addNameInput: document.getElementById("add-name"),
    addTypeSelect: document.getElementById("add-type"),
    addLatitude: document.getElementById("add-latitude"),
    addLongitude: document.getElementById("add-longitude"),
    addDescriptionInput: document.getElementById("add-description"),
    showGoBackButton: document.getElementById("btn-show-goback"),
    showName:document.getElementById("showEvent-name"),
    showDescription:document.getElementById("showEvent-description"),
  },


  getFormObject: function () {
    let query = {};
    if (this.domElements.searchByNameInput.value !== '') {
      query.name = this.domElements.searchByNameInput.value;
    }
    let activeFilter = this.getActiveFilter();
    if (activeFilter.name !== 'All') {
      query.type = activeFilter.name;
    }
    query.sort = this.domElements.selectSort.options[this.domElements.selectSort.selectedIndex].getAttribute("name");
    return query;
  },

  getAddFormObject: function () {
    let formObject = {};
    if (this.domElements.addNameInput.value !== '') {
      formObject.name = this.domElements.addNameInput.value;
    }
    if (this.domElements.addDescriptionInput.value !== '') {
      formObject.description = this.domElements.addDescriptionInput.value;
    }
    
    if (this.domElements.addLatitude.value !== '' && this.domElements.addLongitude.value !== '') {
      formObject.latitude = this.domElements.addLatitude.value;
      formObject.longitude = this.domElements.addLongitude.value;
    }

    formObject.type = this.domElements.addTypeSelect.options[this.domElements.addTypeSelect.selectedIndex].getAttribute("name");
    return formObject;
  },

  clearAddFormObject: function(){
    this.domElements.addNameInput.value="";
    this.domElements.addDescriptionInput.value="";
    this.domElements.addTypeSelect.selectedIndex=0;
  },


  // name:String,
  // description: String,
  // location: { type: { type: String }, coordinates: [Number] },
  // type: {type:String, enum:["Quedada","Charla"]}


  getActiveFilter: function () {
    return (Array.from(this.domElements.filterOptions).filter((e) => {
      return e.classList.contains("is-active")
    }))[0];
  },


  activateFilter: function (e) {
    if (!e.classList.contains('is-active')) {
      Array.from(this.domElements.filterOptions).forEach(f => f.classList.remove('is-active'))
      e.classList.add('is-active');
    }
  },

  updateEventList: function (events,redirectFunction) {
    this.domElements.eventsList.innerHTML = "";
    events.forEach((event, i) => {
      let node = document.createElement('a');
      node.classList.add("panel-block");
      node.innerHTML = `<span class="panel-icon">
      <i class="fas fa-book" aria-hidden="true">${i + 1}</i>
      </span>
    ${event.name}`
    //TODO: asignar onclick al crear
      node.onclick=function (){redirectFunction(event)};
      this.domElements.eventsList.appendChild(node);
    })
  },


  loadMenu: function () {
    meetupMenu.domElements.addContainer.style.display = 'none';
    meetupMenu.domElements.showContainer.style.display='none';
    meetupMenu.domElements.menuContainer.style.display = 'block'; },

  loadAddMenu: function () {
    meetupMenu.clearAddFormObject();  
    meetupMenu.domElements.addContainer.style.display = 'block';
    meetupMenu.domElements.menuContainer.style.display = 'none';
    meetupMenu.domElements.showContainer.style.display='none';
  },

  loadShowMenu: function (event) {
    meetupMenu.domElements.showName.innerText=event.name;
    meetupMenu.domElements.showDescription.innerText=event.description; 
    meetupMenu.domElements.showContainer.style.display = 'block';
    meetupMenu.domElements.menuContainer.style.display = 'none';
    meetupMenu.domElements.addContainer.style.display='none';

  }
}