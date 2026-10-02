import { createServerFn } from "@tanstack/react-start";
import { usAppSession } from "./sessions";

export const getUserFn = createServerFn()
    .handler(async () => {
        const session = await usAppSession()
        return session?.data?.user ?? null
    })