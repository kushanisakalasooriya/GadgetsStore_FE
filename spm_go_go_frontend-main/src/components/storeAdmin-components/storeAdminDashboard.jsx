import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import "./storeAdmin.css";
import Grid from "@mui/material/Grid";
import AdminNav from '../navigatonBar/adminNav';

function storeAdminDashboard() {

    const [user] = useState(JSON.parse(window.sessionStorage.getItem("loggeduser")));
    console.log('a',user);

    const viewItem = () => {
        window.location = "/storeAdmin"
    }

    const navigateReport = () => {
        window.location = "/storeAdminReport"
    }

    return (
        <>
        <AdminNav/>
            <div className="container bkgrnd" style={{ maxWidth: "80%" }}>
                <h5 style={{ marginTop: '100px' }}>Welcome, {user.firstName} !</h5>
                <h4 > Store Admin</h4>
                <div className='container dshbrd'>
                    
                    <Grid container sx={{ marginBottom: "2vh" }}>
                        <Grid item xs={12} sx={{ marginBottom: "7vh" }}>
                            <div style={{ paddingTop: "3vh" }}>
                                <h3 style={{ textAlign: "center",marginBottom: "80px" }}>
                                    Go Go Gadgets - Warehouse DASHBOARD
                                </h3>
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <button
                                className="buttonHome"
                                style={{
                                    margin: "0 auto",
                                    display: "block",
                                    height: "15vh",
                                    width: "80%",
                                    borderRadius: "70px",
                                    fontSize:"20px"
                                }}
                                onClick={() => viewItem()}
                            >
                                VIEW ITEMS
                            </button>
                        </Grid>
                        <Grid item xs={4}>
                            <button
                                className="buttonHome"
                                style={{
                                    margin: "0 auto",
                                    display: "block",
                                    height: "15vh",
                                    width: "80%",
                                    borderRadius: "70px",
                                    fontSize:"20px"
                                }}
                            >
                                ADD ITEMS
                            </button>
                        </Grid>
                        <Grid item xs={4}>
                            <button
                                className="buttonHome"
                                style={{
                                    margin: "0 auto",
                                    display: "block",
                                    height: "15vh",
                                    width: "80%",
                                    borderRadius: "70px",
                                    fontSize:"20px"
                                }}
                                onClick={() => navigateReport()}
                            >
                                GENERATE REPORTS
                            </button>
                        </Grid>
                       
                    </Grid>
                </div>
            </div>


        </>
    )
}

export default storeAdminDashboard
