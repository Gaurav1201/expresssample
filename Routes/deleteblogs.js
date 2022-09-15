app.delete('/deleteblog/:id',(req,res)=>{
    const id= req.params.id;
    res.send(id)
    console.log(id);
    console.log("id del")
    let delsql = "DELETE from blog where blog_id = "+id;
    console.log(delsql)
    connection.query(delsql,  (err, result, fields) => {
      if (err) {throw err;}
      console.log("j")
      console.log(result)
    })
  })