/* ═══════════════════════════════════════════════════
   SAFE HEART — PATIENT MANAGEMENT JS
   ═══════════════════════════════════════════════════ */

'use strict';

/* ════════════ MOCK DATA ════════════ */
const PATIENT_DB = [
    {
        id: 'SH-00101', name: 'Ahmed Mohamed',
        age: 47, blood: 'A+', heartRate: '145 bpm',
        status: 'Critical', lastUpdate: '2 min ago',
        emergency: { name: 'Mona Ahmed', relation: 'Wife', phone: '+20 100 123 4567' },
        condition: 'Acute Myocardial Infarction'
    },
    {
        id: 'SH-00102', name: 'Sarah Williams',
        age: 34, blood: 'B-', heartRate: '88 bpm',
        status: 'Stable', lastUpdate: '8 min ago',
        emergency: { name: 'James Williams', relation: 'Husband', phone: '+20 101 234 5678' },
        condition: 'Post-operative cardiac monitoring'
    },
    {
        id: 'SH-00103', name: 'James Moore',
        age: 62, blood: 'O+', heartRate: '118 bpm',
        status: 'Warning', lastUpdate: '5 min ago',
        emergency: { name: 'Linda Moore', relation: 'Daughter', phone: '+20 102 345 6789' },
        condition: 'Atrial Fibrillation'
    },
    {
        id: 'SH-00104', name: 'Fatima Ali',
        age: 28, blood: 'AB+', heartRate: '72 bpm',
        status: 'Stable', lastUpdate: '12 min ago',
        emergency: { name: 'Omar Ali', relation: 'Father', phone: '+20 103 456 7890' },
        condition: 'Valvular Heart Disease'
    },
    {
        id: 'SH-00105', name: 'Nour Hassan',
        age: 55, blood: 'A-', heartRate: '96 bpm',
        status: 'Warning', lastUpdate: '3 min ago',
        emergency: { name: 'Khalid Hassan', relation: 'Son', phone: '+20 104 567 8901' },
        condition: 'Hypertensive Heart Disease'
    },
    {
        id: 'SH-00106', name: 'Michael Chen',
        age: 41, blood: 'O-', heartRate: '78 bpm',
        status: 'Stable', lastUpdate: '20 min ago',
        emergency: { name: 'Emily Chen', relation: 'Wife', phone: '+20 105 678 9012' },
        condition: 'Coronary Artery Disease'
    },
    {
        id: 'SH-00107', name: 'Layla Ibrahim',
        age: 67, blood: 'B+', heartRate: '155 bpm',
        status: 'Critical', lastUpdate: '1 min ago',
        emergency: { name: 'Samir Ibrahim', relation: 'Son', phone: '+20 106 789 0123' },
        condition: 'Heart Failure — Stage III'
    },
    {
        id: 'SH-00108', name: 'Robert Silva',
        age: 50, blood: 'AB-', heartRate: '82 bpm',
        status: 'Stable', lastUpdate: '15 min ago',
        emergency: { name: 'Maria Silva', relation: 'Wife', phone: '+20 107 890 1234' },
        condition: 'Dilated Cardiomyopathy'
    }
];

/* Admitted patients list */
let admittedPatients = [
    { name: 'Ahmed Mohamed', id: 'SH-00101', room: '204', dept: 'Cardiology', status: 'Critical', condition: 'Acute MI', admitted: '12 May 2026', report: {} },
    { name: 'Sarah Williams', id: 'SH-00412', room: '412', dept: 'ICU',       status: 'Warning',  condition: 'Post-op Monitoring', admitted: '13 May 2026', report: {} },
    { name: 'James Moore',    id: 'SH-00204', room: '307', dept: 'Cardiology', status: 'Stable',   condition: 'Atrial Fibrillation', admitted: '14 May 2026', report: {} }
];

let dischargedToday = 2;
let activeFilter    = 'all';
let selectedResult  = null;
let dischargeTarget = -1;
let reportTarget    = -1;
let emergencyTarget = null;

/* ════════════ DOM REFS ════════════ */
const $ = id => document.getElementById(id);

