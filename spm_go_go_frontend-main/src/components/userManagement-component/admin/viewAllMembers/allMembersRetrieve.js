import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import styles from './style.module.css';
import "./allUsers.css";
import "./tableTharidu.css"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons";
import Swal from "sweetalert2";
import AdminNavBarGoGo from "../../../navigatonBar/adminNav";


function AllRegisteredMemebersDisplay() {


    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);

    const columns = [
        {
            name: 'Images',
            selector: row => <img alt="itemimage" width={100} height={100} src={row.image} />,
            width: '200px'
        },
        {
            name: 'First Name',
            selector: row => row.firstName,
            sortable: true,
            width: "170px"
        },
        {
            name: 'Last name',
            selector: row => row.lastName,
            width: '160px'
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
            width: '350px'

        },
        {
            name: 'Registered Date',
            selector: row => row.registeredDate,
            sortable: true,
            width: '250px'

        },
        {
            name: 'Action',
            cell: (row) =>
                <>
                    <Fragment>
                        <button onClick={() => onSubmit(row._id)} type="button" className="btn btn-outline-danger btn-sm" > Delete</button>
                    </Fragment>
                </>
        },
    ];

    const onSubmit = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4BB543',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete("http://localhost:5050/user/" + id)
                    .then((res) => {
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                        const modified = filteredItems.filter(item => item._id !== id);
                        setFilteredItems(modified);
                    });

            }
        })
    }



    const getItems = async () => {
        try {
            const response = await axios.get('http://localhost:5050/user/get-all');
            setItems(response.data);
            setFilteredItems(response.data);
        } catch (err) {
      
        }
    }

    useEffect(() => {
        getItems();
    }, [])


    useEffect(() => {
        const d = new Date();
        let month = d.getMonth() + 1
        let date = d.getFullYear() + "-" + month + "-" + d.getDate();
        setToday(date)
    })

    const [data, setData] = useState({
        fromDate: "",
        toDate: "",
        invoice: [],
        firstName: "",
        lastName: "",
        email: ""
    });

    const [today, setToday] = useState("");

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:5050/user/search", {
                fromDate: data.fromDate,
                toDate: data.toDate,
            })
            .then((response) => {
                setFilteredItems(response.data);

            });
    };

    const clearData = (e) => {
        window.location.reload(false);

    }

    const goBack = () => {
        window.location = "/user-admin-dashboard"
    }

    const generateReport = () => {
        window.location = "/user-admin-report"
    }


    return (
        <>
        <AdminNavBarGoGo/>
            <div className="container bkgrnd">
                <Link onClick={goBack} to="#" className="backLink">
                    <FontAwesomeIcon icon={faArrowAltCircleLeft} />
                    &nbsp;Go Back
                </Link>
                <h1 className="header" style={{ marginLeft: "370px" }}>Details of Registered Members</h1>
                <br></br>

                <form onSubmit={handleSubmit}>
                    <table style={{ marginLeft: "750px" }}>
                        <thead>
                            <tr>
                                <td>
                                    <div >
                                        <label>From Date     :</label><br></br>
                                        <input
                                            type="Date"
                                            placeholder="Date"
                                            name="fromDate"
                                            onChange={handleChange}
                                            value={data.fromDate}
                                            required
                                            className={styles.input}
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div style={{ marginLeft: "10px" }}>
                                        <label>To Date      :</label><br></br>
                                        <input
                                            type="Date"
                                            placeholder="Date"
                                            name="toDate"
                                            onChange={handleChange}
                                            value={data.toDate}
                                            required
                                            className={styles.input}
                                        />
                                    </div>
                                </td>
                            </tr>
                        </thead>
                    </table>
                    <table style={{ marginLeft: "890px" }}>
                        <tr>
                            <td>
                                <div style={{ marginLeft: "0px" }}>
                                    <button className={styles.g_button} type="submit">
                                        Search
                                    </button>
                                    <button className={styles.can_btn} style={{ marginLeft: "15px" }} onClick={clearData}>
                                        Clear
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </table>
                </form>

                <div className="tbl">
                    <DataTable
                        columns={columns}
                        data={filteredItems}
                        pagination
                        fixedHeader
                        fixedHeaderScrollHeight="500px"
                        highlightOnHover
                        subHeader
                    />

                </div>


                <button className="reportbtn btn btn-dark" onClick={generateReport}> Generate Reports</button>
            </div>

        </>
    );

}

export default AllRegisteredMemebersDisplay;