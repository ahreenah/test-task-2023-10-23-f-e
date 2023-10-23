
import React, {FormEvent, useState} from 'react';
import useUserStore from '../useUserStore';
import {useNavigate} from 'react-router-dom'
import {Button} from 'react-aria-components'
import FormField, {FormError} from '../components/InputField';

const LoginForm = () => {
  const userStore = useUserStore();
  const [login, setLogin] = useState('')
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [formErrors, setFormErrors] = useState<FormError[]>([])

  const onLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (await userStore.login(login, password)) {
      setFormErrors([])
      navigate('/')
    } else {
      setFormErrors([{key: '_form', message: ''}])
    }
  }

  return <>

    <form onSubmit={onLogin} autoComplete='off'>
      <FormField
        value={login}
        onChange={setLogin}
        errors={formErrors}
        field='password'
        label='Login'
        type='text'
        autoComplete='new-password'
      />

      <FormField
        value={password}
        onChange={setPassword}
        errors={formErrors}
        field='password'
        label='Password'
        type='password'
        autoComplete='new-password'
      />

      <Button type='submit'>
        Login
      </Button>
    </form>
  </>
}

export default LoginForm
