require("dotenv").config()
/* import dotenv from "dotenv"
dotenv.config() */

import express, { Application } from "express"
import { ApolloServer } from "apollo-server-express"
import { connectDatabase } from "./database"
import { typeDefs, resolvers } from "./graphql"
import cookieParser from "cookie-parser"
import { Response, Request } from "express"

const mount = async (app: Application) => {
  const db = await connectDatabase() //connect db

  app.use(cookieParser(process.env.SECRET))

  const server = new ApolloServer({ typeDefs, resolvers, context: (req: Request, res: Response) => ({ db, req, res }) })
  server.applyMiddleware({ app, path: "/api" }) //endpoint for graphql

  app.listen(process.env.PORT, () => {
    console.log(`[app] : http://localhost:${process.env.PORT}`)
  })

  /* const listings = await db.listings.find({}).toArray()
  console.log(listings) */
}
mount(express())
