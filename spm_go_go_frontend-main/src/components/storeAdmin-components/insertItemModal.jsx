import { Form, Button, Row, Col, Container } from "react-bootstrap";
import React, { useState } from 'react';
import Swal from "sweetalert2";

function InsertItemModal() {

    //state variables
    const [itemName, setName] = useState();
    const [description, setDescription] = useState();
    const [specifications, setSpecifications] = useState();
    const [price, setPrice] = useState();
    const [quantity, setQuantity] = useState();
    const [images, setImages] = useState();
    const [offer, setOffer] = useState();

    // Dealing with field changes to update state
    const nameUpdate = (event) => {
        setName(event.target.value)
    }
    const descriptionUpdate = (event) => {
        setDescription(event.target.value)
    }
    const specificationsUpdate = (event) => {
        setSpecifications(event.target.value)
    }
    const priceUpdate = (event) => {
        setPrice(event.target.value)
    }
    const quantityUpdate = (event) => {
        setQuantity(event.target.value)
    }
    const imagesUpdate = (event) => {
        setImages(event.target.value)
    }
    const offerUpdate = (event) => {
        setOffer(event.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const postURL = "http://localhost:5050/storeAdmin/add"
        fetch(postURL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ // We should keep the fields consistent for managing this data later
                itemName: itemName,
                description: description,
                specifications: specifications,
                price: price,
                quantity: quantity,
                orderedQuanity: 0,
                images: images,
                offer: offer,
            })
        })
            .then(() => {
                // Once posted, the user will be notified 
                // alert('Item Has Been Added!');
                // window.location = '/storeAdmin';
                ///////////////////////////
                Swal.fire({
                    title: 'Item has been inserted!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location = '/storeAdmin';

                    }
                })
            })
    }

    return (

        <Form onSubmit={handleSubmit}>
            <Container>
                <Row>
                    <Col xs={9} md={6}>
                        <Form.Group className="mb-3" >
                            <Form.Label> Item Name </Form.Label>
                            <Form.Control onChange={nameUpdate} type="text" placeholder="Enter item name" required />
                        </Form.Group>
                    </Col>
                    <Col xs={9} md={6}>
                        <Form.Group className="mb-3" >
                            <Form.Label> Quantity </Form.Label>
                            <Form.Control onChange={quantityUpdate} type="number" min="1" placeholder="Enter quantity" required />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xs={9} md={6}>
                        <Form.Group className="mb-3" >
                            <Form.Label> Description </Form.Label>
                            <Form.Control onChange={descriptionUpdate} type="text" placeholder="Enter description" required />
                        </Form.Group>
                    </Col>
                    <Col xs={9} md={6}>
                        <Form.Group className="mb-3" >
                            <Form.Label> Images </Form.Label>
                            <Form.Control onChange={imagesUpdate} type="text" placeholder="Enter the image url " required />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xs={9} md={6}>
                        <Form.Group className="mb-3" >
                            <Form.Label> Price </Form.Label>
                            <Form.Control onChange={priceUpdate} type="text" placeholder="Enter price" required />
                        </Form.Group>
                    </Col>
                    <Col xs={9} md={6}>
                        <Form.Group className="mb-3" >
                            <Form.Label> Offer (%) </Form.Label>
                            <Form.Control onChange={offerUpdate} type="text" title="Contain only numbers" pattern="[0-9]{1,2}" placeholder="Enter offer percentage" required />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>

                    <Form.Group className="mb-3" >
                        <Form.Label> Specifications </Form.Label>
                        <Form.Control onChange={specificationsUpdate} type="text" placeholder="Enter specifications" required />
                    </Form.Group>
                </Row>
                <Row>
                    <center>
                        <button style={{ width: "60%", textAlign: "center" }} className="btn btn-dark" variant="primary" type="submit">
                            Submit
                        </button>
                    </center>
                </Row>

            </Container>
        </Form>
    )
}

export default InsertItemModal;
