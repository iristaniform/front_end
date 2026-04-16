// dashboard.js - Hospital Management System Dashboard

const API_BASE = 'http://localhost:8000'; // Adjust if backend runs on different port

// Tab Management
function showTab(tabName) {
    // Hide all tabs
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Remove active class from nav links
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    navLinks.forEach(link => link.classList.remove('active'));

    // Show selected tab
    document.getElementById(tabName).classList.add('active');

    // Add active class to clicked nav link
    event.target.classList.add('active');

    // Load data for the tab
    switch(tabName) {
        case 'dashboard':
            loadDashboardData();
            break;
        case 'patients':
            loadPatients();
            break;
        case 'doctors':
            loadDoctors();
            break;
        case 'appointments':
            loadAppointments();
            break;
    }
}

// Dashboard Data Loading
async function loadDashboardData() {
    try {
        const [patientsRes, doctorsRes, appointmentsRes] = await Promise.all([
            fetch(`${API_BASE}/patients/list`),
            fetch(`${API_BASE}/doctors/list`),
            fetch(`${API_BASE}/appointments/list`)
        ]);

        const patients = await patientsRes.json();
        const doctors = await doctorsRes.json();
        const appointments = await appointmentsRes.json();

        // Update stats
        document.getElementById('total-patients').textContent = patients.length;
        document.getElementById('total-doctors').textContent = doctors.length;
        document.getElementById('total-appointments').textContent = appointments.length;

        // Show recent appointments (last 5)
        const recentAppointments = appointments.slice(-5).reverse();
        const activityList = document.getElementById('recent-appointments');

        if (recentAppointments.length === 0) {
            activityList.innerHTML = '<p>No appointments scheduled yet.</p>';
        } else {
            activityList.innerHTML = recentAppointments.map(apt => `
                <div class="activity-item">
                    <h4>${apt.patient_name} → ${apt.doctor_name}</h4>
                    <p>${new Date(apt.appointment_date).toLocaleDateString()} - ${apt.reason_for_visit}</p>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading dashboard data:', error);
        document.getElementById('recent-appointments').innerHTML = '<p>Error loading data. Please check if the backend is running.</p>';
    }
}

// Patients Data Loading
async function loadPatients() {
    try {
        const response = await fetch(`${API_BASE}/patients/list`);
        const patients = await response.json();

        const tbody = document.getElementById('patients-tbody');
        tbody.innerHTML = patients.map(patient => `
            <tr>
                <td>${patient.patient_id}</td>
                <td>${patient.first_name} ${patient.last_name}</td>
                <td>${new Date(patient.date_of_birth).toLocaleDateString()}</td>
                <td>${patient.gender}</td>
                <td>${patient.phone_number || '-'}</td>
                <td>${patient.email || '-'}</td>
                <td class="actions">
                    <button class="btn btn-secondary" onclick="editPatient(${patient.patient_id})">Edit</button>
                    <button class="btn btn-danger" onclick="deletePatient(${patient.patient_id})">Delete</button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error loading patients:', error);
        document.getElementById('patients-tbody').innerHTML = '<tr><td colspan="7">Error loading patients. Please check if the backend is running.</td></tr>';
    }
}

// Doctors Data Loading
async function loadDoctors() {
    try {
        const response = await fetch(`${API_BASE}/doctors/list`);
        const doctors = await response.json();

        const tbody = document.getElementById('doctors-tbody');
        tbody.innerHTML = doctors.map(doctor => `
            <tr>
                <td>${doctor.doctor_id}</td>
                <td>${doctor.first_name} ${doctor.last_name}</td>
                <td>${doctor.specialization}</td>
                <td>${doctor.phone_number || '-'}</td>
                <td>${doctor.email || '-'}</td>
                <td class="actions">
                    <button class="btn btn-secondary" onclick="editDoctor(${doctor.doctor_id})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteDoctor(${doctor.doctor_id})">Delete</button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error loading doctors:', error);
        document.getElementById('doctors-tbody').innerHTML = '<tr><td colspan="6">Error loading doctors. Please check if the backend is running.</td></tr>';
    }
}

// Appointments Data Loading
async function loadAppointments() {
    try {
        const response = await fetch(`${API_BASE}/appointments/list`);
        const appointments = await response.json();

        const tbody = document.getElementById('appointments-tbody');
        tbody.innerHTML = appointments.map(appointment => `
            <tr>
                <td>${appointment.appointment_id}</td>
                <td>${appointment.patient_name}</td>
                <td>${appointment.doctor_name}</td>
                <td>${new Date(appointment.appointment_date).toLocaleDateString()}</td>
                <td>${appointment.reason_for_visit}</td>
                <td class="actions">
                    <button class="btn btn-secondary" onclick="editAppointment(${appointment.appointment_id})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteAppointment(${appointment.appointment_id})">Delete</button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error loading appointments:', error);
        document.getElementById('appointments-tbody').innerHTML = '<tr><td colspan="6">Error loading appointments. Please check if the backend is running.</td></tr>';
    }
}

// Placeholder functions for CRUD operations
function editPatient(id) {
    alert(`Edit patient ${id} - Feature not implemented yet`);
}

function deletePatient(id) {
    if (confirm('Are you sure you want to delete this patient?')) {
        alert(`Delete patient ${id} - Feature not implemented yet`);
    }
}

function editDoctor(id) {
    alert(`Edit doctor ${id} - Feature not implemented yet`);
}

function deleteDoctor(id) {
    if (confirm('Are you sure you want to delete this doctor?')) {
        alert(`Delete doctor ${id} - Feature not implemented yet`);
    }
}

function editAppointment(id) {
    alert(`Edit appointment ${id} - Feature not implemented yet`);
}

function deleteAppointment(id) {
    if (confirm('Are you sure you want to delete this appointment?')) {
        alert(`Delete appointment ${id} - Feature not implemented yet`);
    }
}

// Initialize dashboard on page load
document.addEventListener('DOMContentLoaded', function() {
    loadDashboardData();
});