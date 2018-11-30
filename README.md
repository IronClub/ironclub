### Características
* Uso de tecnologías Front-Back
* Sonidos añadidos
* Favicon
* Juegos añadidos

## 1. Prueba IronClub
#### https://ironclub.herokuapp.com/

## 2. Parte del código que me ha gustado :+1:
#### Yared:
<img src="https://steemitimages.com/0x0/https://cdn.steemitimages.com/DQmXJ7yXv2sA4bdkzgCaHNG4Yf2uANB7KV3wGuaJFsj4APD/3F386B17-C268-42DF-9C33-0E920A7C05A2.gif" width="300">

```
 User.deleteMany()
  .then(() => {
    return User.create(users)
  })
  .then(usersCreated => {
    return Section.deleteMany()
    .then(()=> {
      const Front = new Section(sections[0])
      return Front.save()
      // return Section.create(sections)
    })
    .then(FrontSave =>{
      const Back = new Section(sections[1])
      return Back.save()
      .then(BackSave => [FrontSave, BackSave])
    })
```

#### Juan:
<img src="https://vignette.wikia.nocookie.net/crayonshinchan/images/0/00/Action_mask_shin.gif/revision/latest?cb=20161220083135" width="300">

```
updateEventList: function (events, redirectFunction) {
   this.domElements.eventsList.innerHTML = "";
   events.forEach((event, i) => {
     let node = document.createElement('a');
     node.classList.add("panel-block");
     node.innerHTML = `<span class="panel-icon">
     <i class="fas fa-book" aria-hidden="true">${i + 1}</i>
     </span>
   ${event.name}`
     node.onclick = function () { redirectFunction(event) };
     this.domElements.eventsList.appendChild(node);
   })
 },
```
## 3. Si tuviese que volver atrás... ¿Que cambiar? ԅ(≖‿≖ԅ)
#### - Mejor planteamiento de necesidades (¿Qué necesito?)
#### - Mejor distribución del tiempo
#### - Tener claras las mecánicas a usar (Ganar tiempo ٩(^‿^)۶)

## 4. Futuras actualizaciones (⌐■_■) 
#### - Filtro por BootCamps
#### - Foro mas diverso
#### - Añadir mas contenido por secciones
#### - Asistentes a los eventos (sesión Meetup)
#### - Fecha y hora (sesión Meetup)
#### - Refactorizar código (nivel interno)


## 5. Parte del código que mas problemas me causó (ノಠ益ಠ)ノ彡┻━┻
<img src="https://i.pinimg.com/originals/07/40/81/074081559e941cc874470c5ddf50e6d3.gif" width="300">

#### Yared
```
User.deleteMany()
  .then(() => {
    return User.create(users)
  })
  .then(usersCreated => {
    return Section.deleteMany()
    .then(()=> {
      const Front = new Section(sections[0])
      return Front.save()
      // return Section.create(sections)
    })
    .then(FrontSave =>{
      const Back = new Section(sections[1])
      return Back.save()
      .then(BackSave => [FrontSave, BackSave])
    })
 ```
 
 #### Juan
```
User.deleteMany()
  .then(() => {
    return User.create(users)
  })
  .then(usersCreated => {
    return Section.deleteMany()
    .then(()=> {
      const Front = new Section(sections[0])
      return Front.save()
      // return Section.create(sections)
    })
    .then(FrontSave =>{
      const Back = new Section(sections[1])
      return Back.save()
      .then(BackSave => [FrontSave, BackSave])
    })
 ```
 ## Muchas Gracias
 <img src="https://i.pinimg.com/originals/73/bd/df/73bddf0c143cec98915da19b3c004bb4.gif">