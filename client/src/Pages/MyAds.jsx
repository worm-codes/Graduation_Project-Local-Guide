import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from "../context/AuthContext";
import { Link, useParams } from "react-router-dom";
import { useForm } from 'react-hook-form'
import axios from "axios";
import Navbar from "./Navbar";

const MyAds = () => {

    const { currentUser } = useContext(AuthContext);
    let useAuth=useContext(AuthContext)
    //const [adsArrState, setAdsArrState] = useState([])
    const [adArrState, setAdArrState] = useState([])
    const { handleSubmit } = useForm();
    // const { id } = useParams();
    let generalData = []
    //setAdArrState([])
    useEffect(()=> {
      setAdArrState([])
    }, [])
    useEffect(() => {
        const getAds = async () => {
            const response = await axios.get(`http://localhost:5000/api/myads`,{
                headers:{Authorization: 'Bearer ' + await useAuth.currentUser.getIdToken(true)}
              }) 
              setAdArrState(response.data[0])
        } 
        getAds();
    }, [])
    console.log(adArrState)
    //setAdArrState([])

  return (
    <>
        <div>
            <Navbar/>
        <div className="table-responsive">
            <table className="table table hover">
            <thead className='thead-dark'>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Email</th>
      <th scope="col">Country</th>
      <th scope="col">State</th>
      <th scope="col">City</th>
      <th scope="col">Detail</th>
    </tr>
  </thead>
  <tbody>
      {adArrState.map((ad,key) => (
        
          <tr key={key}>
              <th scope='row'>{key+1}</th>
              <td>{ad.owner_email}</td>
              <td>{ad.country}</td>
              <td>{ad.state}</td>
              <td>{ad.city}</td>
              <td>
                  <form onSubmit={handleSubmit(async (data) => {
                      const changedAd = await axios.put(`http://localhost:5000/api/myads`,  {adID: ad._id})  
                  })}>
                      <button className='btn btn-warning'>Cancel</button>
                  </form>
              </td>
          </tr>
      ))}
    
  </tbody>

            </table>
        </div>
        </div>
    </>
  )
}

export default MyAds