const DOM = {
    loader:       $('pageLoader'),
    sidebar:      $('sidebar'),
    overlay:      $('overlay'),
    menuBtn:      $('menuBtn'),
    lockBtn:      $('lockBtn'),
    logoutBtn:    $('logoutBtn'),
    lockScreen:   $('lockScreen'),
    lockPin:      $('lockPin'),
    unlockBtn:    $('unlockBtn'),

    searchInput:  $('searchInput'),
    searchClear:  $('searchClear'),
    resultWrap:   $('resultWrap'),
    rcClose:      $('rcClose'),

    rcAvatar:     $('rcAvatar'),
    rcName:       $('rcName'),
    rcId:         $('rcId'),
    rcStatus:     $('rcStatus'),
    vcHR:         $('vcHR'),
    vcBlood:      $('vcBlood'),
    vcAge:        $('vcAge'),
    vcUpdate:     $('vcUpdate'),
    emName:       $('emName'),
    emRelation:   $('emRelation'),
    emPhone:      $('emPhone'),
    btnCall:      $('btnCall'),
    btnWA:        $('btnWA'),
    btnAdmit:     $('btnAdmit'),
    btnEmergency: $('btnEmergency'),

    statTotal:    $('statTotal'),
    statActive:   $('statActive'),
    statCritical: $('statCritical'),
    statDischarged:$('statDischarged'),

    tableCount:   $('tableCount'),
    ptBody:       $('ptBody'),
    tableEmpty:   $('tableEmpty'),

    admitNewBtn:  $('admitNewBtn'),
    admitModal:   $('admitModal'),
    closeAdmitBtn:$('closeAdmitBtn'),
    cancelAdmitBtn:$('cancelAdmitBtn'),
    doAdmitBtn:   $('doAdmitBtn'),
    fName:        $('fName'),
    fId:          $('fId'),
    fRoom:        $('fRoom'),
    fDept:        $('fDept'),
    fStatus:      $('fStatus'),
    fCondition:   $('fCondition'),

    reportModal:  $('reportModal'),
    reportPtName: $('reportPtName'),
    closeReportBtn:$('closeReportBtn'),
    closeReportBtn2:$('closeReportBtn2'),
    saveReportBtn:$('saveReportBtn'),
    rDiagnosis:   $('rDiagnosis'),
    rDoctor:      $('rDoctor'),
    rDate:        $('rDate'),
    rMeds:        $('rMeds'),
    rNotes:       $('rNotes'),

    dischargeModal: $('dischargeModal'),
    dischargeName:  $('dischargeName'),
    cancelDischarge:$('cancelDischargeBtn'),
    doDischarge:    $('doDischargeBtn'),

    emergencyModal: $('emergencyModal'),
    emergencyName:  $('emergencyName'),
    cancelEmergency:$('cancelEmergencyBtn'),
    doEmergency:    $('doEmergencyBtn'),

    logoutModal:    $('logoutModal'),
    cancelLogout:   $('cancelLogoutBtn'),
    doLogout:       $('doLogoutBtn'),

    toast:          $('toast'),
    toastIcon:      $('toastIcon'),
    toastMsg:       $('toastMsg'),

    filterPills:    document.querySelectorAll('.fpill'),
    sbLinks:        document.querySelectorAll('.sb-link')
};

/* ════════════ PAGE LOADER ════════════ */
window.addEventListener('load', () => {
    setTimeout(() => {
        DOM.loader.classList.add('hidden');
        animateStats();
        renderTable();
    }, 400);
});

