// بيانات الصفوف والمواد
const gradesData = {
    1: { name: 'الصف الأول', icon: '1️⃣', subjects: ['الرياضيات', 'العلوم', 'اللغة العربية', 'اللغة الإنجليزية'] },
    2: { name: 'الصف الثاني', icon: '2️⃣', subjects: ['الرياضيات', 'العلوم', 'اللغة العربية', 'اللغة الإنجليزية'] },
    3: { name: 'الصف الثالث', icon: '3️⃣', subjects: ['الرياضيات', 'العلوم', 'اللغة العربية', 'اللغة الإنجليزية'] },
    4: { name: 'الصف الرابع', icon: '4️⃣', subjects: ['الرياضيات', 'العلوم', 'اللغة العربية', 'اللغة الإنجليزية'] },
    5: { name: 'الصف الخامس', icon: '5️⃣', subjects: ['الرياضيات', 'العلوم', 'اللغة العربية', 'اللغة الإنجليزية'] },
    6: { name: 'الصف السادس', icon: '6️⃣', subjects: ['الرياضيات', 'العلوم', 'اللغة العربية', 'اللغة الإنجليزية'] },
    7: { name: 'الصف السابع', icon: '7️⃣', subjects: ['الرياضيات', 'الفيزياء', 'الكيمياء', 'الأحياء', 'اللغة العربية'] },
    8: { name: 'الصف الثامن', icon: '8️⃣', subjects: ['الرياضيات', 'الفيزياء', 'الكيمياء', 'الأحياء', 'اللغة العربية'] },
    9: { name: 'الصف التاسع', icon: '9️⃣', subjects: ['الرياضيات', 'الفيزياء', 'الكيمياء', 'الأحياء', 'اللغة العربية'] },
    10: { name: 'الصف العاشر', icon: '🔟', subjects: ['الرياضيات', 'الفيزياء', 'الكيمياء', 'الأحياء', 'اللغة العربية'] },
    11: { name: 'الصف الحادي عشر', icon: '1️⃣1️⃣', subjects: ['الرياضيات', 'الفيزياء', 'الكيمياء', 'الأحياء', 'اللغة العربية'] },
    12: { name: 'التوجيهي', icon: '🎓', subjects: ['الرياضيات', 'الفيزياء', 'الكيمياء', 'الأحياء', 'اللغة العربية'] }
};

// بيانات الدروس
const lessonsData = [
    { id: 1, title: 'الجبر - المعادلات الخطية', subject: 'الرياضيات', grade: 'الصف التاسع', views: 1250, duration: '25 دقيقة', thumbnail: '📐' },
    { id: 2, title: 'قوانين نيوتن للحركة', subject: 'الفيزياء', grade: 'الصف العاشر', views: 980, duration: '30 دقيقة', thumbnail: '⚛️' },
    { id: 3, title: 'التفاعلات الكيميائية', subject: 'الكيمياء', grade: 'الصف الحادي عشر', views: 850, duration: '20 دقيقة', thumbnail: '🧪' },
    { id: 4, title: 'الخلية الحيوانية والنباتية', subject: 'الأحياء', grade: 'الصف الثامن', views: 1100, duration: '15 دقيقة', thumbnail: '🔬' },
    { id: 5, title: 'الهندسة - المثلثات', subject: 'الرياضيات', grade: 'الصف السابع', views: 750, duration: '22 دقيقة', thumbnail: '📐' },
    { id: 6, title: 'الكهرباء والمغناطيسية', subject: 'الفيزياء', grade: 'التوجيهي', views: 1450, duration: '35 دقيقة', thumbnail: '⚛️' }
];

// تهيئة الصفحة الرئيسية
document.addEventListener('DOMContentLoaded', function() {
    // عرض الصفوف
    if (document.getElementById('gradesContainer')) {
        displayGrades();
    }

    // عرض أحدث الدروس
    if (document.getElementById('latestLessons')) {
        displayLatestLessons();
    }

    // عرض الأكثر مشاهدة
    if (document.getElementById('popularLessons')) {
        displayPopularLessons();
    }

    // إعداد القائمة المتحركة
    setupMobileMenu();

    // إعداد Modal
    setupModal();
    
    // تأثيرات حركية عند التحميل
    animatePageLoad();

    // عداد الإحصائيات
    animateStats();

    // إعداد البحث
    setupSearch();
});

// عرض أحدث الدروس
function displayLatestLessons() {
    const container = document.getElementById('latestLessons');
    if (!container) return;

    const latest = lessonsData.slice(0, 6);
    container.innerHTML = '';

    latest.forEach(lesson => {
        const lessonCard = document.createElement('div');
        lessonCard.className = 'lesson-card';
        lessonCard.onclick = () => openLesson(lesson);
        
        lessonCard.innerHTML = `
            <div class="lesson-thumbnail">${lesson.thumbnail}</div>
            <div class="lesson-info">
                <h4>${lesson.title}</h4>
                <p class="lesson-meta">${lesson.subject} - ${lesson.grade}</p>
                <div class="lesson-stats">
                    <span>👁️ ${lesson.views}</span>
                    <span>⏱️ ${lesson.duration}</span>
                </div>
            </div>
            <div class="lesson-play">▶️</div>
        `;
        
        container.appendChild(lessonCard);
    });
}

