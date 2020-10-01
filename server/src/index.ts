import express from "express"
const app = express()
const port = 9000

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>")
})

app.listen(port, () => {
  console.log(`[app] : http://localhost:${port}`)
})
