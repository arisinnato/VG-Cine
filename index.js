const init = async() =>{

    const iniciarsesion = document.getElementById("nav-login")

    if(localStorage.getItem('token')){
        console.log("entre")
        iniciarsesion.innerHTML = `
        <li class="nav-item">
            <a class="nav-link" href="perfil.html">VER PERFIL</a>
        </li>
        `
    }

    const response = await fetch("https://vg-cine-server.herokuapp.com/movies", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            // 'Authorization': `Bearer ${token}`
        }
    })

    const data = await response.json()
    const pelis = document.getElementById('pelis')

    for (let index = 0; index < data.data.length; index++) {
        pelis.innerHTML += `
        <a href="info-peli.html?id=${data.data[index].id}"><img src="https://image.tmdb.org/t/p/w500/${data.data.poster_path}" alt="">
            <div class="img">
                    <img class="img-item" width="100%" height="100%" src="https://image.tmdb.org/t/p/w500${data.data[index].poster_path}" alt="">
                </div>
        </a>
        `
    }


    
}
init()