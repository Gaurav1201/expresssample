app.get('/addblog',(req,res)=>{
    let status1 = 0;
    var blogheading = req.query.heading;
    var blogcontent = req.query.blogcontent;
    var date1 = new Date();
   
    if(blogcontent!=null && blogheading!=null){
    let strjn = "INSERT INTO blog(user_id,blog_content, blog_heading) VALUES( "+uid + " , '"+blogcontent+"' , '" + blogheading+"')";
   
    connection.query(strjn,  (err, result, fields) => {
        if (err) {throw err;}
        console.log("j")
        console.log(result)
      })
      return res.redirect('http://localhost:8080/')

    }
      
      
      
      res.render('addBlog.ejs',{nd:"kjd"})
})


