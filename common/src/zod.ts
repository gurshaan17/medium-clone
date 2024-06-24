import z from 'zod'

const signupInput = z.object({
    email:z.string().email(),
    password:z.string().min(4),
    name:z.string().optional()
})

export type SignupInput = z.infer<typeof signupInput>

const signinInput = z.object({
    email:z.string().email(),
    password:z.string().min(4)
})

export type SigninInput = z.infer<typeof signinInput>

const createblogInput = z.object({
    title:z.string(),
    content:z.string()
})

export type CreateblogInput = z.infer<typeof createblogInput>

const updateblogInput = z.object({
    title:z.string(),
    content:z.string(),
    id:z.string()
})

export type UpdateblogInput = z.infer<typeof updateblogInput>
