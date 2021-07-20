// This is gonna read all the data from the database(specified url)
async function getCallbackRequests(){
    return await fetch("http://localhost:3000/callback-requests")
                                        .then((response)=>response.json())
                                        .then((data)=>data);
}

let requestsBlock = document.querySelector("#v-pills-callback");

requestsBlock.addEventListener("click",(e)=>{
    if(e.target.classList.contains("btn-remove")){
        // Using this if as we only need to remove only when remove btn is clicked rather than when clicked anywhere
        // Here when we get our remove btn we move towards its parent class .remove and its parent article and then found the id value
        // that we wanna delete
        let id = e.target.parentNode.parentNode.querySelector(".id").value;
        fetch(`http://localhost:3000/callback-requests/${id}`,{
            method:"DELETE"
        }).then((res)=>res.text())
          .then(()=>window.history.go())
    }
})
