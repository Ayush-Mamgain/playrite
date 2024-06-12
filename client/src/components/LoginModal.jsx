import React, { useState } from 'react'
import Input from './Input'
import Button from './Button'
import inputHandler from '../utils/inputHandler'
import { login } from '../apiServices/authServices'
import Loading from './Loading'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { loginUser } from '../features/authSlice'
import Error from './Error'

const LoginModal = () => {
    const disptach = useDispatch()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false) //can loading be done globally through slice?
    const [error, setError] = useState(null)

    const submitHandler = (event) => {
        event.preventDefault()
        const toastId = toast.loading('Loading')
        setLoading(true)
        const bodyData = { ...formData } //cloning the formData because we don't want to send the
        login(bodyData)
            .then((res) => {
                //this is the raw res received from server
                console.log(data)
                toast.success('Login successful')
                setData(res.data)
                disptach(loginUser(res.data))
            })
            .catch((error) => {
                setError(error)
                toast.error(error.message)
            })
            .finally(() => {
                setLoading(false)
                toast.dismiss(toastId)
                setFormData({
                    email: '',
                    password: '',
                })
            })
    }

    if (loading) return <Loading />
    // if(error.statusCode === 500) return <Error error={error}/> --> for server side errors
    return (
        <div>
            Sign In
            <form onSubmit={submitHandler}>
                <Input
                    label="Email"
                    type="email"
                    onMutate={(event) => inputHandler(event, setFormData)}
                    name="email"
                    value={formData.email}
                />
                <Input
                    label="Password"
                    type="password"
                    onMutate={(event) => inputHandler(event, setFormData)}
                    name="password"
                    value={formData.password}
                />
                <Button>Sign In</Button>
            </form>
        </div>
    )
}

export default LoginModal
