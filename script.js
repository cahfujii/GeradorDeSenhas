const passwordLengthSlider = document.getElementById('password-length');
const lengthValueSpan = document.getElementById('length-value');
const includeUppercaseCheckbox = document.getElementById('include-uppercase');
const includeLowercaseCheckbox = document.getElementById('include-lowercase');
const includeNumbersCheckbox = document.getElementById('include-numbers');
const includeSpecialCheckbox = document.getElementById('include-special');
const generateButton = document.getElementById('generate-button');
const generatedPasswordField = document.getElementById('generated-password');
const copyButton = document.getElementById('copy-button');

const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const specialChars = '!@#$%^&*()-_=+[]{}|;:,.<>?';

passwordLengthSlider.addEventListener('input', () => {
    lengthValueSpan.textContent = passwordLengthSlider.value;
});

generateButton.addEventListener('click', () => {
    const length = parseInt(passwordLengthSlider.value);
    let possibleChars = '';
    let generatedPassword = '';

    if (includeUppercaseCheckbox.checked) {
        possibleChars += uppercaseChars;
    }
    if (includeLowercaseCheckbox.checked) {
        possibleChars += lowercaseChars;
    }
    if (includeNumbersCheckbox.checked) {
        possibleChars += numberChars;
    }
    if (includeSpecialCheckbox.checked) {
        possibleChars += specialChars;
    }

    if (possibleChars.length === 0) {
        alert('Por favor, selecione pelo menos um tipo de caractere para gerar a senha.');
        generatedPasswordField.value = '';
        return;
    }

    const randomBytes = new Uint32Array(length);
    window.crypto.getRandomValues(randomBytes);

    for (let i = 0; i < length; i++) {
        const randomIndex = randomBytes[i] % possibleChars.length;
        generatedPassword += possibleChars.charAt(randomIndex);
    }

    generatedPasswordField.value = generatedPassword;
});

copyButton.addEventListener('click', () => {
    const password = generatedPasswordField.value;
    if (password) {
        const tempInput = document.createElement('textarea');
        tempInput.value = password;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        alert('Senha copiada para a área de transferência!');
    } else {
        alert('Nenhuma senha para copiar.');
    }
});
