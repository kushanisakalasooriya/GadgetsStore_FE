import React, { useEffect, useRef } from "react";
import "./deliveryReport.css";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons";
import { Chart } from "react-google-charts";
import { useCallback } from "react";
import { useState } from "react";
import axios from "axios";
import DeliveryAdminNavBarGoGo from "../navigatonBar/deliveryAdminNav";

function DeliveryReport() {
  useEffect(() => {}, []);

  let history = useHistory();

  const [data, setData] = useState("");
  const [pending, setPending] = useState(0);
  const [ongoing, setOngoing] = useState(0);
  const [cancelled, setCancelled] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [pronto, setPronto] = useState("");
  const [prompt, setPrompt] = useState("");
  const [fardar, setFardar] = useState("");
  const [certis, setCertis] = useState("");
  const [aramex, setAramex] = useState("");
  const [grassHoppers, setGrassHoppers] = useState("");
  const [domex, setDomex] = useState("");
  const [central, setCentral] = useState("");
  const [northCentral, setNorthCentral] = useState("");
  const [northern, setNorthern] = useState("");
  const [eastern, setEastern] = useState("");
  const [northWestern, setNorthWestern] = useState("");
  const [southern, setSouthern] = useState("");
  const [uva, setUva] = useState("");
  const [sabaragamuwa, setSabaragamuwa] = useState("");
  const [western, setWestern] = useState("");

  const logResult = useCallback(() => {
    return 2 + 2;
  }, []); //logResult is memoized now.

  useEffect(() => {
    axios.get("http://localhost:5050/delivery/").then((res) => {
      setData(res.data);

      let ongoingCount = 0;
      let cancelledCount = 0;
      let completedCount = 0;

      for (let x = 0; x < res.data.length; x++) {
        if (res.data[x].status === "Ongoing") {
          ongoingCount = ongoingCount + 1;
        } else if (res.data[x].status === "Cancelled") {
          cancelledCount = cancelledCount + 1;
        } else if (res.data[x].status === "Delivered") {
          completedCount = completedCount + 1;
        }
      }

      setOngoing(ongoingCount);
      setCancelled(cancelledCount);
      setCompleted(completedCount);
    });

    axios.get("http://localhost:5050/delivery/").then((res) => {
      setData(res.data);

      let prontoCount = 0;
      let promtXpressCount = 0;
      let fardarCount = 0;
      let certisCount = 0;
      let aramexCount = 0;
      let grasshoppersCount = 0;
      let domexCount = 0;

      for (let x = 0; x < res.data.length; x++) {
        if (res.data[x].service === "PRONTO") {
          prontoCount = prontoCount + 1;
        } else if (res.data[x].service === "PROMPTXPRESS") {
          promtXpressCount = promtXpressCount + 1;
        } else if (res.data[x].service === "FARDAR") {
          fardarCount = fardarCount + 1;
        } else if (res.data[x].service === "CERTIS") {
          certisCount = certisCount + 1;
        } else if (res.data[x].service === "ARAMEX") {
          aramexCount = certisCount + 1;
        } else if (res.data[x].service === "GRASSHOPPERS") {
          grasshoppersCount = grasshoppersCount + 1;
        } else if (res.data[x].service === "DOMEX") {
          domexCount = domexCount + 1;
        }
      }

      setPronto(prontoCount);
      setPrompt(promtXpressCount);
      setFardar(fardarCount);
      setCertis(certisCount);
      setAramex(aramexCount);
      setGrassHoppers(grasshoppersCount);
      setDomex(domexCount);
    });

    axios.get("http://localhost:5050/delivery/").then((res) => {
      setData(res.data);

      let WesternCount = 0;
      let SabaragamuwaCount = 0;
      let UvaCount = 0;
      let SouthernCount = 0;
      let NorthWesternCount = 0;
      let EasternCount = 0;
      let NorthernCount = 0;
      let NorthCentralCount = 0;
      let CentralCount = 0;

      for (let x = 0; x < res.data.length; x++) {
        if (res.data[x].province === "Western") {
          WesternCount = WesternCount + 1;
        } else if (res.data[x].province === "Sabaragamuwa") {
          SabaragamuwaCount = SabaragamuwaCount + 1;
        } else if (res.data[x].province === "Uva") {
          UvaCount = UvaCount + 1;
        } else if (res.data[x].province === "Southern") {
          SouthernCount = SouthernCount + 1;
        } else if (res.data[x].province === "North Western") {
          NorthWesternCount = NorthWesternCount + 1;
        } else if (res.data[x].province === "Eastern") {
          EasternCount = EasternCount + 1;
        } else if (res.data[x].province === "Northern") {
          NorthernCount = NorthernCount + 1;
        } else if (res.data[x].province === "North Central") {
          NorthCentralCount = NorthCentralCount + 1;
        } else if (res.data[x].province === "Central") {
          CentralCount = CentralCount + 1;
        }
      }

      setWestern(WesternCount);
      setSabaragamuwa(SabaragamuwaCount);
      setUva(UvaCount);
      setSouthern(SouthernCount);
      setNorthWestern(NorthWesternCount);
      setEastern(EasternCount);
      setNorthern(NorthernCount);
      setNorthCentral(NorthCentralCount);
      setCentral(CentralCount);
    });

    axios.get("http://localhost:5050/cart/historyOfPaid").then((res) => {
      setData(res.data);
      setPending(res.data.length);
    });
  }, [logResult]);

  const data1 = [
    ["SERVICE", "NUMBER OF DELIVERIES"],
    ["DOMEX", domex],
    ["PRONTO", pronto],
    ["PROMPTXPRESS", prompt],
    ["FARDAR", fardar],
    ["CERTIS", certis],
    ["ARAMEX", aramex],
    ["GRASSHOPPERS", grassHoppers],
  ];

  const options1 = {
    title: "Delivery Partner Overview",
  };

  const data2 = [
    ["Province", "Customers"],
    ["Central", central],
    ["North Central", northCentral],
    ["Northern", northern],
    ["Eastern", eastern],
    ["North Western", northWestern],
    ["Southern", southern],
    ["Uva", uva],
    ["Sabaragamuwa", sabaragamuwa],
    ["Western", western],
  ];

  const options2 = {
    title: "Customer Spread by Provinces",
  };

  return (
    <div>
      <DeliveryAdminNavBarGoGo />
      <div style={{ paddingBottom: "140px", marginTop: "40px" }}>
        <Link
          style={{
            marginLeft: "3%",
            marginTop: "10vh",
            marginBottom: "1vh",
          }}
          onClick={() => history.goBack()}
          className="backLink"
          to='#'
        >
          <FontAwesomeIcon icon={faArrowAltCircleLeft} />
          &nbsp;Go Back
        </Link>
      </div>
      <div
        style={{
          border: "solid 5px",
          marginLeft: "50px",
          marginRight: "50px",
          paddingTop: "30px",
          marginBottom: "50px",
        }}
      >
        <center>
          <h2>DELIVERY ADMIN INSIGHTS</h2>
        </center>
        <br />
        <table style={{ margin: "auto", width: "95%", marginBottom: "20px" }}>
          <tbody>
            <tr>
              <td>
                <center>
                  <div className="container">
                    <div className="col mx-auto">
                      <div className="card shadow">
                        <div className="card-header bg-success"></div>
                        <div className="card-body">
                          <div className="">PENDING DELIVERY ORDERS</div>
                          <center>
                            <h5 className=""> {pending} </h5>
                          </center>
                        </div>
                      </div>
                    </div>
                  </div>
                </center>
              </td>
              <td>
                <center>
                  <div className="container">
                    <div className="col mx-auto">
                      <div className="card shadow">
                        <div className="card-header bg-success"></div>
                        <div className="card-body">
                          <div className="">ONGOING DELIVERIES</div>
                          <center>
                            <h5 className=""> {ongoing} </h5>
                          </center>
                        </div>
                      </div>
                    </div>
                  </div>
                </center>
              </td>
              <td>
                <center>
                  <div className="container">
                    <div className="col mx-auto">
                      <div className="card shadow">
                        <div className="card-header bg-success"></div>
                        <div className="card-body">
                          <div className="">COMPLETED DELIVERIES</div>
                          <center>
                            <h5 className=""> {completed} </h5>
                          </center>
                        </div>
                      </div>
                    </div>
                  </div>
                </center>
              </td>
              <td>
                <center>
                  <div className="container">
                    <div className="col mx-auto">
                      <div className="card shadow">
                        <div className="card-header bg-success"></div>
                        <div className="card-body">
                          <div className="">CANCELLED DELIVERIES</div>
                          <center>
                            <h5 className=""> {cancelled} </h5>
                          </center>
                        </div>
                      </div>
                    </div>
                  </div>
                </center>
              </td>
            </tr>
            <tr>
              <td colSpan="2" style={{ width: "50%" }}>
                <br />
                <Chart
                  chartType="PieChart"
                  data={data1}
                  options={options1}
                  width={"100%"}
                  height={"400px"}
                />
              </td>
              <td colSpan="2" style={{ width: "50%" }}>
                <br />
                <Chart
                  chartType="PieChart"
                  data={data2}
                  options={options2}
                  width={"100%"}
                  height={"400px"}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DeliveryReport;
