import { Form, Button, Row, Col, Container } from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import NavBarGoGo from "../../navigatonBar/navbarGoGo";
import styles from "./styles.module.css";
import Swal from "sweetalert2";

const UpdateUserProfile = () => {

    const options = ["Colombo", "Gampaha", "Kalutara", "Kandy", "Matale", "Nuwara Eliya", "Galle", "Matara", "Hambantota", "Jaffna", "Kilinochchi", "Mannar", "Vavuniya", "Mullaitivu", "Batticaloa", "Ampara", "Trincomalee", "Kurunegala", "Puttalam", "Anuradhapura", "Polonnaruwa", "Badulla", "Moneragala", "Ratnapura", "Kegalle"];

    //state variables
    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [mobileNumber, setMobileNumber] = useState("");
    let [phoneNumber, setPhoneNumber] = useState("");
    let [address, setAddress] = useState("");
    let [district, setDistrict] = useState("");
    let [zipCode, setZipCode] = useState("");
    let [image, setImage] = useState("");

    // Dealing with field changes to update state
    const firstNameUpdate = (event) => {
        setFirstName(event.target.value)
    }
    const lastNameUpdate = (event) => {
        setLastName(event.target.value)
    }
    const mobileNumberUpdate = (event) => {
        setMobileNumber(event.target.value)
    }
    const phoneNumberUpdate = (event) => {
        setPhoneNumber(event.target.value)
    }
    const addressUpdate = (event) => {
        setAddress(event.target.value)
    }
    const districtUpdate = (event) => {
        setDistrict(event.target.value)
    }
    const zipCodeUpdate = (event) => {
        setZipCode(event.target.value)
    }
    const imageUpdate = (event) => {
        setImage(event.target.value)
    }

    const getUser = async () => {
        try {
            const user = JSON.parse(sessionStorage.getItem("loggeduser"));
            const response = await axios.get('http://localhost:5050/user/' + user._id);
            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
            setMobileNumber(response.data.mobileNumber);
            setPhoneNumber(response.data.phoneNumber);
            setAddress(response.data.address);
            setDistrict(response.data.district);
            setZipCode(response.data.zipCode);
            setImage(response.data.image);
        } catch (err) {
            //console.log(err);
        }
    }

    useEffect(() => {
        getUser();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        const userDetails = {
            firstName: firstName,
            lastName: lastName,
            mobileNumber: mobileNumber,
            phoneNumber: phoneNumber,
            address: address,
            district: district,
            zipCode: zipCode,
            image: image
        }

        const user = JSON.parse(sessionStorage.getItem("loggeduser"));


        axios.post('http://localhost:5050/user/update-profile/' + user._id, userDetails)

            .then((res) => {

                Swal.fire({
                    title: "Success!",
                    text: res.data,
                    icon: "success",
                    showConfirmButton: false,
                })

                setTimeout(() => {
                    window.location = "/user-profile";
                }, 2000)
            })


    }

    const CancelButton = () => {
        window.location = "/user-profile";
    }

    return (

        <div>

            <NavBarGoGo />

            <div className={styles.profileUpdate_container}>
                <div className={styles.profileUpdate_form_container}>

                    <div className={styles.left}>
                        <img style={{ width: "220px", height: "220px" }} src={image} alt=""></img>
                        <h2 style={{ color: "white", textAlign: "center" }}> <br></br> {firstName} {lastName}</h2><br></br>
                    </div>

                    <div className={styles.right}>

                        <h1 style={{ marginTop: "50px", marginBottom: "30px" }}>Update Profile</h1>

                        <Form onSubmit={handleSubmit}>
                            <Container>

                                <Row>
                                    <Col xs={9} md={6}>
                                        <label style={{ fontWeight: "bold" }}>First Name    :</label><br></br>
                                        <input
                                            type="text"
                                            placeholder='Your First Name'
                                            name='firstName'
                                            onChange={firstNameUpdate}
                                            value={firstName}
                                            required
                                            className={styles.input}
                                        />
                                    </Col>
                                    <Col xs={9} md={6}>
                                        <label style={{ fontWeight: "bold" }}>Last Name    :</label><br></br>
                                        <input
                                            type="text"
                                            placeholder='Your Last name'
                                            name='lastName'
                                            onChange={lastNameUpdate}
                                            value={lastName}
                                            required
                                            className={styles.input}
                                        />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={9} md={6}>
                                        <label style={{ fontWeight: "bold" }}>Mobile Number    :</label><br></br>
                                        <input
                                            type="text"
                                            placeholder='Mobile Number'
                                            name='mobileNumber'
                                            maxLength="10"
                                            title="Cannot exceed 10 characters."
                                            onChange={mobileNumberUpdate}
                                            value={mobileNumber}
                                            required
                                            className={styles.input}
                                        />
                                    </Col>
                                    <Col xs={9} md={6}>
                                        <label style={{ fontWeight: "bold" }}>Phone Number    :</label><br></br>
                                        <input
                                            type="text"
                                            placeholder='Phone Number'
                                            name='phoneNumber'
                                            maxLength="10"
                                            title="Cannot exceed 10 characters."
                                            onChange={phoneNumberUpdate}
                                            value={phoneNumber}
                                            required
                                            className={styles.input}
                                        />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={9} md={6}>
                                        <label style={{ fontWeight: "bold" }} >Address    :</label><br></br>
                                        <input
                                            type="text"
                                            placeholder='No:170/A, Kandy'
                                            name='address'
                                            onChange={addressUpdate}
                                            value={address}
                                            required
                                            className={styles.input}
                                        />
                                    </Col>
                                    <Col xs={9} md={6}>
                                        <label style={{ fontWeight: "bold" }} >District    :</label><br></br>
                                        <select
                                            className={styles.input}

                                            name='district'
                                            value={district}
                                            onChange={districtUpdate}>

                                            {options.map((value) => (
                                                <option value={value} key={value}>
                                                    {value}
                                                </option>
                                            ))}
                                        </select>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={9} md={6}>
                                        <label style={{ fontWeight: "bold" }} >Postal/Zip Code    :</label><br></br>
                                        <input
                                            type="text"
                                            placeholder='00000'
                                            name='zipCode'
                                            onChange={zipCodeUpdate}
                                            value={zipCode}
                                            required
                                            className={styles.input}
                                        />
                                    </Col>
                                    <Col xs={9} md={6}>
                                        <label style={{ fontWeight: "bold" }} >Image URL    :</label><br></br>
                                        <input
                                            type="text"
                                            name='image'
                                            onChange={imageUpdate}
                                            value={image}
                                            required
                                            className={styles.input}
                                        />
                                    </Col>
                                </Row>
                                {/* <Row>
                                    <Button variant="primary" type="submit">
                                        Update Profile
                                    </Button>
                                </Row> */}
                                <table style={{ marginBottom: "50px", marginTop: "20px", marginLeft: "100px" }}>
                                    <tr>
                                        <td><button type='submit' style={{ marginBottom: "50px", marginTop: "35px" }} className={styles.g_button}>Update</button></td>
                                        <td><button onClick={CancelButton} type='button' style={{ marginBottom: "50px", marginTop: "35px" }} className={styles.can_btn}>Cancel</button></td>
                                    </tr>
                                </table>
                            </Container>
                        </Form>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateUserProfile;
