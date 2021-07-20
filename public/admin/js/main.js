let articles = document.querySelector(".articles");
let addPostbtn = document.querySelector(".create-post-btn")
// This event happens when the DOM is fully loaded i.e. whwnever admin page is opened data has to be displayed there
document.addEventListener("DOMContentLoaded",async function(){
              addPosts();
              addCallbackRequests(); 
              addEmails();
    });
        
    // let j=1;
    // articles.innerHTML=""
    // for(let i=0; i<posts.length; i++){
    //     let postHTML=`<article class="d-flex justify-content-between align-items-center article-inline">
    //                                         <div class="num w5">${j++}</div>
    //                                         <input class="id" type="hidden" value="${posts[i].id}">
    //                                         <div class="name w30">${posts[i].title}</div>
    //                                         <div class="date w30">${posts[i].date}</div>
    //                                         <div class="country w20">${posts[i].country}</div>
    //                                         <div class="edit w10"><button class="btn btn-link">Edit</button></div>
    //                                         <div class="remove w5"><button class="btn btn-link btn-remove">X</button></div>
    //                                     </article>`;
    //                         articles.insertAdjacentHTML("beforebegin",postHTML);
    //               }

           
        addPostbtn.addEventListener("click",()=>{
            let article = document.getElementById("v-pills-articles");
            article.classList.remove("show");
            article.classList.remove("active");

            let createPost = document.getElementById("v-pills-create-post");
            createPost.classList.add("show");
            createPost.classList.add("active"); 
        })

        async function addPosts(){
            let posts = await getPosts();
            let articles = document.querySelector('.articles');
            articles.innerHTML = '';
            let i = 1;
            posts.forEach((post) => {
                let postHTML = `
                <article class="d-flex justify-content-between align-items-center article-inline">
                    <div class="num w5">${i++}</div>
                    <input class="id" type="hidden" value="${post.id}">
                    <div class="name w30">${post.title}</div>
                    <div class="date w30">${post.date}</div>
                    <div class="country w10">${post.country}</div>
                    <div class="hotel w10">${post.hotel}</div>
                    <div class="edit w10"><button class="btn btn-link btn-edit">Edit</button></div>
                    <div class="remove w5"><button class="btn btn-link btn-remove">X</button></div>
                </article>`;
                articles.insertAdjacentHTML('beforeend', postHTML);
            })   
        }

        async function addCallbackRequests(){
            let requests = await getCallbackRequests();
            let requestsBlock = document.querySelector('#v-pills-callback');
            requestsBlock.innerHTML = '';
            let i = 1;
            requests.forEach((request) => {
                let requestHTML = `
                <article class="d-flex justify-content-between align-items-center article-inline">
                    <div class="num w5">${i++}</div>
                    <input class="id" type="hidden" value="${request.id}">
                    <div class="name w60">${request.phoneNumber}</div>
                    <div class="date w30">${request.date}</div>
                    <div class="remove w5"><button class="btn btn-link btn-remove">X</button></div>
                </article>`;
               requestsBlock.insertAdjacentHTML('beforeend',requestHTML);
            })
        }
        async function addEmails(){
            let emails = await getEmails();
            let emailsBlock = document.querySelector('#v-pills-messages');
            emailsBlock.innerHTML = '';
            let i = 1;
            emails.forEach((email) => {
                let emailHTML = `
                <article class="d-flex justify-content-between align-items-center article-inline">
                    <div class="num w5">${i++}</div>
                    <input class="id" type="hidden" value="${email.id}">
                    <div class="name w30">${email.name}</div>
                    <div class="email w30">${email.email}</div>
                    <div class="date w30">${email.date}</div>
                    <div class="remove w5"><button class="btn btn-link btn-remove">X</button></div>
                    <div class="text w100">${email.text}</div>
                </article>`;
               emailsBlock.insertAdjacentHTML('beforeend',emailHTML);
            })
        }
        let logOutBtn = document.querySelector(".log-out-btn");
        logOutBtn.addEventListener("click",()=>{
            document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
            alert("You are Logged Out");
            window.location.href="/"
        })