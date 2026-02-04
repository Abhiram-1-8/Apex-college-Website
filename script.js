// --- Dummy Data ---
const students = [
    {
        id: '2024CS001',
        name: 'Abhishek Kumar',
        branch: 'Computer Science',
        semester: '4th',
        credits: 84,
        gpa: [8.5, 8.2, 8.8],
        fees: { total: 120000, paid: 75000, scholarship: 25 },
        personal: {
            email: 'abhishek.k@apex.edu',
            phone: '+91 98765 43210',
            dob: '15 Aug 2003',
            fatherName: 'Rajesh Kumar',
            motherName: 'Sunita Devi',
            caste: 'General',
            religion: 'Hindu',
            bloodGroup: 'O+'
        }
    },
    {
        id: '2024CS002',
        name: 'Priya Sharma',
        branch: 'Computer Science',
        semester: '4th',
        credits: 82,
        gpa: [8.0, 8.5, 8.4],
        fees: { total: 120000, paid: 120000, scholarship: 20 },
        personal: {
            email: 'priya.s@apex.edu',
            phone: '+91 98765 43211',
            dob: '22 May 2004',
            fatherName: 'Sanjay Sharma',
            motherName: 'Meena Sharma',
            caste: 'General',
            religion: 'Hindu',
            bloodGroup: 'A+'
        }
    },
    {
        id: '2024CS003',
        name: 'Rahul Verma',
        branch: 'Computer Science',
        semester: '4th',
        credits: 80,
        gpa: [7.8, 8.0, 8.2],
        fees: { total: 120000, paid: 50000, scholarship: 10 },
        personal: {
            email: 'rahul.v@apex.edu',
            phone: '+91 98765 43212',
            dob: '10 Dec 2003',
            fatherName: 'Amit Verma',
            motherName: 'Kiran Verma',
            caste: 'OBC',
            religion: 'Hindu',
            bloodGroup: 'B+'
        }
    },
];

const facultySubjects = [
    { code: 'CS401', name: 'Artificial Intelligence', branch: 'B.Tech CS', semester: '4th', students: ['2024CS001', '2024CS002', '2024CS003'] },
    { code: 'CS403', name: 'Neural Networks', branch: 'M.Tech', semester: '2nd', students: ['2024CS001', '2024CS002'] }
];

const studentMarks = {
    '2024CS001': {
        'CS401': { ut1: 18, ut2: 17, ut3: 19, mt1: 42, mt2: 45 },
        'CS403': { ut1: 15, ut2: 16, ut3: 14, mt1: 38, mt2: 40 }
    },
    '2024CS002': {
        'CS401': { ut1: 16, ut2: 18, ut3: 17, mt1: 40, mt2: 42 },
        'CS403': { ut1: 14, ut2: 15, ut3: 16, mt1: 35, mt2: 38 }
    },
    '2024CS003': {
        'CS401': { ut1: 14, ut2: 15, ut3: 13, mt1: 35, mt2: 32 }
    }
};

let currentFacultySubject = null;

// Helper to generate 20 days of history
function generateHistory(attendancePct) {
    const history = [];
    const today = new Date();
    for (let i = 19; i >= 0; i--) {
        const date = new Date();
        date.setDate(today.getDate() - i);
        history.push({
            date: date.toISOString().split('T')[0],
            status: Math.random() < (attendancePct / 100) ? 'Present' : 'Absent'
        });
    }
    return history;
}

const studentSubjects = [
    { code: 'CS401', name: 'Artificial Intelligence', faculty: 'Dr. Robert Wilson', icon: 'fa-brain', history: generateHistory(85) },
    { code: 'CS402', name: 'Data Structures', faculty: 'Prof. James Gossling', icon: 'fa-sitemap', history: generateHistory(92) },
    { code: 'CS403', name: 'Operating Systems', faculty: 'Dr. Sarah Smith', icon: 'fa-microchip', history: generateHistory(78) },
    { code: 'CS404', name: 'DBMS', faculty: 'Dr. Anita Desai', icon: 'fa-database', history: generateHistory(88) },
    { code: 'CS405', name: 'Computer Networks', faculty: 'Prof. Alan Turing', icon: 'fa-network-wired', history: generateHistory(82) },
    { code: 'CS406', name: 'Mathematics', faculty: 'Dr. Ramanujan', icon: 'fa-calculator', history: generateHistory(95) },
];

