import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/sign_up_login.css';
import '../../css/mobile.css';


function Login() {
  return (
    <div>
      <br></br>
      <br></br>
      <div class = "middle">
      <h2>Welcome Back</h2>
      <br></br>
      <p> Sign in to your account</p>
      
      
  <form action="" method="post"> 

<div class="input-box">
    <input type="Email"  name="email" placeholder="Email" required/>
    </div>

 <div class="input-box">
    <input type="password"  name="password" placeholder="Password" required/>
</div>




<Link class="print"to="/Login">Forgot Password?</Link>


<div class="sub-btn">
 <button type="Submit" class="btn" name="signUp">Login</button>
</div>

</form>


</div>



</div>



   
   
    
  );
}

export default Login;
