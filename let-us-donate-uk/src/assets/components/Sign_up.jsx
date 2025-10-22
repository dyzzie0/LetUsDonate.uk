import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/sign_up_login.css';
import '../../css/mobile.css';


function Sign_up() {
  return (
    <div>
      <div class = "middle">
      <h2>Create Account</h2>
      <br></br>
      <p>Quickly Create An Account</p>
      
      
  <form action="" method="post"> 

<div class="input-box">
    <input type="Email"  name="email" placeholder="Email" required/>
    </div>

 <div class="input-box">
    <input type="password"  name="password" placeholder="Password" required/>
</div>

<div class="input-box">
    <input type="password"  name="con-password" placeholder="Confirm Password" required/>
</div>


<Link class="print"to="/Login">Already have an account?</Link>


<div class="sub-btn">
 <button type="Submit" class="btn" name="signUp">Register</button>
</div>

</form>


</div>



</div>



   
   
    
  );
}

export default Sign_up;
