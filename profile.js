// تهيئة صفحة الملف الشخصي
document.addEventListener('DOMContentLoaded', function() {
    loadUserData();
    setupProfileForm();
    setupImageUpload();
    loadStatistics();
    loadProgress();
    
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
    
    const animatedElements = document.querySelectorAll('.profile-container, .profile-card, .stat-item');
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

// تحميل بيانات المستخدم
function loadUserData() {
    // محاكاة بيانات المستخدم (يمكن استبدالها ببيانات حقيقية من قاعدة البيانات)
    const userData = JSON.parse(localStorage.getItem('userData')) || {
        name: 'اسم المستخدم',
        email: 'user@example.com',
        phone: '',
        grade: '',
        image: 'https://via.placeholder.com/150'
    };

    document.getElementById('userName').textContent = userData.name;
    document.getElementById('userEmail').textContent = userData.email;
    document.getElementById('fullName').value = userData.name;
    document.getElementById('email').value = userData.email;
    document.getElementById('phone').value = userData.phone;
    document.getElementById('grade').value = userData.grade;
    document.getElementById('profileImage').src = userData.image;

    if (userData.grade) {
        const gradeText = document.querySelector(`#grade option[value="${userData.grade}"]`)?.textContent || '';
        document.getElementById('userGrade').textContent = `الصف الدراسي: ${gradeText}`;
    }
}

// إعداد نموذج الملف الشخصي
function setupProfileForm() {
    const form = document.getElementById('profileForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const userData = {
            name: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            grade: document.getElementById('grade').value,
            image: document.getElementById('profileImage').src
        };

        // حفظ البيانات في localStorage
        localStorage.setItem('userData', JSON.stringify(userData));

        // تحديث العرض
        document.getElementById('userName').textContent = userData.name;
        document.getElementById('userEmail').textContent = userData.email;
        
        const gradeText = document.querySelector(`#grade option[value="${userData.grade}"]`)?.textContent || '';
        document.getElementById('userGrade').textContent = `الصف الدراسي: ${gradeText}`;

        alert('تم حفظ التغييرات بنجاح!');
    });
}

// إعداد رفع الصورة
function setupImageUpload() {
    const imageInput = document.getElementById('imageInput');
    const profileImage = document.getElementById('profileImage');

    if (imageInput && profileImage) {
        imageInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    profileImage.src = e.target.result;
                    
                    // حفظ الصورة في البيانات
                    const userData = JSON.parse(localStorage.getItem('userData')) || {};
                    userData.image = e.target.result;
                    localStorage.setItem('userData', JSON.stringify(userData));
                };
                reader.readAsDataURL(file);
            }
        });
    }
}

// تحميل الإحصائيات
function loadStatistics() {
    const stats = JSON.parse(localStorage.getItem('userStats')) || {
        videosWatched: 0,
        hoursStudied: 0,
        subjectsCompleted: 0,
        achievements: 0
    };

    document.getElementById('videosWatched').textContent = stats.videosWatched;
    document.getElementById('hoursStudied').textContent = stats.hoursStudied;
    document.getElementById('subjectsCompleted').textContent = stats.subjectsCompleted;
    document.getElementById('achievements').textContent = stats.achievements;
}

// تحميل التقدم الدراسي
function loadProgress() {
    const progressSection = document.getElementById('progressSection');
    if (!progressSection) return;

    const progress = JSON.parse(localStorage.getItem('studyProgress')) || [
        { subject: 'الرياضيات', progress: 65 },
        { subject: 'الفيزياء', progress: 40 },
        { subject: 'الكيمياء', progress: 30 },
        { subject: 'الأحياء', progress: 50 }
    ];

    progressSection.innerHTML = '';

    progress.forEach(item => {
        const progressItem = document.createElement('div');
        progressItem.className = 'progress-item';
        progressItem.innerHTML = `
            <h4>${item.subject}</h4>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${item.progress}%"></div>
            </div>
            <p>${item.progress}% مكتمل</p>
        `;
        progressSection.appendChild(progressItem);
    });
}

