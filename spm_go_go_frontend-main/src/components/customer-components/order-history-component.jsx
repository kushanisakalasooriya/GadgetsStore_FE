import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './item-cart.css';
import AddReviewsModel from './addReviewModel';
import {
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";
import { faCheckCircle, faArrowAltCircleLeft } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Modal } from 'react-bootstrap';
import NavBarGoGo from '../navigatonBar/navbarGoGo';
import Swal from "sweetalert2";

function OrderHistory() {

    const [cartItems, setCartItems] = useState([]);
    const [modal, setModal] = useState(false);
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

    //Remove Item from Order History
    const onDeleteItem = async (id) => {

        await Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to delete the selected item?",
            icon: 'warning',
            showDenyButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: `Cancel`,
            timer: 5000,
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(

                    'Deleted!',
                    '',
                    'success',
                    axios({
                        method: 'DELETE',
                        url: `http://localhost:5050/cart/${id}`
                    }),
                    window.location = '/order-history'
                )
            } else if (result.isDenied) {
                Swal.fire(
                    'Item is not deleted',
                    '',
                    'error'
                )
            }
        })

        // if (window.confirm('Are you sure, you want to delete the selected Item?')) {
        //     try {
        //         await axios({
        //             method: 'DELETE',
        //             url: `http://localhost:5050/cart/${id}`
        //         })
        //         alert("Selected Item is Removed !!")
        //         getCartItems()
        //     } catch (error) {
        //         alert(error)
        //     }
        // }
    }

    const total = (Price, Qty) => {
        return Price * Qty
    }

    const openInsertModal = (ID) => {
        window.sessionStorage.setItem("itemID", ID);
        setModal(true);
    }

    const closeInsertModal = () => setModal(false);

    return (
        <section style={{ marginTop: "120px", marginBottom: "50px" }}>
            <NavBarGoGo />
            <MDBContainer className=" h-100" style={{ marginTop: "50px" }}>
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol size="12">
                        <MDBCard className="card-registration card-registration-2" >
                            <MDBCardBody className="p-0">
                                <MDBRow className="g-0">
                                    <MDBCol lg="12">
                                        <div className="p-5" style={{ marginBottom: "50px", marginTop: "-20px" }}>
                                            <div className="d-flex justify-content-between align-items-center mb-5">

                                                <MDBTypography className="mb-0 text-muted">
                                                    <Link to={"/user-profile"} className="backLink"><FontAwesomeIcon icon={faArrowAltCircleLeft} /> Go Back</Link>
                                                </MDBTypography>
                                                <MDBTypography tag="h3" className="fw-bold mb-0 text-black" style={{ marginTop: "50px", marginLeft: "150px" }}>
                                                    Order History
                                                </MDBTypography>
                                                <MDBTypography className="mb-0 text-muted" >
                                                    <Link to="/orderedReport" className='orderRepoertMod'> <button className='btn btn-secondary' style={{ marginTop: "55px" }}>Ordered Report</button> </Link>
                                                </MDBTypography>

                                            </div>

                                            {cartItems.map(cartItem => (
                                                <div key={cartItem._id} >

                                                    <MDBRow style={{ marginTop: "25px" }}>
                                                        <MDBCol md="2" lg="2" xl="2" className="card-item" style={{ borderRadius: "10px 0px 0px 10px" }}>
                                                            <MDBCardImage
                                                                src={cartItem.images} alt="item image" style={{ width: "130px", height: "130px" }} />
                                                        </MDBCol>

                                                        <MDBCol md="3" lg="3" xl="10" className="card-item" style={{ borderRadius: "0px 10px 10px 0px" }}>

                                                            <MDBRow style={{ marginTop: "20px" }}>
                                                                <MDBCol>
                                                                    <MDBTypography tag="h6" className="completedMod">
                                                                        Completed <FontAwesomeIcon icon={faCheckCircle} />
                                                                    </MDBTypography>
                                                                </MDBCol>

                                                                <MDBCol style={{ marginLeft: "600px" }}> Order date : {cartItem.orderedDate.substring(0, 9)} </MDBCol>
                                                            </MDBRow>
                                                            <MDBRow>
                                                                <hr className='hrMod'></hr>
                                                            </MDBRow>

                                                            <MDBRow style={{ marginTop: "-20px" }}>
                                                                <MDBCol md="3" lg="3" xl="9">
                                                                    <MDBTypography tag="h6" className="titleMod">
                                                                        {cartItem.itemName}
                                                                    </MDBTypography>

                                                                    <MDBTypography tag="h6" className="priceMod" style={{ paddingTop: "10px" }}>
                                                                        Rs. {cartItem.price}.00 x {cartItem.orderedQuanity}
                                                                    </MDBTypography>
                                                                </MDBCol>

                                                                <MDBCol >
                                                                    <MDBTypography tag="h6" >

                                                                        <div className='totalMod'> Total: Rs {total(cartItem.price, cartItem.orderedQuanity)}.00</div>

                                                                        <Link to="#" onClick={() => onDeleteItem(cartItem._id)} className="RemoveBtnMod"> Remove </Link>
                                                                        <Link to="#" onClick={() => openInsertModal(cartItem._id)} className="ReviewBtn"> Add Review</Link>

                                                                    </MDBTypography>
                                                                </MDBCol>

                                                            </MDBRow>
                                                        </MDBCol>
                                                    </MDBRow>
                                                </div>
                                            ))}
                                        </div>
                                    </MDBCol>

                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            {/* Insert Modal */}
            <Modal show={modal} onHide={closeInsertModal} backdrop="static" size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>
                        Add Your Review
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <AddReviewsModel />
                </Modal.Body>
            </Modal>
        </section>
    )
}

export default OrderHistory