import { Form, Button, Row, Col, Container } from "react-bootstrap";
import React, { useEffect, useState } from 'react'
import axios from "axios";
import Swal from "sweetalert2";

function AddReviewsModel() {

    //state variables
    const [itemId, setItemId] = useState();
    const [itemName, setName] = useState();
    const [review, setReview] = useState();
    const id = window.sessionStorage.getItem("itemID");

    // Dealing with field changes to update state
    const nameUpdate = (event) => {
        setName(event.target.value)
    }
    const reviewUpdate = (event) => {
        setReview(event.target.value)
    }

    const getItem = async () => {
        try {
            const response = await axios.get('http://localhost:5050/cart/' + id);
            setItemId(response.data.itemId);
            setName(response.data.itemName);

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getItem();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const postURL = "http://localhost:5050/reviews/add"
        fetch(postURL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ // We should keep the fields consistent for managing this data later
                itemId: itemId,
                itemName: itemName,
                review: review,
                userId: JSON.parse(sessionStorage.getItem("loggeduser"))._id,

            })
        })
            .then(() => {
                // Once posted, the user will be notified 
                Swal.fire({
                    title: 'Your review has been added!',
                    timer: 5000,
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location = '/order-history'
                    }
                })
            })
    }

    return (

        <Form onSubmit={handleSubmit}>
            <Container>
                <Row>

                    <Col xs={9} md={12}>
                        <Form.Group className="mb-3" >
                            <Form.Label> Item Name </Form.Label>
                            <Form.Control defaultValue={itemName} onChange={nameUpdate} type="text" />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col xs={9} md={12}>
                        <Form.Group className="mb-3" >
                            <Form.Label> Review </Form.Label>
                            <Form.Control onChange={reviewUpdate} as="textarea" rows={5} placeholder="Add Review" />
                        </Form.Group>
                    </Col>

                </Row>

                <Row>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Row>

            </Container>
        </Form>
    )
}

export default AddReviewsModel;
