$id = function(id){
  return document.getElementById(id);
}

var retardoMsgFeedback = null;
mensaje = function(msg, error){
  if(retardoMsgFeedback) {
    clearTimeout(retardoMsgFeedback);
  }
  error = error | false;
  var elmsg = $id('mensaje');
  elmsg.textContent = msg;
  elmsg.style.display = 'block';
  if(error) {
    elmsg.style.backgroundColor = 'red';
  }
  retardoMsgFeedback = setTimeout(function() {
    elmsg.style.display = 'none';
    elmsg.style.backgroundColor = 'black';
  }, 3000);
}