// --- Login Simulation Logic ---

function toggleLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.style.display = modal.style.display === 'none' ? 'flex' : 'none';
    }
}

function switchLoginTab(type) {
    const studentTab = document.querySelector('.tab:nth-child(1)');
    const facultyTab = document.querySelector('.tab:nth-child(2)');
    const studentForm = document.getElementById('studentLoginForm');
    const facultyForm = document.getElementById('facultyLoginForm');
    const loginImage = document.querySelector('.login-image-side');

    if (type === 'student') {
        studentTab.classList.add('active');
        facultyTab.classList.remove('active');
        studentForm.style.display = 'block';
        facultyForm.style.display = 'none';
        if (loginImage) loginImage.style.backgroundImage = "url('images/student-login.jpg')";
    } else {
        facultyTab.classList.add('active');
        studentTab.classList.remove('active');
        facultyForm.style.display = 'block';
        studentForm.style.display = 'none';
        if (loginImage) loginImage.style.backgroundImage = "url('images/faculty-login.jpg')";
    }
}

function handleLogin(event, type) {
    event.preventDefault();

    // Simulation: Any data works
    const id = type === 'student' ? document.getElementById('studentId').value : document.getElementById('facultyId').value;

    // Save minimal session info
    localStorage.setItem('userType', type);
    localStorage.setItem('userId', id);

    // Redirect based on type
    if (type === 'student') {
        window.location.href = 'student.html';
    } else {
        window.location.href = 'faculty.html';
    }
}

// --- Student Dashboard Logic ---

function showDashboardSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.dash-section');
    sections.forEach(s => s.style.display = 'none');

    // Show selected section
    const target = document.getElementById(sectionId + '-section');
    if (target) target.style.display = 'block';

    // Update title
    const title = document.getElementById('section-title');
    if (title) title.innerText = sectionId.charAt(0).toUpperCase() + sectionId.slice(1) + ' Section';

    // Update sidebar active state
    const links = document.querySelectorAll('.nav-menu a');
    links.forEach(l => l.classList.remove('active'));
    event?.currentTarget?.classList.add('active');
}

function renderStudentDashboard() {
    const userId = localStorage.getItem('userId') || '2024CS001';
    const student = students.find(s => s.id === userId) || students[0];

    // Update Overview and Header
    if (document.getElementById('student-name-display')) {
        document.getElementById('student-name-display').innerText = student.name;
        document.getElementById('roll-number').innerText = student.id;
        document.getElementById('branch-name').innerText = student.branch;
        document.getElementById('current-semester').innerText = student.semester + ' Semester';
        document.getElementById('completed-credits').innerText = `${student.credits} / 160`;
    }

    // Render Academics Cards
    const academicsGrid = document.getElementById('academics-grid');
    if (academicsGrid) {
        academicsGrid.innerHTML = studentSubjects.map(sub => {
            const presentCount = sub.history.filter(h => h.status === 'Present').length;
            const pct = Math.round((presentCount / sub.history.length) * 100);
            return `
            <div class="subject-card" onclick="showSubjectDetails('${sub.code}')">
                <div class="subject-card-header">
                    <div class="subject-icon-bg">
                        <i class="fas ${sub.icon}"></i>
                    </div>
                    <div>
                        <h4 style="margin:0">${sub.name}</h4>
                        <small style="color:var(--text-muted)">${sub.code}</small>
                    </div>
                </div>
                <div style="margin-top: 1.5rem">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem">
                        <span style="font-size: 0.85rem">Attendance</span>
                        <span style="font-weight: 700; color: ${pct < 75 ? '#e11d48' : '#16a34a'}">${pct}%</span>
                    </div>
                    <div style="height: 6px; background: #e2e8f0; border-radius: 3px; overflow: hidden">
                        <div style="width: ${pct}%; height: 100%; background: ${pct < 75 ? '#e11d48' : 'var(--primary-color)'}"></div>
                    </div>
                    <p style="margin-top: 1rem; font-size: 0.85rem; color: var(--text-muted)">
                        <i class="fas fa-user-tie"></i> ${sub.faculty}
                    </p>
                </div>
            </div>
            `;
        }).join('');
    }

    renderFeeSection(student);
}

