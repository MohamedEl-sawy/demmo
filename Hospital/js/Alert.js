/* ═══════════════════════════════════════════════════
   SAFE HEART — ALERTS PAGE JS
   ═══════════════════════════════════════════════════ */

'use strict';

/* ════════════════════════ MOCK DATA ════════════════════════ */

const ALERT_TYPES = {
    heartRate:   { label: 'High Heart Rate',      icon: 'fas fa-heartbeat',       unit: 'BPM' },
    lowBP:       { label: 'Low Blood Pressure',   icon: 'fas fa-tachometer-alt',  unit: 'mmHg' },
    highBP:      { label: 'High Blood Pressure',  icon: 'fas fa-tachometer-alt',  unit: 'mmHg' },
    tempSpike:   { label: 'Temperature Spike',    icon: 'fas fa-thermometer-full', unit: '°C' },
    lowSpO2:     { label: 'Low SpO₂',             icon: 'fas fa-lungs',           unit: '%' },
    arrhythmia:  { label: 'Arrhythmia Detected',  icon: 'fas fa-wave-square',     unit: '' },
    highGlucose: { label: 'High Blood Glucose',   icon: 'fas fa-vial',            unit: 'mg/dL' },
    lowRespRate: { label: 'Low Respiratory Rate', icon: 'fas fa-wind',            unit: 'br/min' }
};

