const express = require("express");
const { send } = require("express/lib/response");
const app = express()
const PORT = process.env.PORT || 8080
app.use(express.json()) //midware para que pueda parsear
//el body a un json en post

//Ver la peticion por consola
//curl http://localhost:8080/api/movies

const movies = [
    {id:1,nombre:"peli1"},
    {id:2,nombre:"peli2"},
    {id:3,nombre:"peli3"}
];

//GET
app.get("/",(req,res)=>{
    res.send("BACKEND PELICULAS")
})

app.get("/api/movies",(req,res)=>{
    res.send(movies)
})
// app.get("/api/movies",(req,res)=>{
//     // const params = req.query
//     const {nombre} = req.query
//     console.log(nombre);
//     res.send(movies.filter(p=>p.nombre.includes(nombre)))
    
// })

app.get("/api/movies/:id",(req,res)=>{
    const {id} = req.params //en params los param url
    const movie = movies.find(i=> i.id == id)

    if (!movie) {
        res.status(404).send({
            error:"movie no encontrada"
        })
        return
    }
    res.send(movie)
})


//POST
 app.post("/api/movies",(req,res)=>{
     const {id,nombre} = req.body

     movies.push({
         id,
         nombre
     })

     res.sendStatus(200)

 })



//PUT
app.put("/api/movies/:id",(req,res)=>{
    const {id} = req.params
    const movie = movies.find(i=>i.id == id)

    if (!movie) {
        res.send({
            error:"no se encontro movie con ese id"
        })
        return
    }

    const {nombre} = req.body
    movie.nombre = nombre

    res.sendStatus(201)
})


//DELETE

app.delete("/api/movies/:id",(req,res)=>{

    const {id} = req.params
    const movie = movies.find(i=>i.id == id)

    if (!movie) {
        res.send({
            error:"no se encontro movie con ese id"
        })
        return
    }

    const index = movies.indexOf(movie)
    movies.splice(index,1)

    res.sendStatus(201)

})





app.listen(PORT,()=>{
    console.log("Escuchando el Puerto",PORT);
})