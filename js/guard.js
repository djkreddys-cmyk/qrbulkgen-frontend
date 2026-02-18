(function(){

const token = localStorage.getItem("token");

if(!token){
  localStorage.setItem("afterLogin", window.location.pathname);
  window.location = "qr-auth.html";
  return;
}

// verify token structure
try{
  const payload = JSON.parse(atob(token.split('.')[1]));
  if(!payload?.id){
    throw "bad";
  }
}catch{
  localStorage.removeItem("token");
  window.location = "qr-auth.html";
}

})();
