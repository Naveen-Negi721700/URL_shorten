import "dotenv/config";
import { app } from "./app.js";

import connectDB from "./db/index.js";

app.get("/",(req,res)=>{
    res.send("express")
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running on ${process.env.PORT}`)
})
})
