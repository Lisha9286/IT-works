let login, password, passwordRepeat, email, errorMessage1, errorMessage2, errorMessage3, errorMessage4;

function getVariables() {
    login = document.querySelector("#username");
    password = document.querySelector("#password");
    passwordRepeat = document.querySelector("#passwordRepeat");
    email = document.querySelector("#email");
    errorIcon = `<svg aria-hidden="true" class="stUf5b LxE1Id" fill="currentColor" focusable="false" width="16px" height="16px" viewBox="0 0 24 24" xmlns="https://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path></svg>`;
    errorMessage1 = document.querySelector("#errorMessage_1");
    errorMessage2 = document.querySelector("#errorMessage_2");
    errorMessage3 = document.querySelector("#errorMessage_3");
    errorMessage4 = document.querySelector("#errorMessage_4");
}

function checkLogin() {
    let loginFormat = /^[a-zA-Z0-9_.-]*$/;
    getVariables();
    if (login.validity.valueMissing) {
        errorMessage1.innerHTML = errorIcon + `<span class="errorText">Укажите ваш Логин</span>`;
        login.classList.add("input-border");
        errorMessage1.classList.add("errorMessage");
    } else if (!login.value.match(loginFormat)) {
        errorMessage1.innerHTML = errorIcon + `<span class="errorText">Логин может включать латинские буквы (a-z), цифры, нижнее подчеркивание (_), тире (-) и точку (.).</span>`;
        login.classList.add("input-border");
        errorMessage1.classList.add("errorMessage");
    } else if (login.validity.tooShort || login.validity.tooLong) {
        errorMessage1.innerHTML = errorIcon + `<span class="errorText">Логин должен содержать от 5 до 20 символов.</span>`;
        login.classList.add("input-border");
        errorMessage1.classList.add("errorMessage");
    } else {
        return true;
    }
}

function checkPassword() {
    getVariables();
    if (password.validity.valueMissing) {
        errorMessage2.innerHTML = errorIcon + `<span class="errorText">Введите пароль</span>`;
        password.classList.add("input-border");
        errorMessage2.classList.add("errorMessage");
    } else if (password.validity.tooShort) {
        errorMessage2.innerHTML = errorIcon + `<span class="errorText">Пароль не может быть короче 6 символов</span>`;
        password.classList.add("input-border");
        errorMessage2.classList.add("errorMessage");
    } else {
        return true;
    }
}

function checkPasswordRepeat() {
    getVariables();
    if (passwordRepeat.validity.valueMissing) {
        errorMessage3.innerHTML = errorIcon + `<span class="errorText">Повторите пароль</span>`;
        passwordRepeat.classList.add("input-border");
        errorMessage3.classList.add("errorMessage");
    } else if (password.value != passwordRepeat.value) {
        errorMessage3.innerHTML = errorIcon + `<span class="errorText">Пароли не совпадают. Повторите попытку.</span>`;
        passwordRepeat.classList.add("input-border");
        errorMessage3.classList.add("errorMessage");
    } else {
        return true;
    }
}

function checkEmail() {
    let emailFormat = /^((([0-9A-Za-z]{1}[-0-9A-z\.]{0,30}[0-9A-Za-z]?)|([0-9А-Яа-я]{1}[-0-9А-я\.]{0,30}[0-9А-Яа-я]?))@([-A-Za-z]{1,}\.){1,}[-A-Za-z]{2,})$/;
    getVariables();
    if (email.validity.valueMissing) {
        errorMessage4.innerHTML = errorIcon + `<span class="errorText">Укажите ваш Email</span>`;
        email.classList.add("input-border");
        errorMessage4.classList.add("errorMessage");
    } else if (!email.value.match(emailFormat)) {
        errorMessage4.innerHTML = errorIcon + `<span class="errorText">Email введен неверно</span>`;
        email.classList.add("input-border");
        errorMessage4.classList.add("errorMessage");
    } else {
        return true;
    }
}

function sendUser(event) {
    event.preventDefault();
    getVariables();
    let errors = document.querySelectorAll(".errorMessage");
    let borders = document.querySelectorAll(".input-border");

    let user = {
        login: login.value,
        password: password.value,
        email: email.value,
    };

    errors.forEach((element) => {
        element.innerHTML = "";
        element.classList.remove("errorMessage");
    });

    borders.forEach((element) => {
        element.classList.remove("input-border");
    });

    checkLogin();
    checkPassword();
    checkPasswordRepeat();
    checkEmail();

    if (checkLogin() && checkPassword() && checkEmail()) {
        document.querySelector("#success").innerHTML = "Данные успешно отправлены!<br/> Проверьте ваш Email и подтвердите регистрацию.";
        let inputs = document.querySelectorAll("input");
        sendPost(user);
        for (const input of inputs) {
            input.value = "";
        }
    }
}

document.querySelector("#register").addEventListener("click", sendUser);

function sendPost(user) {
    fetch("https://httpbin.org/post", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application / json; charset=utf-8",
        },
    })
        .then((response) => response.json())
        .then((user) => {
            console.log(user);
        })
        .catch((error) => console.log(error));
}
