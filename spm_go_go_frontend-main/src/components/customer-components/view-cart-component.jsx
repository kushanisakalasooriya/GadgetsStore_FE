import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './item-cart.css';
import {
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBInput,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";
import { faArrowAltCircleLeft, faHeart, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from "sweetalert2";
import NavBarGoGo from '../navigatonBar/navbarGoGo';

function ViewCart() {
    const [cartItems, setCartItems] = useState([]);
    const id = JSON.parse(sessionStorage.getItem("loggeduser"))._id;

    const getCartItems = async () => {
        try {
            const response = await axios.get(`http://localhost:5050/cart/get/${id}`);
            setCartItems(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCartItems();
    }, [])

    //Remove Item from Cart
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
                    window.location = '/cart/view/'
                )
            } else if (result.isDenied) {
                Swal.fire(
                    'Item is not deleted',
                    '',
                    'error'
                )
            }
        })
    }

    //add to favorites
    const onAddItem = async (Image, ItemName, Description, Price) => {
        try {
            const item = {
                image: Image,
                itemName: ItemName,
                description: Description,
                price: Price,
                userId: id,
            }

            const response = await axios.post("http://localhost:5050/favorites/add", item)

            if (response.status === 200) {
                Swal.fire({
                    title: 'Item was added to the Favourites!',
                    showCancelButton: true,
                    confirmButtonText: 'Go to Favourites',
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location = '/fav/view/'
                    }
                })

            }

        } catch (error) {
            if (error.response.status === 409) {
                alert(error.response.data.message);
            }
            else
                alert(error);
        }
        return false
    }

    //final total
    const finalTotal = async () => {

        let objectCart = [];
        let sum = 0;
        let iId = [];
        let objectItem = [];
        let OQty = [];

        try {

            const response = await axios.get(`http://localhost:5050/cart/get/${id}`);
            const responseItem = await axios.get('http://localhost:5050/storeAdmin/');

            objectItem = responseItem.data
            objectCart = response.data

            for (let i = 0; i < objectCart.length; i++) {
                sum = sum + (objectCart[i].price * objectCart[i].orderedQuanity)
            }
            sessionStorage.setItem("totalPayemt", sum);

            for (let j = 0; j < objectCart.length; j++) {
                for (let k = 0; k < objectItem.length; k++) {
                    if (objectCart[j].itemId === objectItem[k]._id) {

                        if (objectCart[j].orderedQuanity < objectItem[k].quantity) {

                            iId.push(objectCart[j]._id)
                            OQty.push(objectCart[j])

                            window.location = '/paymentOrder';
                        } else {
                            console.log("false");
                        }
                    }
                }
            }

            sessionStorage.setItem('itemId', JSON.stringify(iId))
            sessionStorage.setItem('ordQty', JSON.stringify(OQty))

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section >
            <NavBarGoGo />
            <MDBContainer className="h-100" style={{ marginTop: "120px", marginBottom: "50px" }}>
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol size="12">
                        <MDBCard className="card-registration card-registration-2" >
                            <MDBCardBody className="p-0">
                                <MDBRow className="g-0">
                                    <MDBCol lg="12">
                                        <div className="p-5" >
                                            <div >

                                                <MDBTypography >
                                                    <Link to={"/userHome"} className="backLink"><FontAwesomeIcon icon={faArrowAltCircleLeft} /> Go Back</Link>
                                                </MDBTypography>
                                                <center>
                                                    <MDBTypography tag="h3" className="fw-bold mb-0 text-black" style={{ marginTop: "-50px" }}>
                                                        Shopping Cart
                                                    </MDBTypography>
                                                </center>
                                            </div>

                                            {cartItems.map(cartItem => (
                                                <div key={cartItem._id}>

                                                    <hr className="my-4" />

                                                    <MDBRow className="mb-4 d-flex justify-content-between align-items-center">
                                                        <MDBCol md="2" lg="2" xl="2" >
                                                            <MDBCardImage
                                                                src={cartItem.images}
                                                                fluid className="rounded-3" alt="item image" />
                                                        </MDBCol>
                                                        <MDBCol md="3" lg="3" xl="5">
                                                            <MDBTypography tag="h6" className="text-muted">
                                                                {cartItem.itemName}

                                                            </MDBTypography>
                                                            <MDBTypography tag="h6" className="text-black mb-0">
                                                                {cartItem.description.slice(0, 200)}

                                                            </MDBTypography>
                                                            <MDBTypography tag="h6" className="text-black mb-0" style={{ paddingTop: "10px" }}>
                                                                <b>Rs. {cartItem.price}.00</b>

                                                            </MDBTypography>
                                                        </MDBCol>
                                                        <MDBCol md="3" lg="3" xl="2" className="d-flex align-items-center">

                                                            <MDBInput type="number" min="1" defaultValue={cartItem.orderedQuanity} size="sm" style={{ marginLeft: "50px" }}
                                                                onChange={async (e) => {
                                                                    try {
                                                                        const data = {
                                                                            orderedQuanity: e.target.value,
                                                                        }

                                                                        await axios.post(`http://localhost:5050/cart/update/${cartItem._id}`, data)

                                                                    } catch (error) {
                                                                        alert(error);
                                                                    }
                                                                    return false
                                                                }}
                                                            />

                                                        </MDBCol>
                                                        <MDBCol style={{ marginLeft: "150px" }}>
                                                            <Link to="#" onClick={() => onDeleteItem(cartItem._id)} className="iconMod"><FontAwesomeIcon icon={faTrashCan} /></Link>
                                                        </MDBCol>
                                                        <MDBCol style={{ marginLeft: "-20px" }}>
                                                            <Link to="#" onClick={() => onAddItem(cartItem.images, cartItem.itemName, cartItem.description, cartItem.price)} className="iconFavMod"><FontAwesomeIcon icon={faHeart} /></Link>
                                                        </MDBCol>

                                                    </MDBRow>
                                                </div>
                                            ))}

                                            <center><button onClick={() => finalTotal()} className='btn btn-secondary' style={{ marginBottom: "50px" }} >Proceed to Checkout</button ></center>
                                        </div>
                                    </MDBCol>

                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>

    )
}

export default ViewCart
