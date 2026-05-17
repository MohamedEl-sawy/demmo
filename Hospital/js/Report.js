'use strict';

/* ═══════════════════════════════════════════════════
   PATIENTS DATABASE
═══════════════════════════════════════════════════ */

window.addEventListener("DOMContentLoaded", () => {
  console.log("Report loaded");

  const loader = document.getElementById("pageLoader");
  const content = document.getElementById("reportContent");
  const empty = document.getElementById("emptyState");

  if (loader) loader.style.display = "none";
  if (content) content.style.display = "block";
  if (empty) empty.style.display = "none";
});


const PATIENTS_DB = [
    {
        id: 'SH-00412',
        name: 'Ahmed Mohamed',
        initials: 'AM',
        age: 47, gender: 'Male', blood: 'A+',
        dept: 'Cardiology', room: '204',
        doctor: 'Dr. Khalid Omar',
        admission: '12 May 2026',
        diagnosis: 'Acute Myocardial Infarction',
        status: 'critical',
        reportId: 'MR-2026-0512-004',
        ecgHR: '145 BPM', ecgRhythm: 'Irregular',
        summary: { hr: '145 BPM', bp: '160/95', temp: '39.2°C', spo2: '88%' },
        summaryFlags: { hr: 'critical', bp: 'warning', temp: 'critical', spo2: 'critical' },
        notes: 'Patient presents with acute MI complicated by tachycardia and elevated BP. ECG shows ST-elevation V1–V4. Hemodynamically unstable. Cathlab on standby for PCI.',
        aiStatus: 'Critical', aiConf: '94%', aiConfWidth: '94%',
        riskPos: '88%', riskLabel: 'Critical', riskColor: '#E24B4A',
        vitals: {
            heartRate: [78, 82, 88, 95, 104, 118, 130, 138, 145],
            sysBP:     [128, 132, 138, 145, 150, 158, 162, 168, 160],
            diaBP:     [82, 84, 86, 90, 92, 96, 98, 102, 95],
            temp:      [37.1, 37.2, 37.3, 37.5, 37.8, 38.1, 38.5, 38.8, 39.2],
            spo2:      [98, 97, 97, 96, 95, 94, 93, 91, 88]
        },
        findings: [
            { level: 'critical', icon: 'fas fa-heartbeat',        title: 'Elevated Heart Rate — Tachycardia',      detail: 'Heart rate rose from 78 to 145 BPM over 8 hours. Exceeds critical threshold >140 BPM. Immediate cardiology review required.' },
            { level: 'critical', icon: 'fas fa-lungs',             title: 'Low SpO₂ — Hypoxemia',                   detail: 'SpO₂ dropped to 88%, well below normal range. Supplemental oxygen and respiratory assessment required urgently.' },
            { level: 'critical', icon: 'fas fa-thermometer-full',  title: 'High Fever — Pyrexia',                   detail: 'Temperature at 39.2°C. Possible post-infarction pericarditis or systemic infection.' },
            { level: 'warning',  icon: 'fas fa-tachometer-alt',    title: 'Hypertension',                           detail: 'Systolic BP peaked 168 mmHg. Anti-hypertensive therapy adjustment needed.' }
        ],
        predictive: [
            { type: 'rising',  icon: 'fas fa-heartbeat',       title: 'Heart Rate',       trend: 'Increasing steadily +67 BPM over 8h',       trendIcon: 'fas fa-arrow-trend-up',    risk: '⚠ Risk Rising',     rec: 'Administer beta-blocker if no contraindication. Reassess every 15 minutes.' },
            { type: 'rising',  icon: 'fas fa-lungs',           title: 'SpO₂ Saturation',  trend: 'Declining 10 percentage points over 8h',     trendIcon: 'fas fa-arrow-trend-down',  risk: '🔴 Critical Trend',  rec: 'Escalate oxygen therapy. Consider non-invasive ventilation.' },
            { type: 'rising',  icon: 'fas fa-thermometer-full',title: 'Body Temperature', trend: 'Gradually rising +2.1°C since 02:00',        trendIcon: 'fas fa-arrow-trend-up',    risk: '⚠ Worsening',       rec: 'Antipyretic therapy. Blood culture if infection suspected.' },
            { type: 'falling', icon: 'fas fa-tachometer-alt',  title: 'Blood Pressure',   trend: 'Slightly decreasing from peak 168 → 160',    trendIcon: 'fas fa-arrow-down',        risk: 'Moderate',           rec: 'Continue current anti-hypertensive. Monitor every 30 min.' },
            { type: 'rising',  icon: 'fas fa-wave-square',     title: 'ECG Rhythm',       trend: 'Progressive irregularity detected',           trendIcon: 'fas fa-exclamation-triangle', risk: '🔴 Arrhythmia',   rec: 'Cardiology consult stat. Prepare defibrillator.' },
            { type: 'stable',  icon: 'fas fa-vial',            title: 'Troponin Levels',  trend: 'Elevated but trending stable at 2.8 ng/mL',  trendIcon: 'fas fa-minus',             risk: 'Stable / Elevated',  rec: 'Repeat troponin in 3 hours. Continue anticoagulation.' }
        ],
        recommendations: [
            { type: 'urgent', icon: 'fas fa-bolt',       text: 'Immediate cardiologist intervention' },
            { type: 'urgent', icon: 'fas fa-procedures', text: 'ICU transfer evaluation' },
            { type: 'warn',   icon: 'fas fa-pills',      text: 'Anti-arrhythmic medication review' },
            { type: 'warn',   icon: 'fas fa-stethoscope',text: 'Repeat ECG in 30 minutes' },
            { type: 'normal', icon: 'fas fa-chart-line', text: 'Continuous vital sign monitoring' }
        ],
        timeline: [
            { time: '02:00', type: 'info',     icon: 'fas fa-door-open',           title: 'Patient Admitted',           badge: 'Admission', desc: 'Admitted to Cardiology ward with chest pain. IV line established. O₂ applied.' },
            { time: '03:15', type: 'warning',  icon: 'fas fa-exclamation-triangle', title: 'Heart Rate Rising — 95 BPM', badge: 'Warning',   desc: 'HR upward trend. Continuous cardiac monitoring initiated. Doctor notified.' },
            { time: '04:30', type: 'warning',  icon: 'fas fa-tachometer-alt',       title: 'BP Elevated — 145/90 mmHg', badge: 'Warning',   desc: 'BP rising. Amlodipine 5mg administered. Monitoring every 15 minutes.' },
            { time: '06:00', type: 'critical', icon: 'fas fa-heartbeat',            title: 'Tachycardia — 118 BPM',     badge: 'Critical',  desc: 'HR crossed 100 BPM. Irregular ECG rhythm. Cardiology team alerted. Metoprolol 25mg given.' },
            { time: '07:30', type: 'critical', icon: 'fas fa-thermometer-full',     title: 'Fever Detected — 38.5°C',   badge: 'Critical',  desc: 'Temperature spiked. Paracetamol 1g IV. Blood cultures drawn.' },
            { time: '08:45', type: 'critical', icon: 'fas fa-lungs',                title: 'SpO₂ Dropped — 91%',        badge: 'Critical',  desc: 'O₂ saturation declining. High-flow O₂ via NRB mask. ABG sample sent.' },
            { time: '09:10', type: 'critical', icon: 'fas fa-wave-square',          title: 'ECG Arrhythmia Detected',   badge: 'Urgent',    desc: 'Irregular rhythm on 12-lead ECG. ST-elevation V1–V4. Cathlab on standby.' },
            { time: '09:30', type: 'info',     icon: 'fas fa-user-md',              title: 'Dr. Khalid Omar Reviewed',  badge: 'Doctor',    desc: 'Management plan updated. Aspirin + Clopidogrel administered. Heparin infusion started.' },
            { time: '09:44', type: 'critical', icon: 'fas fa-bell',                 title: 'AI Alert Generated',        badge: 'AI Alert',  desc: 'Safe Heart AI flagged multi-system deterioration. Risk score: CRITICAL.' }
        ]
    },
    {
        id: 'SH-00203',
        name: 'John Doe',
        initials: 'JD',
        age: 34, gender: 'Male', blood: 'B+',
        dept: 'Cardiology', room: '203',
        doctor: 'Dr. Sara Nabil',
        admission: '10 May 2026',
        diagnosis: 'Stable Angina',
        status: 'stable',
        reportId: 'MR-2026-0510-001',
        ecgHR: '74 BPM', ecgRhythm: 'Normal Sinus',
        summary: { hr: '74 BPM', bp: '120/78', temp: '36.9°C', spo2: '98%' },
        summaryFlags: { hr: 'normal', bp: 'normal', temp: 'normal', spo2: 'normal' },
        notes: 'Patient stable. Angina controlled with nitrates. Echocardiogram scheduled. Continue current medication regimen. Discharge planned for tomorrow pending results.',
        aiStatus: 'Stable', aiConf: '97%', aiConfWidth: '97%',
        riskPos: '15%', riskLabel: 'Low Risk', riskColor: '#1D9E75',
        vitals: {
            heartRate: [72, 74, 76, 75, 73, 74, 76, 75, 74],
            sysBP:     [118, 120, 122, 120, 119, 121, 120, 119, 120],
            diaBP:     [76, 78, 79, 78, 77, 78, 79, 78, 77],
            temp:      [36.8, 36.9, 36.8, 36.9, 37.0, 36.9, 36.8, 36.9, 36.9],
            spo2:      [98, 98, 99, 98, 99, 98, 99, 98, 98]
        },
        findings: [
            { level: 'normal', icon: 'fas fa-heartbeat',    title: 'Heart Rate — Normal',          detail: 'Stable at 72–76 BPM throughout the monitoring period. No tachycardia or bradycardia detected.' },
            { level: 'normal', icon: 'fas fa-tachometer-alt',title: 'Blood Pressure — Controlled',  detail: 'BP consistently within normal range (118–122 / 76–79 mmHg). Medication is effective.' },
            { level: 'normal', icon: 'fas fa-lungs',         title: 'SpO₂ — Excellent',             detail: '98–99% saturation. No respiratory concerns. Good oxygenation maintained.' }
        ],
        predictive: [
            { type: 'stable', icon: 'fas fa-heartbeat',       title: 'Heart Rate',       trend: 'Stable around 74 BPM',                  trendIcon: 'fas fa-minus', risk: 'No Risk',  rec: 'Continue routine monitoring.' },
            { type: 'stable', icon: 'fas fa-tachometer-alt',  title: 'Blood Pressure',   trend: 'Consistently within normal range',       trendIcon: 'fas fa-minus', risk: 'Normal',   rec: 'Maintain current antihypertensive regimen.' },
            { type: 'stable', icon: 'fas fa-lungs',           title: 'SpO₂ Saturation',  trend: 'Holding steady at 98–99%',              trendIcon: 'fas fa-minus', risk: 'Excellent', rec: 'No supplemental oxygen required.' }
        ],
        recommendations: [
            { type: 'normal', icon: 'fas fa-chart-line',  text: 'Routine vital monitoring' },
            { type: 'normal', icon: 'fas fa-stethoscope', text: 'Follow-up echocardiogram tomorrow' },
            { type: 'warn',   icon: 'fas fa-pills',       text: 'Continue nitrate therapy as prescribed' }
        ],
        timeline: [
            { time: '10:00', type: 'info',     icon: 'fas fa-door-open',  title: 'Patient Admitted',           badge: 'Admission', desc: 'Admitted with stable angina. Initial workup completed. ECG normal sinus rhythm.' },
            { time: '12:00', type: 'info',     icon: 'fas fa-heartbeat',  title: 'Vitals Checked — Normal',    badge: 'Stable',    desc: 'All vitals within normal range. Patient comfortable. No pain reported.' },
            { time: '15:00', type: 'info',     icon: 'fas fa-user-md',    title: 'Dr. Sara Nabil Reviewed',   badge: 'Doctor',    desc: 'Attending cardiologist reviewed. Echocardiogram ordered. Discharge plan discussed.' },
            { time: '18:00', type: 'info',     icon: 'fas fa-chart-line', title: 'Monitoring Continues',      badge: 'Routine',   desc: 'Continuous monitoring. Patient resting comfortably. No new events.' }
        ]
    },
    {
        id: 'SH-00412B',
        name: 'Sarah Williams',
        initials: 'SW',
        age: 52, gender: 'Female', blood: 'O-',
        dept: 'ICU', room: '412',
        doctor: 'Dr. Omar Fawzi',
        admission: '11 May 2026',
        diagnosis: 'Post-operative Cardiac Monitoring',
        status: 'warning',
        reportId: 'MR-2026-0511-002',
        ecgHR: '99 BPM', ecgRhythm: 'Mild Tachycardia',
        summary: { hr: '99 BPM', bp: '140/88', temp: '37.8°C', spo2: '95%' },
        summaryFlags: { hr: 'warning', bp: 'warning', temp: 'warning', spo2: 'normal' },
        notes: 'Post-CABG monitoring. Mild tachycardia and low-grade fever observed. Monitor for signs of post-op infection. Physiotherapy started. Responding well to treatment.',
        aiStatus: 'Warning', aiConf: '88%', aiConfWidth: '88%',
        riskPos: '55%', riskLabel: 'Moderate', riskColor: '#BA7517',
        vitals: {
            heartRate: [80, 84, 88, 92, 96, 98, 100, 102, 99],
            sysBP:     [130, 134, 138, 142, 146, 148, 145, 143, 140],
            diaBP:     [84, 86, 88, 90, 92, 94, 92, 90, 88],
            temp:      [37.2, 37.4, 37.6, 37.8, 38.0, 38.2, 38.1, 37.9, 37.8],
            spo2:      [97, 96, 96, 95, 95, 94, 94, 95, 95]
        },
        findings: [
            { level: 'warning', icon: 'fas fa-heartbeat',       title: 'Mild Tachycardia',       detail: 'HR trending upward 80 → 102 BPM. Common post-op response but requires monitoring.' },
            { level: 'warning', icon: 'fas fa-thermometer-full',title: 'Low-Grade Fever',        detail: 'Temperature peaked at 38.2°C. Possible post-operative inflammatory response.' },
            { level: 'normal',  icon: 'fas fa-lungs',           title: 'SpO₂ — Acceptable',      detail: '94–97%. Expected post-op range. Supplemental oxygen being maintained.' }
        ],
        predictive: [
            { type: 'falling', icon: 'fas fa-heartbeat',       title: 'Heart Rate',       trend: 'Slight upward trend, stabilizing near 99',   trendIcon: 'fas fa-arrow-down', risk: 'Moderate',    rec: 'Continue monitoring. Consider rate control if HR >110.' },
            { type: 'falling', icon: 'fas fa-thermometer-full',title: 'Body Temperature', trend: 'Peaked at 38.2°C, now trending down',         trendIcon: 'fas fa-arrow-down', risk: 'Improving',   rec: 'Continue antipyretics. Re-evaluate in 4 hours.' },
            { type: 'stable',  icon: 'fas fa-lungs',           title: 'SpO₂ Saturation',  trend: 'Holding stable at 94–95%',                   trendIcon: 'fas fa-minus',      risk: 'Acceptable',  rec: 'Maintain O₂ supplementation. Aim for >96%.' }
        ],
        recommendations: [
            { type: 'warn',   icon: 'fas fa-stethoscope', text: 'Repeat ECG in 2 hours' },
            { type: 'warn',   icon: 'fas fa-pills',       text: 'Continue post-op antibiotic course' },
            { type: 'normal', icon: 'fas fa-chart-line',  text: 'Hourly vital sign monitoring' },
            { type: 'normal', icon: 'fas fa-walking',     text: 'Continue physiotherapy sessions' }
        ],
        timeline: [
            { time: '08:00', type: 'info',     icon: 'fas fa-door-open',           title: 'Transferred to ICU',         badge: 'Transfer',  desc: 'Post-CABG transfer to ICU for monitoring. Initial assessment stable.' },
            { time: '10:30', type: 'warning',  icon: 'fas fa-heartbeat',            title: 'HR Rising — 96 BPM',         badge: 'Warning',   desc: 'Heart rate beginning to rise. Cardiac monitoring increased. Doctor notified.' },
            { time: '12:00', type: 'warning',  icon: 'fas fa-thermometer-full',     title: 'Low-Grade Fever — 38.2°C',  badge: 'Warning',   desc: 'Fever detected. Paracetamol administered. Blood cultures taken as precaution.' },
            { time: '14:00', type: 'info',     icon: 'fas fa-user-md',              title: 'Dr. Omar Fawzi Reviewed',   badge: 'Doctor',    desc: 'Surgical team reviewed. Wound site clean. Management plan adjusted.' },
            { time: '16:00', type: 'info',     icon: 'fas fa-chart-line',           title: 'Vitals Improving',           badge: 'Stable',    desc: 'Temperature trending down. HR stabilizing. Patient responding well to treatment.' }
        ]
    },
    {
        id: 'SH-00107',
        name: 'Layla Ibrahim',
        initials: 'LI',
        age: 67, gender: 'Female', blood: 'B+',
        dept: 'Cardiology', room: '115',
        doctor: 'Dr. Khalid Omar',
        admission: '9 May 2026',
        diagnosis: 'Heart Failure — Stage III',
        status: 'critical',
        reportId: 'MR-2026-0509-003',
        ecgHR: '155 BPM', ecgRhythm: 'Irregular',
        summary: { hr: '155 BPM', bp: '170/105', temp: '38.5°C', spo2: '87%' },
        summaryFlags: { hr: 'critical', bp: 'critical', temp: 'critical', spo2: 'critical' },
        notes: 'Stage III heart failure with acute decompensation. Pulmonary edema on X-ray. IV furosemide and dobutamine started. ICU transfer completed. Prognosis guarded.',
        aiStatus: 'Critical', aiConf: '96%', aiConfWidth: '96%',
        riskPos: '94%', riskLabel: 'Critical', riskColor: '#E24B4A',
        vitals: {
            heartRate: [88, 92, 98, 105, 112, 120, 128, 140, 155],
            sysBP:     [145, 148, 152, 155, 158, 162, 165, 168, 170],
            diaBP:     [90, 92, 94, 96, 98, 100, 102, 104, 105],
            temp:      [37.0, 37.1, 37.2, 37.3, 37.5, 37.8, 38.0, 38.3, 38.5],
            spo2:      [96, 95, 94, 93, 92, 91, 90, 89, 87]
        },
        findings: [
            { level: 'critical', icon: 'fas fa-heartbeat',    title: 'Severe Tachycardia — 155 BPM', detail: 'Rapid escalation indicating acute decompensation. Immediate intervention required.' },
            { level: 'critical', icon: 'fas fa-tachometer-alt',title: 'Hypertensive Crisis',           detail: 'BP 170/105 mmHg. IV antihypertensives initiated urgently.' },
            { level: 'critical', icon: 'fas fa-lungs',         title: 'Critical Hypoxemia — 87%',     detail: 'Severe oxygen desaturation. High-flow O₂ and CPAP initiated.' },
            { level: 'critical', icon: 'fas fa-thermometer-full', title: 'Significant Fever — 38.5°C', detail: 'Fever in context of heart failure may indicate secondary infection or worsening.' }
        ],
        predictive: [
            { type: 'rising', icon: 'fas fa-heartbeat',        title: 'Heart Rate',       trend: 'Rapid rise 88 → 155 BPM over 8h',          trendIcon: 'fas fa-arrow-trend-up',    risk: '🔴 Critical',   rec: 'Urgent rate control. IV amiodarone considered.' },
            { type: 'rising', icon: 'fas fa-lungs',            title: 'SpO₂ Saturation',  trend: 'Critically declining 96 → 87%',             trendIcon: 'fas fa-arrow-trend-down',  risk: '🔴 Dangerous',  rec: 'Escalate to BiPAP/intubation if no improvement.' },
            { type: 'rising', icon: 'fas fa-tachometer-alt',   title: 'Blood Pressure',   trend: 'Continuously rising 145 → 170 mmHg',        trendIcon: 'fas fa-arrow-trend-up',    risk: '🔴 Crisis',     rec: 'IV nitroprusside. Continuous arterial line monitoring.' },
            { type: 'rising', icon: 'fas fa-thermometer-full', title: 'Body Temperature', trend: 'Gradual increase +1.5°C over 8h',            trendIcon: 'fas fa-arrow-trend-up',    risk: '⚠ Concerning',  rec: 'Antipyretics, blood cultures, broad-spectrum antibiotics.' }
        ],
        recommendations: [
            { type: 'urgent', icon: 'fas fa-bolt',       text: 'Immediate ICU intervention' },
            { type: 'urgent', icon: 'fas fa-procedures', text: 'Mechanical ventilation readiness' },
            { type: 'urgent', icon: 'fas fa-heartbeat',  text: 'Urgent cardiology consult' },
            { type: 'warn',   icon: 'fas fa-pills',      text: 'Adjust diuretic and vasopressor doses' },
            { type: 'normal', icon: 'fas fa-chart-line', text: 'Continuous hemodynamic monitoring' }
        ],
        timeline: [
            { time: '09:00', type: 'info',     icon: 'fas fa-door-open',           title: 'Patient Admitted — HF Stage III', badge: 'Admission', desc: 'Admitted with acute decompensated heart failure. Breathless at rest. O₂ sat 93%.' },
            { time: '10:00', type: 'warning',  icon: 'fas fa-tachometer-alt',       title: 'BP Rising — 155/98 mmHg',        badge: 'Warning',   desc: 'Blood pressure escalating. Antihypertensive therapy initiated.' },
            { time: '11:30', type: 'critical', icon: 'fas fa-lungs',                title: 'SpO₂ Dropped — 91%',             badge: 'Critical',  desc: 'Severe oxygen desaturation. Non-rebreather mask applied. Furosemide IV started.' },
            { time: '13:00', type: 'critical', icon: 'fas fa-heartbeat',            title: 'Tachycardia — 128 BPM',          badge: 'Critical',  desc: 'HR rapidly escalating. Dobutamine infusion started. ICU transfer initiated.' },
            { time: '14:30', type: 'critical', icon: 'fas fa-wave-square',          title: 'ECG Irregularity Detected',      badge: 'Urgent',    desc: 'Atrial flutter noted on monitor. Cardiology consult stat. Anticoagulation started.' },
            { time: '15:00', type: 'info',     icon: 'fas fa-user-md',              title: 'Dr. Khalid Omar Reviewed',       badge: 'Doctor',    desc: 'Senior cardiologist at bedside. Management escalated. Family notified.' },
            { time: '15:44', type: 'critical', icon: 'fas fa-bell',                 title: 'AI Alert — Critical Status',     badge: 'AI Alert',  desc: 'Safe Heart AI flagged critical multi-organ risk. Composite score: CRITICAL.' }
        ]
    }
];