let ALERTS = [
    {
        id: 'ALT-001', typeKey: 'heartRate', severity: 'Critical',
        value: '145', patient: { name: 'Ahmed Mohamed', id: 'SH-00101', room: '204', dept: 'Cardiology', age: 47, blood: 'A+' },
        emergency: { name: 'Mona Ahmed', relation: 'Wife', phone: '+20100123456' },
        timeLabel: '2 min ago', timeGroup: 'today', resolved: false, note: '',
        readings: [
            { time: '09:42', label: 'Heart Rate', value: '145 BPM', level: 'critical' },
            { time: '09:30', label: 'Heart Rate', value: '138 BPM', level: 'critical' },
            { time: '09:15', label: 'Heart Rate', value: '122 BPM', level: 'warning' },
            { time: '09:00', label: 'Heart Rate', value: '88 BPM',  level: 'normal' }
        ]
    },
    {
        id: 'ALT-002', typeKey: 'lowSpO2', severity: 'Critical',
        value: '88', patient: { name: 'Fatima Ali', id: 'SH-00104', room: '118', dept: 'ICU', age: 28, blood: 'AB+' },
        emergency: { name: 'Omar Ali', relation: 'Father', phone: '+20103456789' },
        timeLabel: '5 min ago', timeGroup: 'today', resolved: false, note: '',
        readings: [
            { time: '09:39', label: 'SpO₂', value: '88%', level: 'critical' },
            { time: '09:25', label: 'SpO₂', value: '91%', level: 'warning' },
            { time: '09:10', label: 'SpO₂', value: '96%', level: 'normal' }
        ]
    },
    {
        id: 'ALT-003', typeKey: 'highBP', severity: 'Warning',
        value: '160/95', patient: { name: 'James Moore', id: 'SH-00103', room: '307', dept: 'Cardiology', age: 62, blood: 'O+' },
        emergency: { name: 'Linda Moore', relation: 'Daughter', phone: '+20102345678' },
        timeLabel: '12 min ago', timeGroup: 'today', resolved: false, note: '',
        readings: [
            { time: '09:32', label: 'BP', value: '160/95 mmHg', level: 'critical' },
            { time: '09:15', label: 'BP', value: '148/90 mmHg', level: 'warning' },
            { time: '09:00', label: 'BP', value: '130/82 mmHg', level: 'normal' }
        ]
    },
    {
        id: 'ALT-004', typeKey: 'tempSpike', severity: 'Warning',
        value: '38.9', patient: { name: 'Nour Hassan', id: 'SH-00105', room: '210', dept: 'General', age: 55, blood: 'A-' },
        emergency: { name: 'Khalid Hassan', relation: 'Son', phone: '+20104567890' },
        timeLabel: '18 min ago', timeGroup: 'today', resolved: false, note: '',
        readings: [
            { time: '09:26', label: 'Temperature', value: '38.9°C', level: 'critical' },
            { time: '09:00', label: 'Temperature', value: '38.2°C', level: 'warning' },
            { time: '08:30', label: 'Temperature', value: '37.4°C', level: 'normal' }
        ]
    },
    {
        id: 'ALT-005', typeKey: 'arrhythmia', severity: 'Critical',
        value: 'Detected', patient: { name: 'Layla Ibrahim', id: 'SH-00107', room: '115', dept: 'Cardiology', age: 67, blood: 'B+' },
        emergency: { name: 'Samir Ibrahim', relation: 'Son', phone: '+20106789012' },
        timeLabel: '22 min ago', timeGroup: 'today', resolved: false, note: '',
        readings: [
            { time: '09:22', label: 'ECG', value: 'Irregular — Afib', level: 'critical' },
            { time: '09:10', label: 'ECG', value: 'Irregular', level: 'warning' },
            { time: '08:55', label: 'ECG', value: 'Normal Sinus', level: 'normal' }
        ]
    },
    {
        id: 'ALT-006', typeKey: 'lowBP', severity: 'Warning',
        value: '85/50', patient: { name: 'Robert Silva', id: 'SH-00108', room: '320', dept: 'ICU', age: 50, blood: 'AB-' },
        emergency: { name: 'Maria Silva', relation: 'Wife', phone: '+20107890123' },
        timeLabel: '35 min ago', timeGroup: 'today', resolved: false, note: '',
        readings: [
            { time: '09:09', label: 'BP', value: '85/50 mmHg', level: 'critical' },
            { time: '08:50', label: 'BP', value: '95/60 mmHg', level: 'warning' },
            { time: '08:30', label: 'BP', value: '110/72 mmHg', level: 'normal' }
        ]
    },
    {
        id: 'ALT-007', typeKey: 'highGlucose', severity: 'Warning',
        value: '280', patient: { name: 'Sarah Williams', id: 'SH-00102', room: '412', dept: 'ICU', age: 34, blood: 'B-' },
        emergency: { name: 'James Williams', relation: 'Husband', phone: '+20101234567' },
        timeLabel: '1 hr ago', timeGroup: '24h', resolved: false, note: '',
        readings: [
            { time: '08:44', label: 'Blood Glucose', value: '280 mg/dL', level: 'critical' },
            { time: '08:00', label: 'Blood Glucose', value: '220 mg/dL', level: 'warning' },
            { time: '07:00', label: 'Blood Glucose', value: '145 mg/dL', level: 'normal' }
        ]
    },
    {
        id: 'ALT-008', typeKey: 'heartRate', severity: 'Resolved',
        value: '52', patient: { name: 'Michael Chen', id: 'SH-00106', room: '203', dept: 'Cardiology', age: 41, blood: 'O-' },
        emergency: { name: 'Emily Chen', relation: 'Wife', phone: '+20105678901' },
        timeLabel: '2 hr ago', timeGroup: '24h', resolved: true, note: 'Administered Atropine 0.5mg IV. Patient stabilised. Continue monitoring.',
        readings: [
            { time: '07:55', label: 'Heart Rate', value: '52 BPM', level: 'warning' },
            { time: '07:30', label: 'Heart Rate', value: '58 BPM', level: 'warning' },
            { time: '07:00', label: 'Heart Rate', value: '72 BPM', level: 'normal' }
        ]
    },
    {
        id: 'ALT-009', typeKey: 'lowRespRate', severity: 'Warning',
        value: '9', patient: { name: 'Ahmed Mohamed', id: 'SH-00101', room: '204', dept: 'Cardiology', age: 47, blood: 'A+' },
        emergency: { name: 'Mona Ahmed', relation: 'Wife', phone: '+20100123456' },
        timeLabel: '3 hr ago', timeGroup: '24h', resolved: false, note: '',
        readings: [
            { time: '06:50', label: 'Respiratory Rate', value: '9 br/min', level: 'critical' },
            { time: '06:30', label: 'Respiratory Rate', value: '11 br/min', level: 'warning' },
            { time: '06:00', label: 'Respiratory Rate', value: '16 br/min', level: 'normal' }
        ]
    },
    {
        id: 'ALT-010', typeKey: 'tempSpike', severity: 'Resolved',
        value: '39.4', patient: { name: 'Nour Hassan', id: 'SH-00105', room: '210', dept: 'General', age: 55, blood: 'A-' },
        emergency: { name: 'Khalid Hassan', relation: 'Son', phone: '+20104567890' },
        timeLabel: 'Yesterday', timeGroup: 'week', resolved: true, note: 'Paracetamol administered. Temp normalised to 37.1°C by 23:00.',
        readings: [
            { time: 'Yesterday 21:30', label: 'Temperature', value: '39.4°C', level: 'critical' },
            { time: 'Yesterday 22:00', label: 'Temperature', value: '38.8°C', level: 'warning' },
            { time: 'Yesterday 23:00', label: 'Temperature', value: '37.1°C', level: 'normal' }
        ]
    },
    {
        id: 'ALT-011', typeKey: 'highBP', severity: 'Resolved',
        value: '175/105', patient: { name: 'Layla Ibrahim', id: 'SH-00107', room: '115', dept: 'Cardiology', age: 67, blood: 'B+' },
        emergency: { name: 'Samir Ibrahim', relation: 'Son', phone: '+20106789012' },
        timeLabel: '2 days ago', timeGroup: 'week', resolved: true, note: 'Amlodipine 5mg. Responded well. BP now 130/80.',
        readings: [
            { time: '2 days 10:00', label: 'BP', value: '175/105 mmHg', level: 'critical' },
            { time: '2 days 11:00', label: 'BP', value: '155/95 mmHg',  level: 'warning' },
            { time: '2 days 12:00', label: 'BP', value: '130/80 mmHg',  level: 'normal' }
        ]
    }
];

