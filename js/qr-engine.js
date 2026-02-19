// ===============================
// UNIVERSAL QR DATA BUILDER
// ===============================
function buildQRData(type, r){

 if(type==='text') return r.value || '';
 if(type==='url') return r.value || '';

 if(type==='phone') return 'tel:'+(r.value||'');
 if(type==='email') return 'mailto:'+(r.value||'');

 if(type==='whatsapp')
  return 'https://wa.me/'+(r.phone||'')+'?text='+encodeURIComponent(r.msg||'');

 if(type==='wifi')
  return 'WIFI:T:WPA;S:'+(r.ssid||'')+';P:'+(r.password||'')+';;';

 if(type==='upi')
  return 'upi://pay?pa='+(r.upi||'')+'&am='+(r.amount||'');

 if(type==='location')
  return 'https://www.openstreetmap.org/search?query='+encodeURIComponent(r.address||'');

 if(type==='vcard')
  return 'BEGIN:VCARD\\nVERSION:3.0\\nFN:'+(r.name||'')+'\\nORG:'+(r.org||'')+'\\nTEL:'+(r.tel||'')+'\\nEND:VCARD';

 if(type==='menu') return r.url||'';

 if(type==='product')
  return 'Product:'+(r.product||'')+'\\nCode:'+(r.code||'');

 if(type==='ticket')
  return 'Event:'+(r.event||'')+'\\nSeat:'+(r.seat||'')+'\\nDate:'+(r.date||'');

 return '';
}


// ===============================
// UNIVERSAL QR GENERATOR
// ===============================
function renderQR(container, text, settings){

 if(!text){
  container.innerHTML="";
  return null;
 }

 container.innerHTML="";

 const qr=new QRCodeStyling({
  width: settings.size || 260,
  height: settings.size || 260,
  data: text,
  image: settings.logo || null,
  dotsOptions:{
   color: settings.color || "#000000",
   type: settings.style || "square"
  },
  backgroundOptions:{
   color: settings.bg || "#ffffff"
  },
  imageOptions:{margin:5,crossOrigin:"anonymous"}
 });

 qr.append(container);
 return qr;
}
