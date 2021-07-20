let callMeForm = document.querySelector(".call-me-form");
let emailForm = document.querySelector(".email-request-form");

document.addEventListener("DOMContentLoaded",async()=>{
        let posts = await getPosts();
        let articles= document.querySelector(".articles");
    // row.innerHTML="";
        posts.forEach((posts)=>{
            let postHTML=` <div class="col-4">
                <div class="card">
                <img src="${posts.imageURL}" alt="${posts.title}" class="card-img-top">
                <div class="card-body">
                <h4 class="card-title">${posts.title}</h4>
                <p class="card-text">${posts.description}</p>
                <a class="btn btn-primary" href="/sight?id=${posts.id}">Details</a>
                </div>
                </div>`
            articles.insertAdjacentHTML("beforeend",postHTML);
         })
    })

    callMeForm.addEventListener("submit",(e)=>{
        e.preventDefault();
        
        let phoneNumber = callMeForm.querySelector("input");
        var phoneno = /^\d{10}$/;
        if(!(phoneNumber.value.match(phoneno))){
            alert("Enter Valid Phone Number");
        }else{
        fetch("http://localhost:3000/callback-requests",{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                phoneNumber: phoneNumber.value
            })
        }).then((res)=>res.text())
           .then(()=>alert("We will call you back as soon as possible!"));
           phoneNumber.value="";
    }
    })
    let emailN  = emailForm.querySelector("#email")
  let submit = document.querySelector(".submit");
//   submit.addEventListener("click",()=>{
//     if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(emailN.value))
//     {
//       return (true);
//     }
//       alert("You have entered an invalid email address!")
//       return (false);
//   })
    
    emailForm.addEventListener("submit",(e)=>{
        e.preventDefault();
        
        let name = emailForm.querySelector("#name");
        let email = emailForm.querySelector("#email");
        let msg = emailForm.querySelector("#message");
        
           
        if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email.value)))
        {
            alert("You have entered an invalid email address!");
        }
        else if(name.value===""){
            alert("Please Enter Your Name ")
        }
        else{
        fetch("http://localhost:3000/emails",{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
               name: name.value,
               email: email.value,
               text: msg.value
            })
        }).then((res)=>res.text())
           .then(()=>alert("We Will Reply You Soon!"));
    }
    })

