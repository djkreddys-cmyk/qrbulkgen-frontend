const QR_TYPES = {

text:{
 label:"Text",
 fields:[{id:"value",label:"Enter text"}],
 build:(d)=>d.value
},

url:{
 label:"Website",
 fields:[{id:"value",label:"https://example.com"}],
 build:(d)=>d.value
},

whatsapp:{
 label:"WhatsApp",
 fields:[
  {id:"phone",label:"Phone"},
  {id:"msg",label:"Message"}
 ],
 build:(d)=>`https://wa.me/${d.phone}?text=${encodeURIComponent(d.msg||"")}`
},

wifi:{
 label:"WiFi",
 fields:[
  {id:"ssid",label:"Network Name"},
  {id:"password",label:"Password"}
 ],
 build:(d)=>`WIFI:T:WPA;S:${d.ssid};P:${d.password};;`
},

upi:{
 label:"UPI",
 fields:[
  {id:"upi",label:"UPI ID"},
  {id:"amount",label:"Amount"}
 ],
 build:(d)=>`upi://pay?pa=${d.upi}&am=${d.amount||""}`
},

email:{
 label:"Email",
 fields:[
  {id:"mail",label:"Email"},
  {id:"subject",label:"Subject"}
 ],
 build:(d)=>`mailto:${d.mail}?subject=${encodeURIComponent(d.subject||"")}`
},

phone:{
 label:"Phone",
 fields:[{id:"call",label:"Phone Number"}],
 build:(d)=>`tel:${d.call}`
},

location:{
 label:"Location",
 fields:[{id:"address",label:"Enter address"}],
 build:(d)=>`https://www.openstreetmap.org/search?query=${encodeURIComponent(d.address)}`
},

vcard:{
 label:"Business Card",
 fields:[
  {id:"name",label:"Name"},
  {id:"org",label:"Company"},
  {id:"tel",label:"Phone"}
 ],
 build:(d)=>`BEGIN:VCARD\nVERSION:3.0\nFN:${d.name}\nORG:${d.org}\nTEL:${d.tel}\nEND:VCARD`
},

menu:{
 label:"Restaurant Menu",
 fields:[{id:"url",label:"Menu URL"}],
 build:(d)=>d.url
},

product:{
 label:"Product Label",
 fields:[
  {id:"product",label:"Product Name"},
  {id:"code",label:"SKU Code"}
 ],
 build:(d)=>`Product:${d.product}\nCode:${d.code}`
},

ticket:{
 label:"Event Ticket",
 fields:[
  {id:"event",label:"Event"},
  {id:"seat",label:"Seat"},
  {id:"date",label:"Date"}
 ],
 build:(d)=>`Event:${d.event}\nSeat:${d.seat}\nDate:${d.date}`
},

// ⭐ NEW
google_review:{
 label:"Google Review",
 fields:[{id:"link",label:"Paste Google Review Link"}],
 build:(d)=>d.link
},

app_download:{
 label:"App Download",
 fields:[
  {id:"android",label:"Android Play Store Link"},
  {id:"ios",label:"iOS App Store Link"}
 ],
 build:(d)=>`Download App\nAndroid:${d.android||""}\niOS:${d.ios||""}`
}

};