/* ════════════ ANIMATE STATS ════════════ */
function animateCount(el, target, duration = 900) {
    let start = null;
    const step = ts => {
        if (!start) start = ts;
        const prog = Math.min((ts - start) / duration, 1);
        const ease = 1 - Math.pow(1 - prog, 3);
        el.textContent = Math.round(ease * target);
        if (prog < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
}

function animateStats() {
    const total      = PATIENT_DB.length + admittedPatients.length;
    const active     = admittedPatients.length;
    const critical   = admittedPatients.filter(p => p.status === 'Critical').length;
    animateCount(DOM.statTotal,      total);
    animateCount(DOM.statActive,     active);
    animateCount(DOM.statCritical,   critical);
    animateCount(DOM.statDischarged, dischargedToday);
}

function updateStats() {
    const total    = PATIENT_DB.length + admittedPatients.length;
    const active   = admittedPatients.length;
    const critical = admittedPatients.filter(p => p.status === 'Critical').length;
    animateCount(DOM.statTotal,      total);
    animateCount(DOM.statActive,     active);
    animateCount(DOM.statCritical,   critical);
    animateCount(DOM.statDischarged, dischargedToday);
}

/* ════════════ SIDEBAR ════════════ */
DOM.menuBtn.addEventListener('click', () => {
    DOM.sidebar.classList.add('active');
    DOM.overlay.classList.add('active');
});
DOM.overlay.addEventListener('click', closeSidebar);

DOM.sbLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 992) closeSidebar();
    });
});

function closeSidebar() {
    DOM.sidebar.classList.remove('active');
    DOM.overlay.classList.remove('active');
}

/* ════════════ LOCK SCREEN ════════════ */
DOM.lockBtn.addEventListener('click', () => {
    DOM.lockScreen.classList.add('active');
    closeSidebar();
    document.body.style.overflow = 'hidden';
});

DOM.unlockBtn.addEventListener('click', unlockScreen);
DOM.lockPin.addEventListener('keydown', e => { if (e.key === 'Enter') unlockScreen(); });

function unlockScreen() {
    const pin = DOM.lockPin.value;
    if (pin.length > 0) {
        DOM.lockScreen.classList.remove('active');
        DOM.lockPin.value = '';
        document.body.style.overflow = '';
        showToast('Unlocked successfully', 'success');
    } else {
        DOM.lockPin.style.borderColor = '#ef4444';
        DOM.lockPin.placeholder = 'PIN required!';
        setTimeout(() => {
            DOM.lockPin.style.borderColor = '';
            DOM.lockPin.placeholder = 'Enter PIN';
        }, 800);
    }
}

/* ════════════ LOGOUT ════════════ */
DOM.logoutBtn.addEventListener('click', () => openModal('logoutModal'));
DOM.cancelLogout.addEventListener('click', () => closeModal('logoutModal'));
DOM.doLogout.addEventListener('click', () => {
    closeModal('logoutModal');
    showToast('Logged out successfully', 'info');
});

/* ════════════ SEARCH ════════════ */
DOM.searchInput.addEventListener('input', handleSearch);
DOM.searchClear.addEventListener('click', clearSearch);
DOM.rcClose.addEventListener('click', clearSearch);

function handleSearch() {
    const q = DOM.searchInput.value.trim().toLowerCase();

    // Show/hide clear button
    if (q.length > 0) {
        DOM.searchClear.classList.add('visible');
    } else {
        DOM.searchClear.classList.remove('visible');
        hideResult();
        return;
    }

    // Search in DB
    const match = PATIENT_DB.find(p =>
        p.name.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q)
    );

    if (match) {
        showResult(match);
    } else {
        hideResult();
    }
}

function clearSearch() {
    DOM.searchInput.value = '';
    DOM.searchClear.classList.remove('visible');
    hideResult();
    selectedResult = null;
}

function showResult(patient) {
    selectedResult = patient;

    const initials = patient.name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
    DOM.rcAvatar.textContent = initials;
    DOM.rcName.textContent   = patient.name;
    DOM.rcId.textContent     = patient.id;

    const statusClass = patient.status.toLowerCase();
    DOM.rcStatus.textContent  = patient.status;
    DOM.rcStatus.className    = `rc-badge ${statusClass}`;

    DOM.vcHR.textContent     = patient.heartRate;
    DOM.vcBlood.textContent  = patient.blood;
    DOM.vcAge.textContent    = `${patient.age} yrs`;
    DOM.vcUpdate.textContent = patient.lastUpdate;

    DOM.emName.textContent     = patient.emergency.name;
    DOM.emRelation.textContent = patient.emergency.relation;
    DOM.emPhone.textContent    = patient.emergency.phone;

    const phone = patient.emergency.phone.replace(/\s/g, '');
    DOM.btnCall.href = `tel:${phone}`;
    DOM.btnWA.href   = `https://wa.me/${phone.replace('+', '')}`;

    DOM.resultWrap.classList.add('visible');
}

