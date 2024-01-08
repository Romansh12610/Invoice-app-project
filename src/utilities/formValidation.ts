
type ValidateForm = (formElement: EventTarget & HTMLFormElement) => boolean;

const validateForm: ValidateForm = (formEl) => {
    /* const inputCollection: NodeListOf<HTMLInputElement> = formEl.querySelectorAll('input[required]');

    let isFormValid = true;

    for (const input of inputCollection) {
        if (!input.validity.valid) {
            isFormValid = false;
        }
    };

    return isFormValid; */

    return formEl.reportValidity();
};

export default validateForm;