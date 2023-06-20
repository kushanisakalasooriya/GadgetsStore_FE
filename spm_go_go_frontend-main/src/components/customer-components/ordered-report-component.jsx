import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ordered-report.css"
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
import NavBarGoGo from '../navigatonBar/navbarGoGo';

export default function OrderedReport(p) {

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
                text: 'Paid Items Summary',
            },
        },
    };


    const [cartItems, setCartItems] = useState([]);
    const id = JSON.parse(sessionStorage.getItem("loggeduser"))._id;

    const getCartItems = async () => {
        try {
            const response = await axios.get(`http://localhost:5050/cart/history/${id}`);
            setCartItems(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCartItems();
    }, [])

    const labels = [];
    let sum = 0;
    let tot = 0;

    const data = {
        labels,
        datasets: [
            {
                label: '',
                data: [],
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

    for (let i = 0; i < cartItems.length; i++) {
        labels.push(cartItems[i].itemName);
        sum = (cartItems[i].price * cartItems[i].orderedQuanity)
        data.datasets[0].data.push(sum);
    };

    const total = () => {
        for (let i = 0; i < cartItems.length; i++) {
            tot = tot + (cartItems[i].price * cartItems[i].orderedQuanity)
        };
        return tot
    }
    return (

        <div>
            <NavBarGoGo />
            <Link to={"/order-history"} className="backLink"><FontAwesomeIcon icon={faArrowAltCircleLeft} /> Go Back</Link>
            <div className="section-to-print">
                <div className="userReportContainer" style={{ marginTop: "100px" }}>
                    <center>
                        <div className="container" style={{ width: "300px" }}>
                            <div className='col mx-auto' >
                                <div className="card shadow" >
                                    <div className='card-header bg-success' ></div>
                                    <div className="card-body">
                                        <div className=''>TOTAL PRICE YOU SPENT</div>
                                        <center><h5 className=''>LKR: {total()}.00</h5></center>
                                        <center><h5 className=''> </h5></center>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </center>

                    <br></br> <br></br>
                    <center>
                        <div className="container">
                            <div className='col-xl-8'>
                                <div className='card shadow'>
                                    <div className='card-header bg-light font-weight-bold text-gray-800 text-center'>REPORT REGARDING ORDERED ITEMS</div>

                                    <Bar options={options} data={data} />
                                </div>
                            </div>
                        </div>
                    </center>
                </div>
            </div>

            <div style={{ paddingTop: "30px", paddingBottom: "30px" }}>
                <button className="reportbtn btn btn-dark" onClick={() => window.print()}>Print</button>
            </div>
        </div>

    )

}
