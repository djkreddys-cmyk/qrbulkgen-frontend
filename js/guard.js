// ===== QRBulkGen Global Page Guard =====

document.addEventListener("DOMContentLoaded", () => {

  const token = localStorage.getItem("token");

  // Allow auth page itself
  const isAuthPage = location.pathname.includes("qr-auth.html");
  if(isAuthPage) return;

  // If logged in → do nothing
  if(token) return;

  // Lock all clickable elements
  const elements = document.querySelectorAll("a, button");

  elements.forEach(el => {

    // Ignore external links
    const href = el.getAttribute("href");
    if(href && (href.startsWith("http") || href.startsWith("#"))) return;

    el.addEventListener("click", function(e){
      e.preventDefault();

      // remember target page
      if(href){
        localStorage.setItem("afterLogin", href);
      }else{
        localStorage.setItem("afterLogin", "qr-single.html");
      }

      // go login
      window.location.href = "/qr-auth.html";
    });

  });

});
