// function cal(a,b,ans){
//     setTimeout(()=>{
//         let c = a+b;
//         ans(c);

//     },2000);
// }
// function print(num){
//     console.log(num);
// }
// let ans = cal(2,3,print);
// function cal(a,b){
// let pr = new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//         reject("Can't add");
//     },2000);
// })
// return pr;
// }
// function print(num){
//         console.log(num);
//     }

// cal(2,3).then((c)=>console.log(c)).catch((e)=>console.log(e));
// console.log("HELLO")


function cal(a,b){
    let pr = new Promise((resolve,reject)=>{
        setTimeout(()=>{
            let c = a+b;
            resolve(c);
            // console.log(c);
        },2000);
    })
    return pr;
    }
    
    
function print(num){
    console.log(num);
}
 async function fun(){
     try{
         let ans = await cal(2,3);
         await print(ans);
     }
     catch(err){
         console.log(err);
     }
 }
 fun();
 console.log("HELLO");
 (async ()=>{
    await setTimeout(()=>{
        console.log("Waiting Here")
    },2000);
     console.log("BYY")
 })();