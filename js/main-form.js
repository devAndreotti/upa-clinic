// Sistema de validação
const form = document.getElementById('contact-form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const subject = document.getElementById('subject');

// Adiciona um listener para o evento de submit do formulário
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (checkInputs()) {
        console.log('Formulário válido, pronto para enviar');
        // form.submit(); // Descomentar linha quando estiver pronto para enviar o formulário
    }
});

// Função principal para verificar todos os inputs
function checkInputs() {
    let isValid = true;
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const phoneValue = phone.value.trim();
    const subjectValue = subject.value;

    // Verifica o campo de nome
    if (usernameValue === '') {
        setErrorFor(username, 'Por favor, preencha seu nome');
        isValid = false;
    } else if (usernameValue.length < 2) {
        setErrorFor(username, 'O nome deve ter no mínimo 2 caracteres');
        isValid = false;
    } else if (usernameValue.length > 50) {
        setErrorFor(username, 'O nome deve ter no máximo 50 caracteres');
        isValid = false;
    } else if (/\d/.test(usernameValue)) {
        setErrorFor(username, 'O nome não deve conter números');
        isValid = false;
    } else {
        setSuccessFor(username);
    }

    // Verifica o campo de email
    if (emailValue === '') {
        setErrorFor(email, 'Por favor, preencha seu e-mail');
        isValid = false;
    } else if (!isEmail(emailValue)) {
        setErrorFor(email, 'Por favor, insira um e-mail válido');
        isValid = false;
    } else if (emailValue.length > 50) {
        setErrorFor(email, 'O e-mail deve ter no máximo 50 caracteres');
        isValid = false;
    } else {
        setSuccessFor(email);
    }

    // Verifica o campo de telefone
    if (phoneValue === '') {
        setErrorFor(phone, 'Por favor, preencha seu telefone');
        isValid = false;
    } else if (!isValidPhone(phoneValue)) {
        setErrorFor(phone, 'Por favor, insira um número válido no formato (XX) XXXXX-XXXX');
        isValid = false;
    } else {
        setSuccessFor(phone);
    }

    // Verifica o campo de assunto
    if (subjectValue === '' || subjectValue === 'default') {
        setErrorFor(subject, 'Por favor, selecione um assunto');
        isValid = false;
    } else {
        setSuccessFor(subject);
    }

    return isValid;
}

// Função para definir o estado de erro de um campo
function setErrorFor(input, message) {
    const formGroup = input.parentElement;
    const small = formGroup.querySelector('small');
    formGroup.className = 'form-group error';
    small.innerText = message;
}

// Função para definir o estado de sucesso de um campo
function setSuccessFor(input) {
    const formGroup = input.parentElement;
    formGroup.className = 'form-group success';
}

// Função para validar o formato do email
function isEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Função para validar o formato do telefone
function isValidPhone(phone) {
    // Esta regex aceita apenas o formato (XX) XXXXX-XXXX
    return /^\(\d{2}\)\s\d{5}-\d{4}$/.test(phone);
}

// Adicionar limitadores de caracteres
username.addEventListener('input', () => {
    username.value = username.value.replace(/\d/g, ''); // Remove números
    if (username.value.length > 60) {
        username.value = username.value.slice(0, 60);
    }
});

email.addEventListener('input', () => {
    if (email.value.length > 60) {
        email.value = email.value.slice(0, 60);
    }
});

// Formatar o telefone enquanto o usuário digita
phone.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) {
        value = value.slice(0, 11);
    }
    if (value.length > 2) {
        value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    }
    if (value.length > 10) {
        value = `${value.slice(0, 10)}-${value.slice(10)}`;
    }
    e.target.value = value;
});

// Adiciona um listener para o campo de assunto
subject.addEventListener('change', () => {
    if (subject.value === '' || subject.value === 'default') {
        setErrorFor(subject, 'Por favor, selecione um assunto');
    } else {
        setSuccessFor(subject);
    }
});