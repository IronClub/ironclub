
 

class meetupAPIHandler {
  constructor(baseUrl) {
    this.BASE_URL = baseUrl;
  }

  getFullList() {
    return axios.get(this.BASE_URL)
      .then(data => data.data)
      .catch(err => console.log(err))
  }

  getOneRegister(id) {
    return axios.get(this.BASE_URL + "/search?id=" + id)
      .then(data => data.data)
      .catch(err => console.log(err))
  }

  getSearchList(searchObject){
    let query = Object.keys(searchObject).reduce((query,key)=>{
        return query+ key+ "="+searchObject[key]+"&";
    },"");
    return axios.get(this.BASE_URL + "/search?"+query)
    .then (data=>data.data)
    .catch(err=>console.log(err));
  }

  addEvent(name,description,latitude,longitude){
    return axios.post(this.BASE_URL+"/",{name,description,latitude,longitude})
    .then (data=>data.data)
    .catch(err=>console.log(err));;
  }
}

