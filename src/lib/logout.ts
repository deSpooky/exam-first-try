import { createServerFn } from "@tanstack/react-start";
import { usAppSession } from './sessions';

export const logoutFn = createServerFn({ method: "POST"})
    .handler(async () => {
        const session = await usAppSession()
        await session.clear()
    })