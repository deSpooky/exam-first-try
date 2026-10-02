import { type SubmitEvent, useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { registerFn } from '../lib/registerFn'
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import { Button } from '#/components/ui/button'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '#/components/ui/carousel'
import React from 'react'
import Autoplay from "embla-carousel-autoplay"

export const Route = createFileRoute('/signup')({
  component: RegisterPage,
})

function RegisterPage() {
  const navigate = Route.useNavigate()
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault()
    event.stopPropagation()
    const form = new FormData(event.target)
    const login = form.get('login')!.toString()
    const password = form.get('password')!.toString()
    const email = form.get('email')!.toString()
    const phone = form.get('phone')!.toString()
    const fullname = form.get('fullname')!.toString()

    const result = await registerFn({ data: { login, password, email, phone, fullname }})

    if ('success' in result) {
      await navigate({ to: '/login' })
    } else {
      setError(result.error)
    }
  }

  const plugin = React.useRef(
    Autoplay({ delay: 3000 })
  )

  return (
    <div className="flex flex-col lg:flex-row items-stretch justify-center min-h-screen w-full overflow-x-hidden">
      <div className="w-full lg:w-1/2 relative bg-muted h-[400px] lg:h-screen overflow-hidden">
        <Carousel plugins={[plugin.current]} className="w-full h-full"  >
          <CarouselContent className="h-full flex ml-0">
            <CarouselItem className="basis-full w-full h-full p-0 pl-0 flex-shrink-0 flex-grow-0">
              <div className="w-full h-full">
                <img src="src\assets\slider\image13.webp" alt="1" className="w-full h-full object-cover block" />
              </div>
            </CarouselItem>
            <CarouselItem className="basis-full w-full h-full p-0 pl-0 flex-shrink-0 flex-grow-0">
              <div className="w-full h-full">
                <img src="src\assets\slider\image09.webp" alt="2" className="w-full h-full object-cover block" />
              </div>
            </CarouselItem>
            <CarouselItem className="basis-full w-full h-full p-0 pl-0 flex-shrink-0 flex-grow-0">
              <div className="w-full h-full">
                <img src="src\assets\slider\image08.webp" alt="3" className="w-full h-full object-cover block" />
              </div>
            </CarouselItem>
            <CarouselItem className="basis-full w-full h-full p-0 pl-0 flex-shrink-0 flex-grow-0">
              <div className="w-full h-full">
                <img src="src\assets\slider\image10.webp" alt="4" className="w-full h-full object-cover block" />
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="left-4 z-10" />
          <CarouselNext className="right-4 z-10" />
        </Carousel>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <form className='max-w-xl mx-auto w-full' onSubmit={handleSubmit} method='post'>
          <FieldGroup>
            <div className="flex flex-col items-center gap-1 text-center">
              <h1 className="text-2xl font-bold">Создание аккаунта</h1>
              <p className="text-sm text-balance text-muted-foreground">
                Заполните форму для создания аккаунта
              </p>
            </div>
            {error && <div className="text-sm text-destructive text-center">{error}</div>}
            <Field>
              <FieldLabel htmlFor="login">Логин</FieldLabel>
              <Input id="login" name='login' type="text" placeholder="testuser1" pattern='[a-zA-Z0-9]{5,}' required />
              <FieldDescription>
                Латиница и цифры, не менее 6 символов
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Пароль</FieldLabel>
              <Input id="password" name='password' type="password" placeholder="********" minLength={8} required />
              <FieldDescription>Минимум 8 символов</FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="fullname">ФИО</FieldLabel>
              <Input id="fullname" name='fullname' type="text" placeholder='Иванов Иван Иванович' pattern='[а-яА-Я ]{3,}' required />
              <FieldDescription>Символы кириллицы и пробелы</FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="phone">Телефон</FieldLabel>
              <Input id="phone" name='phone' type="tel" placeholder='8(XXX)XXX-XX-XX'  pattern='8\(\d{3}\)\d{3}-\d{2}-\d{2}'required />
              <FieldDescription>Формат: 8(XXX)XXX-XX-XX</FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Почта</FieldLabel>
              <Input id="email" name='email' type="email" placeholder='testuser@example.com' required />
            </Field>
            <Field>
              <Button type="submit" className="w-full">Создать пользователя</Button>
            </Field>
            <FieldSeparator></FieldSeparator>
            <Field>
              <FieldDescription className="px-6 text-center">
                Уже есть аккаунт? <Link to="/login" className="underline text-primary">Войти</Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </div>
  )
}
