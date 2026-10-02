import { useSession } from '@tanstack/react-start/server'

export type Session = {
    user: string
}

export const usAppSession = async () => {
    return useSession<Session>({password: "a62243e4c637dede20cd0430f0baa1b4beef5f4df54bf2c6706dbc1261808192" })
}