function showSubjectDetails(subjectCode) {
    const sub = studentSubjects.find(s => s.code === subjectCode);
    if (!sub) return;

    const presentCount = sub.history.filter(h => h.status === 'Present').length;
    const pct = Math.round((presentCount / sub.history.length) * 100);

    document.getElementById('academics-main-view').style.display = 'none';
    document.getElementById('attendance-detail-view').style.display = 'block';

    document.getElementById('detail-subject-name').innerText = sub.name;
    document.getElementById('detail-subject-code').innerText = sub.code;
    document.getElementById('detail-faculty-name').innerText = sub.faculty;
    document.getElementById('detail-attendance-pct').innerText = pct + '%';
    document.getElementById('detail-attendance-pct').style.color = pct < 75 ? '#e11d48' : '#16a34a';

    const historyGrid = document.getElementById('attendance-history-grid');
    historyGrid.innerHTML = sub.history.map(h => `
        <div class="history-item ${h.status.toLowerCase()}">
            <small style="display:block; font-size: 0.7rem; margin-bottom: 5px">${h.date.split('-').slice(1).reverse().join('/')}</small>
            <i class="fas ${h.status === 'Present' ? 'fa-check' : 'fa-times'}"></i>
            <span style="font-weight: 600; font-size: 0.85rem">${h.status}</span>
        </div>
    `).join('');
}

function hideSubjectDetails() {
    document.getElementById('academics-main-view').style.display = 'block';
    document.getElementById('attendance-detail-view').style.display = 'none';
}

function renderFeeSection(student) {
    const feeSection = document.getElementById('fees-section');
    if (!feeSection) return;

    const pending = student.fees.total - student.fees.paid;

    document.getElementById('total-fee').innerText = `₹ ${student.fees.total.toLocaleString()}`;
    document.getElementById('paid-fee').innerText = `₹ ${student.fees.paid.toLocaleString()}`;
    document.getElementById('pending-fee').innerText = `₹ ${pending.toLocaleString()}`;
    document.getElementById('scholarship-pct').innerText = `${student.fees.scholarship}% Waiver`;

    const payBtn = document.getElementById('pay-online-btn');
    const statusBadge = document.getElementById('fee-status-badge');

    if (pending <= 0) {
        payBtn.style.display = 'none';
        statusBadge.style.display = 'inline-block';
        statusBadge.innerHTML = '<i class="fas fa-check-circle"></i> No Dues';
    } else {
        payBtn.style.display = 'inline-block';
        statusBadge.style.display = 'none';
        document.getElementById('modal-pay-amount').innerText = `₹ ${pending.toLocaleString()}`;
    }
}

// Payment Functions
function openPaymentModal() {
    document.getElementById('paymentModal').style.display = 'flex';
}

function closePaymentModal() {
    document.getElementById('paymentModal').style.display = 'none';
    resetPaymentUI();
}

function selectPaymentMethod(method) {
    document.getElementById('method-selection').style.display = 'none';
    document.getElementById('pin-entry-section').style.display = 'block';
    document.getElementById('selected-method-name').innerText = method;
}

function resetPaymentUI() {
    document.getElementById('method-selection').style.display = 'grid';
    document.getElementById('pin-entry-section').style.display = 'none';
    document.getElementById('payment-pin').value = '';
    document.getElementById('pay-confirm-btn').innerHTML = 'Confirm Payment';
    document.getElementById('pay-confirm-btn').disabled = false;
}

function processPayment(event) {
    event.preventDefault();
    const pin = document.getElementById('payment-pin').value;
    const btn = document.getElementById('pay-confirm-btn');

    if (!pin) {
        alert('Please enter your PIN');
        return;
    }

    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    btn.disabled = true;

    // Simulate Network Delay
    setTimeout(() => {
        // Success Logic
        const userId = localStorage.getItem('userId') || '2024CS001';
        const student = students.find(s => s.id === userId);

        student.fees.paid = student.fees.total; // Mark as fully paid

        alert('Payment Successful ✅');
        closePaymentModal();
        renderStudentDashboard();
    }, 2000);
}

function sendMentorMessage(event) {
    event.preventDefault();
    const input = document.getElementById('chatInput');
    const container = document.getElementById('chat-messages');

    if (input.value.trim() !== '') {
        const msg = document.createElement('div');
        msg.className = 'message sent';
        msg.innerText = input.value;
        container.appendChild(msg);

        // Simulation reply
        setTimeout(() => {
            const reply = document.createElement('div');
            reply.className = 'message received';
            reply.innerText = "Thanks for the message! I'll look into this and get back to you shortly.";
            container.appendChild(reply);
            container.scrollTop = container.scrollHeight;
        }, 1000);

        input.value = '';
        container.scrollTop = container.scrollHeight;
    }
}

