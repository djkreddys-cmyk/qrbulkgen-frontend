// Protect private pages only

(function(){

  const token = localStorage.getItem("token");

  // Not logged in → go login
  if(!token){
    localStorage.setItem("afterLogin", window.location.pathname);
    window.location = "/qr-auth.html";
    return;
  }

})();
