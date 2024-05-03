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
          {weather:"overcast clouds",image:"../overcast.gif"},
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

      <section className="vh-100" style={{backgroundColor: "#f5f6f7"}}>
  <div className="container py-5 h-100 ">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-md-10 col-lg-8 col-xl-6 ">
        {/* search */}
        <div className="container-fluid">
    <div className="d-flex" role="search">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e)=>setSearch(e.target.value)}/>
      <button className="btn btn-outline-success opacity-25" type="submit" onClick={getWeather} >Search</button>
    </div>
  </div>
  {/* end search */}
        <div className="my-3 card bg-dark text-white" style={{borderRadius: "35px"}}>
        <div className="bg-image" style={{borderRadius: "35px"}}>
           {
            clouds.map((e)=>(
              e.weather==(data.weather && data.weather[0].description)?<img src={e.image} alt=""
              className="card-img"  style={{width:"100%",height:"100%",objectFit:"cover",borderRadius: "35px" }} />
         :<></>
            )
             )
           }
  
            <div className="mask" style={{backgroundColor: "rgba(190, 216, 232, .5)"}}></div>
          </div>
          <div className="card-img-overlay text-light p-5">
            <h4 className="mb-0">{data.name},{data.sys && data.sys.country}</h4>
            <p className="display-2 my-3">{Math.round(((data.main && data.main.temp)-273.15)*100)/100}°C</p>
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
