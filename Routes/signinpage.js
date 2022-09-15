const express = require('express')
const router = express.Router()

router.get('/signin',(req,res)=>{
    console.log("kj")

    var name = req.query.name;
    //nameu = name;
    var email = req.query.email;
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
       res.render('signinpage.js', {emailduplicate:true})

      }
      else{console.log("email does not exits");
      //  res.render('signinpage.js', {emailduplicate:true})
    }
    })}


    if( name!=null && email!=null && password!=null){
    let str1 = "INSERT INTO user_info (user_name,email_id,phone_no) values('hello','hello',8990)"
    let strjn = "INSERT INTO user_info(user_name, email_id, phone_no ) VALUES( '"+name + "' , '"+email+"' ," + password+" )";
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

module.exports = router
