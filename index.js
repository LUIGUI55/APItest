console.log("hola desde un archivo js")
const express = require("express");
const mysql = require("mysql")
const cors = require("cors")

const app = express();
app.use(express.json());
app.use(cors());


//iniciar el servidorr

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log("prueba de inicio con el servidor http://localhost"  +PORT)
}
);

//CONEXION CON MYSQL
const Connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    port:3306,
    database:"topicos"
});
Connection.connect((err)=>{
    if(err){
        console.error(err.message || "no se pudo conectar ala base de datos");
    }else
    console.log("conectado ala base de datos");

})

//usar la funcion get para extraer datos desde la tabla >:3

app.get("/",(req,res)=>{
    Connection.query("SELECT * FROM  usuarios", (error,resultados)=>{
        if(error) res.status(500).json({message: error.message || "no se pueden obterner los datos en este momento para la tabla usuarios"});
        else res.status(200).json(resultados);

    });
});


//se utiliza para insertar nuevos nombres ala base de datos 


app.post("/", (req, res)=>{
    const {nombre} =req.body;
    Connection.query ('INSERT INTO usuarios VALUES (DEFAULT, "'+nombre+'")', (error,resultados)=>{
        if(error) res.status(500).json({message:error.message || "No se puede insertar el dato en este momento "})
            else res.json(resultados);

    })
})

//cambia el nombre dependiendo el id 

app.patch("/", (req,res)=>{
    const {id, nombre} = req.body;
    Connection.query(`UPDATE usuarios SET Nombre="${nombre}" WHERE id=${id}`, (error, resultados)=>{
        if(error) res.status(500).json({message:error.message || "no se puede acceder en este momento"})
            else res.json(resultados);
    })
})
//BORRAR USERS

app.delete("/",(req,res)=>{
    const{id} = req.body;
    Connection.query(`DELETE FROM usuarios WHERE id=${id}`, (error, resultados)=>{
        if(error) res.status(500).json({message:error.message || "no se puede eliminar en este momento"})
            else res.json(resultados)
    })
})