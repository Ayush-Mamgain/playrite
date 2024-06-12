
export default function inputHandler(event, setFormData) {
    setFormData(prevData => {
        return {
            ...prevData,
            [event.target.name]: event.target.value
        }
    });
}