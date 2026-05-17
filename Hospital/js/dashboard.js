/* ============================================================
   SAFE HEART — Hospital Dashboard
   main.js  |  Full page logic
   ============================================================ */


/* ============================================================
   1. DATA
   ============================================================ */

var patients = [
    { name: "John Doe",      id: "SH-00203", room: "203", dept: "Cardiology", status: "Stable",   admitted: "10 May 2026" },
    { name: "Sarah Williams",id: "SH-00412", room: "412", dept: "ICU",        status: "Critical", admitted: "11 May 2026" },
    { name: "James Moore",   id: "SH-00204", room: "204", dept: "Cardiology", status: "Critical", admitted: "12 May 2026" },
    { name: "Nour Hassan",   id: "SH-00110", room: "110", dept: "General",    status: "Stable",   admitted: "13 May 2026" },
];

var deleteTarget = -1;   // index of patient pending discharge
var discharged   = 0;    // counter for today's discharges


/* ============================================================
   2. PAGE LOADER
   ============================================================ */

/** Hide loader once ALL resources (fonts, images, scripts) finish. */
window.addEventListener("load", hideLoader);

/** Safety fallback — never show loader more than 3 s. */
setTimeout(hideLoader, 3000);

function hideLoader() {
    var loader = document.getElementById("pageLoader");
    if (!loader || loader.dataset.hidden) return;   // run once
    loader.dataset.hidden = "true";
    loader.classList.add("hidden");
    setTimeout(function () { loader.style.display = "none"; }, 900);
}


/* ============================================================
   3. SIDEBAR  (mobile open / close)
   ============================================================ */

var sidebar = document.querySelector(".sidebar");
var menuBtn = document.querySelector(".menu-btn");
var overlay = document.querySelector(".overlay");

menuBtn.addEventListener("click", openSidebar);
overlay.addEventListener("click", closeSidebar);

// Also close sidebar when any nav link is tapped (mobile UX)
document.querySelectorAll(".sb-link").forEach(function (link) {
    link.addEventListener("click", closeSidebar);
});

function openSidebar() {
    sidebar.classList.add("active");
    overlay.classList.add("active");
}

function closeSidebar() {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
}


/* ============================================================
   4. LOCK SCREEN
   ============================================================ */

var LOCK_PIN = "SH01";

document.getElementById("lockBtn").addEventListener("click", lockScreen);
document.getElementById("lockPin").addEventListener("keydown", function (e) {
    if (e.key === "Enter") unlockScreen();
});

function lockScreen() {
    closeSidebar();                                          // close sidebar first
    document.getElementById("lockScreen").classList.add("active");
    document.body.style.overflow = "hidden";
}

function unlockScreen() {
    var pin = document.getElementById("lockPin").value;

    if (pin === LOCK_PIN) {
        document.getElementById("lockScreen").classList.remove("active");
        document.body.style.overflow = "auto";
        document.getElementById("lockPin").value = "";
        showToast("Unlocked successfully", "success");
    } else {
        showToast("Wrong PIN", "error");
        shakePinInput();
    }
}

function shakePinInput() {
    var input = document.getElementById("lockPin");
    input.style.borderColor = "#ef4444";
    setTimeout(function () {
        input.style.borderColor = "rgba(255,255,255,.1)";
    }, 600);
}


/* ============================================================
   5. LOGOUT MODAL
   ============================================================ */

document.getElementById("logoutBtn").addEventListener("click", showLogoutModal);

function showLogoutModal()  { document.getElementById("logoutModal").classList.add("active"); }
function closeLogoutModal() { document.getElementById("logoutModal").classList.remove("active"); }


/* ============================================================
   6. PATIENT SEARCH MODAL
   ============================================================ */

var patientModal   = document.getElementById("patientModal");
var searchInput    = document.getElementById("patientIdInput");
var searchBtn      = document.getElementById("searchPatientBtn");
var closeModalBtn  = document.getElementById("closeModal");

searchBtn.addEventListener("click", openPatientModal);
searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") openPatientModal();
});
closeModalBtn.addEventListener("click", closePatientModal);
patientModal.addEventListener("click", function (e) {
    if (e.target === patientModal) closePatientModal();
});

function openPatientModal() {
    var id = searchInput.value.trim();
    if (id) patientModal.classList.add("active");
}

function closePatientModal() {
    patientModal.classList.remove("active");
}


/* ============================================================
   7. ADMIT MODAL
   ============================================================ */

function openAdmitModal()  { document.getElementById("admitModal").classList.add("active"); }
function closeAdmitModal() { document.getElementById("admitModal").classList.remove("active"); }

