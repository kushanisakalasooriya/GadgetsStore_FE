import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles.module.css";


function ViewAllRegisteredMembers() {


    const [data, setData] = useState({
        fromDate: "",
        toDate: ""
    });

    const [searchData, setSearchData] = useState([]);


    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    //get all users
    const getAllUserDetails = async () => {
        try {
            const response = await axios.get('http://localhost:5050/user/get-all');
            setSearchData(response.data);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getAllUserDetails();
    }, [])

    // get search details
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:5050/user/search", {
                fromDate: data.fromDate,
                toDate: data.toDate,
            })
            .then((response) => {
                console.log(response.data);
                setSearchData(response.data);
            });
    };

    return (
        <>

            <div className={styles.report_container}>
                <div className={styles.report_form_container}>
                    <div className={styles.colt}></div>
                    <div className={styles.colt2}>
                        <form className={styles.form_container} onSubmit={handleSubmit}>
                            <div className={styles.dateFrom}>
                                <input
                                    type="Date"
                                    placeholder="Date"
                                    name="fromDate"
                                    onChange={handleChange}
                                    value={data.fromDate}
                                    required
                                />
                            </div>
                            <div className={styles.dateTo}>
                                <input
                                    type="Date"
                                    placeholder="Date"
                                    name="toDate"
                                    onChange={handleChange}
                                    value={data.toDate}
                                    required
                                />
                            </div>

                            <button type="submit" className={styles.btnb}>
                                Search
                            </button>

                            <table className="data-table">
                                <tbody>
                                    <tr>
                                        <th>Profile</th>
                                        <th>firstName</th>
                                        <th>LastName</th>
                                        <th>Email</th>
                                        <th>Registered Date</th>
                                    </tr>
                                    {searchData.map((searchData) => {
                                        return (
                                            <tr key={searchData._id}>
                                                <td> <img style={{ width: "100px", height: "100px" }} src={searchData.image} alt=""></img></td>
                                                <td>{searchData.firstName}</td>
                                                <td>{searchData.lastName}</td>
                                                <td>{searchData.email}</td>
                                                <td>{searchData.registeredDate}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ViewAllRegisteredMembers
