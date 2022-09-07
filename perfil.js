const profile = async() =>{

    const viewProfile = document.getElementById("viewProfile") 

    
    const token = localStorage.getItem("token")
    const response = await fetch("https://vg-cine-server.herokuapp.com/profile", {
        method: "GET",
        headers: { 
            "Content-Type": "application/json", 
            'Authorization': `Bearer ${token}`
        }
    })
    const data = await response.json()

    console.log(data.data)

    viewProfile.innerHTML = `
    


    <div class="media" id="viewProfile">
        <label>Nombre</label>
        <p>${data.data.firstName}</p>
    </div>
    <div class="media" id="viewProfile">
        <label>Apellido</label>
        <p>${data.data.lastName}</p>
    </div>
    <div class="media" id="viewProfile">
        <label>Cédula</label>
        <p>${data.data.id}</p>
    </div>
    <div class="media" id="viewProfile">
        <label>Dirección</label>
        <p>${data.data.address}</p>
    </div>
    <div class="media" id="viewProfile">
        <label>Fecha de nacimiento</label>
        <p>${data.data.birthday}</p>
    </div>
    `
}

const modificarPerfi = document.getElementById("btn-mod")
modificarPerfi.addEventListener("click", ()=>{
    location.href = "modificar.html"
})

const logOut = document.getElementById("btn-logout")
logOut.addEventListener("click", () =>{
    localStorage.removeItem("token")
    location.href = "index.html"
})

profile()
