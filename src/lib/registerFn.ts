import { db } from '#/prisma/db'
import { createServerFn } from '@tanstack/react-start'

export const registerFn = createServerFn({method: "POST"})
    .validator((data: {
        login: string,
        password: string,
        email: string,
        phone: string,
        fullname: string,
    }) => data)
    .handler(async ({ data }) => {
        console.log(data)

         try {
            await db.orm.public.User.create({
                username: data.login,
                password: data.password,
                email: data.email,
                phone: data.phone,
                name: data.fullname
            })
            return { success: true }
        } catch (error) {
            console.error(error)
            return { error: 'Не удалось создать аккаунт' }
        } 
    }) 

export const loginAdminFn = createServerFn({ method: "POST" })
    .validator((data: { login: string; password: string }) => data)
    .handler(async ({ data }) => {
        if (data.login === 'Admin' && data.password === 'KorokNET') {
            return { success: true }
        }

        return { error: 'Неверный логин или пароль администратора' }
    })