const express = require('express')
const app = express()


//middleware
app.use(express.json())

let user = []

//create
app.post('/create', (req, res) => {

  let body = req.body
  user.push(body)
  res.send('posted okayy')
})

//read
app.get('/', (req, res) => {
  res.send(user)
})

app.put('/update/:id',(req,res)=>{

  let {id} =req.params
  let  {name} = req.body

  let updatedUser = user.map(val => val.id === id?{...val,name}: val)
  user =updatedUser
  res.send('updated okay')
})


//delete
app.delete('/delete/:id', (req, res) => {

  let { id } = req.params

  let userData = user.filter((val)=> val.id !==id)
  user = userData
  res.send('deleted okay')

})







let port = 3000

app.listen(port, () => {
  console.log(`port ${port} is working `);
})
