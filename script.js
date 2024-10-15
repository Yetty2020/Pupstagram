// fetch('https://dog.ceo/api/breeds/image/random')
// .then((response)=>{
//    console.log(response.json())
// }

// )
// .then(
//     (data) =>{
//         console.log(data)
//         let img = document.getElementById("img");
//         img.src = data.message
//         document.querySelector(".container").appendChild(img)

//     }

// ).catch((error) => {
//     console.error(error)
// })

async function fetchData() {
  try {
    let url = `https://dog.ceo/api/breeds/image/random`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    console.log(data);

    const img = document.createElement("img");
 
    img.src = data.message;

    // img.forEach(img=>{
    //     document.createElement("div").appendChild(img)

    // })


    document.querySelector(".container").appendChild(img);
  } catch (error) {
    console.log(error);
  }
}



document.querySelector(".btn").addEventListener("click", fetchData);
