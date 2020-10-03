require("dotenv").config()
/* import dotenv from "dotenv"
dotenv.config() */

import express, { Application } from "express"
import { ApolloServer } from "apollo-server-express"
import { connectDatabase } from "./database"
import { typeDefs, resolvers } from "./graphql"

const mount = async (app: Application) => {
  const db = await connectDatabase() //connect db
  const server = new ApolloServer({ typeDefs, resolvers, context: () => ({ db }) })
  server.applyMiddleware({ app, path: "/api" }) //endpoint for graphql

  app.listen(process.env.PORT, () => {
    console.log(`[app] : http://localhost:${process.env.PORT}`)
  })

  /* const listings = await db.listings.find({}).toArray()
  console.log(listings) */
}
mount(express())
