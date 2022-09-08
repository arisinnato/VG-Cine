let movieTitle = ""

const init = async() =>{
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const portada = document.getElementById("portada")
    const containerInfo = document.getElementById("info-container")
  
    console.log(params.id)

    const response = await fetch(`https://vg-cine-server.herokuapp.com/movie-detail/${params.id}`, {
        method: "GET",
        headers: {
             "Content-Type": "application/json",
            // 'Authorization': `Bearer ${token}`
        }
    })

    const data = await response.json()
    console.log(data)


    const background = document.getElementById("peli-banner")
    background.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${data.data.backdrop_path})`
    background.style.height = "400px"
    background.style.backgroundSize = "cover"

    portada.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w500/${data.data.poster_path}" alt="">
    <p id="title" class="title-container">
        ${data.data.title}
    </p>
    `
    containerInfo.innerHTML = data.data.overview
    movieTitle = data.data.title
}
init()


const btn = document.getElementById("btn-buy")

btn.addEventListener("click", async () => {


    const { value: formValues } = await Swal.fire({
        title: 'Multiple inputs',
        html: `
        <label for="exampleFormControlInput1" class="form-label">Cantidad de entradas</label>
        <input id="ticketNumber" type="number" class="form-control" id="exampleFormControlInput1" placeholder="">
        <label for="exampleFormControlInput2" class="form-label">Método de pago</label> <br><br>
        <select name="payment-method" id="payment-method">
            <option value="transferencia">Transferencia</option>
            <option value="efectivo">Efectivo</option>
            <option value="paypal">PayPal</option>
            <option value="zelle">Zelle</option>
        </select>
        <br>
        <br>
        <label for="exampleFormControlInput3" class="form-label">Cédula</label>
        <input id="ticketCedula" type="text" class="form-control" id="exampleFormControlInput1" placeholder="Cédula">
        <label for="exampleFormControlInput4" class="form-label">Número de referencia</label>
        <input id="ticketNumRefer" type="number" class="form-control" id="exampleFormControlInput1" placeholder="Número de referencia">

        `,

        focusConfirm: false,
        preConfirm: () => {
            return {
                ticketCount: document.getElementById("ticketNumber").value,
                paymentMethod: document.getElementById("payment-method").value,
                id: document.getElementById("ticketCedula").value,
                referenceNumber: document.getElementById("ticketNumRefer").value,
                movieTitle: movieTitle
            }

        }
      })
      
      if (formValues) {
        Swal.fire(JSON.stringify(formValues))

        const token = localStorage.getItem("token")
        const response = await fetch("https://vg-cine-server.herokuapp.com/ticket", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json", 
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formValues)
        })
        
    }


})