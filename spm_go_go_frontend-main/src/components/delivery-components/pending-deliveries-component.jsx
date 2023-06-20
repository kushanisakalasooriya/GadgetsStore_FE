import React, { Fragment, useCallback, useEffect, useState } from "react";
import ReactDatatable from "@ashvin27/react-datatable";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import "./delivery-styles.css";
import { faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeliveryAdminNavBarGoGo from "../navigatonBar/deliveryAdminNav";

const PendingDeliveries = () => {
  let history = useHistory();
  const [data, setData] = useState([]);

  const logResult = useCallback(() => {
    return 2 + 2;
  }, []); //logResult is memoized now.

  useEffect(() => {
    axios.get("http://localhost:5050/cart/historyOfPaid").then((res) => {
      setData(res.data);
    });
  }, [logResult]);

  const columns = [
    {
      key: "_id",
      text: "Order ID",
      className: "name",
      align: "left",
      sortable: true,
      width: 150,
    },
    {
      key: "userId",
      text: "Customer Name",
      className: "address",
      align: "left",
      sortable: true,
      width: 250,
    },
    {
      key: "price",
      text: "Amount",
      className: "address",
      align: "left",
      sortable: true,
      width: 150,
    },
    {
      key: "action",
      text: "",
      className: "action",
      width: 300,
      align: "left",
      sortable: false,
      cell: (record) => {
        return (
          <Fragment>
            <button
              style={{ margin: "0 auto", display: "block", color: "white" }}
              name="Delete"
              className="btn info btn-sm"
              onClick={() => arrangeDelivery(record)}
            >
              ARRANGE DELIVERY
            </button>
          </Fragment>
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

  const arrangeDelivery = (record) => {
    console.log(record.userId);
    sessionStorage.setItem("currentNewDeliveryId", record.userId);
    sessionStorage.setItem("currentPendingDeliveryRecordID",record._id);
    window.location = "/delivery-new";
  };

  return (
    <div>
      <DeliveryAdminNavBarGoGo />
      <div
        style={{
          backgroundColor: "rgb(207, 210, 207,0.5)",
          display: "block",
          margin: "0 auto",
          paddingTop: "100px",
          paddingBottom: "150px",
        }}
      >
        <Link
          style={{
            marginLeft: "10%",
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
              paddingLeft: "20px",
              paddingRight: "20px",
              paddingBottom: "20px",
            }}
          >
            <h3 style={{ textAlign: "center", paddingTop: "20px" }}>
              PENDING DELIVERIES
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

export default PendingDeliveries;
