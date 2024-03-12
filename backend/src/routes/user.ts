import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono"
import { sign } from 'hono/jwt';
import { signUpInputs, signInInputs } from "@dheeraj1805/medium-common"

export const userRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string,
      JWT_SECRET: string,
    },
    Variables: {
      userId: string,
    }
}>()

userRouter.post('/signup', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
    const { success } = signUpInputs.safeParse(body);
    if(!success) {
        c.status(411);
        return c.json({
            message: "Invalid Inputs"
        })
    }
	try {
		const user = await prisma.user.create({
			data: {
				email: body.username,
				password: body.password
			}
		});
		const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
		return c.json({ jwt });
	} catch(e) {
		c.status(403);
		return c.json({ error: "error while signing up", e: e });
	}
})

userRouter.post('/signin', async (c) => {
  const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
    const { success } = signInInputs.safeParse(body);
    if(!success) {
        c.status(411);
        return c.json({
            message: "Invalid Inputs"
        })
    }
	try {
		const user = await prisma.user.findUnique({
			where: {
				email: body.email,
				password: body.password
			}
		});
    if (!user) {
      c.status(403);
      return c.json({error: "User Not Found"})
    }
		const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
		return c.json({ jwt });
	} catch(e) {
		c.status(403);
		return c.json({ error: "error while signing in" });
	}
})