// --- Faculty Dashboard Logic ---

function showFacultySection(sectionId) {
    const sections = document.querySelectorAll('.dash-section');
    sections.forEach(s => s.style.display = 'none');

    const target = document.getElementById(sectionId + '-section');
    if (target) target.style.display = 'block';

    const title = document.getElementById('faculty-section-title');
    if (title) title.innerText = sectionId === 'marks' ? 'Grading' : sectionId.charAt(0).toUpperCase() + sectionId.slice(1);

    const links = document.querySelectorAll('.nav-menu a');
    links.forEach(l => l.classList.remove('active'));
    event?.currentTarget?.classList.add('active');
}

function renderFacultyDashboard() {
    const subjectsGrid = document.querySelector('.course-grid');
    if (subjectsGrid) {
        subjectsGrid.innerHTML = facultySubjects.map(sub => `
            <div class="course-card" onclick="manageSubject('${sub.code}')" style="cursor: pointer;">
                <div style="display: flex; justify-content: space-between; align-items: start;">
                    <div class="subject-icon-bg"><i class="fas fa-book-open"></i></div>
                    <span style="background: #ecfdf5; color: #059669; padding: 0.2rem 0.6rem; border-radius: 20px; font-size: 0.75rem; font-weight: 600;">Active</span>
                </div>
                <h3 style="margin-top: 1rem;">${sub.name}</h3>
                <p style="color: var(--text-muted); font-size: 0.9rem;">${sub.branch} - Sem ${sub.semester}</p>
                <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 0.85rem; color: var(--text-muted);"><i class="fas fa-users"></i> ${sub.students.length} Students</span>
                    <i class="fas fa-chevron-right" style="color: var(--primary-color);"></i>
                </div>
            </div>
        `).join('');
    }
}

function manageSubject(subjectCode) {
    currentFacultySubject = facultySubjects.find(s => s.code === subjectCode);
    showFacultySection('students');

    // Update labels
    const title = document.getElementById('faculty-section-title');
    title.innerText = `Manage: ${currentFacultySubject.name}`;

    renderStudentList();
}

function renderStudentList() {
    const studentsTbody = document.getElementById('faculty-students-tbody');
    if (!studentsTbody || !currentFacultySubject) return;

    const enrolledStudents = students.filter(s => currentFacultySubject.students.includes(s.id));

    studentsTbody.innerHTML = enrolledStudents.map(s => `
        <tr style="border-bottom: 1px solid #f1f5f9; cursor: pointer;" onclick="openMarksModal('${s.id}')">
            <td style="padding: 1rem;">${s.id}</td>
            <td style="padding: 1rem; font-weight: 500;">${s.name}</td>
            <td style="padding: 1rem;">${s.branch}</td>
            <td style="padding: 1rem;">
                <button class="submit-btn" style="width: auto; padding: 0.4rem 0.8rem; margin: 0; font-size: 0.8rem; background: #f1f5f9; color: var(--primary-color);">
                    Edit Marks
                </button>
            </td>
        </tr>
    `).join('');

    renderAttendanceList();
    renderGradingList();
}

function renderAttendanceList() {
    const attendanceTbody = document.getElementById('attendance-tbody');
    if (!attendanceTbody || !currentFacultySubject) return;

    const enrolledStudents = students.filter(s => currentFacultySubject.students.includes(s.id));

    attendanceTbody.innerHTML = enrolledStudents.map(s => `
        <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 1rem;">${s.id}</td>
            <td style="padding: 1rem;">${s.name}</td>
            <td style="padding: 1rem; text-align: center;">
                <label class="att-toggle">
                    <input type="radio" name="att-${s.id}-${currentFacultySubject.code}" value="P" checked>
                    <span class="p-btn">P</span>
                </label>
            </td>
            <td style="padding: 1rem; text-align: center;">
                <label class="att-toggle">
                    <input type="radio" name="att-${s.id}-${currentFacultySubject.code}" value="A">
                    <span class="a-btn">A</span>
                </label>
            </td>
        </tr>
    `).join('');
}