/* ═══════════════════════════════════════════════════
   GLOBAL STATE
═══════════════════════════════════════════════════ */
const TIME_LABELS = ['02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','09:44'];
let ecgAnimId     = null;
let clinicalNotes = null;
let activePatient = null;

/* ═══════════════════════════════════════════════════
   CHART DEFAULTS
═══════════════════════════════════════════════════ */
const chartDefaults = {
    responsive: true, maintainAspectRatio: false,
    plugins: {
        legend: { display: false },
        tooltip: { backgroundColor: '#1e293b', titleColor: '#94a3b8', bodyColor: '#f1f5f9', padding: 10, cornerRadius: 8, titleFont: { family:'Plus Jakarta Sans',size:11 }, bodyFont: { family:'JetBrains Mono',size:12,weight:'500' } }
    },
    scales: {
        x: { grid: { color:'rgba(0,0,0,.04)', drawBorder:false }, ticks: { font:{ family:'Plus Jakarta Sans',size:10 }, color:'#94a3b8' } },
        y: { grid: { color:'rgba(0,0,0,.04)', drawBorder:false }, ticks: { font:{ family:'JetBrains Mono',size:10 }, color:'#94a3b8' } }
    }
};

function lineDS(data, color, fill=true) {
    return { data, borderColor:color, backgroundColor: fill ? color.replace(')',',.12)').replace('rgb','rgba') : 'transparent', borderWidth:2.5, tension:.45, fill, pointRadius:3, pointBackgroundColor:color, pointBorderColor:'#fff', pointBorderWidth:2, pointHoverRadius:5 };
}

