// import { Paper } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import ReactToPrint from "react-to-print";
import { Container, Paper } from "@material-ui/core";
// import UserAdminReport from "../userAdminReport";
import OnlyGraphUserAdmin from "./onlyGraph";
import AdminNavBarGoGo from "../../../../navigatonBar/adminNav";
import "./userAdminreport.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons";

function PrintingClass() {
    useEffect(() => {

    }, [])

    let componentRef = useRef(null);

    


    const goBack = () => {
        window.location = "/user-admin-dashboard"
    }

    return (
        <div>
            <br></br> <br></br> <br></br> <br></br> <br></br>
            <Link onClick={goBack} to="#" className="backLink">
                <FontAwesomeIcon icon={faArrowAltCircleLeft} />
                &nbsp;Go Back
            </Link>
            <br></br>
            <Container>
                <Paper elevation={0}  ref={el => (componentRef = el)} style={{height:"750px" , backgroundColor:"#f5f5f5"}}>
                {/* <Paper elevation={0} ref={el => (componentRef = el)}> */}
                    <OnlyGraphUserAdmin/>
                </Paper>
                <ReactToPrint
                    trigger={() =>
                        <div>
                            <AdminNavBarGoGo></AdminNavBarGoGo>
                            <a>

                                <button style={{width:"800px", marginLeft:"200px" , marginBottom:"30px"}} className="reportbtn btn btn-dark">Print</button>
                                
                                {/* <button className="reportbtn btn btn-dark">Print</button> */}


                            </a>
                        </div>
                    }
                    content={() => componentRef}

                />
            </Container>
        </div>




        // <div>
        //     <div>
        //         {/* button to trigger printing of target component */}
        //         <ReactToPrint
        //             trigger={() => <button>Print this out!</button>}
        //             content={() => componentRef}
        //         />

        //         {/* component to be printed */}
        //         <OnlyGraphUserAdmin ref={(el) => (componentRef = el)} />
        //     </div>
        // </div>
    )
}

export default PrintingClass;