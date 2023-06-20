import axios from 'axios';
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import './item-cart.css';
import { faArrowAltCircleLeft } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';
import NavBarGoGo from '../navigatonBar/navbarGoGo';
import Swal from "sweetalert2";

function ViewFavItems() {

    const [favItems, setFavItems] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredItems, setFilteredItems] = useState([]);
    const id = JSON.parse(sessionStorage.getItem("loggeduser"))._id;


    const getFavItems = async () => {
        try {
            const response = await axios.get(`http://localhost:5050/favorites/${id}`);
            setFavItems(response.data);
            setFilteredItems(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const columns = [
        {
            name: "Image",
            selector: (row) => <img width={150} height={150} src={row.image} alt="item " />
        },
        {
            name: "Item Name",
            selector: (row) => row.itemName,
            sortable: true,

        },
        {
            name: "Price",
            selector: (row) => row.price + '.00',
            sortable: true,
        },

        {
            name: "Date Added",
            selector: (row) => row.date.substring(0, 10),
        },
        {
            name: "Action",
            cell: row => <button className='btn btn-sm btn-dark' onClick={() => onDeleteItem(row._id)}> Remove</button>
        },
    ]

    useEffect(() => {
        getFavItems();
    }, [])


    useEffect(() => {
        const result = favItems.filter((item) => {
            return item.itemName.toLowerCase().match(search.toLowerCase()) || item.price.toLowerCase().match(search.toLowerCase());
        });
        setFilteredItems(result);
    }, [search, favItems])

    //Remove Item
    const onDeleteItem = async (id) => {


        await Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to delete the selected item?",
            icon: 'warning',
            showDenyButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: `Cancel`,
            timer: 5000,
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(

                    'Deleted!',
                    '',
                    'success',
                    axios({
                        method: 'DELETE',
                        url: `http://localhost:5050/favorites/${id}`
                    }),
                    window.location = '/fav/view/'
                )
            } else if (result.isDenied) {
                Swal.fire(
                    'Item is not deleted',
                    '',
                    'error'
                )
            }
        })


        // if (window.confirm('Are you sure, you want to delete the selected Item?')) {
        //     try {
        //         await axios({
        //             method: 'DELETE',
        //             url: `http://localhost:5050/favorites/${id}`
        //         })
        //         alert("Selected Item is Removed !!")
        //         getFavItems()
        //     } catch (error) {
        //         alert(error)
        //     }
        // }
    }

    return (<>
        <NavBarGoGo />
        <div className="container" style={{ marginBottom: "50px" }}>
            <Link to={"/user-profile"} className="backLinkFav"><FontAwesomeIcon icon={faArrowAltCircleLeft} /> Go Back</Link>
            <h3 className="headerMod"> Favourite Items</h3>

            <DataTable
                columns={columns}
                data={filteredItems}
                pagination
                fixedHeader
                fixedHeaderScrollHeight='500px'
                highlightOnHover
                subHeader
                subHeaderComponent={
                    <input type="text"
                        placeholder='Search Here'
                        className='w-25 form-control'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                }
            />
        </div>
    </>)
}

export default ViewFavItems