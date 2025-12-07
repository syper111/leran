// تهيئة صفحة تنظيم الدراسة
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('weeklySchedule')) {
        initializeWeeklyPlan();
        updateWeekDisplay();
    }
    if (document.getElementById('monthlyCalendar')) {
        initializeMonthlyPlan();
    }
    if (document.getElementById('customPlanForm')) {
        setupCustomPlanForm();
    }
    if (document.getElementById('plansList')) {
        loadSavedPlans();
    }
    
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
    
    const animatedElements = document.querySelectorAll('.study-plan-container, .plan-section, .plan-card');
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

// عرض نوع الجدول
function showPlanType(type, element) {
    // إخفاء جميع الأقسام
    document.getElementById('weeklyPlan').style.display = 'none';
    document.getElementById('monthlyPlan').style.display = 'none';
    document.getElementById('customPlan').style.display = 'none';

    // إظهار القسم المطلوب
    document.getElementById(type + 'Plan').style.display = 'block';

    // تحديث الأزرار
    document.querySelectorAll('.plan-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    if (element) {
        element.classList.add('active');
    } else {
        // إذا لم يتم تمرير العنصر، ابحث عنه
        document.querySelectorAll('.plan-btn').forEach(btn => {
            if (btn.textContent.includes(type === 'weekly' ? 'الأسبوعي' : type === 'monthly' ? 'الشهري' : 'مخصص')) {
                btn.classList.add('active');
            }
        });
    }
}

// تهيئة الجدول الأسبوعي
function initializeWeeklyPlan() {
    const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    const schedule = document.getElementById('weeklySchedule');
    if (!schedule) return;

    schedule.innerHTML = '';

    days.forEach(day => {
        const daySchedule = document.createElement('div');
        daySchedule.className = 'day-schedule';
        daySchedule.innerHTML = `
            <div class="day-header">
                <h3>${day}</h3>
                <span class="day-date">${getDayDate(day)}</span>
            </div>
            <div class="sessions-list" id="${day}Sessions">
                <!-- الجلسات ستُضاف هنا -->
            </div>
        `;
        schedule.appendChild(daySchedule);
    });

    loadWeeklySessions();
}

// الحصول على تاريخ اليوم
function getDayDate(dayName) {
    const today = new Date();
    const dayIndex = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'].indexOf(dayName);
    const currentDay = today.getDay();
    const diff = dayIndex - currentDay;
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + diff);
    return targetDate.toLocaleDateString('ar-SA');
}

// الحصول على اسم المادة
function getSubjectName(subject) {
    const subjects = {
        'math': 'الرياضيات',
        'physics': 'الفيزياء',
        'chemistry': 'الكيمياء',
        'biology': 'الأحياء'
    };
    return subjects[subject] || subject;
}

// تحميل الجلسات الأسبوعية
function loadWeeklySessions() {
    const sessions = JSON.parse(localStorage.getItem('weeklySessions')) || [];
    
    sessions.forEach(session => {
        addSessionToDay(session.day, session);
    });
}

// إضافة جلسة إلى يوم
function addSessionToDay(day, session) {
    const daySessions = document.getElementById(day + 'Sessions');
    if (!daySessions) return;

    const sessionItem = document.createElement('div');
    sessionItem.className = 'session-item';
    const subjectName = getSubjectName(session.subject);
    sessionItem.innerHTML = `
        <div class="session-info">
            <strong>${subjectName}</strong> - ${session.time} (${session.duration} ساعة)
        </div>
        <button class="action-btn delete" onclick="removeSession(this, '${day}', '${session.date}', '${session.time}')">حذف</button>
    `;
    daySessions.appendChild(sessionItem);
}

// حذف جلسة
function removeSession(button, day, date, time) {
    const sessions = JSON.parse(localStorage.getItem('weeklySessions')) || [];
    const filteredSessions = sessions.filter(s => !(s.day === day && s.date === date && s.time === time));
    localStorage.setItem('weeklySessions', JSON.stringify(filteredSessions));
    button.parentElement.remove();
}

// تغيير الأسبوع
let currentWeekOffset = 0;

function changeWeek(direction) {
    currentWeekOffset += direction;
    updateWeekDisplay();
    initializeWeeklyPlan();
}

function updateWeekDisplay() {
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay() + (currentWeekOffset * 7));
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    const weekDisplay = document.getElementById('currentWeek');
    if (weekDisplay) {
        weekDisplay.textContent = `${weekStart.toLocaleDateString('ar-SA')} - ${weekEnd.toLocaleDateString('ar-SA')}`;
    }
}

// تهيئة الجدول الشهري
function initializeMonthlyPlan() {
    const calendar = document.getElementById('monthlyCalendar');
    if (!calendar) return;

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    updateMonthDisplay(year, month);
    renderCalendar(year, month);
}

// عرض التقويم
function renderCalendar(year, month) {
    const calendar = document.getElementById('monthlyCalendar');
    if (!calendar) return;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = ['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'];

    calendar.innerHTML = '';

    // عرض أسماء الأيام
    days.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day';
        dayHeader.style.background = '#667eea';
        dayHeader.style.color = 'white';
        dayHeader.style.fontWeight = 'bold';
        dayHeader.textContent = day;
        calendar.appendChild(dayHeader);
    });

    // إضافة أيام فارغة في البداية
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day';
        calendar.appendChild(emptyDay);
    }

    // إضافة أيام الشهر
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.innerHTML = `<div class="day-number">${day}</div>`;
        
        // التحقق من وجود جلسات في هذا اليوم
        if (hasSessionOnDate(year, month, day)) {
            dayElement.classList.add('has-session');
        }

        calendar.appendChild(dayElement);
    }
}

