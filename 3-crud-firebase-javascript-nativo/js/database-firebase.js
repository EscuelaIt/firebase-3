var db = firebase.database();
var contactosRef = db.ref('contactos');

var borrarLinea = function(evento){
  if(confirm('de verdad deseas borrar?')){
    var id = evento.target.getAttribute('data');
    //console.log(id);
    contactosRef.child(id).set(null)
      .catch(function () {
        mensaje("Hubo un error al borrar el contacto", true);
      })
      .then(function(){
        mensaje("se borró el contacto", false);
      })
  }
}

var editarLinea = function(evento){
  var id = evento.target.parentNode.parentNode.getAttribute('id');
  contactosRef.child(id).once('value', function(snapshot) {
    var contacto = snapshot.val();
    $id('editarnombre').value = contacto.nombre;
    $id('editaremail').value = contacto.email;
    $id('formeditar').setAttribute('data', id);
  });
  $id('formeditar').style.display = 'inline-block';
  $id('forminsertar').style.display = 'none';
}

$id('cancelareditar').addEventListener('click', function(){
  $id('forminsertar').style.display = 'inline-block';
  $id('formeditar').style.display = 'none';
});

$id('beditar').addEventListener('click', function(){
  var id = $id('formeditar').getAttribute('data');
  contactosRef.child(id).update({
    nombre: $id('editarnombre').value,
    email: $id('editaremail').value
  })
    .catch(function(error){
      mensaje("Hubo un error al editar el contacto", true);
    })
    .then(function(){
      mensaje("contacto editado", false);
    });

});

$id('binsertar').addEventListener('click', function() {
  contactosRef.push({
    nombre: $id("nombre").value,
    email: $id("email").value
  }, function(error) {
    if(error) {
      mensaje("Hubo un error al crear el contacto", true);
    } else {
      mensaje("Se ha creado el contacto", false);
    }
  });
});

contactosRef.on('child_added', function(snapshot) {
  var contacto = snapshot.val();
  console.log(contacto);
  var tpl = $id('lineacontacto').content;
  var clone = tpl.cloneNode(true);
  clone.querySelector('.lineanombre').textContent = contacto.nombre;
  clone.querySelector('.lineaemail').textContent = contacto.email;
  clone.querySelector('.lineaid').textContent = snapshot.key;

  //boton borrar
  var bborrar = clone.querySelector('.lineaborrar');
  bborrar.setAttribute('data', snapshot.key);
  bborrar.addEventListener('click', borrarLinea);

  //boton editar
  var beditar = clone.querySelector('.lineaeditar');
  beditar.addEventListener('click', editarLinea);


  clone.querySelector('tr').setAttribute('id', snapshot.key);

  //inyectar el clone
  $id('listadoContactos').appendChild(clone);
});

contactosRef.on('child_removed', function(snapshot) {
  var fila = $id(snapshot.key);
  fila.parentNode.removeChild(fila);
});

contactosRef.on('child_changed', function(snapshot) {
  var contacto = snapshot.val();
  var fila = $id(snapshot.key);
  fila.querySelector('.lineanombre').textContent = contacto.nombre;
  fila.querySelector('.lineaemail').textContent = contacto.email;
});