function hideResult() {
    DOM.resultWrap.classList.remove('visible');
}

/* ════════════ FILTER PILLS ════════════ */
DOM.filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
        DOM.filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        activeFilter = pill.dataset.filter;
        renderTable();
    });
});

/* ════════════ ADMIT FROM RESULT CARD ════════════ */
DOM.btnAdmit.addEventListener('click', () => {
    if (!selectedResult) return;

    // Check if already admitted
    const already = admittedPatients.find(p => p.id === selectedResult.id);
    if (already) {
        showToast(`${selectedResult.name} is already admitted`, 'warning');
        return;
    }

    const today = new Date();
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const dateStr = `${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`;

    admittedPatients.push({
        name:      selectedResult.name,
        id:        selectedResult.id,
        room:      '--',
        dept:      'Cardiology',
        status:    selectedResult.status,
        condition: selectedResult.condition,
        admitted:  dateStr,
        report:    {}
    });

    renderTable();
    updateStats();
    showToast(`${selectedResult.name} admitted successfully`, 'success');
    clearSearch();
});

/* ════════════ EMERGENCY FROM RESULT CARD ════════════ */
DOM.btnEmergency.addEventListener('click', () => {
    if (!selectedResult) return;
    emergencyTarget = selectedResult.name;
    DOM.emergencyName.textContent = selectedResult.name;
    openModal('emergencyModal');
});

DOM.cancelEmergency.addEventListener('click', () => closeModal('emergencyModal'));
DOM.doEmergency.addEventListener('click', () => {
    closeModal('emergencyModal');
    showToast(`Emergency alert sent for ${emergencyTarget}`, 'warning');
    emergencyTarget = null;
});

/* ════════════ ADMIT MODAL ════════════ */
DOM.admitNewBtn.addEventListener('click', () => openModal('admitModal'));
DOM.closeAdmitBtn.addEventListener('click',  () => closeModal('admitModal'));
DOM.cancelAdmitBtn.addEventListener('click', () => closeModal('admitModal'));
DOM.doAdmitBtn.addEventListener('click', submitAdmit);

function submitAdmit() {
    const name      = DOM.fName.value.trim();
    const id        = DOM.fId.value.trim();
    const room      = DOM.fRoom.value.trim();
    const dept      = DOM.fDept.value.trim();
    const status    = DOM.fStatus.value;
    const condition = DOM.fCondition.value.trim();

    if (!name || !id || !room) {
        showToast('Please fill in Name, ID and Room', 'error');
        return;
    }

    const today = new Date();
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const dateStr = `${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`;

    admittedPatients.push({
        name, id, room,
        dept:      dept || 'General',
        status,
        condition: condition || '—',
        admitted:  dateStr,
        report:    {}
    });

    [DOM.fName, DOM.fId, DOM.fRoom, DOM.fDept, DOM.fCondition].forEach(el => el.value = '');
    DOM.fStatus.value = 'Stable';

    closeModal('admitModal');
    renderTable();
    updateStats();
    showToast(`${name} admitted successfully`, 'success');
}

