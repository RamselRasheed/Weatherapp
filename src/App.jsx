import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';

function App() {
  const [search,setSearch]=useState("")
  const [data,setdata]=useState({})
  const clouds=[{weather:"few clouds",image:"../fewclouds.webp"},
          {weather:"broken clouds",image:"../broken.webp"},
          {weather:"scattered clouds",image:"../scatteredclouds.webp"},
          {weather:"overcast clouds",image:"../overcast.webp" },
          {weather:"haze",image:"../hazze.webp" },
          {weather:"light rain",image:"../lightrain.jpeg" },
          {weather:"clear sky",image:"../clearsky.webp"}]
async function getWeather(){
  if (search!=""){
  const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=0c03f125390f847ac96a9f5b45e02d12`)
  console.log(typeof(res.data)); 
  setdata(res.data)
}
else{
  alert("Enter the location")
}
}
 useEffect(()=>{
  async function getKochi(){
    const kochiRes =await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=kochi&appid=0c03f125390f847ac96a9f5b45e02d12`)
    setdata(kochiRes.data)
  }
    getKochi()
 },[])

 
console.log(search);
  return (
    <>
      <div className="container">

      <section className="vh-100 lg-12 md-12 sm-12" style={{backgroundImage: data?`url(${clouds.find(
        item=>item.weather===(data.weather && data.weather[0].description))?.image})`:
      'url(../fewclouds.webp)',position:"absolute",top:"0",left:"0",height:"100%",width:"100%",backgroundSize:"cover",backgroundPosition:"center",filter:"brigthness(50%)"}}>
  <div className="container py-5 h-100 ">
    <div className="row d-flex justify-content-center align-items-center h-100 text-light">
      <div className="col-md-10 col-lg-8 col-xl-6 sm-12 ">
        <h1 className="display-1">WEATHER APP</h1>
        {/* search */}
        <div className="container-fluid my-5">
    <div className="d-flex" role="search">
      <input className="form-control me-2 opacity-25 rounded-pill" type="search" placeholder="Search" aria-label="Search" onChange={(e)=>setSearch(e.target.value)}/>
      <button className="btn btn-primary opacity-60 rounded-pill" type="submit" onClick={getWeather} >Search</button>
    </div>
  </div>
  {/* end search */}
        <div className="my-5 card text-white" style={{border:"none"}}>
        <div className="bg-image  opacity-75" style={{borderRadius: "35px"}}>
            <div className="mask" style={{backgroundColor: "rgba(190, 216, 232, .5)"}}></div>
          </div>
          <div className="card-img-overlay text-light p-5">
            <h4 className="mb-0 display-4">{data.name},{data.sys && data.sys.country}</h4>
            <p className="display-1 my-3">{Math.round(((data.main && data.main.temp)-273.15)*100)/100}°C</p>
            <p className="mb-2">Feels Like: <strong>{Math.round(((data.main && data.main.feels_like)-273.15)*100)/100}°C</strong></p>
            <div className='d-flex'>
            <h5>{data.weather && data.weather[0].description}</h5>
            <img src={`http://openweathermap.org/img/wn/${data.weather && data.weather[0].icon}.png`} alt="Weather Icon" />
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</section>
      </div>
    </>
  )
}

export default App
