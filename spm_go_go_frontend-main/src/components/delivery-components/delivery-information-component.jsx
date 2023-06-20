import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Grid } from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import "./delivery-styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons";
import Barcode from "react-barcode";
import DeliveryAdminNavBarGoGo from "../navigatonBar/deliveryAdminNav";

export default function DeliveryInformation() {
  let history = useHistory();

  const [data, setData] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [landlineNo, setLandlineNo] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [province, setProvince] = useState("");
  const [zip, setZip] = useState("");
  const [service, setService] = useState("");
  const [trackingID, setTrackingID] = useState("");
  const [fee, setFee] = useState("");
  const [status, setStatus] = useState("");

  const deliveryID = sessionStorage.getItem("currentViewDeliveryID");

  const logResult = useCallback(() => {
    return 2 + 2;
  }, []); //logResult is memoized now.

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    axios.get(`http://localhost:5050/delivery/${deliveryID}`).then((res) => {
      setData(res.data);
      setCustomerName(res.data.customerName);
      setMobileNo(res.data.mobileNumber);
      setLandlineNo(res.data.landlineNumber);
      setEmail(res.data.email);
      setAddress(res.data.address);
      setZip(res.data.zip);
      setService(res.data.service);
      setTrackingID(res.data.trackingID);
      setFee(res.data.fee);
      setProvince(res.data.province);
      setDistrict(res.data.district);
      setStatus(res.data.status);
    });
  }, [logResult]);

  const selectProvince = (district) => {
    if (
      district === "Matale" ||
      district === "Kandy" ||
      district === "Nuwara Eliya"
    ) {
      return "Central";
    } else if (
      district === "Colombo" ||
      district === "Gampaha" ||
      district === "Kalutara"
    ) {
      return "Western";
    } else if (
      district === "Galle" ||
      district === "Matara" ||
      district === "Hambantota"
    ) {
      return "Southern";
    } else if (
      district === "Jaffna" ||
      district === "Kilinochchi" ||
      district === "Mannar" ||
      district === "Vavuniya" ||
      district === "Mullaitivu"
    ) {
      return "Northern";
    } else if (
      district === "Batticaloa" ||
      district === "Ampara" ||
      district === "Trincomalee"
    ) {
      return "Eastern";
    } else if (district === "Puttalam" || district === "Kurunegala") {
      return "North Western";
    } else if (district === "Anuradhapura" || district === "Polonnaruwa") {
      return "North Central";
    } else if (district === "Badulla" || district === "Moneragala") {
      return "Uva";
    } else if (district === "Ratnapura" || district === "Kegalle") {
      return "Sabaragamuwa";
    }
  };

  const Print = () => {
    let printContents = document.getElementById("printArea").innerHTML;
    let w = window.open();
    w.document.write(printContents);

    w.document.close(); // necessary for IE >= 10
    w.focus(); // necessary for IE >= 10

    setTimeout(function () {
      // necessary for Chrome
      w.print();
    }, 0);

    return true;
  };

  return (
    <div>
      <DeliveryAdminNavBarGoGo />
      <div style={{ paddingTop: "100px", paddingBottom: "60px" }}>
        <Link
          style={{
            marginLeft: "10%",
            marginTop: "0vh",
            marginBottom: "3vh",
          }}
          onClick={() => history.goBack()}
          className="backLink"
        >
          <FontAwesomeIcon icon={faArrowAltCircleLeft} />
          &nbsp;Go Back
        </Link>

        <div
          style={{
            display: "block",
            margin: "auto",
            width: "80%",
            backgroundColor: "rgb(207, 210, 207,0.5)",
            height: "520px",
            marginBottom: "50px",
            marginTop: "80px",
          }}
        >
          <h3
            style={{
              textAlign: "center",
              paddingTop: "20px",
              paddingBottom: "20px",
            }}
          >
            DELIVERY DETAILS - ({trackingID})
          </h3>
          <div
            style={{
              backgroundColor: "rgb(207, 210, 207,0.8)",
              marginLeft: "40px",
              marginRight: "40px",
              paddingBottom: "40px",
              paddingTop: "30px",
              borderRadius: "10px",
            }}
          >
            <Grid container spacing={2} sx={{ width: "80%", margin: "auto" }}>
              <Grid item xs={3}>
                <label>Customer Name : </label>
              </Grid>
              <Grid item xs={3}>
                <label>{customerName}</label>
              </Grid>
              <Grid item xs={3}>
                <label>State/Province : </label>
              </Grid>
              <Grid item xs={3}>
                <label>{province}</label>
              </Grid>
              <Grid item xs={3}>
                <label>Mobile Number : </label>
              </Grid>
              <Grid item xs={3}>
                <label>{mobileNo}</label>
              </Grid>
              <Grid item xs={3}>
                <label>Postal/ZIP Code : </label>
              </Grid>
              <Grid item xs={3}>
                <label>{zip}</label>
              </Grid>
              <Grid item xs={3}>
                <label>Landline Number : </label>
              </Grid>
              <Grid item xs={3}>
                <label>{landlineNo}</label>
              </Grid>
              <Grid item xs={3}>
                <label>Delivery Partner : </label>
              </Grid>
              <Grid item xs={3}>
                <label>{service}</label>
              </Grid>
              <Grid item xs={3}>
                <label>Email : </label>
              </Grid>
              <Grid item xs={3}>
                <label>{email}</label>
              </Grid>
              <Grid item xs={3}>
                <label>Tracking ID : </label>
              </Grid>
              <Grid item xs={3}>
                <label>{trackingID}</label>
              </Grid>
              <Grid item xs={3}>
                <label>Address : </label>
              </Grid>
              <Grid item xs={3}>
                <label>{address}</label>
              </Grid>
              <Grid item xs={3}>
                <label>Delivery Fee : </label>
              </Grid>
              <Grid item xs={3}>
                <label>{fee}</label>
              </Grid>
              <Grid item xs={3}>
                <label>District : </label>
              </Grid>
              <Grid item xs={3}>
                <label>{district}</label>
              </Grid>
              <Grid item xs={3}>
                <label>Status : </label>
              </Grid>
              <Grid item xs={3}>
                <label>{status}</label>
              </Grid>
            </Grid>
          </div>
          <button
            className="button-33"
            onClick={() => Print()}
            style={{ display: "block", margin: "auto", marginTop: "40px" }}
          >
            PRINT SHIPPING LABEL
          </button>
        </div>
        <div id="printArea" style={{ display: "none" }}>
          <div
            style={{
              borderWidth: "2px",
              border: "solid",
              marginLeft: "10%",
              marginRight: "10%",
            }}
          >
            <center>
              <br />
              <h2>GO GO GADGETS STORE DELIVERY</h2>
              <h4>SHIPPING LABEL</h4>
              <Barcode width="1" height="70" value={deliveryID} />;
            </center>
            <table style={{ width: "80%", margin: "auto" }}>
              <tr>
                <td>
                  <br />
                  <p style={{ paddingLeft: "25%" }}>
                    <span style={{ fontWeight: "700" }}>
                      TRACKING NO:
                      <br />
                    </span>{" "}
                    {trackingID}
                  </p>
                  <p style={{ paddingLeft: "25%" }}>
                    <span style={{ fontWeight: "700" }}>COURIER:</span>{" "}
                    {service}
                  </p>
                </td>
                <td>
                  <p style={{ paddingLeft: "15%" }}>
                    <span style={{ fontWeight: "700" }}>DELIVERY CHARGE:</span>{" "}
                    LKR {fee}.00
                  </p>
                  <p style={{ color: "transparent" }}>sample</p>
                </td>
              </tr>
              <tr>
                <td>
                  <br />
                  <span style={{ paddingLeft: "25%" }}>
                    <label style={{ fontWeight: "700" }}>FROM : </label>
                    <p style={{ paddingLeft: "25%" }}>
                      GO GO GADGETS HOUSE
                      <br />
                      NO 445/11 CITY PLAZA
                      <br />
                      KANDY CITY CENTER
                      <br />
                      KANDY
                      <br />
                      077-4584215
                      <br />
                      081-4545847
                    </p>
                  </span>
                </td>
                <td>
                  <label style={{ fontWeight: "700", paddingLeft: "15%" }}>
                    TO :
                  </label>
                  <p style={{ paddingLeft: "15%" }}>
                    {customerName}
                    <br />
                    {address}
                    <br />
                    {district}
                    <br />
                    {province} Province
                    <br />
                    ZIP:{zip}
                    <br />
                    {mobileNo}
                    <br />
                    {landlineNo}
                  </p>
                </td>
              </tr>
            </table>
            <center>
              <br />
              <i>
                <h4>THANK YOU FOR YOU PURCHASE!</h4>
              </i>
            </center>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}
