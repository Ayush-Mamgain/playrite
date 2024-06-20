//only for strings
const resetForm = (formData, setFormData) => {
    const emptyFormData = Object.keys(formData).reduce((acc, key) => {
        acc[key] = '';
        return acc;
    }, {});
    setFormData(emptyFormData);
};

export default resetForm;