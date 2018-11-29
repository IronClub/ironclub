const meetupMenu = {

  //TODO : hacer objeto para crear
  domElements: {
    addButton: document.getElementById('btn-add-meetup'),
    searchByNameInput: document.getElementById('meetup-name'),
    filterOptions: document.getElementsByClassName('filter-options'),
    eventsList: document.getElementById('events-container'),
    menuContainer: document.getElementById('menu-container'),
    addContainer: document.getElementById('add-container'),
    selectSort: document.getElementById('select-sort'),
    addButton: document.getElementById("btn-add-meetup"),
    createButton: document.getElementById("btn-create-meetup"),
    cancelAddButton: document.getElementById("btn-cancel-add"),
    addNameInput: document.getElementById("add-name"),
    addTypeSelect: document.getElementById("add-type"),

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

    formObject.type = this.domElements.addTypeSelect.options[this.domElements.addTypeSelect.selectedIndex].getAttribute("name");
    return formObject;
  },


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

  updateEventList: function (events) {
    this.domElements.eventsList.innerHTML = "";
    events.forEach((event, i) => {
      let node = document.createElement('a');
      node.classList.add("panel-block");
      node.innerHTML = `<span class="panel-icon">
      <i class="fas fa-book" aria-hidden="true">${i + 1}</i>
    </span>
    ${event.name}`
      this.domElements.eventsList.appendChild(node);
    })
  },


  loadMenu: function () {
    meetupMenu.domElements.addContainer.style.display = 'none';
    meetupMenu.domElements.menuContainer.style.display = 'block';
  },

  loadAddMenu: function () {
    meetupMenu.domElements.addContainer.style.display = 'block';
    meetupMenu.domElements.menuContainer.style.display = 'none';
  }


}