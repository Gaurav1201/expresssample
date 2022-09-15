const { urlencoded, Router, query } = require('express');
const express = require('express');

const app = express()
app.use(urlencoded({extended:true}))

//app = require(express.Router())

var mysql = require('mysql');


/////import mod
/*const loginRouter = require('./loginpage.js')
const addBlogRouter = require('./addblogs.js')
const deleteBlogRouter = require('./deleteblogs.js')
const viewblogRouter = require('./viewblogs.js')
const signinRouter = require('./Routes/signinpage.js')



app.use('/signin',signinRouter)
app.use('/login',loginRouter)
app.use('/selectblog',viewblogRouter)
app.use('/addblog',addBlogRouter)


//////import mod
*/


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'exposysdb'
  })
  
  connection.connect()
  var uid = 7;
  let signin1 = false;
app.set('view engine','ejs');

let nameu;

app.get('/',(req,res)=>{
console.log('dashpage')
res.render('intropage.ejs',{text:nameu});
})


let blogs;
app.get('/selectblog',(req,res)=>{
 
  let selectblogs = "SELECT blog_id, blog_content, blog_heading from blog where user_id= "+uid;
  if(signin1){
  connection.query(selectblogs,  (err, result, fields) => {
    if (err) {throw err}
    console.log(result)
    blogs = result;
    res.render('viewblog.ejs',{blogs1:blogs, user_name:nameu});
    
    blogs.forEach(blog => {
      console.log("blog heading")
      //res.render('viewblog.ejs',{blogs1:blogs});
      console.log(blog.blog_heading)
      console.log(blog.blog_content)
      console.log(blog.blog_id)
    });
   //res.render('viewblog.ejs',{blogs1:blogs});
  })
}

 // res.render('viewblog.ejs',{blogs1:blogs});
})


app.get('/redirect1',(req,res)=>{


  console.log("redire")
  return res.redirect("http://localhost:8080/addblog")
})


////login page


app.get('/login',(req,res)=>{
  let uemail = req.query.email;
  let pass = req.query.password;
  
  console.log("email and pssword from query----"+uemail+" "+pass);
  
  if(req.query.email!=null && req.query.password!=null){
  
  let loginquer = "SELECT email_id, password_u from user_info where email_id = '"+req.query.email+"'";
  console.log("login "+loginquer);
 
  let useremail = "", password_user="";
 
  connection.query(loginquer,  (err, result, fields) => {
    
    if (err) {throw err}
    console.log(result)
    
    useremail = result[0].email_id;
    password_user = result[0].password_u;
    
    if(password_user==pass){
      console.log("if")
      console.log("sql pass is --"+password_user+"query paas is--"+pass)
          // return  res.redirect('http://localhost:8080/addblog')

      // res.render("intropage.ejs");
      return  res.redirect('http://localhost:8080/addblog')

    }
    else{
      console.log("else")
      console.log("sql pass is--"+password_user+"quey pss --"+pass)
      //console.log(result.password_u)
     // res.render('loginpage.ejs',{wrongcred:true})
    }

    /*if(password_user==pass){
      console.log("if")
       res.render("intropage.ejs");
    }
    else{
      console.log("else")
      console.log(result.password_u)
     // res.render('loginpage.ejs',{wrongcred:true})
    }*/
  })
  /*if(password_user==pass){
    console.log("if")
    console.log("sql pass is --"+password_user+"query paas is--"+pass)
     res.render("intropage.ejs");
  }
  else{
    console.log("else")
    console.log("sql pass is--"+password_user+"quey pss --"+pass)
    //console.log(result.password_u)
   // res.render('loginpage.ejs',{wrongcred:true})
  }*/

}

  
  //seesion vari username, password, email,uid
  res.render('loginpage.ejs')
})


////logi


app.get('/signin',(req,res)=>{
    console.log("kj")

    var name = req.query.name;
    nameu = name;
    var email = req.query.email;
    var phone_number = req.query.phone_no;
    var password = req.query.password;
    console.log(name)

    let unique_email = "SELECT count(email_id) as email_num from user_info where email_id = '"+email+"'";
    if( name!=null && email!=null && password!=null){

    connection.query(unique_email,  (err, result, fields) => {
      if (err) {throw err}
      console.log(result)
      if(result[0].email_num>0){
        console.log("emailid is not uniq")
       // res.render('index.ejs',{email_num:true})
      }
      else{console.log("email does not exits")}
    })}


    if( name!=null && email!=null && password!=null){
    let str1 = "INSERT INTO user_info (user_name,email_id,phone_no) values('hello','hello',8990)"
    let strjn = "INSERT INTO user_info(user_name, email_id, phone_no,password_u ) VALUES( '"+name + "' , '"+email+"' ," + phone_number + ", '"+password+"' )";
    let uidst = "SELECT user_id from user_info where email_id= '"+email + " '";
    signin1 = true;
    connection.query(strjn,  (err, result, fields) => {
        if (err) {throw err}
        console.log("j")
        console.log(result)
        console.log("user data")
      })
      
      connection.query(uidst,  (err, result, fields) => {
        if (err) {throw err}
        console.log("j")
        console.log(result)
        uid = result[0].user_id ;
      })
     return  res.redirect('http://localhost:8080/addblog')
   //res.render('addBlog.ejs');
    }

      //res.redirect('http://localhost:8080/addblog')

    //return res.redirect('/intropage.ejs')

   
    res.render('index.ejs',{text:"name", name:name, email:email, password:password, passwordmatch:false})

})



app.get('/viewblog',(req,res)=>{
  if(signin1!=1){
  
  }
  let getquery =   "SELECT blog_content, blog_heading from blog where user_id = "+uid + " ";
  connection.query(getquery,  (err, result, fields) => {
    if (err) {throw err}
    console.log(result)
    console.log("user conetent")
  })

})


//app.render('addBlog',{text:';jdl'})

app.get('/addblog',(req,res)=>{
  if(signin1==false){res.send("sign in")}
   else{ let status1 = 0;
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
  }
})




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


app.listen(8080);