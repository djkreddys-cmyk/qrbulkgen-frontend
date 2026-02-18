// ===== QRBulkGen Global Auth Controller =====

// Decode JWT
function parseJwt(token){
  try{
    return JSON.parse(atob(token.split('.')[1]));
  }catch(e){
    return null;
  }
}

// NAVBAR CONTROL
function setupNavbar(){

  const navUser = document.getElementById("navUser");
  const navLinks = document.getElementById("navLinks");

  if(!navUser) return;

  const token = localStorage.getItem("token");

  // ================= NOT LOGGED IN =================
  if(!token){

    // hide protected links
    if(navLinks) navLinks.classList.add("hidden");

    navUser.innerHTML = `
      <a href="/qr-auth.html" class="text-red-500 font-semibold">
        Login / Register
      </a>
    `;

    return;
  }

  // ================= TOKEN EXISTS =================
  const user = parseJwt(token);

  // invalid token
  if(!user || !user.name){
    localStorage.removeItem("token");
    location.reload();
    return;
  }

  // show protected links
  if(navLinks) navLinks.classList.remove("hidden");

  // show profile
  navUser.innerHTML = `
    <span class="text-gray-700 font-semibold mr-3">👤 ${user.name}</span>
    <button onclick="logout()" class="text-red-500 hover:underline">
      Logout
    </button>
  `;
}

// LOGOUT
function logout(){
  localStorage.removeItem("token");
  window.location.href = "/index.html";
}

// PROTECT PAGE
function requireLogin(){
  const token = localStorage.getItem("token");
  if(!token){
    window.location.href = "/qr-auth.html";
  }
}

// AUTO RUN
document.addEventListener("DOMContentLoaded", setupNavbar);
