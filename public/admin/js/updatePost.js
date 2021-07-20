{   
    let textArea = document.querySelector("#update-text");
    let titelInp = document.querySelector("#update-title");
    let addHotel = document.querySelector("#update-hotel");
    let safetyConcern = document.querySelector("#update-safety");
    let updateForm =  document.querySelector(".update-post-form");
    let id;
let articlesBlock = document.querySelector(".articles");

articlesBlock.addEventListener("click",async function(e){
    
    if(e.target.classList.contains("btn-edit")){
        id = e.target.parentNode.parentNode.querySelector(".id").value;
            let postInfo =  await fetch(`http://localhost:3000/posts/${id}`)
                                .then((resp)=>resp.json())
                                .then((data)=>data);
            
           
            titelInp.value = postInfo.title;
          
            textArea.value = postInfo.text;
            addHotel.value = postInfo.hotel;
            safetyConcern.value = postInfo.safety; 
            let article = document.getElementById("v-pills-articles");
            article.classList.remove("show");
            article.classList.remove("active");
            let updateTab = document.getElementById("v-pills-update-post");
            updateTab.classList.add("show");
            updateTab.classList.add("active"); 
        }      
    })

   
updateForm.addEventListener("submit",(e)=>{
    // id = e.target.parentNode.parentNode.querySelector(".id").value;
    e.preventDefault();
        
    fetch(`http://localhost:3000/posts/${id}`,{
        method:"PUT",
        headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                title: titelInp.value,
                text: textArea.value,
                description: textArea.value.substring(0,textArea.value.indexOf(".")+1),
                hotel:addHotel.value,
                safety:safetyConcern.value
            })
         }).then((res)=>res.text())
         .then((data)=>window.history.go())
    })
}