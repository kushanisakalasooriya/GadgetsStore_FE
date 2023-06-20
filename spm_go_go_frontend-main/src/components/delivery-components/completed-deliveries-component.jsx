import React, { Fragment, useCallback, useEffect, useState } from "react";
import ReactDatatable from "@ashvin27/react-datatable";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import "./delivery-styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons";
import DeliveryAdminNavBarGoGo from "../navigatonBar/deliveryAdminNav";

const CompletedDeliveries = () => {
  let history = useHistory();
  const [submissionList, setSubmissionList] = useState("");
  const [data, setData] = useState("");

  const logResult = useCallback(() => {
    return 2 + 2;
  }, []); //logResult is memoized now.

  useEffect(() => {
    axios.get("http://localhost:5050/delivery/").then((res) => {
      setData(res.data);
      const ongoingList = [];

      for (let x = 0; x < res.data.length; x++) {
        if (res.data[x].status === "Delivered") {
          ongoingList.push( res.data[x] );
        }
      }
      setData(ongoingList);
    });
  }, [logResult]);

  const columns = [
    {
      key: "_id",
      text: "DELIVERY ID",
      className: "name",
      align: "left",
      sortable: true,
      width: 150,
    },
    {
      key: "customerName",
      text: "CUSTOMER NAME",
      className: "address",
      align: "left",
      sortable: true,
      width: 250,
    },
    {
      key: "action",
      text: "",
      className: "address",
      width: 200,
      align: "center",
      sortable: false,
      cell: (record) => {
        return (
          <div style={{ textAlign: "center" }}>
            <Fragment>
              <button
                style={{ color: "white" }}
                name="view"
                className="btn info btn-sm"
                onClick={() => viewDelivery(record)}
              >
                VIEW DETAILS
              </button>
            </Fragment>
          </div>
        );
      },
    },
  ];

  const config = {
    page_size: 5,
    length_menu: [5, 10, 20],
    button: {
      excel: false,
      print: false,
      extra: false,
    },
  };

  const records = [
    {
      deliveryID: "GG-1240",
      customerName: "Dulshan Alahakoon",
    },
    {
      deliveryID: "GG-1284",
      customerName: "Gayan Alahakoon",
    },
    {
      deliveryID: "GG-1244",
      customerName: "Pinidu Alahakoon",
    },
    {
      deliveryID: "GG-1260",
      customerName: "Anura Alahakoon",
    },
    {
      deliveryID: "GG-1250",
      customerName: "Sriyani Munasingha",
    },
    {
      deliveryID: "GG-1245",
      customerName: "Ayesha Dasanayake",
    },
  ];

  const viewDelivery = (record) => {
    sessionStorage.setItem("currentViewDeliveryID", record._id);
    window.location = "/delivery-information";
  };

  const extraButtons = [
    {
      className: "btn btn-primary buttons-pdf",
      title: "Export TEst",
      children: [
        <span>
          <i
            className="glyphicon glyphicon-print fa fa-print"
            aria-hidden="true"
          ></i>
        </span>,
      ],
      onClick: (event) => {
        console.log(event);
      },
    },
    {
      className: "btn btn-primary buttons-pdf",
      title: "Export TEst",
      children: [
        <span>
          <i
            className="glyphicon glyphicon-print fa fa-print"
            aria-hidden="true"
          ></i>
        </span>,
      ],
      onClick: (event) => {
        console.log(event);
      },
      onDoubleClick: (event) => {
        console.log("doubleClick");
      },
    },
  ];

  return (
    <div>
      <DeliveryAdminNavBarGoGo />
      <div
        style={{
          backgroundColor: "rgb(207, 210, 207,0.5)",
          display: "block",
          paddingTop: "100px",
          paddingBottom: "150px",
        }}
      >
        <Link
          style={{
            marginLeft: "10%",
            marginTop: "2vh",
            marginBottom: "1vh",
          }}
          onClick={() => history.goBack()}
          className="backLink"
          to='#'
        >
          <FontAwesomeIcon icon={faArrowAltCircleLeft} />
          &nbsp;Go Back
        </Link>

        <div style={{ paddingTop: "120px" }}>
          <div
            style={{
              backgroundColor: "rgb(207, 210, 207,0.8)",
              height: "auto",
              width: "80%",
              display: "block",
              margin: "0 auto",
              paddingLeft: "20px",
              paddingRight: "20px",
              paddingBottom: "20px",
            }}
          >
            <h3 style={{ textAlign: "center", paddingTop: "20px" }}>
              COMPLETED DELIVERIES
            </h3>
            <hr />
            <br />
            <ReactDatatable
              config={config}
              records={data}
              columns={columns}
              extraButtons={extraButtons}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletedDeliveries;
