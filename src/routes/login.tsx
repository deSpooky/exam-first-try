import { LoginForm } from '#/components/login-form'
import { Button } from '#/components/ui/button'
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import { LoginFn } from '#/lib/login'
import { loginAdminFn } from '#/lib/registerFn'
import { createFileRoute } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { useState } from 'react'

export const Route = createFileRoute('/login')({
  component: LoginPage,
})

function LoginPage() {
  const navigate = Route.useNavigate()
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setError(null)
  
    const form = new FormData(event.currentTarget)
    const login = form.get('login')!.toString()
    const password = form.get('password')!.toString()

    if (login === 'Admin' && password === 'KorokNET') {
      const result = await loginAdminFn({ data: { login, password } })

      if ('success' in result) {
        await navigate({ to: '/admin' })
      } else {
        setError(result.error)
      }
      return
    }

    const result = await LoginFn({ data: { login, password } })

    if ('success' in result) {
      await navigate({ to: '/profile' })
    } else {
      setError(result.error)
    }
  }

  return (
    <form className='max-w-xl mx-auto' action="" method="post" onSubmit={handleSubmit}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Войти в свой аккаунт</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Введите свой логин и пароль 
          </p>
        </div>

        {error && (
          <div className="text-sm font-medium text-destructive text-center bg-destructive/10 p-2 rounded">
            {error}
          </div>
        )}

        <Field>
          <FieldLabel htmlFor="login">Логин</FieldLabel>
          <Input id="login" name="login" type="text" placeholder="m@example.com" required />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Пароль</FieldLabel>
          </div>
          <Input id="password" name='password' type="password" required />
        </Field>
        <Field>
          <Button type="submit">Войти</Button>
        </Field>
        <FieldSeparator></FieldSeparator>
        <Field>
          <FieldDescription className="text-center">
            Еще не зарегистрированы?{" "}
            <a href="/signup" className="underline underline-offset-4">
              Регистрация
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}