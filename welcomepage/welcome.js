// Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
 import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
 
 const firebaseConfig = {
   apiKey: "AIzaSyDuQKCyVSxg_tvg9bo-hOFW8xiOL9Ke9Vw",
   authDomain: "fb-js-62d3e.firebaseapp.com",
   projectId: "fb-js-62d3e",
   storageBucket: "fb-js-62d3e.firebasestorage.app",
   messagingSenderId: "859835473561",
   appId: "1:859835473561:web:fbfa105605f6ca52a86208",
   measurementId: "G-7RNCEPT6RP"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const author=getAuth(app)


 let signupbtn=document.getElementById("signupbtn")
 signupbtn.addEventListener("click",(e)=>{
   e.preventDefault()
     //  let signupmodal=document.getElementById("signupmodal")
     let signupmodal=new bootstrap.Modal(document.getElementById("signupmodal"))
     signupmodal.show()
     //  console.log(signupmodal)
     let signupsubmitbtn=document.getElementById("signupsubmitbtn")
       signupsubmitbtn.addEventListener("click",async(k)=>{
       k.preventDefault()
       let snamefrommodal=document.getElementById("signup-name").value.trim();
       let semailfrommodal=document.getElementById("signup-email").value.trim();
       let spasswordfrommodal=document.getElementById("signup-password").value.trim();
       let sconfirmpasswordfrommodal=document.getElementById("signup-confirmpassword").value.trim();

       if(snamefrommodal ==="" || semailfrommodal ==="" || spasswordfrommodal ==="" || sconfirmpasswordfrommodal ===""){
         Swal.fire({
           icon: "error",
           title: "Oops...",
           text: "Enter all the fields",
         }).then(()=>{
           signupmodal.show()
         })
         return;
       }
       if (spasswordfrommodal !== sconfirmpasswordfrommodal) {
         Swal.fire({
           icon: "error",
           title: "Oops...",
           text: "Passwords do not match",
         }).then(() => {
           signupmodal.show();
         })
         return;
       }
       try{
              await createUserWithEmailAndPassword(author,semailfrommodal,spasswordfrommodal).then(()=>{
               Swal.fire({
                 title: "Registered successfully!!",
                 icon: "success",
               }).then(()=>{
                 document.getElementById("signup-name").textContent=""
                  document.getElementById("signup-email").textContent=""
                   document.getElementById("signup-password").textContent=""
                    document.getElementById("signup-confirmpassword").textContent=""
                    location.href="./welcome.html"
               })
              })
       }
       catch(err){
         Swal.fire({
           icon: "error",
           title: "Oops...",
           text: err.message,
         })
       }
     })

 })


 let loginbtn=document.getElementById("loginbtn")
 loginbtn.addEventListener("click",(e)=>{
   e.preventDefault()
     //  let signupmodal=document.getElementById("signupmodal")
     let loginmodal=new bootstrap.Modal(document.getElementById("loginmodal"))
     loginmodal.show()
     //  console.log(signupmodal)
     let loginsubmitbtn=document.getElementById("loginsubmitbtn")
       loginsubmitbtn.addEventListener("click",async(k)=>{
       k.preventDefault()
     
       let semailfrommodal=document.getElementById("login-email").value.trim();
       let spasswordfrommodal=document.getElementById("login-password").value.trim();
      

       if(semailfrommodal ==="" || spasswordfrommodal ===""){
         Swal.fire({
           icon: "error",
           title: "Oops...",
           text: "Enter all the fields",
         }).then(()=>{
           loginmodal.show()
         })
         return;
       }
       try{
              await signInWithEmailAndPassword(author,semailfrommodal,spasswordfrommodal).then(()=>{
               Swal.fire({
                 title: "Logged successfully!!",
                 icon: "success",
               }).then(()=>{
                  document.getElementById("login-email").textContent=""
                   document.getElementById("login-password").textContent=""
                    location.href="../navbar/index.html"
               })
              })
       }
       catch(err){
         Swal.fire({
           icon: "error",
           title: "Oops...",
           text: err.message,
         })
       }
     })

 })