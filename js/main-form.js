// Define um módulo para validação do formulário
const FormValidation = (() => {
    // Seletores dos elementos do formulário
    const form = document.getElementById('contact-form');
    const subject = document.getElementById('subject');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');

    // Inicializa o módulo
    const init = () => {
        form.addEventListener('submit', handleSubmit);
        subject.addEventListener('change', validateSubject);
        username.addEventListener('input', validateUsername);
        email.addEventListener('input', validateEmail);
        phone.addEventListener('input', validatePhone);

        // Adiciona limitadores e formatadores de caracteres
        username.addEventListener('input', limitUsername);
        email.addEventListener('input', limitEmail);
        phone.addEventListener('input', formatPhone);
    };

    // Função de envio do formulário
    const handleSubmit = (e) => {
        e.preventDefault();
        if (checkInputs()) {
            console.log('Formulário válido, pronto para enviar');
            // form.submit(); // Descomentar linha quando estiver pronto para enviar o formulário
        }
    };

    // Função principal para verificar todos os inputs
    const checkInputs = () => {
        let isValid = true;
        const subjectValue = subject.value;
        const usernameValue = username.value.trim();
        const emailValue = email.value.trim();
        const phoneValue = phone.value.trim();

        if (subjectValue === '' || subjectValue === 'default') {
            setErrorFor(subject, 'Por favor, selecione um assunto');
            isValid = false;
        } else {
            setSuccessFor(subject);
        }

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

        if (phoneValue === '') {
            setErrorFor(phone, 'Por favor, preencha seu telefone');
            isValid = false;
        } else if (!isValidPhone(phoneValue)) {
            setErrorFor(phone, 'Insira um número válido: (XX) XXXXX-XXXX');
            isValid = false;
        } else {
            setSuccessFor(phone);
        }

        return isValid;
    };

    // Função para definir o estado de erro de um campo
    const setErrorFor = (input, message) => {
        const formGroup = input.parentElement;
        const small = formGroup.querySelector('small');
        formGroup.className = 'form-group error';
        small.innerText = message;
    };

    // Função para definir o estado de sucesso de um campo
    const setSuccessFor = (input) => {
        const formGroup = input.parentElement;
        formGroup.className = 'form-group success';
    };

    // Função para validar o formato do email
    const isEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // Função para validar o formato do telefone
    const isValidPhone = (phone) => /^\(\d{2}\)\s\d{5}-\d{4}$/.test(phone);

    // Limitar caracteres do nome de usuário
    const limitUsername = () => {
        username.value = username.value.replace(/\d/g, ''); // Remove números
        if (username.value.length > 60) {
            username.value = username.value.slice(0, 60);
        }
    };

    // Limitar caracteres do e-mail
    const limitEmail = () => {
        if (email.value.length > 60) {
            email.value = email.value.slice(0, 60);
        }
    };

    // Formatar o telefone enquanto o usuário digita
    const formatPhone = (e) => {
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
    };

    // Valida o campo de assunto
    const validateSubject = () => {
        if (subject.value === '' || subject.value === 'default') {
            setErrorFor(subject, 'Por favor, selecione um assunto');
        } else {
            setSuccessFor(subject);
        }
    };

    // Valida o campo de nome
    const validateUsername = () => {
        const usernameValue = username.value.trim();
        if (usernameValue === '') {
            setErrorFor(username, 'Por favor, preencha seu nome');
        } else if (usernameValue.length < 2) {
            setErrorFor(username, 'O nome deve ter no mínimo 2 caracteres');
        } else if (usernameValue.length > 50) {
            setErrorFor(username, 'O nome deve ter no máximo 50 caracteres');
        } else if (/\d/.test(usernameValue)) {
            setErrorFor(username, 'O nome não deve conter números');
        } else {
            setSuccessFor(username);
        }
    };

    // Valida o campo de e-mail
    const validateEmail = () => {
        const emailValue = email.value.trim();
        if (emailValue === '') {
            setErrorFor(email, 'Por favor, preencha seu e-mail');
        } else if (!isEmail(emailValue)) {
            setErrorFor(email, 'Por favor, insira um e-mail válido');
        } else if (emailValue.length > 50) {
            setErrorFor(email, 'O e-mail deve ter no máximo 50 caracteres');
        } else {
            setSuccessFor(email);
        }
    };

    // Valida o campo de telefone
    const validatePhone = () => {
        const phoneValue = phone.value.trim();
        if (phoneValue === '') {
            setErrorFor(phone, 'Por favor, preencha seu telefone');
        } else if (!isValidPhone(phoneValue)) {
            setErrorFor(phone, 'Insira um número válido: (XX) XXXXX-XXXX');
        } else {
            setSuccessFor(phone);
        }
    };

    // Retorna o módulo exposto
    return {
        init
    };
})();

// Inicializa o módulo quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    FormValidation.init();
});