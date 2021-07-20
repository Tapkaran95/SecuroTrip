

let createForm = document.querySelector(".create-post-form");
let createTitle = document.querySelector("#create-title");
let createCountry = document.querySelector("#create-country");
let createImage = document.querySelector("#create-image-url");
let createText = document.querySelector("#create-text");
let createImageFile = document.querySelector("#create-image-file");
let addHotel = document.querySelector("#add-hotel");
let safetyConcern = document.querySelector("#create-safety");
createForm.addEventListener("submit",function (e){
   
    e.preventDefault();
    let text = createText.value;
    let data = new FormData();
    data.append("title",createTitle.value);
    data.append("country",createCountry.value);
    data.append("imageURL",createImage.value);
    data.append("text",text);
    data.append("description",text.substring(0,text.indexOf(".")+1));
    data.append("imageFile",createImageFile.files[0]); 
    data.append("hotel",addHotel.value);
    data.append("safety",safetyConcern.value);
    // console.log(addHotel.value);
    fetch("http://localhost:3000/posts", {
        method:"POST",
        // headers:{
        //     "Content-Type":"application/json"
        // },
        body: data
    //     JSON.stringify({
    //         title: createTitle.value,
    //         country:createCountry.value,
    //         imageURl: createImage.value,
    //         text:text,
    //         description:text.substring(0,text.indexOf(".")+1)
    //    })
    }).then((response)=>response.text()).then(()=>window.history.go());
    // createTitle.value(""); 
    // createImage.value("");
    // createCountry.value("");
    // createImageFile.value("");
    // createText.value("");  
});

// Writting this function as user can eitherwrite url or choose file directly so using this function one option will be disabled 
function disableInput(input1,input2){
    if(input1.value){
        input2.disabled=true;
    }else{
        input2.disabled=false;
    }
}
createImage.addEventListener("change",()=>{
    disableInput(createImage, createImageFile)
})
createImageFile.addEventListener("change",()=>{
    disableInput(createImageFile, createImage)
})