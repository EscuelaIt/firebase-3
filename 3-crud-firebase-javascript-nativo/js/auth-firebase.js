//service de autenticación
var auth = firebase.auth();

auth.onAuthStateChanged(function(usuario) {
  if(usuario) {
    //console.log('autenticado', usuario);
    $id('logout').style.display = 'inline';
    $id('login').style.display = 'none';
    $id('datosuser').innerHTML = 'user: <span>' + usuario.uid + '</span>';
  } else {
    //console.log('no autenticado', usuario);
    $id('logout').style.display = 'none';
    $id('login').style.display = 'inline';
    $id('datosuser').innerHTML = 'user: <span>-</span>';
  }
});

document.getElementById('logout').addEventListener('click', function(){
  auth.signOut();
});
document.getElementById('login').addEventListener('click', function(){
  auth.signInAnonymously().catch(function(error) {
    console.log('Error login anónimo', error.code, error.message);
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
});