// عرض الأكثر مشاهدة
function displayPopularLessons() {
    const container = document.getElementById('popularLessons');
    if (!container) return;

    const popular = [...lessonsData].sort((a, b) => b.views - a.views).slice(0, 4);
    container.innerHTML = '';

    popular.forEach(lesson => {
        const lessonCard = document.createElement('div');
        lessonCard.className = 'popular-card';
        lessonCard.onclick = () => openLesson(lesson);
        
        lessonCard.innerHTML = `
            <div class="popular-thumbnail">${lesson.thumbnail}</div>
            <div class="popular-info">
                <h4>${lesson.title}</h4>
                <p>${lesson.subject} - ${lesson.grade}</p>
                <div class="popular-badge">🔥 ${lesson.views} مشاهدة</div>
            </div>
        `;
        
        container.appendChild(lessonCard);
    });
}

// فتح الدرس
function openLesson(lesson) {
    alert(`سيتم فتح درس: ${lesson.title}\n\nهذه وظيفة يمكن تطويرها لاحقاً لعرض الدرس الكامل.`);
}

// التمرير للصفوف
function scrollToGrades() {
    const gradesSection = document.querySelector('.grades-section');
    if (gradesSection) {
        gradesSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// عداد الإحصائيات
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target.toLocaleString('ar-SA');
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current).toLocaleString('ar-SA');
            }
        }, 16);
    });
}

// إعداد البحث
function setupSearch() {
    const searchInput = document.getElementById('quickSearch');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput && searchBtn) {
        const performSearch = () => {
            const query = searchInput.value.trim();
            if (query) {
                alert(`البحث عن: ${query}\n\nسيتم تطوير وظيفة البحث لاحقاً.`);
            }
        };

        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

// تأثيرات حركية عند تحميل الصفحة
function animatePageLoad() {
    // تأثير fade in للصفحة
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.8s ease-out';
        document.body.style.opacity = '1';
    }, 100);
    
    // تأثير للعناصر
    const animatedElements = document.querySelectorAll('.grade-card, .hero-content, .section-title, .lesson-card, .popular-card, .featured-card');
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

// عرض الصفوف
function displayGrades() {
    const container = document.getElementById('gradesContainer');
    if (!container) return;

    container.innerHTML = '';

    for (let grade = 1; grade <= 12; grade++) {
        const gradeData = gradesData[grade];
        const gradeCard = document.createElement('div');
        gradeCard.className = 'grade-card';
        gradeCard.onclick = () => showSubjects(grade);
        
        gradeCard.innerHTML = `
            <div class="grade-icon">${gradeData.icon}</div>
            <h3>${gradeData.name}</h3>
            <p>${gradeData.subjects.length} مادة</p>
        `;
        
        container.appendChild(gradeCard);
    }
}

// عرض المواد
function showSubjects(grade) {
    const gradeData = gradesData[grade];
    const modal = document.getElementById('subjectsModal');
    const modalTitle = document.getElementById('modalTitle');
    const subjectsGrid = document.getElementById('subjectsGrid');

    if (!modal || !modalTitle || !subjectsGrid) return;

    modalTitle.textContent = `المواد العلمية - ${gradeData.name}`;
    subjectsGrid.innerHTML = '';

    gradeData.subjects.forEach(subject => {
        const subjectCard = document.createElement('div');
        subjectCard.className = 'subject-card';
        subjectCard.onclick = () => openSubjectVideos(grade, subject);
        
        subjectCard.innerHTML = `
            <h4>${subject}</h4>
            <p>اضغط لعرض الشروحات</p>
        `;
        
        subjectsGrid.appendChild(subjectCard);
    });

    modal.style.display = 'block';
}

// فتح فيديوهات المادة
function openSubjectVideos(grade, subject) {
    alert(`سيتم فتح شروحات مادة ${subject} لل${gradesData[grade].name}\n\nهذه وظيفة يمكن تطويرها لاحقاً لعرض الفيديوهات الفعلية.`);
    // يمكن إضافة رابط أو iframe للفيديو هنا
}

// إعداد Modal
function setupModal() {
    const modal = document.getElementById('subjectsModal');
    if (!modal) return;

    const closeBtn = modal.querySelector('.close');
    if (closeBtn) {
        closeBtn.onclick = () => {
            modal.style.display = 'none';
        };
    }

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}

// إعداد القائمة المتحركة
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // إغلاق القائمة عند النقر على رابط
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
}

