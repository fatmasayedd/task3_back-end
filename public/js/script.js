
let form = document.getElementById('form1')
form.addEventListener('submit',(e)=>{
    e.preventDefault()
  
    weatherFunction()
    form.reset()
})
const errorF = document.getElementById('error')
const locationF = document.getElementById('location')
const forecastF = document.getElementById('forecast')
const latitudeF = document.getElementById('latitude1')
const longitudeF = document.getElementById('longitude1')


let weatherFunction = async() =>{
    try{
        const address = document.getElementById('address').value
        const res = await fetch('http://localhost:3000/weather?address='+address)
        const data = await res.json()
        console.log(data)
        if(data.error){
            errorF.innerText = data.error
            locationF.innerText =""
            forecastF.innerText =""
            latitudeF.innerText =""
            longitudeF.innerText =""
        }
        else {
            locationF.innerText = data.location
            forecastF.innerText = data.forecast
            latitudeF.innerText = data.latitude1
            longitudeF.innerText = data.longitude1
            errorF.innerText =""
        }
    }
    catch(e){
        console.log(e)
    }
}