function setBadge(id, level, text) {
    const el = document.getElementById(id);
    if (!el) return;
    el.className = `chart-badge ${level}`;
    el.textContent = text;
}

function destroyCharts() {
    ['hrChart','bpChart','tempChart','spo2Chart'].forEach(id => {
        const c = Chart.getChart(id);
        if (c) c.destroy();
    });
}

/* ═══════════════════════════════════════════════════
   PAGE INIT
═══════════════════════════════════════════════════ */
window.addEventListener('load', () => {
    setDateTime();
    initSidebar();
    initLock();
    initModals();
    initSearch();
    initPrint();
    initPdf();
    setTimeout(() => {
        document.getElementById('pageLoader').classList.add('hidden');
        // Page starts EMPTY — show empty state only
        showEmptyState();
    }, 900);
});

/* ═══════════════════════════════════════════════════
   DATE/TIME
═══════════════════════════════════════════════════ */
function setDateTime() {
    const now  = new Date();
    const date = now.toLocaleDateString('en-GB', { weekday:'short', year:'numeric', month:'long', day:'numeric' });
    const time = now.toLocaleTimeString('en-GB', { hour:'2-digit', minute:'2-digit' });
    const el = document.getElementById('reportDateTime');
    if (el) el.innerHTML = `<strong>${date}</strong><br><span style="color:#94a3b8">${time}</span>`;
    const piDate = document.getElementById('piDate');
    if (piDate) piDate.textContent = date;
}

