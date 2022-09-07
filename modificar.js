const modPerfil = async () =>{
    const editProfile = document.getElementById("editProfile")

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

    editProfile.innerHTML = `
            
        <input type="text" name="nombre" id="firstName" class="input" value="${data.data.firstName}" placeholder="Escribe aqui tu nombre"><br>
        <br>
            
        <input type="text" name="apellido" id="lastName" class="input" value="${data.data.lastName}" placeholder="Escribe aqui tu apellido"><br>
        <br>

        <input type="text" name="cedula" id="id" class="input" value="${data.data.id}" placeholder="Escribe aqui tu cédula"><br>
        <br>

        <input type="text" name="direccion" id="address" class="input" value="${data.data.address}" placeholder="Escribe aqui tu dirección"><br>
        <br>

        <label for="">Fecha de nacimiento</label>
        <input type="date" name="fecha-nacimiento" id="birthday" class="input">

    
    `
}
modPerfil()

const btnEdit = document.getElementById("btn-edit")

btnEdit?.addEventListener("click", async () => {
    console.log("enviando modificación....")
    const nombreInput = document.getElementById("firstName")
    const apellidoInput = document.getElementById("lastName")
    const cedulaInput = document.getElementById("id")
    const direccionInput = document.getElementById("address")
    const FNInput = document.getElementById("birthday")

    

    if (nombreInput.value === "" || apellidoInput.value === "" ||
      cedulaInput.value === "" || direccionInput.value === "" ||
      FNInput.value === "") {
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
        birthday: FNInput.value
    }
    console.log(dataToSend)

    try {
        
        const token = localStorage.getItem("token")
        const response = await fetch("https://vg-cine-server.herokuapp.com/edit-profile", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify( dataToSend )
        })

        const data = await response.json()
        
        if(response.status === 200){
            location.href = 'perfil.html'
            Swal.fire("Usuario modificado con éxito")
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