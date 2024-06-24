import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";


export const blogRouter = new Hono<{
    Bindings:{
      DATABASE_URL: string,
      JWT_SECRET: string
    },
    Variables:{
        userId:string
    }
  }>()


  blogRouter.use('/*',async (c,next)=>{
    const authHeader = c.req.header('authorization')||''
    const user = await verify(authHeader,c.env.JWT_SECRET)

    if(user){
        //@ts-ignore
        c.set("userId",user.id)
        next()
    }
    else{
        c.status(411)
        return c.text('You are not logged in')
    }
  })



  blogRouter.get('/',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body =await  c.req.json()

    try{
        const blog = await prisma.post.findFirst({
            where:{
                id:body.id
            }
        })
        return c.json ({ blog:blog })
    }catch(e){
        c.status(403)
        return c.text('some error occured'+e)
    }
  })
  
  blogRouter.post('/',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body =await  c.req.json()
    const userId = c.get("userId")
    const blog = await prisma.post.create({
        data:{
            title:body.title,
            content:body.content,
            authorId:userId
        }
    })

    return c.json({id:blog.id})
  })
  
  blogRouter.put('/',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await  c.req.json()
    
    const blog = await prisma.post.update({
        where:{
            id:body.id
        },
        data:{
            title:body.title,
            content:body.content
        }
    })

    return c.json({id:blog.id})
  })


  //pagination should be added to this
  blogRouter.get('/bulk',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blogs = await prisma.post.findMany()


    return c.json({blog:blogs})
  })