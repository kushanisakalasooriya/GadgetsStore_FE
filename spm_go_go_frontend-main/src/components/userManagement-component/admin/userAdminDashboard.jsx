import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import "./userAdmin.css";
import Grid from "@mui/material/Grid";
import AdminNavBarGoGo from '../../navigatonBar/adminNav';

function userAdminDashboard() {

    const viewUserDetails = () => {
        window.location = "/registered-members"
    }

    const generateReport = () => {
        window.location = "/user-admin-report"
    }

    const user = JSON.parse(sessionStorage.getItem("loggeduser"));

    return (
        <>
        <AdminNavBarGoGo/>
            <div className="container bkgrnduser" style={{ maxWidth: "80%" }}>
                <hr></hr>
                <h5 style={{ marginTop: '100px' }}>Welcome, {user.firstName} !</h5>
                <h4 > User Managements Admin</h4>
                <div className='container dshbrd'>
                    <Grid container sx={{ marginBottom: "2vh" }}>
                        <Grid item xs={12} sx={{ marginBottom: "7vh" }}>
                            <div style={{ paddingTop: "3vh" }}>
                                <h3 style={{ textAlign: "center", marginBottom: "80px" }}>
                                    Go Go Gadgets - Admin DASHBOARD
                                </h3>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <button
                                className="buttonHome"
                                style={{
                                    margin: "0 auto",
                                    display: "block",
                                    height: "15vh",
                                    width: "80%",
                                    borderRadius: "70px",
                                }}
                                onClick={() => viewUserDetails()}
                            >
                                Details of Registered Members
                            </button>
                        </Grid>
                        <Grid item xs={6}>
                            <button
                                className="buttonHome"
                                style={{
                                    margin: "0 auto",
                                    display: "block",
                                    height: "15vh",
                                    width: "80%",
                                    borderRadius: "70px",
                                }}
                                onClick={() => generateReport()}
                            >
                                Generate Report
                            </button>
                        </Grid>

                    </Grid>
                </div>
            </div>


        </>
    )
}

export default userAdminDashboard
