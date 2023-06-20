import { useState } from "react";
import { Link } from 'react-router-dom';
import styles from './style.module.css';
import axios from 'axios';
import { PWDRequiesite } from "./PWDRequiesite";
import "./style1.css";
import { Col, Container, Row } from "react-bootstrap";
import LoginNavBarGoGo from "../../navigatonBar/loginNav";
import Swal from "sweetalert2";


const Registration = () => {

    const currentDate = new Date();
    const regiDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
    const options = ["Colombo", "Gampaha", "Kalutara", "Kandy", "Matale", "Nuwara Eliya", "Galle", "Matara", "Hambantota", "Jaffna", "Kilinochchi", "Mannar", "Vavuniya", "Mullaitivu", "Batticaloa", "Ampara", "Trincomalee", "Kurunegala", "Puttalam", "Anuradhapura", "Polonnaruwa", "Badulla", "Moneragala", "Ratnapura", "Kegalle"];
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        mobileNumber: "",
        phoneNumber: "",
        address: "",
        district: options[0],
        zipCode: "",
        email: "",
        password: "",
        registeredDate: regiDate,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMDoZqGk6An-DWrwWp2AQ1a2aug6xZ_IQSQWMO-1Cj1p0mwr2lPHLNWGbQknO-671N5es&usqp=CAU"
    });





    const [error, setError] = useState("");

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };


    const [pwdRequisite, setPWDRequisite] = useState(false);
    const [checks, setChecks] = useState({
        capsLetterCheck: false,
        numberCheck: false,
        pwdLengthCheck: false,
        specialCharacterCheck: false,
    });


    const handleOnFocus = () => {
        setPWDRequisite(true);
    };

    const handleOnBlur = () => {
        setPWDRequisite(false);
    };

    const handleOnKeyUp = (e) => {
        const { value } = e.target;
        const capsLetterCheck = /[A-Z]/.test(value);
        const numberCheck = /[0-9]/.test(value);
        const pwdLengthCheck = value.length > 8;
        const specialCharacterCheck = /[!@#$%^&*]/.test(value);
        setChecks({
            capsLetterCheck,
            numberCheck,
            pwdLengthCheck,
            specialCharacterCheck,
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = "http://localhost:5050/user/registration";
            const { data: res } = await axios.post(url, data);

            Swal.fire({
                title: "Success!",
                text: res.message,
                icon: "success",
                showConfirmButton: false,
            })

            setTimeout(() => {
                window.location = "/"
            }, 2000)

        }
        catch (error) {

            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
            }
        }
    }

    const LoginButton = () => {
        window.location = '/';
    }




    return (
        <div >
            <LoginNavBarGoGo />
            <div className={styles.signup_container}>
                <div className={styles.signup_form_container}>

                    <div className={styles.left}>
                        <h1 style={{ textAlign: 'center', marginBottom: "20px" }}>Already have an Account?</h1>
                
                        <button type='button' onClick={LoginButton} className={styles.w_button}>Sign in</button>
          
                    </div>

                    <div className={styles.right}>

                        <form className={styles.form_container} onSubmit={handleSubmit}>
                            <h1 style={{ marginTop: "50px", marginBottom: "30px" }}>Create Account</h1>

                            <Container>
                                <Row>
                                    <Col xs={9} md={6}>
                                        <label style={{ fontWeight: "bold" }}>First Name    :</label><br></br>
                                        <input
                                            type="text"
                                            placeholder='Your First Name'
                                            name='firstName'
                                            onChange={handleChange}
                                            value={data.firstName}
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
                                            onChange={handleChange}
                                            value={data.lastName}
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
                                            onChange={handleChange}
                                            value={data.mobileNumber}
                                            maxLength="10"
                                            title="Cannot exceed 10 characters."
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
                                            onChange={handleChange}
                                            value={data.phoneNumber}
                                            required
                                            className={styles.input}
                                        />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={9} md={6}>
                                        <label style={{ fontWeight: "bold" }} >Email Address    :</label><br></br>
                                        <input
                                            type="email"
                                            placeholder='someone@gmail.com'
                                            name='email'
                                            onChange={handleChange}
                                            value={data.email}
                                            required
                                            className={styles.input}
                                        />
                                    </Col>
                                    <Col xs={9} md={6}>
                                        <label style={{ fontWeight: "bold" }} >Address    :</label><br></br>
                                        <input
                                            type="text"
                                            placeholder='No:170/A, Kandy'
                                            name='address'
                                            onChange={handleChange}
                                            value={data.address}
                                            required
                                            className={styles.input}
                                        />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={9} md={6}>
                                        <label style={{ fontWeight: "bold" }} >District    :</label><br></br>
                                        <select
                                            className={styles.input}
                          
                                            name='district'
                                            value={data.district}
                                            onChange={handleChange}>

                                            {options.map((value) => (
                                                <option value={value} key={value}>
                                                    {value}
                                                </option>
                                            ))}
                                        </select>
                                    </Col>
                                    <Col xs={9} md={6}>
                                        <label style={{ fontWeight: "bold" }} >Postal/Zip Code    :</label><br></br>
                                        <input
                                            type="text"
                                            placeholder='00000'
                                            name='zipCode'
                                            maxLength="5"
                                            title="Cannot exceed 5 characters."
                                            onChange={handleChange}
                                            value={data.zipCode}
                                            required
                                            className={styles.input}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{ textAlign: "center" }}>
                             
                                        <label style={{ fontWeight: "bold" }}>Password    :</label><br></br>
                                        <input
                                            id="password"
                                            type="password"
                                            placeholder='Password'
                                            name='password'
                                            value={data.Password}
                                            onChange={handleChange}
                                            onFocus={handleOnFocus}
                                            onBlur={handleOnBlur}
                                            onKeyUp={handleOnKeyUp}
                                            className={styles.input}
                                            required

                                        />
                                        {pwdRequisite ? <PWDRequiesite
                                            capsLetterCheckFlag={checks.capsLetterCheck ? "valid" : "invalid"}
                                            numberCheckFlag={checks.numberCheck ? "valid" : "invalid"}
                                            pwdLengthCheckFlag={checks.pwdLengthCheck ? "valid" : "invalid"}
                                            specialCharacterCheckFlag={checks.specialCharacterCheck ? "valid" : "invalid"}
                                        /> : null}
                                    </Col>
                                </Row>

                            </Container>

                            {error && <div className={styles.err_msg}>{error}</div>}

                            <button type='submit' style={{ marginBottom: "50px", marginTop: "35px" }} className={styles.g_button}>Sign Up</button>
                        </form>
                    </div>

                </div>
            </div>



        </div>
    )
};

export default Registration;