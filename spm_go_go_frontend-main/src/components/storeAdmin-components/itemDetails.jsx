import React, { useEffect, useState } from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBCardText,
    MDBCardImage,
    MDBCardTitle,
} from 'mdb-react-ui-kit';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './itemDetails.scss'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons";
import NavBarGoGo from '../navigatonBar/navbarGoGo';
import Swal from "sweetalert2";


function ItemDetails() {

    const id = window.sessionStorage.getItem('itemid');
    const [item, setItem] = useState([]);
    const [OrderedQuanity, setOrderedQuantity] = useState("")
    const UserId = JSON.parse(sessionStorage.getItem("loggeduser"))._id;
    const [reviews, setReviews] = useState([]);


    const getItem = async () => {
        try {
            const response = await axios.get("http://localhost:5050/storeAdmin/" + id);
            setItem(response.data);
        } catch (err) {
            console.log(err);
        }

    }

    const getReviews = async () => {
        let tempReview = [];
        try {
            const response = await axios.get("http://localhost:5050/reviews/itemreviews/" + id);
            for (let i = 0; i < response.data.length; i++) {
                tempReview.push(response.data[i].review);
            }
            if (tempReview[0] == null){
                setReviews(["Currently no reviews for this item"]);
            }else{
                setReviews(tempReview);
            }
            // console.log('a',tempReview);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getItem();
        getReviews();
    }, [])

    const goBack = () => {
        window.location = "/userHome"
    }


    //add to cart
    const onAddItem = async (Image, ItemName, Description, Price, Quantity, Specifications, Offer) => {
        try {
            const item = {
                itemId: id,
                images: Image,
                itemName: ItemName,
                description: Description,
                price: Price,
                quantity: Quantity,
                showOnCart: true,
                paidStatus: false,
                orderedQuanity: OrderedQuanity,
                offer: '10',
                specifications: Specifications,
                userId: UserId,
            }

            if (item.orderedQuanity <= 0) {
                alert("Please Select quantity");
            }
            else {
                const response = await axios.post("http://localhost:5050/cart/add", item)
                const response1 = await axios.post(`http://localhost:5050/storeAdmin/update/${id}`, item)
                if (response.status === 200 || response1.status === 200) {
                    Swal.fire(
                        'Done!',
                        'Item added to the cart!',
                        'success'
                    )
                }
            }

        } catch (error) {
            console.log(response.error);
        }
        return false
    }



    return (
        <div className='container'>
            <NavBarGoGo />
            <MDBCard className='item_card'>
                <Row>
                    <Col>
                        <Link onClick={goBack} to="#" className="backLink">
                            <FontAwesomeIcon style={{ height: "30px" }} icon={faArrowAltCircleLeft} />
                            &nbsp;
                        </Link>
                        <div className='item'>
                            <MDBCardImage className='item_image' src={item.images} alt='...' position='top' />
                        </div>
                    </Col>
                    <Col>
                        <MDBCardBody>
                            <MDBCardTitle className='item_title'>
                                {item.itemName}
                            </MDBCardTitle>
                            <hr className='hrtopic'></hr>
                            <MDBCardText className='item_des'>
                                {item.description}
                            </MDBCardText>
                            <div>
                                <Row>
                                    <Col>
                                        <input className='item_quantity' type="number" min="0" defaultValue="0" onChange={(e) => {
                                            setOrderedQuantity(e.target.value);
                                        }} />
                                    </Col>
                                    <Col>
                                        <button className='item_btn btn btn-primary' onClick={() => onAddItem(item.images, item.itemName, item.description, item.price, item.quantity, item.specifications, item.offer)}> Add to Cart</button>
                                    </Col>
                                </Row>
                            </div>
                        </MDBCardBody>
                    </Col>
                </Row>
            </MDBCard>
            <Row style={{ marginBottom: "35px" }}>
                <Col>
                    <MDBCard>
                        <MDBCardBody>
                            <MDBCardTitle>
                                Specifications
                            </MDBCardTitle>
                            <hr className='hrtopic'></hr>
                            <MDBCardText className='item_specifications'>
                                {item.specifications}
                            </MDBCardText>
                        </MDBCardBody>

                    </MDBCard>
                </Col>
                <Col>
                    <MDBCard>
                        <MDBCardBody>
                            <MDBCardTitle>
                                Reviews
                            </MDBCardTitle>
                            <hr className='hrtopic'></hr>
                            <div className='item_specifications'>
                                {
                                    reviews.map((review, index) =>
                                        <div key={index}>
                                            <MDBCardText >
                                                {review}
                                            </MDBCardText>
                                            <hr></hr>
                                        </div>
                                    )
                                }
                            </div>
                        </MDBCardBody>

                    </MDBCard>
                </Col>
            </Row>
        </div>
    )
}

export default ItemDetails
