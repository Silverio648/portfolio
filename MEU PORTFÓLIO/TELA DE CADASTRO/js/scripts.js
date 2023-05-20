class validator {
          this.validations = [
            "data-min-length",
            "data-max-length",
            "data-email-validate",
            "data-only-letters",
            "data-required",
            "data-equal",
        ];
    }

    // INICIAR VALIDAÇÃO DE TODOS OS CAMPOS
    validate(form) {
        // RESGATA TODAS AS VALIDAÇÕES
        let currentValidations = document.querySelectorAll(
            "form .error-validation"
        );

        if (currentValidations.length > 0) {
            this.cleanValidations(currentValidations);
        }

        // PEGAR OS INPUTS
        let inputs = form.getElementsByTagName("input");

        // TRANSFORMO UMA HTMLCOLLRCTION -> ARRAY
        let inputsArray = [...inputs];

        // LOOP NOS INPUTS E VALIDAÇÃO MEDIANTE AO QUE FOR ENCONTRADO
        inputsArray.forEach(function (input) {

            // LOOP EM TODAS AS VALIDAÇÕES EXISTENTES
            for (let i = 0; this.validations.length > i; i++) {
                // VERIFICA SE A VALIDAÇÃO ATUAL EXISTE NO INPUT
                if (input.getAttribute(this.validations[i]) != null) {
                    // LIMPANDO A STRING PARA VIRAR UM MÉTODO
                    let method = this.validations[i]
                        .replace("data-", "")
                        .replace("-", "");

                    //  VALOR DO INPUT
                    let value = input.getAttribute(this.validations[i]);

                    // INVOCAR O MÉTODO
                    this[method](input, value);
                }
            }
        }, this);
    }

    // VERIFICA SE UM INPUT TEM UM NÚMERO MÍNIMO DE CARACTERES
    minlength(input, minValue) {
        let inputLength = input.value.length;

        let errorMessage = "O campo precisa ter pelo menos ${minValue} caracteres";

        if (inputLength < minValue) {
            this.printMessage(input, errorMessage);
        }
    }

    // VERIFICA SE INPUT PASSOU DO LIMITE DE CARACTERES;
    maxlength(input, maxValue) {
        let inputLength = input.value.length;

        let errorMessage = "O campo precisa ter menos que ${maxValue} caracteres";

        if (inputLength > maxValue) {
            this.printMessage(input, errorMessage);
        }
    }

    // MÉTODO PARA VALIDAR EMAILS COM REGEX;
    emailvalidate(input) {

        let re = /\S+@\S+\.\S+/;

        let email = input.value;

        let errorMessage = `Insira um e-mail no padrão matheus@email.com`;

        if (!re.test(email)) {
            this.printMessage(input, errorMessage)
        }
    }

    // MÉTODO PARA VALIDAR SE O CAMPO TEM APENAS LETRAS COM REGEX;
    onlyletters(input) {

        let re = /^[A-Za-z]+$/;;

        let inputValue = input.value;

        let errorMessage = `Este campo não aceita números nem caracteres especiais`;

        if (!re.test(inputValue)) {
            this.printMessage(input, errorMessage);
        }

        // MÉTODO PARA IMPRIMIR MENSAGENS DE ERRO NA TELA;
        printMessage(input, msg) {

            // QUANTIDADE DE ERROS;
            let errorsQty = input.parentNode.querySelector('.error-validation');

            if (errorsQty === null) {
                let template = document.querySelector('.error-validation').cloneNode(true);

                template.textContent = msg;

                let inputParent = input.parentNode;

                template.classList.remove('template');

                inputParent.appendChild(template);
            }
        }

        // MÉTODO PARA EXIBIR INPUTS QUE SÃO NECESSÁRIOS;
        required(input) {

            let errorMessage = `Este campo é obrigatório`;

                this.printMessage(input, errorMessage);
            }


        }

        // VERIFICA SE DOIS CAMPOS SÃO IGUAIS;
        equal(input, inputName) {

            let inputToCompare = document.getElementsByName(inputName)[0];

            console.log(inputToCompare);

            let inputToCompareName = inputToCompare.getAttribute("name");;

            let errorMessage = `Este campo precisa estar igual ao ${inputToCompareName}`;

            if (input.value != inputToCompare.value) {
                this.printMessage(input, errorMessage);
            }
        }

        // VALIDA O CAMPO DE SENHA;
        passwordvalidate(input) {

            // TRANSFORMAR STRING EM UM ARRAY;
            let charArr = input.value.split("");

            let uppercases = 0;
            let numbers = 0;

            for (let i = 0; charArr.length > i; i++) {
                if (charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))) {
                    uppercases++;
                } else if (!isNaN(parseInt(charArr[i]))) {
                    numbers++;
                }
            }

            if(uppercases === 0 || numbers === 0)  {
                let errorMessage = `A senha precisa de um caractere maiúsculo e um número`;

                this.printMessage(input, errorMessage);
            }

        }

        // LIMPA AS VALIDAÇÕES DA TELA
        cleanValidations(validations) {
            validations.forEach((el) => el.remove());
        }
    }

let form = document.getElementById("register-form");
let submit = document.getElementById("btn-submit");

let validator = new validator();

// EVENTO QUE DISPARA AS VALIDAÇÕES
submit.addEventListener("click", function (e) {
    e.preventDefault();
    validator.validate(form);
});
