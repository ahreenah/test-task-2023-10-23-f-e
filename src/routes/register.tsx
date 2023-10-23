import React, {FormEvent, useState} from 'react';
import useUserStore from '../useUserStore';
import {useNavigate} from 'react-router-dom'
import {Button} from 'react-aria-components';
import FormField, {FormError} from '../components/InputField';


const validateForm = ({login, password, passwordRepeat}: {login: string, password: string, passwordRepeat: string}) => {
  let errors = []
  if (login.length === 0)
    errors.push({key: 'login', message: 'Required field'})
  else if (login.length < 5)
    errors.push({key: 'login', message: 'Login must be at leat 5 characters in length'})
  if (passwordRepeat.length === 0)
    errors.push({key: 'passwordRepeat', message: 'Required field'})
  else if (password !== passwordRepeat)
    errors.push({key: 'passwordRepeat', message: 'Password and password repeat don\'t match'})
  if (password.length === 0)
    errors.push({key: 'password', message: 'Required field'})
  else if (password.length < 8)
    errors.push({key: 'password', message: 'Password must be at leat 5 characters in length'})
  return errors
}


const RegisterForm = () => {
  const userStore = useUserStore();
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')
  const [formErrors, setFormErrors] = useState<FormError[]>([])
  const navigate = useNavigate()
  const onLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('in r', login, password)
    const errors = validateForm({login, password, passwordRepeat})
    setFormErrors(errors)
    if (errors.length === 0) {
      let res = await userStore.register(login, password)
      console.log(res)
      if (res.status) {
        navigate('/login')
      }
      else {
        setFormErrors(res.message)
      }
    }
  }
  return <>
    <form onSubmit={onLogin} autoComplete='off'>

      <FormField
        value={login}
        onChange={setLogin}
        errors={formErrors}
        label='Login'
        field='login'
        type='text'
        autoComplete='new-email'
      />

      <FormField
        value={password}
        onChange={setPassword}
        errors={formErrors}
        field='password'
        label='Enter password'
        type='password'
        autoComplete='new-password'
      />


      <FormField
        value={passwordRepeat}
        onChange={setPasswordRepeat}
        errors={formErrors}
        field='passwordRepeat'
        label='Repeat password'
        type='password'
        autoComplete='new-password'
      />

      <Button type='submit'>
        Register
      </Button>

    </form>
  </>
}

export default RegisterForm