/* ═══════════════════════════════════════════════════
   EMPTY / CONTENT STATE
═══════════════════════════════════════════════════ */
function showEmptyState() {
    const empty   = document.getElementById('emptyState');
    const content = document.getElementById('reportContent');
    const reportId = document.getElementById('reportId');
    if (empty)    empty.style.display   = 'flex';
    if (content)  content.style.display = 'none';
    if (reportId) reportId.textContent  = '—';
    activePatient = null;
    if (ecgAnimId) { cancelAnimationFrame(ecgAnimId); ecgAnimId = null; }
    destroyCharts();
}

function showReportContent() {
    const empty   = document.getElementById('emptyState');
    const content = document.getElementById('reportContent');
    if (empty)   empty.style.display   = 'none';
    if (content) content.style.display = 'block';
}

/* ═══════════════════════════════════════════════════
   LOAD PATIENT REPORT
═══════════════════════════════════════════════════ */
function loadPatientReport(patientId) {
    const p = PATIENTS_DB.find(x => x.id === patientId);
    if (!p) return;
    activePatient = p;

    // Loading bar
    const bar = document.createElement('div');
    bar.className = 'report-switching';
    document.body.appendChild(bar);
    setTimeout(() => bar.remove(), 700);

    // Stop previous ECG
    if (ecgAnimId) { cancelAnimationFrame(ecgAnimId); ecgAnimId = null; }
    destroyCharts();

    // Show content area
    showReportContent();

    // ── HEADER ──
    const rId = document.getElementById('reportId');
    if (rId) rId.textContent = 'Report #' + p.reportId;

    // ── PATIENT INFO ──
    setText('piAvatar',    p.initials);
    setText('piName',      p.name);
    setText('piPatientId', p.id);
    setText('piAge',       p.age + ' years');
    setText('piGender',    p.gender);
    setText('piBlood',     p.blood);
    setText('piAdmission', p.admission);
    setText('piDoctor',    p.doctor);
    setText('piDept',      p.dept + ' · Room ' + p.room);
    setText('piDiagnosis', p.diagnosis);
    // footer doctor
    setText('footerDoctor', p.doctor);

    // Status badge
    const badge = document.getElementById('piBadge');
    if (badge) {
        const colors = { critical:'#FCEBEB', warning:'#FAEEDA', stable:'#E3F5EF' };
        const tcolors = { critical:'#A32D2D', warning:'#854F0B', stable:'#1D9E75' };
        const labels  = { critical:'Critical — Under Monitoring', warning:'Warning — Under Monitoring', stable:'Stable — Under Monitoring' };
        badge.style.background = colors[p.status] || colors.stable;
        badge.style.color      = tcolors[p.status] || tcolors.stable;
        badge.innerHTML = `<span class="pulse-dot" style="background:${tcolors[p.status]}"></span> ${labels[p.status]}`;
    }

    // ── AI STATUS ──
    const levelMap  = { stable:'stable', warning:'warning', critical:'critical' };
    const aiLevel   = levelMap[p.status] || 'stable';
    const aiIconMap = { stable:'fas fa-check-circle', warning:'fas fa-exclamation-circle', critical:'fas fa-exclamation-circle' };
    const aiDescMap = { stable:'All parameters within acceptable range. Routine monitoring recommended.', warning:'Some parameters require attention. Physician review advised.', critical:'Multiple critical parameters detected. Immediate intervention required.' };
    const aiBgMap   = { stable:'rgba(29,158,117,.04)', warning:'rgba(186,117,23,.04)', critical:'rgba(226,75,74,.04)' };
    const aiBorderMap = { stable:'rgba(29,158,117,.3)', warning:'rgba(186,117,23,.3)', critical:'rgba(226,75,74,.3)' };
    const aiFillMap = { stable:'linear-gradient(90deg,#1D9E75,#16805f)', warning:'linear-gradient(90deg,#BA7517,#9a6010)', critical:'linear-gradient(90deg,#E24B4A,#c73f3e)' };

    const aiIcon = document.getElementById('aiStatusIcon');
    const aiVal  = document.getElementById('aiStatusVal');
    const aiDesc = document.getElementById('aiStatusDesc');
    const aiCard = document.getElementById('aiStatusCard');
    const fill   = document.getElementById('confidenceFill');
    const confV  = document.getElementById('confidenceVal');

    if (aiIcon) { aiIcon.innerHTML = `<i class="${aiIconMap[aiLevel]}"></i>`; aiIcon.className = `ai-status-icon ${aiLevel}`; }
    if (aiVal)  { aiVal.textContent = p.aiStatus; aiVal.className = `ai-status-val ${aiLevel}`; }
    if (aiDesc) aiDesc.textContent = aiDescMap[aiLevel];
    if (aiCard) { aiCard.style.borderColor = aiBorderMap[aiLevel]; aiCard.style.background = `linear-gradient(135deg,${aiBgMap[aiLevel]},transparent)`; }
    if (fill)   { fill.style.width = '0%'; setTimeout(() => { fill.style.width = p.aiConfWidth; fill.style.background = aiFillMap[aiLevel]; }, 300); }
    if (confV)  confV.textContent = p.aiConf;

    // AI Findings
    const findingsEl = document.getElementById('aiFindings');
    if (findingsEl) {
        findingsEl.innerHTML = '';
        p.findings.forEach((f, i) => {
            setTimeout(() => {
                const div = document.createElement('div');
                div.className = `ai-finding ${f.level}`;
                div.innerHTML = `<div class="af-icon"><i class="${f.icon}"></i></div><div class="af-body"><strong>${f.title}</strong><p>${f.detail}</p></div>`;
                findingsEl.appendChild(div);
            }, i * 120);
        });
    }

    // ── VITALS SUMMARY ──
    const vsCards = [
        { icon:'fas fa-heartbeat',        label:'Heart Rate',    val:p.summary.hr,   flag:p.summaryFlags.hr,   color:'red' },
        { icon:'fas fa-tachometer-alt',   label:'Blood Pressure',val:p.summary.bp,   flag:p.summaryFlags.bp,   color:'blue' },
        { icon:'fas fa-thermometer-full', label:'Temperature',   val:p.summary.temp, flag:p.summaryFlags.temp, color:'orange' },
        { icon:'fas fa-lungs',            label:'SpO₂',          val:p.summary.spo2, flag:p.summaryFlags.spo2, color:'teal' }
    ];
    const flagLabels = { critical:'Critical', warning:'Warning', normal:'Normal' };
    const vsEl = document.getElementById('vitalsSummary');
    if (vsEl) vsEl.innerHTML = vsCards.map(c => `
        <div class="vsm-card ${c.color}">
            <div class="vsm-ico"><i class="${c.icon}"></i></div>
            <div>
                <div class="vsm-val">${c.val}</div>
                <div class="vsm-lbl">${c.label}</div>
                <span class="vsm-flag ${c.flag}">${flagLabels[c.flag]}</span>
            </div>
        </div>`).join('');

    // ── CHARTS ──
    const V = p.vitals;
    const hrLast   = V.heartRate.at(-1);
    const tempLast = V.temp.at(-1);
    const spo2Last = V.spo2.at(-1);

    setBadge('hrBadge',   hrLast >= 140 ? 'critical' : hrLast >= 100 ? 'warning' : 'normal',    hrLast + ' BPM');
    setBadge('bpBadge',   V.sysBP.at(-1) >= 160 ? 'critical' : V.sysBP.at(-1) >= 140 ? 'warning' : 'normal', V.sysBP.at(-1)+'/'+V.diaBP.at(-1)+' mmHg');
    setBadge('tempBadge', tempLast >= 38.5 ? 'critical' : tempLast >= 37.5 ? 'warning' : 'normal', tempLast + '°C');
    setBadge('spo2Badge', spo2Last <= 90 ? 'critical' : spo2Last <= 94 ? 'warning' : 'normal',   spo2Last + '%');

    new Chart(document.getElementById('hrChart'), {
        type:'line', data:{ labels:TIME_LABELS, datasets:[lineDS(V.heartRate,'rgb(226,75,74)')] },
        options:{ ...chartDefaults, scales:{ ...chartDefaults.scales, y:{ ...chartDefaults.scales.y, min:Math.min(...V.heartRate)-10, max:Math.max(...V.heartRate)+15, ticks:{ ...chartDefaults.scales.y.ticks, callback:v=>v+' BPM' } } } }
    });
    new Chart(document.getElementById('bpChart'), {
        type:'line', data:{ labels:TIME_LABELS, datasets:[{ ...lineDS(V.sysBP,'rgb(55,138,221)',false), label:'Systolic' },{ ...lineDS(V.diaBP,'rgb(91,180,180)',false), label:'Diastolic', borderDash:[4,4] }] },
        options:{ ...chartDefaults, plugins:{ ...chartDefaults.plugins, legend:{ display:true, position:'bottom', labels:{ font:{ family:'Plus Jakarta Sans',size:11 }, color:'#94a3b8', boxWidth:16, padding:12 } } }, scales:{ ...chartDefaults.scales, y:{ ...chartDefaults.scales.y, min:Math.min(...V.diaBP)-8, max:Math.max(...V.sysBP)+12 } } }
    });
    new Chart(document.getElementById('tempChart'), {
        type:'bar', data:{ labels:TIME_LABELS, datasets:[{ data:V.temp, backgroundColor:V.temp.map(t=>t>=38.5?'rgba(226,75,74,.7)':t>=37.5?'rgba(186,117,23,.7)':'rgba(29,158,117,.7)'), borderRadius:5, borderSkipped:false }] },
        options:{ ...chartDefaults, scales:{ ...chartDefaults.scales, y:{ ...chartDefaults.scales.y, min:Math.min(...V.temp)-0.3, max:Math.max(...V.temp)+0.5, ticks:{ ...chartDefaults.scales.y.ticks, callback:v=>v+'°' } } } }
    });
    new Chart(document.getElementById('spo2Chart'), {
        type:'line', data:{ labels:TIME_LABELS, datasets:[lineDS(V.spo2,'rgb(91,180,180)')] },
        options:{ ...chartDefaults, scales:{ ...chartDefaults.scales, y:{ ...chartDefaults.scales.y, min:Math.min(...V.spo2)-3, max:101, ticks:{ ...chartDefaults.scales.y.ticks, callback:v=>v+'%' } } } }
    });

    // ── ECG ──
    const ecgHR = document.getElementById('ecgHR');
    const ecgRhythm = document.getElementById('ecgRhythm');
    if (ecgHR) ecgHR.textContent = p.ecgHR;
    if (ecgRhythm) ecgRhythm.textContent = p.ecgRhythm;
    buildECG();

    // ── PREDICTIVE ──
    const predGrid = document.getElementById('predictiveGrid');
    if (predGrid) {
        predGrid.innerHTML = '';
        p.predictive.forEach((a, i) => {
            const div = document.createElement('div');
            div.className = `predictive-card ${a.type}`;
            div.style.animationDelay = `${i * 80}ms`;
            div.innerHTML = `<div class="pc-header"><div class="pc-icon"><i class="${a.icon}"></i></div><div class="pc-title">${a.title}</div></div><div class="pc-trend"><i class="${a.trendIcon}"></i> ${a.trend}</div><span class="pc-risk">${a.risk}</span><p class="pc-rec">${a.rec}</p>`;
            predGrid.appendChild(div);
        });
    }

    // ── SUMMARY ──
    const notesEl = document.getElementById('doctorNotes');
    if (notesEl) notesEl.textContent = p.notes;

    // Risk gauge
    const riskGauge = document.getElementById('riskGauge');
    if (riskGauge) riskGauge.style.setProperty('--risk-pos', p.riskPos);
    const riskVal = document.getElementById('riskVal');
    if (riskVal) { riskVal.textContent = p.riskLabel; riskVal.style.color = p.riskColor; }

    // Recommendations
    const recEl = document.getElementById('recommendations');
    if (recEl) {
        recEl.innerHTML = '';
        p.recommendations.forEach(r => {
            const div = document.createElement('div');
            div.className = `rec-item ${r.type}`;
            div.innerHTML = `<i class="${r.icon} rec-ico"></i><span>${r.text}</span>`;
            recEl.appendChild(div);
        });
    }

    // ── TIMELINE ──
    const tl = document.getElementById('timeline');
    if (tl) {
        tl.innerHTML = '';
        p.timeline.forEach((e, i) => {
            const div = document.createElement('div');
            div.className = `timeline-item ${e.type}`;
            div.style.animationDelay = `${i * 80}ms`;
            div.innerHTML = `<div class="ti-header"><span class="ti-time">${e.time}</span><div class="ti-icon"><i class="${e.icon}"></i></div><span class="ti-title">${e.title}</span><span class="ti-badge">${e.badge}</span></div><p class="ti-desc">${e.desc}</p>`;
            tl.appendChild(div);
        });
    }

    // ── CLINICAL NOTES (reset on new patient) ──
    clinicalNotes = null;
    renderClinicalNotes();

    // Scroll to top
    document.getElementById('reportBody').scrollIntoView({ behavior:'smooth', block:'start' });
    showToast(`Report loaded: ${p.name}`, 'success');
}