/* ════════════════════════ STATE ════════════════════════ */
let statusFilter = 'all';
let timeFilter   = 'today';
let sortBy       = 'severity';
let activeDetailId = null;
let activeNoteId   = null;

/* ════════════════════════ DOM ════════════════════════ */
const $ = id => document.getElementById(id);
const DOM = {
    loader:        $('pageLoader'),
    sidebar:       $('sidebar'),
    overlay:       $('overlay'),
    menuBtn:       $('menuBtn'),
    lockBtn:       $('lockBtn'),
    logoutBtn:     $('logoutBtn'),
    lockScreen:    $('lockScreen'),
    lockPin:       $('lockPin'),
    unlockBtn:     $('unlockBtn'),
    navAlertCount: $('navAlertCount'),

    statTotal:    $('statTotal'),
    statActive:   $('statActive'),
    statCritical: $('statCritical'),
    statResolved: $('statResolved'),

    statusFilters: document.querySelectorAll('#statusFilters .fpill'),
    timeFilters:   document.querySelectorAll('#timeFilters .fpill'),
    sortSelect:    $('sortSelect'),
    alertCountLabel: $('alertCountLabel'),

    alertsGrid:  $('alertsGrid'),
    emptyState:  $('emptyState'),
    resolveAllBtn: $('resolveAllBtn'),

    detailModal:     $('detailModal'),
    closeDetailBtn:  $('closeDetailBtn'),
    closeDetailBtn2: $('closeDetailBtn2'),
    modalTitle:      $('modalTitle'),
    modalSubtitle:   $('modalSubtitle'),
    dPatientName:    $('dPatientName'),
    dPatientId:      $('dPatientId'),
    dRoom:           $('dRoom'),
    dDept:           $('dDept'),
    dAge:            $('dAge'),
    dBlood:          $('dBlood'),
    dEmName:         $('dEmName'),
    dEmRelation:     $('dEmRelation'),
    dEmPhone:        $('dEmPhone'),
    dCallBtn:        $('dCallBtn'),
    readingsTimeline: $('readingsTimeline'),
    modalNotes:      $('modalNotes'),
    saveNoteBtn:     $('saveNoteBtn'),
    modalResolveBtn: $('modalResolveBtn'),

    noteModal:      $('noteModal'),
    notePatientLabel: $('notePatientLabel'),
    closeNoteBtn:   $('closeNoteBtn'),
    cancelNoteBtn:  $('cancelNoteBtn'),
    saveNoteModalBtn: $('saveNoteModalBtn'),
    noteText:       $('noteText'),

    logoutModal:    $('logoutModal'),
    cancelLogoutBtn: $('cancelLogoutBtn'),
    doLogoutBtn:    $('doLogoutBtn'),

    toast:     $('toast'),
    toastIcon: $('toastIcon'),
    toastMsg:  $('toastMsg')
};

/* ════════════════════════ INIT ════════════════════════ */
window.addEventListener('load', () => {
    setTimeout(() => {
        DOM.loader.classList.add('hidden');
        animateStats();
        render();
    }, 900);
});

