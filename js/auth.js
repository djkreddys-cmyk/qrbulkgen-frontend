// ================= QRBulkGen Auth Controller =================

// Decode JWT
function parseJwt(token){
  try{
    return JSON.parse(atob(token.split('.')[1]));
  }catch{
    return null;
  }
}

// ---------------- NAVBAR PROFILE ----------------
function setupNavbar(){
  const navUser=document.getElementById("navUser");
  if(!navUser) return;

  const token=localStorage.getItem("token");

  // Not logged in
  if(!token){
    navUser.innerHTML=`<a href="/qr-auth.html" class="text-red-500">Login / Register</a>`;
    return;
  }

  const user=parseJwt(token);

  // Invalid or expired token
  if(!user || !user.name){
    localStorage.removeItem("token");
    navUser.innerHTML=`<a href="/qr-auth.html" class="text-red-500">Login / Register</a>`;
    return;
  }

  // Logged in
  navUser.innerHTML=`
    <span class="text-gray-700 font-semibold mr-3">👤 ${user.name}</span>
    <button onclick="logout()" class="text-red-500 hover:underline">Logout</button>
  `;
}

// ---------------- LOGOUT ----------------
function logout(){
  localStorage.removeItem("token");
  window.location.href="/index.html";
}

// ---------------- PAGE PROTECTION ----------------
function requireLogin(){
  const token=localStorage.getItem("token");
  if(!token){
    window.location.href="/qr-auth.html";
    return;
  }

  const user=parseJwt(token);
  if(!user){
    localStorage.removeItem("token");
    window.location.href="/qr-auth.html";
  }
}

// ---------------- AUTO RUN ----------------
document.addEventListener("DOMContentLoaded",setupNavbar);
