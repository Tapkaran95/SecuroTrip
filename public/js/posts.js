// This is gonna read all the data from the database(specified url)
async function getPosts(){
    return await fetch("http://localhost:3000/posts")
                                        .then((response)=>response.json())
                                        .then((data)=>data);
}