function renderGradingList() {
    const marksTbody = document.getElementById('marks-tbody');
    if (!marksTbody || !currentFacultySubject) return;

    const enrolledStudents = students.filter(s => currentFacultySubject.students.includes(s.id));

    marksTbody.innerHTML = enrolledStudents.map(s => {
        const marks = (studentMarks[s.id] && studentMarks[s.id][currentFacultySubject.code]) || { mt1: 0 };
        return `
        <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 1rem;">${s.id}</td>
            <td style="padding: 1rem;">${s.name}</td>
            <td style="padding: 1rem;">${currentFacultySubject.name}</td>
            <td style="padding: 1rem;">
                <input type="number" value="${marks.mt1}" 
                    onchange="updateQuickMark('${s.id}', '${currentFacultySubject.code}', this.value)"
                    style="width: 70px; padding: 0.4rem; border: 1px solid #e2e8f0; border-radius: 6px; text-align: center;">
            </td>
        </tr>
    `}).join('');
}

function openMarksModal(studentId) {
    if (!currentFacultySubject) return;
    const student = students.find(s => s.id === studentId);
    const marks = (studentMarks[studentId] && studentMarks[studentId][currentFacultySubject.code]) || { ut1: 0, ut2: 0, ut3: 0, mt1: 0, mt2: 0 };

    // Create and show modal
    const modal = document.createElement('div');
    modal.id = 'marksModal';
    modal.className = 'login-container';
    modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(15, 23, 42, 0.9); display: flex; align-items: center; justify-content: center; z-index: 6000;';

    modal.innerHTML = `
        <div class="login-card" style="max-width: 500px; padding: 2rem; flex-direction: column;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h2 style="font-size: 1.25rem;">Grading: ${student.name}</h2>
                <button onclick="document.body.removeChild(document.getElementById('marksModal'))" style="font-size: 1.5rem; color: var(--text-muted);">&times;</button>
            </div>
            
            <p style="color: var(--text-muted); margin-bottom: 2rem;">Subject: ${currentFacultySubject.name} (${currentFacultySubject.code})</p>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div class="form-group">
                    <label>Unit Test 1 (20)</label>
                    <input type="number" id="ut1" value="${marks.ut1 || 0}" max="20">
                </div>
                <div class="form-group">
                    <label>Unit Test 2 (20)</label>
                    <input type="number" id="ut2" value="${marks.ut2 || 0}" max="20">
                </div>
                <div class="form-group">
                    <label>Unit Test 3 (20)</label>
                    <input type="number" id="ut3" value="${marks.ut3 || 0}" max="20">
                </div>
                <div class="form-group">
                    <label>Mid Term 1 (50)</label>
                    <input type="number" id="mt1" value="${marks.mt1 || 0}" max="50">
                </div>
                <div class="form-group">
                    <label>Mid Term 2 (50)</label>
                    <input type="number" id="mt2" value="${marks.mt2 || 0}" max="50">
                </div>
            </div>
            
            <button class="submit-btn" onclick="saveStudentMarks('${studentId}')" style="margin-top: 2rem;">Save All Marks</button>
        </div>
    `;

    document.body.appendChild(modal);
}

function saveStudentMarks(studentId) {
    if (!studentMarks[studentId]) studentMarks[studentId] = {};
    if (!studentMarks[studentId][currentFacultySubject.code]) studentMarks[studentId][currentFacultySubject.code] = {};

    const marksArr = ['ut1', 'ut2', 'ut3', 'mt1', 'mt2'];
    marksArr.forEach(m => {
        const val = parseInt(document.getElementById(m).value) || 0;
        studentMarks[studentId][currentFacultySubject.code][m] = val;
    });

    alert('Marks updated successfully! ✅');
    document.body.removeChild(document.getElementById('marksModal'));
    renderGradingList();
}

function updateQuickMark(studentId, subjectCode, value) {
    if (!studentMarks[studentId]) studentMarks[studentId] = {};
    if (!studentMarks[studentId][subjectCode]) studentMarks[studentId][subjectCode] = {};
    studentMarks[studentId][subjectCode].mt1 = parseInt(value) || 0;
}

function submitAttendance() {
    alert('Attendance submitted and synced with server! ✅');
}

