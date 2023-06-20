import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./userAdminreport.css"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import AdminNavBarGoGo from "../../../navigatonBar/adminNav";
import { useReactToPrint } from "react-to-print";

export default function UserAdminReport(p) {

  const [total, setTotal] = useState();


  const [Central, setCentral] = useState();
  const [East, setEast] = useState();
  const [NorthCentral, setNorthCentral] = useState();
  const [North, setNorth] = useState();
  const [NorthWest, setNorthWest] = useState();
  const [Sabaragamuwa, setSabaragamuwa] = useState();
  const [South, setSouth] = useState();
  const [Uva, setUva] = useState();
  const [West, setWest] = useState();
  const [districtName, setDistrictName] = useState('');


  const [registeredUsers, setAllUsers] = useState([]);
  const [district, setDistrict] = useState([]);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
  );

  /**
   * Bar chart
   */

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Registered Users Count',
      },
    },
  };

  const labels = ['Central', 'Eastern', 'North Central', 'Northern', 'North West', 'Sabaragamuwa', 'Southern', 'Uva', 'Western'];

  const data = {
    labels,
    datasets: [
      {
        label: '',
        data: [Central, East, NorthCentral, North, NorthWest, Sabaragamuwa, South, Uva, West],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      },
    ],
  };


  // get total users
  function getTotalUsers() {
    axios.get("http://localhost:5050/user/get-all").then((res) => {

      setAllUsers(res.data);
      setDistrict(res.data.district);

      let count = 0;
      for (let i = 0; i < res.data.length; i++) {
        count++
      }
      setTotal(count);

    })
  }

  // get all users districts
  function getALLUsersDistrict() {
    axios.get("http://localhost:5050/user/get-all").then((res) => {


      setAllUsers(res.data);

      let count = 0;

      for (let i = 0; i < res.data.length; i++) {

        count++
        setDistrict(res.data[i].district);
      }


    })
  }

  // central province
  function getCentralProvinceCount() {
    axios.get("http://localhost:5050/user/get-all").then((res) => {

      setAllUsers(res.data);

      let count = 0;
      for (let i = 0; i < res.data.length; i++) {

        count++
        setDistrict(res.data[i].district);
      }

      let count2 = 0;
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].district === 'Kandy' || res.data[i].district === 'Matale' || res.data[i].district === 'Nuwara Eliya') {

          count2++
          setCentral(count2);
        }
      }
   
    })
  }


  // Eastern province
  function getEasternProvinceCount() {
    axios.get("http://localhost:5050/user/get-all").then((res) => {

      setAllUsers(res.data);

      let count1 = 0;
      for (let i = 0; i < res.data.length; i++) {
        count1++
        setDistrict(res.data[i].district);
      }

      let count3 = 0;
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].district === 'Batticaloa' || res.data[i].district === 'Ampara' || res.data[i].district === 'Trincomalee') {
          count3++
          setEast(count3);
        }
      }
 
    })
  }

  // North Central
  function getNorthCentralProvinceCount() {
    axios.get("http://localhost:5050/user/get-all").then((res) => {

      setAllUsers(res.data);

      let count1 = 0;
      for (let i = 0; i < res.data.length; i++) {
        count1++
        setDistrict(res.data[i].district);
      }

      let count4 = 0;
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].district === 'Anuradhapura' || res.data[i].district === 'Polonnaruwa') {
          count4++
          setNorthCentral(count4);
        }
      }
    
    })
  }

  // Northern province
  function getNorthProvinceCount() {
    axios.get("http://localhost:5050/user/get-all").then((res) => {

      setAllUsers(res.data);

      let count = 0;
      for (let i = 0; i < res.data.length; i++) {
        count++
        setDistrict(res.data[i].district);
      }

      let count5s = 0;
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].district === 'Jaffna' || res.data[i].district === 'Kilinochchi' || res.data[i].district === 'Mannar' || res.data[i].district === 'Vavuniya' || res.data[i].district === 'Mullaitivu') {

          count5s++
          setNorth(count5s);
        }
      }

    })
  }



  // North Western province
  function getNorthWestProvinceCount() {
    axios.get("http://localhost:5050/user/get-all").then((res) => {

      setAllUsers(res.data);

      let count = 0;
      for (let i = 0; i < res.data.length; i++) {
        count++
        setDistrict(res.data[i].district);
      }

      let count6 = 0;
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].district === 'Kurunegala' || res.data[i].district === 'Puttalam') {

          count6++
          setNorthWest(count6);
        }
      }
 
    })
  }


  // Sabaragamuwa province
  function getSabaragamuwaProvinceCount() {
    axios.get("http://localhost:5050/user/get-all").then((res) => {

      setAllUsers(res.data);

      let count = 0;
      for (let i = 0; i < res.data.length; i++) {
        count++
        setDistrict(res.data[i].district);
      }

      let count7 = 0;
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].district === 'Ratnapura' || res.data[i].district === 'Kegalle') {

          count7++
          setSabaragamuwa(count7);
        }
      }
     
    })
  }


  // Southern province
  function getSouthernProvinceCount() {
    axios.get("http://localhost:5050/user/get-all").then((res) => {

      setAllUsers(res.data);

      let count = 0;
      for (let i = 0; i < res.data.length; i++) {

        count++
        setDistrict(res.data[i].district);
      }

      let count8 = 0;
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].district === 'Galle' || res.data[i].district === 'Matara' || res.data[i].district === 'Hambantota') {

          count8++
          setSouth(count8);
        }
      }
  
    })
  }

  // Uva province
  function getUvaProvinceCount() {
    axios.get("http://localhost:5050/user/get-all").then((res) => {

      setAllUsers(res.data);

      let count = 0;
      for (let i = 0; i < res.data.length; i++) {

        count++
        setDistrict(res.data[i].district);
      }

      let count9 = 0;
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].district === 'Badulla' || res.data[i].district === 'Moneragala') {

          count9++
          setUva(count9);
        }
      }
    
    })
  }

  // Western province
  function getWesternProvinceCount() {
    axios.get("http://localhost:5050/user/get-all").then((res) => {

      setAllUsers(res.data);

      let count = 0;
      for (let i = 0; i < res.data.length; i++) {
        count++
        setDistrict(res.data[i].district);
      }

      let count10 = 0;
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].district === 'Colombo' || res.data[i].district === 'Gampaha' || res.data[i].district === 'Kalutara') {
          count10++
          setWest(count10);
        }
      }
    
    })
  }


  useEffect(() => {
    getALLUsersDistrict();
    getTotalUsers();

    getCentralProvinceCount();
    getEasternProvinceCount();
    getNorthCentralProvinceCount();
    getNorthProvinceCount();
    getNorthWestProvinceCount();
    getSabaragamuwaProvinceCount();
    getUvaProvinceCount();
    getWesternProvinceCount();
    getSouthernProvinceCount();
  }, [])


  const generateReport = () => {
    window.print();
  }


  const goBack = () => {
    window.location = "/user-admin-dashboard"
  }

  return (

    <div>
      <AdminNavBarGoGo />
      <br></br> <br></br> <br></br> <br></br> <br></br>
      <Link onClick={goBack} to="#" className="backLink">
        <FontAwesomeIcon icon={faArrowAltCircleLeft} />
        &nbsp;Go Back
      </Link>
      <br></br>  <br></br> <br></br>
      <div className="userReportContainer">
        <center>
          <table>
            <div className="container">
              <div className='col mx-auto'>
                <div className="card shadow">
                  <div className='card-header bg-success'></div>
                  <div className="card-body">
                    <div className=''>TOTAL REGISTERED MEMBERS</div>
                    <center><h5 className=''> {total}</h5></center>
                  </div>
                </div>
              </div>
            </div>
          </table>
        </center>

        <br></br> <br></br>
        <center>
          <div className="container">
            <div className='col-xl-8'>
              <div className='card shadow'>
                <div className='card-header bg-light font-weight-bold text-gray-800 text-center'>REPORT REGARDING REGISTERED MEMBERS</div>

                <Bar options={options} data={data} />
              </div>
            </div>
          </div>
        </center>
      </div>

      <div style={{ marginBottom: "30px" }}>
        <button className="reportbtn btn btn-dark" onClick={generateReport}>Print</button>
      </div>
    </div>

  )

}
