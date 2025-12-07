// تهيئة صفحة الإدارة
document.addEventListener('DOMContentLoaded', function() {
    setupSearch();
    loadUsersTable();
    
    // تأثيرات حركية عند التحميل
    animatePageLoad();
});

// تأثيرات حركية عند تحميل الصفحة
function animatePageLoad() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.8s ease-out';
        document.body.style.opacity = '1';
    }, 100);
    
    const animatedElements = document.querySelectorAll('.admin-container, .admin-card, .admin-section');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            el.style.transition = 'all 0.6s ease-out';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 200 + (index * 100));
    });
}

// عرض قسم معين
function showSection(sectionName) {
    // إخفاء جميع الأقسام
    const sections = document.querySelectorAll('.admin-section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // إظهار القسم المطلوب
    const targetSection = document.getElementById(sectionName + 'Section');
    if (targetSection) {
        targetSection.style.display = 'block';
    }
}

// إعداد البحث
function setupSearch() {
    const searchInput = document.getElementById('searchUsers');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            filterUsersTable(searchTerm);
        });
    }
}

// تحميل جدول المستخدمين
function loadUsersTable() {
    const tbody = document.getElementById('usersTableBody');
    if (!tbody) return;

    // محاكاة بيانات المستخدمين
    const users = JSON.parse(localStorage.getItem('adminUsers')) || [
        { name: 'أحمد محمد', email: 'ahmed@example.com', grade: 'التوجيهي', status: 'active' },
        { name: 'فاطمة علي', email: 'fatima@example.com', grade: 'الصف العاشر', status: 'active' },
        { name: 'محمد خالد', email: 'mohammed@example.com', grade: 'الصف التاسع', status: 'active' }
    ];

    renderUsersTable(users);
}

// عرض جدول المستخدمين
function renderUsersTable(users) {
    const tbody = document.getElementById('usersTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.grade}</td>
            <td><span class="status active">نشط</span></td>
            <td>
                <button class="action-btn edit" onclick="editUser('${user.email}')">تعديل</button>
                <button class="action-btn delete" onclick="deleteUser('${user.email}')">حذف</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// تصفية جدول المستخدمين
function filterUsersTable(searchTerm) {
    const rows = document.querySelectorAll('#usersTableBody tr');
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
}

// إضافة مستخدم جديد
function addNewUser() {
    const name = prompt('أدخل اسم المستخدم:');
    if (!name) return;

    const email = prompt('أدخل البريد الإلكتروني:');
    if (!email) return;

    const grade = prompt('أدخل الصف الدراسي:');
    if (!grade) return;

    const users = JSON.parse(localStorage.getItem('adminUsers')) || [];
    users.push({ name, email, grade, status: 'active' });
    localStorage.setItem('adminUsers', JSON.stringify(users));

    loadUsersTable();
    alert('تم إضافة المستخدم بنجاح!');
}

// تعديل مستخدم
function editUser(email) {
    const users = JSON.parse(localStorage.getItem('adminUsers')) || [];
    const user = users.find(u => u.email === email);
    
    if (!user) return;

    const newName = prompt('الاسم الجديد:', user.name);
    if (!newName) return;

    const newGrade = prompt('الصف الجديد:', user.grade);
    if (!newGrade) return;

    user.name = newName;
    user.grade = newGrade;
    localStorage.setItem('adminUsers', JSON.stringify(users));

    loadUsersTable();
    alert('تم تحديث بيانات المستخدم!');
}

// حذف مستخدم
function deleteUser(email) {
    if (!confirm('هل أنت متأكد من حذف هذا المستخدم؟')) return;

    const users = JSON.parse(localStorage.getItem('adminUsers')) || [];
    const filteredUsers = users.filter(u => u.email !== email);
    localStorage.setItem('adminUsers', JSON.stringify(filteredUsers));

    loadUsersTable();
    alert('تم حذف المستخدم بنجاح!');
}

// إضافة محتوى جديد
function addNewContent() {
    const title = prompt('أدخل عنوان المحتوى:');
    if (!title) return;

    const description = prompt('أدخل وصف المحتوى:');
    if (!description) return;

    const contentList = document.getElementById('contentList');
    if (!contentList) return;

    const contentItem = document.createElement('div');
    contentItem.className = 'content-item';
    contentItem.innerHTML = `
        <div class="content-info">
            <h4>${title}</h4>
            <p>${description}</p>
            <span class="content-meta">تم النشر: ${new Date().toLocaleDateString('ar-SA')}</span>
        </div>
        <div class="content-actions">
            <button class="action-btn edit">تعديل</button>
            <button class="action-btn delete" onclick="this.parentElement.parentElement.remove()">حذف</button>
        </div>
    `;
    contentList.appendChild(contentItem);

    alert('تم إضافة المحتوى بنجاح!');
}