// Logout function
function logout() {
    localStorage.removeItem('userType');
    localStorage.removeItem('userId');
    window.location.href = 'index.html';
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (nav) {
        if (window.scrollY > 50) {
            nav.style.padding = '0.8rem 5%';
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.backdropFilter = 'blur(10px)';
        } else {
            nav.style.padding = '1.5rem 5%';
            nav.style.background = '#ffffff';
            nav.style.backdropFilter = 'none';
        }
    }
});

// Profile Modal Logic
function toggleProfileModal() {
    const modal = document.getElementById('profileModal');
    if (modal.style.display === 'none' || modal.style.display === '') {
        renderProfileDetails();
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scroll
    } else {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scroll
    }
}

function renderProfileDetails() {
    const userId = localStorage.getItem('userId') || '2024CS001';
    const student = students.find(s => s.id === userId) || students[0];

    // Set initials
    const initials = student.name.split(' ').map(n => n[0]).join('').toUpperCase();
    document.getElementById('profile-initials').innerText = initials;

    document.getElementById('profile-full-name').innerText = student.name;
    document.getElementById('profile-roll').innerText = student.id;
    document.getElementById('profile-email').innerText = student.personal.email;
    document.getElementById('profile-phone').innerText = student.personal.phone;
    document.getElementById('profile-dob').innerText = student.personal.dob;
    document.getElementById('profile-blood').innerText = student.personal.bloodGroup;
    document.getElementById('profile-father').innerText = student.personal.fatherName;
    document.getElementById('profile-mother').innerText = student.personal.motherName;
    document.getElementById('profile-religion').innerText = student.personal.religion;
    document.getElementById('profile-caste').innerText = student.personal.caste;
}

// Close modals when clicking outside
window.onclick = function (event) {
    const loginModal = document.getElementById('loginModal');
    const paymentModal = document.getElementById('paymentModal');
    const profileModal = document.getElementById('profileModal');

    if (event.target == loginModal) toggleLoginModal();
    if (event.target == paymentModal) closePaymentModal();
    if (event.target == profileModal) toggleProfileModal();
}

// --- Apex AI Assistant Logic ---
function toggleAIChat() {
    const chat = document.getElementById('aiChatWidget');
    chat.style.display = (chat.style.display === 'none' || chat.style.display === '') ? 'flex' : 'none';
}

function sendAIMessage(event) {
    event.preventDefault();
    const input = document.getElementById('aiInput');
    const container = document.getElementById('aiChatMessages');
    const typing = document.getElementById('aiTyping');
    const query = input.value.toLowerCase();

    if (query.trim() === '') return;

    // Add User Message
    const userMsg = document.createElement('div');
    userMsg.className = 'message sent';
    userMsg.innerText = input.value;
    container.appendChild(userMsg);

    input.value = '';
    container.scrollTop = container.scrollHeight;

    // Show Typing
    typing.style.display = 'flex';
    container.scrollTop = container.scrollHeight;

    // Bot Response Logic
    setTimeout(() => {
        typing.style.display = 'none';
        const botMsg = document.createElement('div');
        botMsg.className = 'message received';
        botMsg.innerText = getBotResponse(query);
        container.appendChild(botMsg);
        container.scrollTop = container.scrollHeight;
    }, 1500);
}

function getBotResponse(query) {
    if (query.includes('login') || query.includes('password')) {
        return "If you're having trouble logging in, please check your credentials. For password resets, contact the IT helpdesk at it.support@apex.edu.";
    } else if (query.includes('fee') || query.includes('pay') || query.includes('scholarship')) {
        return "You can pay your fees in the 'Fees & Scholarship' section of your dashboard. We support UPI and Card payments.";
    } else if (query.includes('attendance')) {
        return "Your daily attendance is updated every 24 hours. You can view subject-wise history in the 'Academics' section.";
    } else if (query.includes('result') || query.includes('marks') || query.includes('gpa')) {
        return "Semester results are posted in the 'Results' section. Mid-semester marks are updated by your subject faculty.";
    } else if (query.includes('mentor') || query.includes('teacher')) {
        return "You can message your mentor directly through the 'Mentor Connect' tab in your dashboard.";
    } else if (query.includes('academics') || query.includes('where')) {
        return "You can find Academics, Fees, Results, and more in the left sidebar menu.";
    } else if (query.includes('hello') || query.includes('hi')) {
        return "Hello! I am your Apex AI Assistant. How can I help you today?";
    } else {
        return "I’m still learning. Please contact the admin office at support@apexportal.edu if you need urgent assistance.";
    }
}
