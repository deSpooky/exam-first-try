import { createServerFn } from '@tanstack/react-start'
import { usAppSession } from './sessions'
import { db } from '#/prisma/db'

export const LoginFn = createServerFn({ method: "POST" })
    .validator((data: { 
        login: string, 
        password: string,
    }) => data)
    .handler(async ({ data }) => {      
        const user = await db.orm.public.User.first({
            username: data.login
        })

        if (!user) {
            return { error: 'Некорректные данные'}
        }

        const session = await usAppSession()
        
        await session.update({
            user: data.login
        })

        return { success: true }
    })