/* ─── helper ─── */
function setText(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
}

/* ═══════════════════════════════════════════════════
   ECG CANVAS
═══════════════════════════════════════════════════ */
function buildECG() {
    const canvas = document.getElementById('ecgCanvas');
    if (!canvas) return;
    canvas.height = 120;
    const ctx = canvas.getContext('2d');
    const totalPts = 400;

    function genSeg(n) {
        const seg = [];
        for (let i = 0; i < n; i++) {
            const p = (i / n) * Math.PI * 2; let v = 0;
            if (p>.2&&p<.5) v+=Math.sin((p-.2)*10)*8;
            if (p>.8&&p<.85) v-=10;
            if (p>.85&&p<.95) v+=45;
            if (p>.95&&p<1.05) v-=12;
            if (p>1.0&&p<1.2) v+=8;
            if (p>1.2&&p<1.8) v+=Math.sin((p-1.2)*5)*14;
            v+=(Math.random()-.5)*2;
            seg.push(v);
        }
        return seg;
    }

    let offset = 0;
    const ecgData = genSeg(totalPts);

    function draw() {
        const W = canvas.parentElement.offsetWidth, H = 120;
        canvas.width = W; canvas.height = H;
        ctx.fillStyle = '#0a1628'; ctx.fillRect(0,0,W,H);
        ctx.strokeStyle = 'rgba(91,180,180,.08)'; ctx.lineWidth = .5;
        for (let x=0;x<W;x+=20){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
        for (let y=0;y<H;y+=20){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
        ctx.strokeStyle='#E24B4A'; ctx.lineWidth=1.8;
        ctx.shadowColor='rgba(226,75,74,.4)'; ctx.shadowBlur=4;
        ctx.beginPath();
        const mid=H/2, step=W/totalPts;
        for (let i=0;i<totalPts;i++){
            const x=i*step, y=mid-ecgData[(i+offset)%totalPts];
            i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
        }
        ctx.stroke(); ctx.shadowBlur=0;
        offset=(offset+2)%totalPts;
        ecgAnimId=requestAnimationFrame(draw);
    }
    draw();
}

/* ═══════════════════════════════════════════════════
   SEARCH
═══════════════════════════════════════════════════ */
function initSearch() {
    const input    = document.getElementById('patientSearchInput');
    const dropdown = document.getElementById('pszDropdown');
    const clearBtn = document.getElementById('pszClear');
    const searchBtn = document.getElementById('pszSearchBtn');
    if (!input) return;

    function search() {
        const q = input.value.trim().toLowerCase();
        clearBtn.classList.toggle('visible', q.length > 0);
        if (!q) { dropdown.classList.remove('visible'); dropdown.innerHTML=''; return; }

        const results = PATIENTS_DB.filter(p =>
            p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q)
        );

        if (!results.length) {
            dropdown.innerHTML = `<div class="psz-no-result"><i class="fas fa-search"></i>No patient found for "<strong>${q}</strong>"</div>`;
            dropdown.classList.add('visible');
            return;
        }

        dropdown.innerHTML = results.map(p => `
            <div class="psz-result-item" onclick="selectPatient('${p.id}')">
                <div class="psr-avatar">${p.initials}</div>
                <div class="psr-info">
                    <div class="psr-name">${p.name}</div>
                    <div class="psr-meta">${p.id} · ${p.dept} · Room ${p.room}</div>
                </div>
                <span class="psr-badge ${p.status}">${p.status.charAt(0).toUpperCase()+p.status.slice(1)}</span>
            </div>`).join('');
        dropdown.classList.add('visible');
    }

    input.addEventListener('input', search);
    searchBtn.addEventListener('click', search);
    input.addEventListener('keydown', e => { if (e.key==='Enter') search(); });
    clearBtn.addEventListener('click', () => {
        input.value='';
        clearBtn.classList.remove('visible');
        dropdown.classList.remove('visible');
        dropdown.innerHTML='';
        showEmptyState();
    });

    document.addEventListener('click', e => {
        if (!e.target.closest('#patientSearchZone') && !e.target.closest('.patient-search-zone')) {
            dropdown.classList.remove('visible');
        }
    });
}

function selectPatient(id) {
    const p = PATIENTS_DB.find(x => x.id === id);
    if (!p) return;
    const input    = document.getElementById('patientSearchInput');
    const dropdown = document.getElementById('pszDropdown');
    if (input)    input.value = `${p.name}  (${p.id})`;
    if (dropdown) dropdown.classList.remove('visible');
    loadPatientReport(id);
}

/* ═══════════════════════════════════════════════════
   CLINICAL NOTES
═══════════════════════════════════════════════════ */
function initModals() {
    // Notes
    const notesBtn    = document.getElementById('notesBtn');
    const closeNotes  = document.getElementById('closeNotesBtn');
    const cancelNotes = document.getElementById('cancelNotesBtn');
    const saveNotes   = document.getElementById('saveNotesBtn');
    if (notesBtn)    notesBtn.addEventListener('click',    openNotesModal);
    if (closeNotes)  closeNotes.addEventListener('click',  closeNotesModal);
    if (cancelNotes) cancelNotes.addEventListener('click', closeNotesModal);
    if (saveNotes)   saveNotes.addEventListener('click',   doSaveNotes);

    // Logout
    const logoutBtn    = document.getElementById('logoutBtn');
    const cancelLogout = document.getElementById('cancelLogoutBtn');
    const doLogout     = document.getElementById('doLogoutBtn');
    if (logoutBtn)    logoutBtn.addEventListener('click',    () => openModal('logoutModal'));
    if (cancelLogout) cancelLogout.addEventListener('click', () => closeModal('logoutModal'));
    if (doLogout)     doLogout.addEventListener('click', () => { closeModal('logoutModal'); showToast('Logged out', 'info'); });

    // Backdrop close
    document.querySelectorAll('.modal-overlay').forEach(bg => {
        bg.addEventListener('click', e => { if (e.target===bg) bg.classList.remove('open'); });
    });
    document.addEventListener('keydown', e => {
        if (e.key==='Escape') document.querySelectorAll('.modal-overlay.open').forEach(m=>m.classList.remove('open'));
    });
}

function openModal(id)  { const m=document.getElementById(id); if(m) m.classList.add('open'); }
function closeModal(id) { const m=document.getElementById(id); if(m) m.classList.remove('open'); }

function openNotesModal() {
    if (clinicalNotes) {
        const dn = document.getElementById('noteDoctorName');
        const nh = document.getElementById('noteHospital');
        const nt = document.getElementById('noteText');
        if (dn) dn.value = clinicalNotes.doctor;
        if (nh) nh.value = clinicalNotes.hospital;
        if (nt) nt.value = clinicalNotes.text;
    }
    openModal('notesModal');
}
function closeNotesModal() { closeModal('notesModal'); }

function doSaveNotes() {
    const doctor   = (document.getElementById('noteDoctorName')?.value || '').trim();
    const hospital = (document.getElementById('noteHospital')?.value   || '').trim();
    const text     = (document.getElementById('noteText')?.value       || '').trim();
    clinicalNotes  = (doctor||hospital||text) ? { doctor:doctor||'—', hospital:hospital||'—', text } : null;
    closeNotesModal();
    renderClinicalNotes();
    showToast('Clinical notes saved', 'success');
}

function renderClinicalNotes() {
    const sec = document.getElementById('clinicalNotesSection');
    if (!sec) return;
    if (!clinicalNotes) { sec.innerHTML=''; return; }
    sec.innerHTML = `
    <section class="section slide-up" style="border-left:4px solid var(--primary)">
        <div class="section-title">
            <i class="fas fa-notes-medical"></i>
            <h3>Clinical Notes <span style="font-size:11px;font-weight:500;color:var(--text-light)">(Optional)</span></h3>
            <button onclick="openNotesModal()" style="margin-left:auto;background:none;border:1.5px solid var(--border);padding:5px 14px;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer;color:var(--text-mid);font-family:inherit">Edit</button>
        </div>
        <div style="border-left:4px solid var(--primary);padding-left:16px">
            <div style="font-size:12px;color:var(--text-light);margin-bottom:8px">
                <strong style="color:var(--text-mid)">Dr. ${clinicalNotes.doctor}</strong> &nbsp;·&nbsp; ${clinicalNotes.hospital}
            </div>
            <p style="font-size:13px;color:var(--text-mid);line-height:1.7;white-space:pre-wrap">${clinicalNotes.text||'<em>No text entered.</em>'}</p>
        </div>
    </section>`;
}

/* ═══════════════════════════════════════════════════
   SIDEBAR
═══════════════════════════════════════════════════ */
function initSidebar() {
    const sidebar  = document.getElementById('sidebar');
    const overlay  = document.getElementById('overlay');
    const menuBtn  = document.getElementById('menuBtn');
    if (menuBtn)  menuBtn.addEventListener('click',  () => { sidebar.classList.add('active');    overlay.classList.add('active'); });
    if (overlay)  overlay.addEventListener('click',  () => { sidebar.classList.remove('active'); overlay.classList.remove('active'); });
    document.querySelectorAll('.sb-link').forEach(l => l.addEventListener('click', () => { if(window.innerWidth<=992){ sidebar.classList.remove('active'); overlay.classList.remove('active'); } }));
}

/* ═══════════════════════════════════════════════════
   LOCK SCREEN
═══════════════════════════════════════════════════ */
function initLock() {
    const lockBtn    = document.getElementById('lockBtn');
    const lockScreen = document.getElementById('lockScreen');
    const lockPin    = document.getElementById('lockPin');
    const unlockBtn  = document.getElementById('unlockBtn');
    if (!lockBtn) return;
    lockBtn.addEventListener('click', () => {
        lockScreen.classList.add('active');
        document.body.style.overflow='hidden';
        document.getElementById('sidebar').classList.remove('active');
        document.getElementById('overlay').classList.remove('active');
    });
    function tryUnlock() {
        if (lockPin.value.length > 0) {
            lockScreen.classList.remove('active');
            document.body.style.overflow='';
            lockPin.value='';
            showToast('Unlocked successfully','success');
        } else {
            lockPin.style.borderColor='#ef4444';
            setTimeout(()=>{ lockPin.style.borderColor=''; },700);
        }
    }
    if (unlockBtn) unlockBtn.addEventListener('click', tryUnlock);
    if (lockPin)   lockPin.addEventListener('keydown', e=>{ if(e.key==='Enter') tryUnlock(); });
}

/* ═══════════════════════════════════════════════════
   PRINT
═══════════════════════════════════════════════════ */
function initPrint() {
    const btn = document.getElementById('printBtn');
    if (btn) btn.addEventListener('click', () => {
        if (!activePatient) { showToast('Please select a patient first','warning'); return; }
        window.print();
    });
}

/* ═══════════════════════════════════════════════════
   PDF EXPORT
═══════════════════════════════════════════════════ */
function initPdf() {
    const btn = document.getElementById('pdfBtn');
    if (!btn) return;
    btn.addEventListener('click', function() {
        if (!activePatient) { showToast('Please select a patient first','warning'); return; }
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating…';
        btn.disabled  = true;
        if (ecgAnimId) { cancelAnimationFrame(ecgAnimId); ecgAnimId = null; }
        document.querySelectorAll('.no-print').forEach(el => el.style.display='none');
        const opt = {
            margin:[8,8,8,8],
            filename:`SafeHeart-Report-${activePatient.id}.pdf`,
            image:{ type:'jpeg', quality:.95 },
            html2canvas:{ scale:2, useCORS:true, logging:false, scrollY:0 },
            jsPDF:{ unit:'mm', format:'a4', orientation:'portrait' },
            pagebreak:{ mode:['avoid-all','css','legacy'] }
        };
        html2pdf().set(opt).from(document.getElementById('reportBody')).save().then(()=>{
            document.querySelectorAll('.no-print').forEach(el=>el.style.display='');
            btn.innerHTML='<i class="fas fa-file-pdf"></i> Export PDF';
            btn.disabled=false;
            buildECG();
        }).catch(()=>{
            document.querySelectorAll('.no-print').forEach(el=>el.style.display='');
            btn.innerHTML='<i class="fas fa-file-pdf"></i> Export PDF';
            btn.disabled=false;
        });
    });
}

/* ═══════════════════════════════════════════════════
   TOAST
═══════════════════════════════════════════════════ */
let toastTimer = null;
function showToast(msg, type='success') {
    const icons = { success:'fas fa-check-circle', warning:'fas fa-exclamation-circle', error:'fas fa-times-circle', info:'fas fa-info-circle' };
    const toast    = document.getElementById('toast');
    const toastIcon = document.getElementById('toastIcon');
    const toastMsg  = document.getElementById('toastMsg');
    if (!toast) return;
    if (toastIcon) toastIcon.className = icons[type]||icons.success;
    if (toastMsg)  toastMsg.textContent = msg;
    toast.className = 'toast show';
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(()=>toast.classList.remove('show'), 3200);
}


const empty = document.getElementById("pszEmpty");


function closeDropdown() {
    dropdown.classList.remove("visible");
}

function initSearch() {
    const input    = document.getElementById('patientSearchInput');
    const dropdown = document.getElementById('pszDropdown');
    const clearBtn = document.getElementById('pszClear');
    const searchBtn = document.getElementById('pszSearchBtn');
    const empty = document.getElementById("pszEmpty");

    if (!input) return;

    function search() {
        const q = input.value.trim().toLowerCase();

        clearBtn.classList.toggle('visible', q.length > 0);

        // 🔥 لو فاضي
        if (!q) {
            dropdown.classList.remove('visible');
            dropdown.innerHTML = '';
            empty.style.display = "flex";
            return;
        }

        const results = PATIENTS_DB.filter(p =>
            p.name.toLowerCase().includes(q) ||
            p.id.toLowerCase().includes(q)
        );

        // 🔥 لو مفيش نتائج
        if (results.length === 0) {
            dropdown.classList.remove('visible');
            dropdown.innerHTML = '';
            empty.style.display = "flex";
            return;
        }

        // 🔥 فيه نتائج
        empty.style.display = "none";

        dropdown.innerHTML = results.map(p => `
            <div class="psz-result-item" onclick="selectPatient('${p.id}')">
                <div class="psr-avatar">${p.initials}</div>
                <div class="psr-info">
                    <div class="psr-name">${p.name}</div>
                    <div class="psr-meta">${p.id}</div>
                </div>
            </div>
        `).join('');

        dropdown.classList.add("visible");
    }

    input.addEventListener('input', search);
    searchBtn.addEventListener('click', search);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') search(); });

    clearBtn.addEventListener('click', () => {
        input.value = '';
        dropdown.classList.remove('visible');
        dropdown.innerHTML = '';
        empty.style.display = "flex";
        showEmptyState();
    });
}

function selectPatient(id) {
    const p = PATIENTS_DB.find(x => x.id === id);
    if (!p) return;

    const input = document.getElementById('patientSearchInput');
    const dropdown = document.getElementById('pszDropdown');
    const empty = document.getElementById("pszEmpty");

    if (input) input.value = `${p.name} (${p.id})`;

    if (dropdown) {
        dropdown.classList.remove("visible");
        dropdown.innerHTML = '';
    }

    if (empty) empty.style.display = "none";

    loadPatientReport(id);
}