/* ════════════════════════ STATS ════════════════════════ */
function animateCount(el, target, dur = 800) {
    let start = null;
    const step = ts => {
        if (!start) start = ts;
        const prog = Math.min((ts - start) / dur, 1);
        const ease = 1 - Math.pow(1 - prog, 3);
        el.textContent = Math.round(ease * target);
        if (prog < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
}

function animateStats() {
    const totals = computeStats();
    animateCount(DOM.statTotal,    totals.total);
    animateCount(DOM.statActive,   totals.active);
    animateCount(DOM.statCritical, totals.critical);
    animateCount(DOM.statResolved, totals.resolved);
    DOM.navAlertCount.textContent = totals.active;
}

function computeStats() {
    return {
        total:    ALERTS.length,
        active:   ALERTS.filter(a => !a.resolved).length,
        critical: ALERTS.filter(a => a.severity === 'Critical' && !a.resolved).length,
        resolved: ALERTS.filter(a => a.resolved).length
    };
}

function updateStats() {
    const t = computeStats();
    DOM.statTotal.textContent    = t.total;
    DOM.statActive.textContent   = t.active;
    DOM.statCritical.textContent = t.critical;
    DOM.statResolved.textContent = t.resolved;
    DOM.navAlertCount.textContent = t.active;
}

/* ════════════════════════ FILTER + RENDER ════════════════════════ */
function getFiltered() {
    let list = [...ALERTS];

    // Status filter
    if (statusFilter !== 'all') {
        if (statusFilter === 'Resolved') {
            list = list.filter(a => a.resolved);
        } else {
            list = list.filter(a => a.severity === statusFilter && !a.resolved);
        }
    }

    // Time filter
    if (timeFilter !== 'week') {
        list = list.filter(a => {
            if (timeFilter === 'today') return a.timeGroup === 'today';
            if (timeFilter === '24h')   return a.timeGroup === 'today' || a.timeGroup === '24h';
            return true;
        });
    }

    // Sort
    const severityOrder = { Critical: 0, Warning: 1, Resolved: 2 };
    if (sortBy === 'severity') {
        list.sort((a, b) => {
            if (a.resolved !== b.resolved) return a.resolved ? 1 : -1;
            return (severityOrder[a.severity] ?? 3) - (severityOrder[b.severity] ?? 3);
        });
    } else if (sortBy === 'patient') {
        list.sort((a, b) => a.patient.name.localeCompare(b.patient.name));
    }

    return list;
}

function render() {
    const list = getFiltered();
    DOM.alertCountLabel.textContent = `Showing ${list.length} alert${list.length !== 1 ? 's' : ''}`;

    if (list.length === 0) {
        DOM.alertsGrid.innerHTML = '';
        DOM.emptyState.classList.add('visible');
        return;
    }
    DOM.emptyState.classList.remove('visible');
    DOM.alertsGrid.innerHTML = list.map((a, i) => buildCard(a, i)).join('');
}

/* ════════════════════════ BUILD CARD ════════════════════════ */
function buildCard(a, index) {
    const type = ALERT_TYPES[a.typeKey] || { label: a.typeKey, icon: 'fas fa-bell', unit: '' };
    const statusCls = a.resolved ? 'resolved' : a.severity.toLowerCase();
    const isLive    = !a.resolved && a.severity !== 'Resolved';

    const liveBadge = isLive
        ? `<div class="live-tag"><span class="live-tag-dot"></span>LIVE</div>`
        : '';

    const valueDisplay = a.value + (type.unit && a.value !== 'Detected' ? ` <span style="font-size:13px;font-weight:500;color:var(--text-light)">${type.unit}</span>` : '');

    const noteEl = a.note
        ? `<div class="ac-note visible"><i class="fas fa-sticky-note" style="margin-right:5px;color:var(--amber)"></i>${a.note}</div>`
        : `<div class="ac-note" id="note-${a.id}"></div>`;

    const resolvedAction = a.resolved
        ? `<span class="ac-btn resolved-tag"><i class="fas fa-check"></i> Resolved</span>`
        : `<button class="ac-btn resolve" onclick="resolveAlert('${a.id}')"><i class="fas fa-check"></i> Resolve</button>`;

    return `
    <div class="alert-card ${statusCls}" id="card-${a.id}" style="animation-delay:${index * 50}ms">
        <div class="ac-header">
            <div class="ac-type-wrap">
                <div class="ac-type-icon"><i class="${type.icon}"></i></div>
                <div class="ac-type-text">
                    <strong>${type.label}</strong>
                    <small>${a.patient.dept} · ${a.timeLabel}</small>
                </div>
            </div>
            <div class="ac-badges">
                <span class="status-badge ${statusCls}">${a.resolved ? 'Resolved' : a.severity}</span>
                ${liveBadge}
            </div>
        </div>

        <div class="ac-body">
            <div class="ac-row">
                <i class="fas fa-user"></i>
                <span>Patient</span>
                <strong>${a.patient.name}</strong>
            </div>
            <div class="ac-row">
                <i class="fas fa-door-open"></i>
                <span>Room</span>
                <strong>Rm ${a.patient.room} — ${a.patient.dept}</strong>
            </div>
        </div>

        <div class="ac-reading">
            <div>
                <div style="font-size:11px;color:var(--text-light);margin-bottom:4px;text-transform:uppercase;letter-spacing:.4px;font-weight:700">${type.label}</div>
                <div class="ac-reading-val">${a.value}${type.unit && a.value !== 'Detected' ? '<span style="font-size:14px;margin-left:3px">'+type.unit+'</span>' : ''}</div>
            </div>
            <div class="ac-reading-meta">
                <span>Last reading</span>
                <strong>${a.timeLabel}</strong>
            </div>
        </div>

        ${noteEl}

        <div class="ac-actions">
            <button class="ac-btn view" onclick="openDetail('${a.id}')"><i class="fas fa-eye"></i> View</button>
            <a class="ac-btn call" href="tel:${a.emergency.phone}"><i class="fas fa-phone-alt"></i> Call</a>
            ${resolvedAction}
            <button class="ac-btn note" onclick="openNote('${a.id}')"><i class="fas fa-sticky-note"></i> Note</button>
        </div>
    </div>`;
}

/* ════════════════════════ RESOLVE ════════════════════════ */
function resolveAlert(id) {
    const alert = ALERTS.find(a => a.id === id);
    if (!alert || alert.resolved) return;
    alert.resolved  = true;
    alert.severity  = 'Resolved';
    render();
    updateStats();
    showToast(`Alert for ${alert.patient.name} marked as resolved`, 'success');
}

DOM.resolveAllBtn.addEventListener('click', () => {
    const active = ALERTS.filter(a => !a.resolved);
    if (active.length === 0) { showToast('No active alerts to resolve', 'info'); return; }
    active.forEach(a => { a.resolved = true; a.severity = 'Resolved'; });
    render();
    updateStats();
    showToast(`${active.length} alerts resolved`, 'success');
});

/* ════════════════════════ OPEN DETAIL MODAL ════════════════════════ */
function openDetail(id) {
    const a = ALERTS.find(x => x.id === id);
    if (!a) return;
    activeDetailId = id;

    const type = ALERT_TYPES[a.typeKey] || { label: a.typeKey };
    DOM.modalTitle.textContent    = type.label;
    DOM.modalSubtitle.textContent = `${a.timeLabel} · ${a.patient.dept}`;

    DOM.dPatientName.textContent = a.patient.name;
    DOM.dPatientId.textContent   = a.patient.id;
    DOM.dRoom.textContent        = `Room ${a.patient.room}`;
    DOM.dDept.textContent        = a.patient.dept;
    DOM.dAge.textContent         = `${a.patient.age} years`;
    DOM.dBlood.textContent       = a.patient.blood;

    DOM.dEmName.textContent     = a.emergency.name;
    DOM.dEmRelation.textContent = a.emergency.relation;
    DOM.dEmPhone.textContent    = a.emergency.phone;
    DOM.dCallBtn.href           = `tel:${a.emergency.phone}`;

    DOM.readingsTimeline.innerHTML = a.readings.map(r => `
        <div class="rt-item">
            <div class="rt-dot ${r.level}"></div>
            <div class="rt-body">
                <strong>${r.label}</strong>
                <span>${r.time}</span>
            </div>
            <div class="rt-val">${r.value}</div>
        </div>`).join('');

    DOM.modalNotes.value = a.note || '';

    DOM.modalResolveBtn.style.display = a.resolved ? 'none' : 'flex';

    openModal('detailModal');
}

DOM.closeDetailBtn.addEventListener('click',  () => closeModal('detailModal'));
DOM.closeDetailBtn2.addEventListener('click', () => closeModal('detailModal'));

DOM.saveNoteBtn.addEventListener('click', () => {
    if (!activeDetailId) return;
    const a = ALERTS.find(x => x.id === activeDetailId);
    if (a) a.note = DOM.modalNotes.value.trim();
    closeModal('detailModal');
    render();
    showToast('Notes saved', 'success');
});

DOM.modalResolveBtn.addEventListener('click', () => {
    if (!activeDetailId) return;
    resolveAlert(activeDetailId);
    closeModal('detailModal');
});

/* ════════════════════════ NOTE MODAL ════════════════════════ */
function openNote(id) {
    const a = ALERTS.find(x => x.id === id);
    if (!a) return;
    activeNoteId = id;
    DOM.notePatientLabel.textContent = a.patient.name;
    DOM.noteText.value = a.note || '';
    openModal('noteModal');
}

DOM.closeNoteBtn.addEventListener('click',   () => closeModal('noteModal'));
DOM.cancelNoteBtn.addEventListener('click',  () => closeModal('noteModal'));
DOM.saveNoteModalBtn.addEventListener('click', () => {
    if (!activeNoteId) return;
    const a = ALERTS.find(x => x.id === activeNoteId);
    if (a) {
        a.note = DOM.noteText.value.trim();
        render();
        showToast('Note saved', 'success');
    }
    closeModal('noteModal');
});

/* ════════════════════════ FILTERS ════════════════════════ */
DOM.statusFilters.forEach(btn => {
    btn.addEventListener('click', () => {
        DOM.statusFilters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        statusFilter = btn.dataset.status;
        render();
    });
});

DOM.timeFilters.forEach(btn => {
    btn.addEventListener('click', () => {
        DOM.timeFilters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        timeFilter = btn.dataset.time;
        render();
    });
});

DOM.sortSelect.addEventListener('change', () => {
    sortBy = DOM.sortSelect.value;
    render();
});

/* ════════════════════════ SIDEBAR ════════════════════════ */
DOM.menuBtn.addEventListener('click', () => {
    DOM.sidebar.classList.add('active');
    DOM.overlay.classList.add('active');
});
DOM.overlay.addEventListener('click', closeSidebar);
document.querySelectorAll('.sb-link').forEach(l => {
    l.addEventListener('click', () => { if (window.innerWidth <= 992) closeSidebar(); });
});
function closeSidebar() {
    DOM.sidebar.classList.remove('active');
    DOM.overlay.classList.remove('active');
}

/* ════════════════════════ LOCK SCREEN ════════════════════════ */
DOM.lockBtn.addEventListener('click', () => {
    DOM.lockScreen.classList.add('active');
    closeSidebar();
    document.body.style.overflow = 'hidden';
});
DOM.unlockBtn.addEventListener('click', unlock);
DOM.lockPin.addEventListener('keydown', e => { if (e.key === 'Enter') unlock(); });
function unlock() {
    const pin = DOM.lockPin.value;
    if (pin.length > 0) {
        DOM.lockScreen.classList.remove('active');
        DOM.lockPin.value = '';
        document.body.style.overflow = '';
        showToast('Unlocked successfully', 'success');
    } else {
        DOM.lockPin.style.borderColor = '#ef4444';
        setTimeout(() => DOM.lockPin.style.borderColor = '', 700);
    }
}

/* ════════════════════════ LOGOUT ════════════════════════ */
DOM.logoutBtn.addEventListener('click', () => openModal('logoutModal'));
DOM.cancelLogoutBtn.addEventListener('click', () => closeModal('logoutModal'));
DOM.doLogoutBtn.addEventListener('click', () => {
    closeModal('logoutModal');
    showToast('Logged out', 'info');
});

/* ════════════════════════ MODAL HELPERS ════════════════════════ */
function openModal(id)  { $(id).classList.add('active'); }
function closeModal(id) { $(id).classList.remove('active'); }

document.querySelectorAll('.modal-bg').forEach(bg => {
    bg.addEventListener('click', e => { if (e.target === bg) bg.classList.remove('active'); });
});
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') document.querySelectorAll('.modal-bg.active').forEach(m => m.classList.remove('active'));
});

/* ════════════════════════ TOAST ════════════════════════ */
let toastTimer = null;
function showToast(msg, type = 'success') {
    const icons = { success: 'fas fa-check-circle', warning: 'fas fa-exclamation-circle', error: 'fas fa-times-circle', info: 'fas fa-info-circle' };
    DOM.toastIcon.className = icons[type] || icons.success;
    DOM.toastMsg.textContent = msg;
    DOM.toast.className = 'toast show';
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => DOM.toast.classList.remove('show'), 3200);
}