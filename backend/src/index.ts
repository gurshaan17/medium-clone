import { Hono } from 'hono'

const app = new Hono()

app.post('/api/v1/signup',(c)=>{
  return c.text('sign up')
})

app.post('/api/v1/signin',(c)=>{
  return c.text('sign in')
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
