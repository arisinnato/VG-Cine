const btnLogin = document.getElementById("btn-login")

btnLogin?.addEventListener("click", async () => {
    console.log("iniciando sesión...")

    const correoInput = document.getElementById("email")
    const contraseñaInput = document.getElementById("password-register")

    if (correoInput.value === "" || contraseñaInput.value === "") {
        alert("Ambos campos tienen que estar llenos")
        return
    }

    const dataToSend = {
        email: correoInput.value,
        password: contraseñaInput.value
    }
    console.log(dataToSend)

    try {
        
        const response = await fetch("https://vg-cine-server.herokuapp.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify( dataToSend )
        })

        const data = await response.json()

        const jwt = data.token
        localStorage.setItem('token', jwt)

        if(response.status === 200){
            
            Swal.fire('Good job!',
            'Inicio de sesión exitoso')

            setTimeout(() => {location.href = 'index.html'}, 2000)
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo salió mal:(',
        //         // footer: '<a href="">Why do I have this issue?</a>'
        })
    }
    } catch (error) {
        alert(error)
    }

})