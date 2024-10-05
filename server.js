import app from "./app.js";
const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log(`APP is Running on port : ${PORT}`)
})