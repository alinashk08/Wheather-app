import React, { useEffect,useState } from 'react'

import axios from 'axios';



const App = () => {
  const[input,setInput]=useState("ireland")
  const[ weatherData, setWeatherData]=useState();
  const[submitted,setSubmitted]=useState(false);
  const api_key = "3d2abbc5b4fa54a26cf472f529761057";
  const baseurl = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${api_key}`;
  
  useEffect(()=>{
    fetchData();
  },[])
  
  const fetchData=async()=>
    {
      try{
        const fetch=await axios.get(baseurl)
        console.log(fetch.data);
        setWeatherData(fetch.data);
        setSubmitted(true);
      }
      catch(error){
        console.log(error);
}
};
const formatTime=(time)=>{
  const date= new Date(time*1000);
  const options={
    hour:'numeric',
    minute:'numeric'
  };
  return date.toLocaleDateString([],options);
};
  return (
    <div className="bg-[url(https://images.app.goo.gl/5WrKQ1cvvn5ihKmdA)]">

    <div className='max-w-md mx-auto mt-8 rounded-lg overflow-hidden shadow-lg bg-slate-500'>
      <div className='flex items-center bg-slate-50 border-b border-gray-50 p-2'>
        <input
          type="text"
          className='flex-1 appearance-none bg-transparent border-none w-full text-grey-700 mr-3 py-1 px-2 leading-tight focus: outline-none'
          placeholder='enter city name'
          onRateChange={(e) => setInput(e.target.value)}
        />
        <button className='bg-blue-950 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded'>
          onClick={()=> fetchData()}
          submit
        </button>
      </div>
      {weatherData &&(
      <div className='p-4'>
        <div className='text-gray-800 font- bold text-xl mb-2'>
          weather details
        </div>
        <div className='border border-gray-500 p-4 rounded-lg bg-white'>
          <p className='mb-4'><span className='font-bold'>coordinates:</span> Latitude={weatherData?.coord?.lat}, Longitude={weatherData?.coord?.lon}
          </p>
          <p className='mb-2'><span className='font-bold'> temperature</span> {Math.round(weatherData?.main?.temp - 273)} °C
          </p>
          <p className='mb-2'><span className='font-bold'>pressure</span> {weatherData?.main?.pressure} 
          Pa</p>
          <p className='mb-2'><span className='font-bold'>humidity</span>{weatherData?.main?.humidity} 
          %</p>
          <div className='flex justify-between'>
            <p className='mb-2'><span className='font-bold'> wind speed</span>{weatherData?.wind?.speed} km/h
            </p>
            <p className='mb-2'><span className='font-bold'> sunrise</span>{formatTime(weatherData?.sys?.sunrise)}
            </p>
            <p className='mb-2'><span className='font-bold'> sunset</span>{formatTime(weatherData?.sys?.sunset)}
            </p>
          </div>
        </div>
      </div>)}
    </div>
    </div>
    
  )
}

export default App