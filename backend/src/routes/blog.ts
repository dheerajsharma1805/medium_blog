import { createBlogInputs, updateBlogInputs } from '@dheeraj1805/medium-common';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign, verify } from "hono/jwt";

export const blogRouter = new Hono<{
    Bindings: { // all the env variables from wrangler.toml
        DATABASE_URL: string,
        JWT_SECRET: string,
    },
    Variables: {
        userId : string,
    }
}>();

blogRouter.use("/*",  async (c, next) => {
    const authHeader = c.req.header("authorization");
    const token = authHeader?.split(" ")[1] || "";
    const response = await verify(token, c.env.JWT_SECRET);
    if(response.id) {
        c.set("userId", response.id);
        await next();
    } else {
        c.status(403);
        return c.json({msg: "You are not logged in"})
    }
});

blogRouter.post("/", async (c) => {
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
    const authorId = c.get("userId");
    const { success } = createBlogInputs.safeParse(body);
    if(!success) {
        c.status(411);
        return c.json({message: "Invalid Inputs"});
    }
	try {
		const post = await prisma.post.create({
			data: {
				title: body.title,
				content: body.content,
                authorId: authorId,
			}
		});
		return c.json({ msg: "posted successfully", id: post.id });
	} catch(e) {
		c.status(403);
		return c.json({ error: "error while signing up" });
	}
});

blogRouter.put("/", async (c) => {
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
    const authorId = c.get("userId");
    const { success } = updateBlogInputs.safeParse(body);
    if(!success) {
        c.status(411);
        return c.json({message: "Invalid Inputs"});
    }
	try {
		await prisma.post.update({
            where: {
                id : body.id
            },
			data: {
				title: body.title,
				content: body.content,
                authorId: authorId,
			}
		});
		return c.json({ msg: "updated successfully", id: body.id });
	} catch(e) {
		c.status(403);
		return c.json({ error: "error while updating up" });
	}
});

blogRouter.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
    try {
        const blogs = await prisma.post.findMany();
        return c.json({blogs});
    } catch (error) {
        c.status(411);
        return c.json({msg: "Something went wrong"});
    }
});

blogRouter.get("/:id", async (c) => {
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const param = c.req.param("id");
	try {
		const blog = await prisma.post.findFirst({
            where: {
                id : param
            },
		});
		return c.json({ blog: blog });
	} catch(e) {
		c.status(403);
		return c.json({ error: "error while signing up" });
	}
});
