// Bootstrap
import "bootstrap";

class Registration {
    constructor(form, fields) {
        this.form = form;
        this.fields = fields;
        this.validateOnSubmit();
    }

    validateOnSubmit() {
        let self = this;

        this.form.addEventListener("submit", (e) => {
            e.preventDefault();
            let error = 0;
            self.fields.forEach((field) => {
                const input = document.querySelector(`#${field}`);
                if (self.validateFields(input) == false) {
                    error++;
                }
            });
            if (error == 0) {
                console.log("success");
                localStorage.setItem("username", document.querySelector("#username").value);
                localStorage.setItem("password", document.querySelector("#password").value);
                this.form.submit();
            }
        });
    }

    validateFields(field) {
        const errorIcon = `<svg aria-hidden="true" class="stUf5b LxE1Id" fill="currentColor" focusable="false" width="16px" height="16px" viewBox="0 0 24 24" xmlns="https://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path></svg>`;

        if (field.value.trim() == "") {
            this.setStatus(field, `${errorIcon}<span class="errorText">Укажите ваш ${field.previousElementSibling.innerText}</span>`, "error");
            return false;
        } else {
            if (field.id == "username") {
                const fieldFormat = /^[a-zA-Z0-9_.-]*$/;
                if (!field.value.match(fieldFormat)) {
                    this.setStatus(field, `${errorIcon}<span class="errorText">Логин указан неверно</span></span>`, "error");
                    return false;
                }
                if (field.validity.tooShort || field.validity.tooLong) {
                    this.setStatus(field, `${errorIcon}<span class="errorText">Логин должен содержать от 5 до 20 символов.`, "error");
                    return false;
                }
            }
            if (field.id == "password") {
                if (field.value.length < 6) {
                    this.setStatus(field, `${errorIcon}<span class="errorText">Пароль не может быть короче 6 символов</span>`, "error");
                    return false;
                } else {
                    this.setStatus(field, null, "success");
                    return true;
                }
            } else {
                this.setStatus(field, null, "success");
                return true;
            }
        }
    }

    setStatus(field, message, status) {
        const errorMessage = field.parentElement.querySelector(".error-message");

        if (status == "success") {
            errorMessage.innerHTML = "";
            field.classList.remove("input-border");
        }

        if (status == "error") {
            errorMessage.innerHTML = message;
            field.classList.add("input-border");
            errorMessage.classList.add("errorMessage");
        }
    }
}

const form = document.querySelector(".sign-up_form");
if (form) {
    const fields = ["username", "password"];
    const validator = new Registration(form, fields);
}
