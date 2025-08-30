import { logCustomEvent } from './analytics.js';

let allData=[],nikColors=["#e3f2fd","#e8f5e9","#fff3e0","#f3e5f5","#fce4ec","#e0f7fa","#f9fbe7"],monthNames=["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];function parseDate(e){if(!e)return new Date(0);e=e.trim();let t=e.split("/");if(3===t.length){let a=parseInt(t[0],10),r=parseInt(t[1],10),s=parseInt(t[2],10);if(a>=1&&a<=12&&r>=1&&r<=31){const e=new Date(s,a-1,r);if(e.getFullYear()===s&&e.getMonth()===a-1&&e.getDate()===r)return e}}if(3===t.length){let a=parseInt(t[0],10),r=parseInt(t[1],10),s=parseInt(t[2],10);if(a>=1&&a<=12&&r>=1&&r<=31){const e=new Date(s,a-1,r);if(e.getFullYear()===s&&e.getMonth()===a-1&&e.getDate()===r)return e}}return new Date(0)}function formatDateToDisplay(e){if(!e||isNaN(e.getTime())||e.getFullYear()<1900)return"-";const t=e.getDate(),a=monthNames[e.getMonth()],r=e.getFullYear();return`${t} ${a} ${r}`}function calculateExpiredDate(e,t){let a;if(t&&t.trim()!==""){a=parseDate(t)}if(!a||isNaN(a.getTime())||a.getFullYear()<1900){const t=parseDate(e);if(isNaN(t.getTime())||t.getFullYear()<1900)return"-";a=new Date(t),a.setFullYear(a.getFullYear()+1)}return formatDateToDisplay(a)}function debounce(e,t){let a;return function(){const r=this;clearTimeout(a),a=setTimeout(()=>e.apply(r,arguments),t)}}const debouncedFilterData=debounce(filterData,300);fetch("Database/Database_Training.csv").then(e=>e.text()).then(e=>{Papa.parse(e,{header:!0,skipEmptyLines:!0,complete:function(e){const t=e.meta.fields,a=e=>{const a=e.toLowerCase();for(const r of t)if(r.toLowerCase()===a)return r;return null},r={nik:a("NIK"),nama:a("NAMA"),judul:a("JUDUL TRAINING"),tanggal:a("TANGGAL TRAINING"),durasi:a("DURASI TRAINING"),expiredDate:a("Expired date")};allData=e.data.map(e=>{const t=r.tanggal?e[r.tanggal]?.trim():"",a=r.durasi?e[r.durasi]?.trim():"0",s=r.expiredDate?e[r.expiredDate]?.trim():"";const o={nik:r.nik?e[r.nik]?.trim():"",nama:r.nama?e[r.nama]?.trim():"",judul:r.judul?e[r.judul]?.trim():"",tanggal:t,durasi:parseFloat(a.replace(",","."))||0,expiredDateFromCSV:s};return o.tanggalTimestamp=parseDate(o.tanggal).getTime(),o.calculatedExpiredDate=calculateExpiredDate(o.tanggal,o.expiredDateFromCSV),o}).filter(e=>e.nik||e.nama)},error:function(e,t,a,r){console.error("Error parsing CSV:",e,r)}})}).catch(e=>{console.error("Error fetching CSV:",e)});function filterData(){const e=document.getElementById("searchInput").value.trim().toLowerCase(),t=document.getElementById("searchType").value,a=document.querySelector("#dataTable tbody"),r=document.getElementById("totalDurationsContainer");if(!e)return a.innerHTML="",void(r.innerHTML="");let s=allData.filter(a=>{if("nik"===t)return a.nik?.toLowerCase().includes(e);if("nama"===t)return a.nama?.toLowerCase().includes(e);return!1});s.sort((e,t)=>t.tanggalTimestamp-e.tanggalTimestamp);let o={};s.forEach(e => (!o[e.nik] || e.tanggalTimestamp > o[e.nik].timestamp) && (o[e.nik] = {tanggal:e.tanggal,timestamp:e.tanggalTimestamp})),displayData(s,o)}function displayData(e,t){const a=document.querySelector("#dataTable tbody"),r=document.getElementById("totalDurationsContainer");a.innerHTML="",r.innerHTML="";const s=[...new Set(e.map(e=>e.nik))],o={};s.forEach((e,t)=>{o[e]=nikColors[t%nikColors.length]});let n=1,i=0;const l={};e.forEach(e=>{const s=formatDateToDisplay(parseDate(e.tanggal)),d=e.tanggal===t[e.nik]?.tanggal,c=document.createElement("tr");if(c.style.backgroundColor=o[e.nik],c.innerHTML=`<td>${n++}</td><td>${e.nik||"-"}</td><td>${e.nama||"-"}</td><td>${e.judul||"-"}</td><td>${d?`<span class="latest">${s} 🔥 Terbaru</span>`:s||"-"}</td><td>${void 0!==e.durasi?e.durasi:"-"}</td><td>${e.calculatedExpiredDate||"-"}</td>`,a.appendChild(c),i++,!isNaN(parseDate(e.tanggal).getTime())&&parseDate(e.tanggal).getFullYear()>=1900){const t=parseDate(e.tanggal).getFullYear();l[t]||(l[t]={totalDuration:0,dataCount:0,uniqueParticipants:new Set}),l[t].totalDuration+=e.durasi,l[t].dataCount++,l[t].uniqueParticipants.add(e.nik)}});const p=Object.keys(l).sort((e,t)=>t-e);if(p.length>0){const e=document.createElement("h3");e.textContent="Ringkasan Durasi Training:",r.appendChild(e),p.forEach(e=>{const t=l[e],a=document.createElement("p");a.innerHTML=`Total Durasi Training (${e}): <b>${t.totalDuration} Jam</b> ( ${t.dataCount} data), dari ${t.uniqueParticipants.size} peserta`,r.appendChild(a)});const t=document.createElement("p");t.innerHTML=`<b>Jumlah Data Total: ${i}</b>`,r.appendChild(t)}}function openTraktir(){document.getElementById("traktirModal").style.display="flex"}function closeTraktir(){document.getElementById("traktirModal").style.display="none"}window.addEventListener("click",e=>{e.target.id==="traktirModal"&&closeTraktir()});function zoomQR(e){let t="";"gopay"===e&&(t="Images/Gopay.jpeg"),"dana"===e&&(t="Images/DANA.jpeg"),"ovo"===e&&(t="Images/Ovo.jpeg"),document.getElementById("zoomQRImg").src=t,document.getElementById("zoomModal").style.display="flex"}function closeZoom(){document.getElementById("zoomModal").style.display="none"}window.addEventListener("click",e=>{e.target.id==="zoomModal"&&closeZoom()});function showArrowHint(){const e=document.getElementById("arrow");window.innerWidth>768&&(e.style.display="inline",setTimeout(()=>{e.style.display="none"},5e3))}setTimeout(showArrowHint,2e3),setInterval(showArrowHint,1e4);
window.openTraktir = openTraktir;
window.closeTraktir = closeTraktir;
window.zoomQR = zoomQR;
window.closeZoom = closeZoom;
window.debouncedFilterData = debouncedFilterData;

document.addEventListener('DOMContentLoaded', () => {
       const traktirBtnHeader = document.querySelector('.traktir-btn');
    if (traktirBtnHeader) {
        traktirBtnHeader.addEventListener('click', () => {
            logCustomEvent('traktir_kopi_clicked', { location: 'header_button' });
          });
    }

   
    const traktirBtnFloating = document.querySelector('.traktir-floating');
    if (traktirBtnFloating) {
        traktirBtnFloating.addEventListener('click', () => {
            logCustomEvent('traktir_kopi_clicked', { location: 'floating_button' });
         });
    }

       const authorBtnFloating = document.querySelector('.author-floating');
    if (authorBtnFloating) {
        authorBtnFloating.addEventListener('click', (event) => {
           
            event.preventDefault(); 
            logCustomEvent('my_portfolio_clicked');
            
           
            const originalOnclick = authorBtnFloating.getAttribute('onclick');
            const urlMatch = originalOnclick.match(/'(.*?)\'/); 
            if (urlMatch && urlMatch[1]) {
                window.open(urlMatch[1], '_blank'); 
            }
        });
    }

    
});

// --- kode script.js lama lu tetap di atas, jangan diubah ---

// Tambahin import Firebase Auth di paling atas (sekali aja)
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { auth } from './firebase-config.js';

// Fungsi reset password (versi elegan)
function resetPassword(email) {
  const msgBox = document.getElementById("resetMessage"); // Pastikan ada elemen ini di HTML
  msgBox.textContent = "";
  msgBox.className = "msg"; // reset styling

  sendPasswordResetEmail(auth, email)
    .then(() => {
      msgBox.textContent =
        "✅ Link reset password sudah dikirim ke email: " + email +
        ". Jika tidak ada di inbox, silakan periksa folder Junk/Spam.";
      msgBox.classList.add("ok");
    })
    .catch((error) => {
      msgBox.textContent =
        "❌ Gagal mengirim link reset: " + (error.message || "Terjadi kesalahan.");
      msgBox.classList.add("error");
    });
}


// Tambahin event listener untuk tombol/link lupa password
document.addEventListener('DOMContentLoaded', () => {
  // --- event listener lama lu tetap di sini ---

  const forgotPasswordBtn = document.getElementById('forgotPasswordBtn');
  if (forgotPasswordBtn) {
    forgotPasswordBtn.addEventListener('click', () => {
      const email = prompt("Masukkan email akun kamu untuk reset password:");
      if (email) {
        resetPassword(email.trim());
      }
    });
  }
});





