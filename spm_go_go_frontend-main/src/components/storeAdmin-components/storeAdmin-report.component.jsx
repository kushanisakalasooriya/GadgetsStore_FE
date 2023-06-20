import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from "axios";
import Chart from "react-apexcharts";
import AdminNav from '../navigatonBar/adminNav';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";


function StoreAdminReport() {
    
    const [items, setItems] = useState([]);
    const options = { labels: items };
    const [quantities, setQuantities] = useState([]);
    const [covidData, setCoviddata] = useState([
        44, 17, 15 , 20
    ]);

    const options1 = {
        chart: {
            id: 'item-graph'
        },
        xaxis: {
            categories: items,
            title: {
                text: 'Item Name',
            },
        },
        yaxis: {
            title: {
                text: 'Quantity',
            },
        },
    }


    function getItems() {
        const temp = [];
        const temp1 = [];
        axios.get('http://localhost:5050/storeAdmin').then((response) => {
            for (let i = 0; i < response.data.length; i++) {
                temp.push(parseInt(response.data[i].orderedQuanity));
                temp1.push(response.data[i].itemName);
            }
            setQuantities(temp);
            setItems(temp1);
            setCoviddata(temp);
        })
    }

    const goBack = () => {
        window.location = "/storeAdmin"
    }

    useEffect(() => {
        getItems();
    }, [])

    const Print = () => {
        let printContents = document.getElementById("printablediv").innerHTML;
        let w = window.open();
        w.document.write(printContents);
    
        w.document.close(); // necessary for IE >= 10
        w.focus(); // necessary for IE >= 10
    
        setTimeout(function () {
          // necessary for Chrome
          w.print();
        }, 0);
    
        return true;
      };

    return (
        <div id='printablediv' className='container' style={{border:"solid 5px", marginTop:"100px", marginBottom:"20px"}}>
            <AdminNav/>
            <Link onClick={goBack} to="#" className="backLink">
                <FontAwesomeIcon icon={faArrowAltCircleLeft} />
                &nbsp;Go Back
            </Link>
            <h2 style={{ marginTop:"20px", textAlign:"center"}}> SOLD ITEM QUANTITIES OVERVIEW</h2>
            <button onClick={Print} style={{float:"right"}} className='btn btn-primary'> Print </button>
            <div className="row" style={{ marginTop:"50px", marginLeft:"400px"}}>
                <div className="mixed-chart">
                    <Chart
                        options={options}
                        series={covidData.map((data) => data)}
                        type="donut"
                        width="600"
                    />
                </div>
            </div>

            <center>
            <div className='row' style={{ marginTop:"50px", marginBottom:"50px"}}>
                <Chart options={options1}
                    series={[{
                        name: 'temp',
                        data: quantities
                    }]}
                    type="bar"
                    height={'350px'}
                    width={'85%'} />

            </div>
            </center>
        </div>
    )
}

export default StoreAdminReport
