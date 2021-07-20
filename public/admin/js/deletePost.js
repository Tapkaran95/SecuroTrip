// There is one problem that we are not storing posts in index.html of admin page that means that when file is loading then there 
// is no posts and at that time block is simply empty that's why we can't use the event handler so we will be using eventDelegation

// To implement we need to attach eventHandler to element which already exists on webpage while it's loading
// As inside articles class all the articles are stored dynamically(see main.js file ) that's why we are adding event listner there
let articlesBlock = document.querySelector(".articles");

articlesBlock.addEventListener("click",(e)=>{
    if(e.target.classList.contains("btn-remove")){
        // Using this if as we only need to remove only when remove btn is clicked rather than when clicked anywhere
        // Here when we get our remove btn we move towards its parent class .remove and its parent article and then found the id value
        // that we wanna delete
        let id = e.target.parentNode.parentNode.querySelector(".id").value;
        fetch(`http://localhost:3000/posts/${id}`,{
            method:"DELETE"
        }).then((res)=>res.text())
          .then(()=>window.history.go())
    }
})
