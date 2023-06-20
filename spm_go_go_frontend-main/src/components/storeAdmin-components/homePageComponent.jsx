import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import './home1.scss';
import {
    MDBCard,
    MDBCardBody,
    MDBCardFooter,
    MDBCardImage,
    MDBCardTitle,
    MDBCardText,
    MDBRow,
    MDBCol,
    MDBBtn
} from 'mdb-react-ui-kit';
import HomeSlider from './homeSlider';
import HomeCarousel from './homeCarousel';
import NavBarGoGo from '../navigatonBar/navbarGoGo';

const HomePageComponent = () => {

    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState('');

    const searchText = (event) => {
        setFilter(event.target.value)
    }

    let dataSearch = items.filter(item => {
        return Object.keys(item).some(key =>
            item[key].toString().toLowerCase().includes(filter.toString().toLowerCase())
        )
    });

    const getItems = async () => {
        try {
            const response = await axios.get('http://localhost:5050/storeAdmin');
            setItems(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getItems();
    }, [])

    const imageClick = (id) => {
        window.sessionStorage.setItem('itemid', id);
        window.location = "/item"
    }

    return (
        <div>
            <NavBarGoGo/>

            <div className='container'>

                <div className="col-12 mb-5" style={{marginTop: "50px"}}>
                    <div className="mb-3 col-4 mx-auto text-center">
                        <label className="form-label h4 mt-3" style={{ color: 'white' }}> Search </label>
                        <input placeholder='Search' className="form-control" type="text" value={filter} onChange={searchText.bind(this)} />
                    </div>
                </div>
                <center><HomeCarousel /></center>
                <div className="mx-auto">
                    <MDBRow className='row-cols-1 row-cols-md-3 g-4' style={{ paddingLeft: '80px' }}>
                        {dataSearch.map((item, index) => {
                            return (
                                <MDBCol>
                                    <MDBCard
                                        className='h-100 '
                                        style={{ width: '300px' }}>
                                       
                                        <div className='imgbk'><img onClick={() => imageClick(item._id)} className='card_image' src={item.images} /></div>
                                        <MDBCardBody>
                                            <center>
                                                <MDBCardTitle > {item.itemName} </MDBCardTitle>
                                                <MDBCardText >
                                                    Rs. {item.price}.00
                                                </MDBCardText>
                                            </center>
                                        </MDBCardBody>
                                        {/* <MDBCardFooter style={{ backgroundColor: 'white' }}>
                                            <center>
                                                <Link to={"/"}><MDBBtn className="btn btn-outline-secondary btn-sm" href='#' style={{ float: "right", color: 'white', backgroundColor: '#B21B25' }}> Add to cart </MDBBtn></Link>
                                            </center>
                                        </MDBCardFooter> */}
                                    </MDBCard>

                                </MDBCol>

                            )
                        })}
                    </MDBRow>
                </div>
                <br /><br />
            </div>
        </div>
    )
}

export default HomePageComponent
