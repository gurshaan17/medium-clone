import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
import { sign } from 'hono/jwt';

// Create an instance of Hono
const app = new Hono<{
  Bindings:{
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>();

app.post('/api/v1/signup', async (c) => {
  const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

  const body = await c.req.json();
  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password
      }
    });
    const jwt = await sign({ id: user.id }, c.env.DATABASE_URL);
    return c.json({ jwt });
  } catch (e) {
    console.error(e);
    c.status(403);
    return c.json({ error: "Error while signing up" });
  } 
});

app.post('/api/v1/signin',async (c)=>{
  const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

  const body = await  c.req.json()
  const userExists = await prisma.user.findUnique({
    //@ts-ignore
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

  const jwt = sign ({id:userExists.id},c.env.DATABASE_URL)
})

app.get('/api/v1/blog/:id',(c)=>{
  const id = c.req.param
  console.log(id);
  return c.text('blog')
})

app.post('/api/v1/blog',(c)=>{
  return c.text('read')
})

app.put('/api/v1/blog',(c)=>{
  
  return c.text('read')
})

export default app
