// Modal Management
function openModal(modalType) {
    let modalId = '';
    
    switch(modalType) {
        case 'vocational':
            modalId = 'vocationalModal';
            break;
        case 'cv':
            modalId = 'cvModal';
            break;
        case 'interview':
            modalId = 'interviewModal';
            resetInterview();
            break;
        case 'tips':
            modalId = 'tipsModal';
            break;
        case 'resources':
            modalId = 'resourcesModal';
            break;
        default:
            return;
    }
    
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeModal(modalType) {
    let modalId = '';
    
    switch(modalType) {
        case 'vocational':
            modalId = 'vocationalModal';
            break;
        case 'cv':
            modalId = 'cvModal';
            break;
        case 'interview':
            modalId = 'interviewModal';
            break;
        case 'tips':
            modalId = 'tipsModal';
            break;
        case 'resources':
            modalId = 'resourcesModal';
            break;
        default:
            return;
    }
    
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Vocational Test
let vocationalScores = {
    tech: 0,
    business: 0,
    creative: 0,
    social: 0
};

function addScore(category) {
    vocationalScores[category]++;
    
    let result = '';
    const total = vocationalScores.tech + vocationalScores.business + 
                  vocationalScores.creative + vocationalScores.social;
    
    if (total === 1) {
        result = `
            <p style="margin-top: 20px; padding: 15px; background: #e3f2fd; border-radius: 5px;">
                <strong>Resposta registrada!</strong> Continue respondendo para obter um resultado mais completo.
            </p>
        `;
    } else if (total === 4) {
        const highest = Object.keys(vocationalScores).reduce((a, b) => 
            vocationalScores[a] > vocationalScores[b] ? a : b
        );
        
        let recommendation = '';
        switch(highest) {
            case 'tech':
                recommendation = 'Tecnologia e Desenvolvimento - Carreiras em programação, desenvolvimento web, ciência de dados.';
                break;
            case 'business':
                recommendation = 'Negócios e Administração - Carreiras em gestão, empreendedorismo, análise de negócios.';
                break;
            case 'creative':
                recommendation = 'Criatividade e Artes - Carreiras em design, marketing criativo, conteúdo.';
                break;
            case 'social':
                recommendation = 'Área Social - Carreiras em educação, saúde, assistência social, recursos humanos.';
                break;
        }
        
        result = `
            <div style="margin-top: 20px; padding: 20px; background: #c8e6c9; border-radius: 5px; border-left: 4px solid #4caf50;">
                <h3 style="color: #2e7d32;">📊 Seu Resultado Preliminar:</h3>
                <p><strong>${recommendation}</strong></p>
                <p style="font-size: 14px; margin-top: 10px;">Para um teste mais completo, visite plataformas especializadas em orientação vocacional.</p>
            </div>
        `;
        
        // Reset for next test
        vocationalScores = { tech: 0, business: 0, creative: 0, social: 0 };
    }
    
    const testContainer = document.querySelector('.test-container');
    if (result) {
        testContainer.innerHTML += result;
    }
}

// Interview Simulator
function showNextQuestion(questionNumber) {
    const currentQuestion = document.getElementById(`question${questionNumber}`);
    const nextQuestion = document.getElementById(`question${questionNumber + 1}`);
    
    if (currentQuestion) {
        currentQuestion.style.display = 'none';
    }
    
    if (nextQuestion) {
        nextQuestion.style.display = 'block';
    }
}

function finishInterview() {
    document.getElementById('question3').style.display = 'none';
    document.getElementById('interviewFeedback').style.display = 'block';
}

function resetInterview() {
    document.getElementById('question1').style.display = 'block';
    document.getElementById('question2').style.display = 'none';
    document.getElementById('question3').style.display = 'none';
    document.getElementById('interviewFeedback').style.display = 'none';
    
    const textareas = document.querySelectorAll('.interview-response');
    textareas.forEach(textarea => {
        textarea.value = '';
    });
}

// Form Submission
function handleSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Validation
    if (!name || !email || !message) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    if (!isValidEmail(email)) {
        alert('Por favor, insira um email válido.');
        return;
    }
    
    // In a real application, you would send this data to a server
    console.log({
        name: name,
        email: email,
        phone: document.getElementById('phone').value,
        message: message,
        timestamp: new Date().toLocaleString('pt-BR')
    });
    
    // Show success message
    const form = document.querySelector('.contact-form');
    const successMessage = document.createElement('div');
    successMessage.style.cssText = `
        padding: 15px;
        background: #c8e6c9;
        border-left: 4px solid #4caf50;
        color: #2e7d32;
        border-radius: 5px;
        margin-bottom: 1rem;
    `;
    successMessage.innerHTML = `
        <h3>✅ Mensagem Enviada!</h3>
        <p>Obrigado por entrar em contato conosco, ${name}. Em breve você receberá uma resposta no email ${email}.</p>
    `;
    
    form.parentElement.insertBefore(successMessage, form);
    form.style.display = 'none';
    
    // Reset form after 3 seconds
    setTimeout(() => {
        form.reset();
        form.style.display = 'block';
        successMessage.remove();
    }, 3000);
}

// Email Validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Smooth Scroll Enhancement
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Career Mentor Website Loaded Successfully! 🚀');
    
    // Add animation to cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.about-card, .service-card, .resource-item').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
});