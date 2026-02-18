function parseJwt(token){
  try{
    return JSON.parse(atob(token.split('.')[1]));
  }catch(e){
    return null;
  }
}

function setupNavbar(){

  const navUser = document.getElementById("navUser");
  const navPrivate = document.getElementById("navPrivate");
  const token = localStorage.getItem("token");

  if(!navUser) return;

  // NOT LOGGED IN
  if(!token){
    if(navPrivate) navPrivate.classList.add("hidden");

    navUser.innerHTML =
      `<a href="/qr-auth.html" class="text-red-500 font-semibold">Login / Register</a>`;
    return;
  }

  const user=parseJwt(token);

  if(!user){
    localStorage.removeItem("token");
    location.reload();
    return;
  }

  // LOGGED IN
  if(navPrivate) navPrivate.classList.remove("hidden");

  navUser.innerHTML = `
    <span class="text-gray-700 font-semibold mr-3">👤 ${user.name}</span>
    <button onclick="logout()" class="text-red-500 hover:underline">Logout</button>
  `;
}

function logout(){
  localStorage.removeItem("token");
  window.location="/index.html";
}

document.addEventListener("DOMContentLoaded",setupNavbar);