/* ════════════ RENDER TABLE ════════════ */
function renderTable() {
    let filtered = admittedPatients;
    if (activeFilter !== 'all') {
        filtered = admittedPatients.filter(p => p.status === activeFilter);
    }

    DOM.tableCount.textContent = `${filtered.length} patient${filtered.length !== 1 ? 's' : ''}`;

    if (filtered.length === 0) {
        DOM.ptBody.innerHTML = '';
        DOM.tableEmpty.classList.add('visible');
        return;
    }

    DOM.tableEmpty.classList.remove('visible');

    DOM.ptBody.innerHTML = filtered.map((p, i) => {
        const realIndex = admittedPatients.indexOf(p);
        const initials  = p.name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
        const statusCls = p.status.toLowerCase();
        return `
        <tr style="animation: fadeSlideUp .3s ${i * 50}ms ease both">
            <td>
                <div class="pt-name-cell">
                    <div class="pt-mini-avatar">${initials}</div>
                    <div>
                        <div class="pt-name">${p.name}</div>
                        <div class="pt-sub">${p.id} · ${p.dept}</div>
                    </div>
                </div>
            </td>
            <td><span class="status-badge ${statusCls}">${p.status}</span></td>
            <td>Rm ${p.room}</td>
            <td>${p.condition}</td>
            <td>${p.admitted}</td>
            <td>
                <div class="tbl-actions">
                    <button class="tbl-btn view"      onclick="openReport(${realIndex})"><i class="fas fa-eye"></i> View</button>
                    <button class="tbl-btn discharge" onclick="openDischarge(${realIndex})"><i class="fas fa-sign-out-alt"></i> Discharge</button>
                    <button class="tbl-btn report"    onclick="openReport(${realIndex})"><i class="fas fa-file-medical"></i> Report</button>
                </div>
            </td>
        </tr>`;
    }).join('');
}

/* ════════════ REPORT MODAL ════════════ */
function openReport(index) {
    reportTarget = index;
    const p = admittedPatients[index];
    DOM.reportPtName.textContent = p.name;

    const today = new Date();
    DOM.rDate.value = today.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    // Load saved report
    DOM.rDiagnosis.value = p.report.diagnosis || '';
    DOM.rDoctor.value    = p.report.doctor     || '';
    DOM.rMeds.value      = p.report.meds       || '';
    DOM.rNotes.value     = p.report.notes      || '';

    openModal('reportModal');
}

DOM.closeReportBtn.addEventListener('click',  () => closeModal('reportModal'));
DOM.closeReportBtn2.addEventListener('click', () => closeModal('reportModal'));
DOM.saveReportBtn.addEventListener('click', saveReport);

function saveReport() {
    if (reportTarget < 0) return;
    admittedPatients[reportTarget].report = {
        diagnosis: DOM.rDiagnosis.value.trim(),
        doctor:    DOM.rDoctor.value.trim(),
        meds:      DOM.rMeds.value.trim(),
        notes:     DOM.rNotes.value.trim()
    };
    closeModal('reportModal');
    showToast('Report saved successfully', 'success');
}

/* ════════════ DISCHARGE MODAL ════════════ */
function openDischarge(index) {
    dischargeTarget = index;
    DOM.dischargeName.textContent = admittedPatients[index].name;
    openModal('dischargeModal');
}

DOM.cancelDischarge.addEventListener('click', () => closeModal('dischargeModal'));
DOM.doDischarge.addEventListener('click', confirmDischarge);

function confirmDischarge() {
    if (dischargeTarget < 0) return;
    const name = admittedPatients[dischargeTarget].name;
    admittedPatients.splice(dischargeTarget, 1);
    dischargedToday++;
    dischargeTarget = -1;
    closeModal('dischargeModal');
    renderTable();
    updateStats();
    showToast(`${name} discharged`, 'info');
}

/* ════════════ MODAL HELPERS ════════════ */
function openModal(id) {
    $(id).classList.add('active');
}
function closeModal(id) {
    $(id).classList.remove('active');
}

// Close modals on backdrop click
document.querySelectorAll('.modal-bg').forEach(bg => {
    bg.addEventListener('click', e => {
        if (e.target === bg) bg.classList.remove('active');
    });
});

// Close modals on Escape
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-bg.active').forEach(m => m.classList.remove('active'));
    }
});

/* ════════════ TOAST ════════════ */
let toastTimer = null;
function showToast(msg, type = 'success') {
    const icons = {
        success: 'fas fa-check-circle',
        warning: 'fas fa-exclamation-circle',
        error:   'fas fa-times-circle',
        info:    'fas fa-info-circle'
    };
    DOM.toastIcon.className = icons[type] || icons.success;
    DOM.toastMsg.textContent = msg;
    DOM.toast.className = 'toast show';

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => DOM.toast.classList.remove('show'), 3200);
}