// التحقق من وجود جلسة في تاريخ معين
function hasSessionOnDate(year, month, day) {
    const sessions = JSON.parse(localStorage.getItem('weeklySessions')) || [];
    const targetDate = new Date(year, month, day).toLocaleDateString('ar-SA');
    return sessions.some(session => {
        const sessionDate = new Date(session.date).toLocaleDateString('ar-SA');
        return sessionDate === targetDate;
    });
}

// تغيير الشهر
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function changeMonth(direction) {
    currentMonth += direction;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    updateMonthDisplay(currentYear, currentMonth);
    renderCalendar(currentYear, currentMonth);
}

function updateMonthDisplay(year, month) {
    const monthNames = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 
                       'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
    const monthDisplay = document.getElementById('currentMonth');
    if (monthDisplay) {
        monthDisplay.textContent = `${monthNames[month]} ${year}`;
    }
}

// إعداد نموذج الجدول المخصص
function setupCustomPlanForm() {
    const form = document.getElementById('customPlanForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const plan = {
            name: document.getElementById('planName').value,
            startDate: document.getElementById('planStartDate').value,
            endDate: document.getElementById('planEndDate').value,
            subject: document.getElementById('planSubject').value,
            hours: document.getElementById('planHours').value,
            progress: 0
        };

        savePlan(plan);
        form.reset();
        alert('تم إنشاء الجدول بنجاح!');
        loadSavedPlans();
    });
}

// حفظ الجدول
function savePlan(plan) {
    const plans = JSON.parse(localStorage.getItem('savedPlans')) || [];
    plans.push(plan);
    localStorage.setItem('savedPlans', JSON.stringify(plans));
}

// تحميل الجداول المحفوظة
function loadSavedPlans() {
    const plansList = document.getElementById('plansList');
    if (!plansList) return;

    const plans = JSON.parse(localStorage.getItem('savedPlans')) || [];
    plansList.innerHTML = '';

    plans.forEach((plan, index) => {
        const planCard = document.createElement('div');
        planCard.className = 'plan-card';
        
        const startDate = new Date(plan.startDate);
        const endDate = new Date(plan.endDate);
        const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

        planCard.innerHTML = `
            <h3>${plan.name}</h3>
            <p>المادة: ${getSubjectName(plan.subject)} | المدة: ${days} يوم</p>
            <div class="plan-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${plan.progress}%"></div>
                </div>
                <span>${plan.progress}% مكتمل</span>
            </div>
            <div class="plan-actions">
                <button class="action-btn edit" onclick="editPlan(${index})">تعديل</button>
                <button class="action-btn delete" onclick="deletePlan(${index})">حذف</button>
            </div>
        `;
        plansList.appendChild(planCard);
    });
}

// تعديل جدول
function editPlan(index) {
    const plans = JSON.parse(localStorage.getItem('savedPlans')) || [];
    const plan = plans[index];
    
    if (!plan) return;

    const newName = prompt('اسم الجدول الجديد:', plan.name);
    if (newName) {
        plan.name = newName;
        localStorage.setItem('savedPlans', JSON.stringify(plans));
        loadSavedPlans();
    }
}

// حذف جدول
function deletePlan(index) {
    if (!confirm('هل أنت متأكد من حذف هذا الجدول؟')) return;

    const plans = JSON.parse(localStorage.getItem('savedPlans')) || [];
    plans.splice(index, 1);
    localStorage.setItem('savedPlans', JSON.stringify(plans));
    loadSavedPlans();
}

// إضافة جلسة دراسة
function addStudySession() {
    const modal = document.getElementById('sessionModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

// إغلاق Modal الجلسة
function closeSessionModal() {
    const modal = document.getElementById('sessionModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// إعداد نموذج الجلسة عند تحميل الصفحة
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupSessionForm);
} else {
    setupSessionForm();
}

function setupSessionForm() {
    const sessionForm = document.getElementById('sessionForm');
    if (sessionForm) {
        sessionForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const session = {
                subject: document.getElementById('sessionSubject').value,
                date: document.getElementById('sessionDate').value,
                time: document.getElementById('sessionTime').value,
                duration: document.getElementById('sessionDuration').value,
                day: getDayNameFromDate(document.getElementById('sessionDate').value)
            };

            // حفظ الجلسة
            const sessions = JSON.parse(localStorage.getItem('weeklySessions')) || [];
            sessions.push(session);
            localStorage.setItem('weeklySessions', JSON.stringify(sessions));

            // إضافة الجلسة إلى العرض
            addSessionToDay(session.day, session);

            // إغلاق Modal
            closeSessionModal();
            sessionForm.reset();
        });
    }
}

// الحصول على اسم اليوم من التاريخ
function getDayNameFromDate(dateString) {
    const date = new Date(dateString);
    const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    return days[date.getDay()];
}

