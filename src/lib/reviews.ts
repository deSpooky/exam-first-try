import { createServerFn } from "@tanstack/react-start";
import { db } from "#/prisma/db";

export const getReviews = createServerFn({ method: "POST" })
    .validator((data: {
        username: string | null,
    }) => data)
    .handler(async ({ data }) => {
        if (!data.username) {
            return {
                reviews: await db.review.findMany({
                    include: {
                        user: true
                    }
                })
            }
        }

        const reviews = await db.review.findMany({
            where: {
                user: {
                    login: data.username
                },
            },
            include: {
                user: true
            }
        })

        return { reviews }
    })

export const createReview = createServerFn({ method: "POST" })
    .validator((data: {
        login: string,
        text: string,
    }) => data)
    .handler(async ({ data }) => {
        try {
            await db.review.create({
                data: {
                    text: data.text,
                    user: {
                        connect: {
                            login: data.login
                        }
                    }
                }
            })

            return { success: true }

        } catch (error: unknown) {
            console.error(error)
            return { success: false, message: (error as Error).message }
        }
    })
