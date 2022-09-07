const btnRegister = document.getElementById("btn-register")

btnRegister?.addEventListener("click", async () => {
    console.log("enviando registro....")
    const nombreInput = document.getElementById("firstName")
    const apellidoInput = document.getElementById("lastName")
    const cedulaInput = document.getElementById("id")
    const direccionInput = document.getElementById("address")
    const FNInput = document.getElementById("birthday")
    const correoInput = document.getElementById("email")
    const contraseñaInput = document.getElementById("password-register")

    

    if (nombreInput.value === "" || apellidoInput.value === "" ||
      cedulaInput.value === "" || direccionInput.value === "" ||
      FNInput.value === "" ||correoInput.value === "" || contraseñaInput.value === "" ) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Debe llenar los espacios vacios',
          })        
          return
    }


    const dataToSend = {
        firstName: nombreInput.value,
        lastName: apellidoInput.value,
        id: cedulaInput.value,
        address: direccionInput.value,
        birthday: FNInput.value,
        email: correoInput.value,
        password: contraseñaInput.value
    }
    console.log(dataToSend)

    try {
        
        const response = await fetch("https://vg-cine-server.herokuapp.com/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify( dataToSend )
        })

        const data = await response.json()
        
        if(response.status === 200){
            location.href = 'login.html'
            Swal.fire("Usuario creado con éxito")
        // }else if(response.status)
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.error,
              })
        }

    } catch (error) {
        alert(error)
    }

})