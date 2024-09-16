function FooterFormValidation() {
    // Seleciona os elementos do formulário
    const form = document.getElementById('contact-footer-form');
    const email = document.getElementById('footer-email');
    const phone = document.getElementById('footer-phone');

    // Adiciona um listener para o evento de submit do formulário
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (checkInputs()) {
            console.log('Formulário válido, pronto para enviar');
            // form.submit(); // Descomente esta linha quando estiver pronto para enviar o formulário
        }
    });

    // Função principal para verificar todos os inputs
    function checkInputs() {
        let isValid = true;
        const emailValue = email.value.trim();
        const phoneValue = phone.value.trim();

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
            setErrorFor(phone, 'Insira um número válido: (XX) XXXXX-XXXX');
            isValid = false;
        } else {
            setSuccessFor(phone);
        }

        return isValid;
    }

    // Função para definir o estado de erro de um campo
    function setErrorFor(input, message) {
        const formGroup = input.parentElement;
        const small = formGroup.querySelector('small');
        formGroup.className = 'form-footer-group error';
        small.innerText = message;
    }

    // Função para definir o estado de sucesso de um campo
    function setSuccessFor(input) {
        const formGroup = input.parentElement;
        formGroup.className = 'form-footer-group success';
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

    // Adiciona listeners para todos os campos
    email.addEventListener('input', validateEmail);
    phone.addEventListener('input', validatePhone);

    // Funções de validação para cada campo
    function validateEmail() {
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
    }

    function validatePhone() {
        const phoneValue = phone.value.trim();
        if (phoneValue === '') {
            setErrorFor(phone, 'Por favor, preencha seu telefone');
        } else if (!isValidPhone(phoneValue)) {
            setErrorFor(phone, 'Insira um número válido: (XX) XXXXX-XXXX');
        } else {
            setSuccessFor(phone);
        }
    }
}

// Inicializa a validação do formulário do rodapé
FooterFormValidation();