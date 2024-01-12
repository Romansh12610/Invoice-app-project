
type ValidateForm = (formRef: React.RefObject<HTMLFormElement>) => boolean;

const validateForm: ValidateForm = (formEl) => {
    const form = formEl.current;

    return form.reportValidity();
};

export default validateForm;