function admitPatient() {
    var name   = document.getElementById("f-name").value.trim();
    var id     = document.getElementById("f-id").value.trim();
    var room   = document.getElementById("f-room").value.trim();
    var dept   = document.getElementById("f-dept").value.trim();
    var status = document.getElementById("f-status").value;

    if (!name || !id || !room) {
        alert("Please fill in Name, ID and Room");
        return;
    }

    patients.push({
        name     : name,
        id       : id,
        room     : room,
        dept     : dept || "General",
        status   : status,
        admitted : formatTodayDate(),
    });

    clearAdmitForm();
    closeAdmitModal();
    renderTable();
    showToast(name + " admitted successfully", "success");
}

function clearAdmitForm() {
    ["f-name", "f-id", "f-room", "f-dept"].forEach(function (fieldId) {
        document.getElementById(fieldId).value = "";
    });
}


/* ============================================================
   8. DISCHARGE MODAL
   ============================================================ */

function openDischargeModal() {
    if (patients.length === 0) {
        showToast("No patients to discharge", "error");
        return;
    }
    openRowDischarge(0);   // default: first patient in the list
}

function closeDischargeModal() {
    document.getElementById("dischargeModal").classList.remove("active");
    deleteTarget = -1;
}

function openRowDischarge(index) {
    deleteTarget = index;
    document.getElementById("discharge-name").textContent = patients[index].name;
    document.getElementById("dischargeModal").classList.add("active");
}

function confirmDischarge() {
    if (deleteTarget < 0) return;

    var name = patients[deleteTarget].name;
    patients.splice(deleteTarget, 1);
    discharged++;

    closeDischargeModal();
    renderTable();
    showToast(name + " discharged", "success");
}


/* ============================================================
   9. PATIENT TABLE  (render + stats)
   ============================================================ */

function renderTable() {
    var tbody = document.getElementById("pt-tbody");
    tbody.innerHTML = "";

    patients.forEach(function (patient, index) {
        var isCritical = patient.status === "Critical";
        tbody.innerHTML += buildPatientRow(patient, index, isCritical);
    });

    document.getElementById("pt-count").textContent = patients.length + " patients";
    document.getElementById("chip-discharged").textContent = discharged + " discharged today";

    updateStats();
}

function buildPatientRow(patient, index, isCritical) {
    return `
        <tr>
            <td>
                <div class="pt-name-cell">
                    <div class="pt-avatar-sm">${getInitials(patient.name)}</div>
                    ${patient.name}
                </div>
            </td>
            <td class="pt-id">${patient.id}</td>
            <td>Rm ${patient.room}</td>
            <td>
                <div class="pt-status-cell">
                    <div class="status-dot ${isCritical ? "critical" : "stable"}"></div>
                    ${patient.status}
                </div>
            </td>
            <td class="pt-id">${patient.admitted}</td>
            <td>
                <button class="row-discharge-btn" onclick="openRowDischarge(${index})">
                    <i class="fas fa-sign-out-alt"></i>
                </button>
            </td>
        </tr>`;
}


/* ============================================================
   10. STATS  (animated counters)
   ============================================================ */

function updateStats() {
    var admitted = patients.length;
    var critical = patients.filter(function (p) { return p.status === "Critical"; }).length;
    var stable   = patients.filter(function (p) { return p.status === "Stable";   }).length;
    var total    = 244 + admitted;

    animateCount("num-total",    total);
    animateCount("num-admitted", admitted);
    animateCount("num-critical", critical);
    animateCount("num-stable",   stable);
}

function animateCount(elementId, target) {
    var el = document.getElementById(elementId);
    if (!el) return;

    el.classList.remove("count-animate");
    void el.offsetWidth;   // force reflow to restart animation
    el.classList.add("count-animate");

    var startTime = null;
    var DURATION  = 900;   // ms

    function step(timestamp) {
        if (!startTime) startTime = timestamp;

        var progress = Math.min((timestamp - startTime) / DURATION, 1);
        var eased    = 1 - Math.pow(1 - progress, 3);   // ease-out cubic

        el.textContent = Math.round(eased * target);

        if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}


/* ============================================================
   11. TOAST NOTIFICATIONS
   ============================================================ */

function showToast(message, type) {
    var toast = document.getElementById("toast");
    document.getElementById("toast-msg").textContent = message;
    toast.className = "toast-notification show " + (type || "success");
    setTimeout(function () { toast.classList.remove("show"); }, 3000);
}


/* ============================================================
   12. HELPERS
   ============================================================ */

/** "John Doe" → "JD" */
function getInitials(name) {
    return name
        .split(" ")
        .map(function (word) { return word[0]; })
        .join("")
        .substring(0, 2)
        .toUpperCase();
}

/** Returns today as "16 May 2026" */
function formatTodayDate() {
    var MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    var d = new Date();
    return d.getDate() + " " + MONTHS[d.getMonth()] + " " + d.getFullYear();
}


/* ============================================================
   13. INIT  — run on page ready
   ============================================================ */

renderTable();