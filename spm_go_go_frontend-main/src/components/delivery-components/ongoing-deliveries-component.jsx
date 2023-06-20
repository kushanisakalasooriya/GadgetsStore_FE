import React, { Fragment, useEffect, useState } from "react";
import ReactDatatable from "@ashvin27/react-datatable";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import "./delivery-styles.css";
import { useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons";
import DeliveryAdminNavBarGoGo from "../navigatonBar/deliveryAdminNav";
import Swal from "sweetalert2";

const OngoingDeliveries = () => {
  let history = useHistory();
  const [submissionList, setSubmissionList] = useState("");
  const [data, setData] = useState("");

  const [count, setCount] = useState(0);

  const logResult = useCallback(() => {
    return 2 + 2;
  }, []); //logResult is memoized now.

  useEffect(() => {
    axios.get("http://localhost:5050/delivery/").then((res) => {
      setData(res.data);
      const ongoingList = [];

      for (let x = 0; x < res.data.length; x++) {
        if (res.data[x].status === "Ongoing") {
          ongoingList.push(res.data[x]);
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
      width: 100,
    },
    {
      key: "customerName",
      text: "CUSTOMER NAME",
      className: "address",
      align: "left",
      sortable: true,
      width: 180,
    },
    {
      key: "fee",
      text: "FEE",
      className: "address",
      align: "left",
      sortable: true,
      width: 100,
    },
    {
      key: "service",
      text: "SERVICE",
      className: "address",
      align: "left",
      sortable: true,
      width: 150,
    },
    {
      key: "trackingID",
      text: "TRACKING ID",
      className: "address",
      align: "left",
      sortable: true,
      width: 150,
    },
    {
      key: "action",
      text: "UPDATE DELIVERY STATUS",
      className: "address",
      width: 450,
      align: "center",
      sortable: false,
      cell: (record) => {
        return (
          <div>
            <DeliveryAdminNavBarGoGo  />
            <div style={{ textAlign: "center" }}>
              <Fragment>
                <button
                  style={{ marginRight: "5px", color: "white" }}
                  name="update"
                  className="btn warning btn-sm"
                  onClick={() => updateRecord(record)}
                >
                  UPDATE
                </button>
                <button
                  style={{ marginRight: "5px", color: "white" }}
                  name="view"
                  className="btn info btn-sm"
                  onClick={() => viewDelivery(record)}
                >
                  VIEW
                </button>
                <button
                  style={{ marginRight: "5px", color: "white" }}
                  name="delivered"
                  className="success btn  btn-sm"
                  onClick={() => markAsDelivered(record)}
                >
                  DELIVERED
                </button>
                <button
                  style={{ color: "white" }}
                  name="cancel"
                  className="btn danger btn-sm"
                  onClick={() => cancelDelivery(record)}
                >
                  CANCEL
                </button>
              </Fragment>
            </div>
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
      },
      onDoubleClick: (event) => {
      },
    },
  ];

  const updateRecord = (record) => {
    sessionStorage.setItem("currentDeliveryUpdateID", record._id);
    window.location = "/delivery-update";
  };

  const markAsDelivered = (record) => {
    const answer = window.confirm(
      `Are you sure to mark the delivery bearing Tracking ID: ${record.trackingID} as completed?`
    );
    if (answer) {
      const delivery = {
        status: "Delivered",
      };

      axios
        .post(
          `http://localhost:5050/delivery/updateDeliveryStatus/${record._id}`,
          delivery
        )

      location.reload();
    }
  };

  const viewDelivery = (record) => {
    sessionStorage.setItem("currentViewDeliveryID", record._id);
    window.location = "/delivery-information";
  };

  const cancelDelivery = (record) => {
    const answer = window.confirm(
      `Are you sure to cancel delivery bearing Tracking ID: ${record.trackingID}?`
    );
    if (answer) {
      const delivery = {
        status: "Cancelled",
      };

      axios
        .post(
          `http://localhost:5050/delivery/updateDeliveryStatus/${record._id}`,
          delivery
        )

      location.reload();
    }
  };

  return (
    <div
      style={{
        backgroundColor: "rgb(207, 210, 207,0.5)",
        display: "block",
        margin: "0 auto",
        marginTop: "70px",
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
        to="#"
        className="backLink"
      >
        <FontAwesomeIcon icon={faArrowAltCircleLeft} />
        &nbsp;Go Back
      </Link>

      <div style={{ paddingTop: "100px" }}>
        <div
          style={{
            backgroundColor: "rgb(207, 210, 207,0.8)",
            height: "auto",
            width: "80%",
            display: "block",
            margin: "0 auto",
            paddingLeft: "10px",
            paddingRight: "10px",
            paddingBottom: "20px",
          }}
        >
          <h3 style={{ textAlign: "center", paddingTop: "20px" }}>
            ONGOING DELIVERIES
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
  );
};

export default OngoingDeliveries;
