import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
import { sign } from 'hono/jwt';


export const userRouter = new Hono<{
    Bindings:{
      DATABASE_URL: string,
      JWT_SECRET: string
    }
  }>()


userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
          datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
    const body = await c.req.json();
    try {
      const user = await prisma.user.create({
        data: {
          email: body.email,
          password: body.password,
          name:body.name
        }
      });
      const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
      return c.json({ jwt });
    } catch (e) {
      console.error(e);
      c.status(403);
      return c.json({ error: "Error while signing up" });
    } 
  });
  
  
  
  userRouter.post('/signin',async (c)=>{
    const prisma = new PrismaClient({
          datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
  
    const body = await  c.req.json()
    try{
      const userExists = await prisma.user.findUnique({
        where:{
          email:body.email,
          password:body.password
        }
      })
    
      if(!userExists){
        c.status(403)
        return c.json({
          message : "user not found"
        })
      }
      const jwt = await sign ({id:userExists.id},c.env.JWT_SECRET)
      return c.json({
        jwt:jwt
      })
    }
    catch(e){
      c.status(411)
      c.text('Some error occured')
    }
    
  })