const loadData = (map) => {
  meetups.forEach((r,i) => {
    addMarker(r.name, {
      lat: r.location.coordinates[0],
      lng: r.location.coordinates[1],
      label: i
    }, map,`${i+1}`) 
  })

}