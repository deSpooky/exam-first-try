import { cn } from "cn"

import { Button } from "#/components/ui/button.tsx"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "#/components/ui/field.tsx"
import { Input } from "#/components/ui/input.tsx"
import { LoginFn } from '../lib/login';
import { useServerFn } from "@tanstack/react-start";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const usLoginFn = useServerFn(LoginFn)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.stopPropagation()
  
    const form = new FormData(event.currentTarget)
    
    const login = form.get('login')!.toString()
    const password = form.get('password')!.toString()

    const result = await usLoginFn({data: {login, password}})
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleSubmit}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Войти в свой аккаунт</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Введите свой логин и пароль 
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="login">Логин</FieldLabel>
          <Input id="login" type="text" placeholder="m@example.com" required />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Пароль</FieldLabel>
                   </div>
          <Input id="password" type="password" required />
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
