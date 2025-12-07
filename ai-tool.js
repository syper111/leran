// بيانات الردود الذكية
const aiResponses = {
    'شرح': [
        'سأقوم بشرح هذا الموضوع لك. دعني أبدأ...',
        'هذا موضوع مهم! دعني أشرحه لك بالتفصيل.',
        'سأقدم لك شرحاً شاملاً ومفصلاً.'
    ],
    'رياضيات': [
        'الرياضيات هي لغة العلوم! سأساعدك في فهمها.',
        'دعني أشرح لك هذا المفهوم الرياضي خطوة بخطوة.',
        'الرياضيات تحتاج للفهم والتدريب. سأوضح لك الطريقة.'
    ],
    'فيزياء': [
        'الفيزياء تشرح كيف يعمل الكون! سأساعدك في فهمها.',
        'دعني أشرح لك هذا المفهوم الفيزيائي بشكل مبسط.',
        'الفيزياء رائعة! سأوضح لك المبادئ الأساسية.'
    ],
    'كيمياء': [
        'الكيمياء هي علم المادة! سأساعدك في فهم التفاعلات.',
        'دعني أشرح لك هذا التفاعل الكيميائي بالتفصيل.',
        'الكيمياء ممتعة! سأوضح لك المبادئ الأساسية.'
    ],
    'أحياء': [
        'علم الأحياء يدرس الحياة! سأساعدك في فهمه.',
        'دعني أشرح لك هذا المفهوم البيولوجي بشكل واضح.',
        'الأحياء علم رائع! سأوضح لك التفاصيل.'
    ],
    'ذاكرة': [
        'للذاكرة الفعالة، اتبع هذه النصائح:\n1. راجع المادة بانتظام\n2. استخدم الخرائط الذهنية\n3. خذ فترات راحة\n4. اشرح المادة لشخص آخر',
        'نصائح للدراسة الفعالة:\n- ادرس في مكان هادئ\n- نظم وقتك\n- استخدم تقنيات التكرار\n- مارس التمارين',
        'لتحسين ذاكرتك:\n1. النوم الكافي مهم جداً\n2. التغذية السليمة\n3. التمارين الرياضية\n4. تقنيات الاستذكار'
    ],
    'حل': [
        'سأقوم بحل هذه المسألة خطوة بخطوة.',
        'دعني أحلل المسألة وأقدم لك الحل الكامل.',
        'سأوضح لك طريقة حل هذه المسألة بالتفصيل.'
    ]
};

// تهيئة صفحة الذكاء الاصطناعي
document.addEventListener('DOMContentLoaded', function() {
    setupChat();
    setupMobileMenu();
    
    // تأثيرات حركية عند التحميل
    animateOnLoad();
});

// إعداد المحادثة
function setupChat() {
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');

    // إرسال عند الضغط على Enter
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // إرسال عند النقر على الزر
    sendButton.addEventListener('click', sendMessage);

    // تأثير focus على input
    userInput.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });

    userInput.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
    });
}

// إرسال رسالة
function sendMessage() {
    const userInput = document.getElementById('userInput');
    const message = userInput.value.trim();

    if (!message) return;

    // إضافة رسالة المستخدم
    addUserMessage(message);
    userInput.value = '';

    // محاكاة التفكير
    showTypingIndicator();

    // إرسال رد بعد فترة
    setTimeout(() => {
        hideTypingIndicator();
        const response = generateAIResponse(message);
        addBotMessage(response);
    }, 1500 + Math.random() * 1000);
}

// إضافة رسالة المستخدم
function addUserMessage(message) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user-message';
    messageDiv.innerHTML = `
        <div class="message-content">
            <p>${escapeHtml(message)}</p>
        </div>
        <div class="message-avatar">👤</div>
    `;
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
    animateMessage(messageDiv);
}

// إضافة رسالة البوت
function addBotMessage(response) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message';
    
    // تحويل الأسطر إلى فقرات
    const formattedResponse = response.split('\n').map(line => {
        if (line.trim().startsWith('-') || line.trim().match(/^\d+\./)) {
            return `<li>${line.trim().replace(/^[-•]\s*|\d+\.\s*/, '')}</li>`;
        }
        return `<p>${line}</p>`;
    }).join('');

    messageDiv.innerHTML = `
        <div class="message-avatar">🤖</div>
        <div class="message-content">
            ${formattedResponse.includes('<li>') ? `<ul>${formattedResponse}</ul>` : formattedResponse}
        </div>
    `;
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
    animateMessage(messageDiv);
}

// عرض مؤشر الكتابة
function showTypingIndicator() {
    const chatMessages = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-indicator';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
        <div class="message-avatar">🤖</div>
        <div class="message-content">
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    chatMessages.appendChild(typingDiv);
    scrollToBottom();
}

// إخفاء مؤشر الكتابة
function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// توليد رد ذكي
function generateAIResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // البحث عن كلمات مفتاحية
    for (const [keyword, responses] of Object.entries(aiResponses)) {
        if (lowerMessage.includes(keyword)) {
            return responses[Math.floor(Math.random() * responses.length)];
        }
    }

    // ردود عامة
    const generalResponses = [
        'هذا سؤال ممتاز! دعني أفكر في أفضل طريقة للإجابة...',
        'سأساعدك في هذا الموضوع. دعني أشرح لك...',
        'هذا موضوع مهم. سأقدم لك شرحاً مفصلاً.',
        'فهمت سؤالك. دعني أقدم لك الإجابة الكاملة.',
        'سؤال رائع! سأساعدك في فهم هذا الموضوع.',
        'دعني أشرح لك هذا بالتفصيل...',
        'هذا موضوع يحتاج لشرح مفصل. سأوضح لك كل شيء.',
        'سأساعدك في فهم هذا الموضوع خطوة بخطوة.'
    ];

    return generalResponses[Math.floor(Math.random() * generalResponses.length)] + 
           '\n\nيمكنك طرح أسئلة أكثر تحديداً للحصول على إجابات أدق!';
}

// سؤال سريع
function askQuickQuestion(question) {
    const userInput = document.getElementById('userInput');
    userInput.value = question;
    sendMessage();
}

// التمرير للأسفل
function scrollToBottom() {
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// تأثير حركي للرسالة
function animateMessage(messageDiv) {
    messageDiv.style.opacity = '0';
    messageDiv.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        messageDiv.style.transition = 'all 0.4s ease-out';
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translateY(0)';
    }, 10);
}

// تأثيرات حركية عند التحميل
function animateOnLoad() {
    const elements = document.querySelectorAll('.ai-header, .ai-chat-container, .ai-features .feature-card');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            el.style.transition = 'all 0.6s ease-out';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// تنظيف HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

