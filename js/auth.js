// ===== QRBulkGen Global Auth Controller =====

function parseJwt(token){
  try{
    return JSON.parse(atob(token.split('.')[1]));
  }catch(e){
    return null;
  }
}

// ---------- NAVBAR CONTROL ----------
function setupNavbar(){

  const navUser = document.getElementById("navUser");
  const navLinks = document.getElementById("navLinks");

  if(!navUser) return;

  const token = localStorage.getItem("token");

  // NOT LOGGED IN
  if(!token){

    // hide protected links
    if(navLinks) navLinks.style.display = "none";

    navUser.innerHTML = `<a href="qr-auth.html" class="text-red-500 font-semibold">Login / Register</a>`;
    return;
  }

  const user = parseJwt(token);

  // invalid token
  if(!user || !user.name){
    localStorage.removeItem("token");
    location.reload();
    return;
  }

  // LOGGED IN → show links
  if(navLinks) navLinks.style.display = "flex";

  navUser.innerHTML = `
    <span class="text-gray-700 font-semibold">👤 ${user.name}</span>
    <button onclick="logout()" class="text-red-500 ml-4 hover:underline">Logout</button>
  `;
}

// ---------- LOGOUT ----------
function logout(){
  localStorage.removeItem("token");
  window.location.href = "index.html";
}

// ---------- PROTECT PAGE ----------
function requireLogin(){
  const token = localStorage.getItem("token");
  if(!token){
    window.location.href = "qr-auth.html";
  }
}

// ---------- AFTER LOGIN REDIRECT ----------
function handleAfterLogin(){
  const after = localStorage.getItem("afterLogin");
  if(after){
    localStorage.removeItem("afterLogin");
    window.location.href = after;
  }
}

// AUTO RUN
document.addEventListener("DOMContentLoaded",()=>{
  setupNavbar();
  handleAfterLogin();
});
