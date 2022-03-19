import axios from 'axios'
import React, { useState, useEffect} from 'react'
import { useForm } from 'react-hook-form'
import '../Home.css'
import { Country, State, City }  from 'country-state-city';


const Home = () => {

  const citiesArr = ['Berlin', 'Belgrad', 'Amsterdam', 'Venice', 'Brussel'];
  // const [cities, setCities] = useState([]);
  const [ctry, setCtry] = useState('');
  

  const { register, handleSubmit, watch, formState: {errors} } = useForm();
  const ageArr = [];
  for(let i = 18; i <= 80; i++){
    ageArr[i-18] = i;
  }

  console.log(Country.getAllCountries());

  // // useEffect(()=>{
  // //   const timerId = setTimeout(()=>{
  // //      setDebouncedCountry(country);
  // //   },700);
     
  // //   return(()=>{
  // //       clearTimeout(timerId);
  // //   })

  // },[country]);

  // useEffect(()=>{
  //  const search=async()=>{
      
  //  };
  //   if(debouncedCountry){search();}
   
  // },[debouncedCountry])

useEffect(() => {
  console.log(ctry);

}, [ctry])

  const selectTagStatus = Country.getAllCountries().includes(ctry) ? true : false;
  const countries = Country.getAllCountries();
  
  let lengthOfCountryInput = ctry.length;

  return (
    <div className='img-bg'>
      <div style={{display:'flex', justifyContent:'center'}}><h2 style={{paddingTop:'5%'}}>Search for Ads</h2></div>
      <div>
      <form onSubmit={handleSubmit((data) => {
        console.log(data);
      })} style={{display:'flex', justifyContent:'center', marginTop:'3%'}}>

        <div className='form-group'>
        <label htmlFor="country">Type in Country:</label>
        <input value={ctry} onChange={e => setCtry(e.target.value)} className='form-control' {...register("country", { required: 'You have to enter a country to search' })} name="country" type="text" />
        </div>

        <div className='form-group'>
        <label htmlFor='location'>Choose Location:</label>
        <select disabled={lengthOfCountryInput > 0 ? true : false} {...register("location", { required: true })} className='form-control'  name="location" id="location">
          {/* The options will be created by mapping over the data that
          comes back from the location api, for each city. */}
          <option selected disabled value="">Choose a Location</option>
          {/* <option value="Berlin">Berlin</option>
          <option value="Rome">Rome</option>
          <option value="Prague">Prague</option> */}
          {citiesArr.map((city,key) => (
            <option key={key} value={city}>{city}</option>
          ))}
          {/* <option value={city}>{city}</option> */}
        </select>
        </div>
        
        <div className='form-group'>
        <label htmlFor="arriving">Arriving:</label>
        <input className='form-control' {...register("arriving", { required: 'You have to select an arrival date' })} name="arriving" type="date" />
        </div>
        
        <div className='form-group'>
        <label htmlFor='leaving'>Leaving:</label>
        <input className='form-control' {...register("leaving", { required: true })} name='leaving' type="date" />
        </div>
        
        <div style={{display:'flex'}} className='form-group'>
        <div>
        <label htmlFor='minAge'>From:</label>
        <select {...register("minAge", { required: 'You have to select minimum age' , min:{value: 18, message:'You have to select minimum age'} })} className='form-control'  name="minAge" id="minAge">
          <option selected disabled value="">Age</option>
          {ageArr.map((item,key) => {
            return <option key={key} value={item}>{item}</option>
          })}
        </select>
        </div>

        <div>
        <label htmlFor='maxAge'>To:</label>
        <select {...register("maxAge", { required: true })} className='form-control' name="maxAge" id="maxAge">
        <option selected disabled value="">Age</option>
          {ageArr.map((item,key) => {
            return <option key={key} value={item}>{item}</option>
          })}
        </select>
        </div>
        </div>
        
         <div className='form-group'>
        <label htmlFor='gender'>Gender:</label>
        <select {...register("gender", { required: true })} className='form-control' name="gender" id="gender">
          <option value="Male">Male</option>
          <option value="Female">Female</option> 
        </select>
        </div>
        
        {/* {...required("gender", { required: true })} */}
         <button style={{height:'50%', marginTop:'2em'}} type="submit" className="btn btn-primary">Submit</button>
         
      </form>
      </div>
    </div>
    
  )
}

export default Home