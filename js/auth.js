function parseJwt(token){
  try{
    return JSON.parse(atob(token.split('.')[1]));
  }catch(e){
    return null;
  }
}

function setupNavbar(){
  const navUser=document.getElementById("navUser");
  const navLinks=document.getElementById("navLinks");
  if(!navUser) return;

  const token=localStorage.getItem("token");

  // NOT LOGGED IN
  if(!token){
    navUser.innerHTML=`<a href="/qr-auth.html" class="text-red-500 font-semibold">Login / Register</a>`;
    if(navLinks) navLinks.classList.add("hidden");
    return;
  }

  const user=parseJwt(token);

  if(!user || !user.name){
    localStorage.removeItem("token");
    navUser.innerHTML=`<a href="/qr-auth.html" class="text-red-500 font-semibold">Login / Register</a>`;
    if(navLinks) navLinks.classList.add("hidden");
    return;
  }

  // LOGGED IN
  navUser.innerHTML=`
    <span class="text-gray-700 font-semibold">👤 ${user.name}</span>
    <button onclick="logout()" class="text-red-500 ml-3">Logout</button>
  `;

  if(navLinks) navLinks.classList.remove("hidden");
}

function logout(){
  localStorage.removeItem("token");
  window.location="/index.html";
}

function requireLogin(){
  const token=localStorage.getItem("token");
  if(!token){
    window.location="/qr-auth.html";
  }
}

document.addEventListener("DOMContentLoaded",setupNavbar);
