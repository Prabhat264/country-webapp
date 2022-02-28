import React, { useState } from 'react'
import Head from 'next/head';
import { useEffect } from 'react';

export const getStaticPaths = async () => {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const data = await res.json();

  const paths = data.map((ele) => {
    return {
      params: {
        country: ele.cca3.toString(),
      }
    }
  });

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async (context) => {
  const cca3 = context.params.country;
  const res = await fetch("https://restcountries.com/v3.1/alpha/" + cca3);
  const data = await res.json();
  

  return {
    props: {
      data,
    }
  };
}

const Country = ({ data }) => {
  let curr = "NULL";
  if (data[0].currencies) {
    curr = Object.values(data[0].currencies)[0].name;
  }
  const [myData, setMyData] = useState([])

  const tempFun = async () => {
    let result = [];

    if(data[0].borders){

    await Promise.all(
      data[0].borders.map(async (ele) => {
        const res1 = await fetch('https://restcountries.com/v3.1/alpha/' + ele);
        const data1 = await res1.json();

        result.push(data1[0]);
      })
    )
    }

    setMyData(result)
  }

  useEffect(() => {
    tempFun()
  }, [])
  
  
  return (
    <>
      <Head>
        <title></title>
      </Head>
      <div className='container mt-2'>
        <div className="row justify-content-center">
          <div className="col-sm-8  border">
            <h1> {data[0].name.common} </h1>
            <div className="row">
              <div className="col-sm-5 mt-2">
                <img src={data[0].flags.png} width="100%" height="60%" />
              </div>
              <div className="col-sm mt-1">
                <p className="mb-2"><b>Native Name :</b> </p>
                <p className="mb-2"><b>Capital :</b>  {data[0].capital && data[0].capital[0]}</p>
                <p className="mb-2"><b>Population :</b>  {data[0].population}</p>
                <p className="mb-2"><b>Region :</b>  {data[0].region}</p>
                <p className="mb-2"><b>Sub-region :</b> {data[0].subregion}</p>
                <p className="mb-2"><b>Area :</b>  {data[0].area}</p>
                <p className="mb-2"><b>Country Code</b> : {data[0].region}</p>
                <p className="mb-2"><b>Languages :</b> { }</p>
                <p className="mb-2"><b>Currencies :</b> {curr}</p>
                <p className="mb-2"><b>Timezones :</b> {data[0].timezones  && data[0].timezones[0]}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='container mt-2'>
        <div className="row justify-content-center">
          <div className="col-sm-8  border">
            <h2>Neighbour Countries</h2>
            { 
            myData.map((ele)=>{
              return <img src={ele.flags.png} width="200px" height="150px" style={{'margin':'20px'}} key={ele.cca3}/>
              
            })  
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Country;