const init = async() =>{

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
}
init()

const btnCambiar = document.getElementById("btn-change")
btnCambiar.addEventListener("click", async() =>{

    const contraseña = document.getElementById("password")
    const confirmarContraseña = document.getElementById("confirmPassword")

    if(contraseña.value === confirmarContraseña.value){
        const nuevaContraseña = {
            "password": contraseña.value,
            "confirmPassword": confirmarContraseña.value
        }
        const token = localStorage.getItem("token")
        const response = await fetch("https://vg-cine-server.herokuapp.com/change-password", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(nuevaContraseña)
        })
        
        Swal.fire(
            'Good job!',
            'You clicked the button!',
            'success'
        )
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            // footer: '<a href="">Why do I have this issue?</a>'
          })
        return
    }
    location.href = 'login.html'
})