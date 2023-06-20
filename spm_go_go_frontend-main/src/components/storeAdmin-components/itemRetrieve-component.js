import axios from "axios";
import { Button, Form, Modal } from "react-bootstrap";
import { Fragment, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import InsertItemModal from "./insertItemModal";
import UpdateItemModal from "./updateItemModal";
import "./storeAdmin.css";
import "./tabledata.css"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons";
import AdminNav from '../navigatonBar/adminNav';
import Swal from "sweetalert2";


function ItemRetrieve() {

    const [items, setItems] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredItems, setFilteredItems] = useState([]);
    const [modal, setModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);

    const columns = [
        {
            name: 'Item Name',
            selector: row => row.itemName,
            sortable: true,
            width: "180px"
        },
        {
            name: 'Description',
            selector: row => row.description,
            width: '250px'
        },
        {
            name: 'Price',
            selector: row => row.price,
            sortable: true,
            width: '150px'

        },
        {
            name: 'Quantity',
            selector: row => row.quantity,
            sortable: true,
            width: '100px'

        },
        {
            name: 'Images',
            selector: row => <img alt="itemimage" width={100} height={100} src={row.images} />,
            width: '250px'
        },
        {
            name: 'Offer',
            selector: row => row.offer + ' %',
            sortable: true,
            width: '150px'

        },
        {
            name: 'Action',
            cell: (row) =>
                <>
                    <Fragment>
                        <button onClick={() => openUpdateModal(row._id)} type="button" className=" editbtn btn btn-outline-secondary btn-sm" >  Edit</button>
                        <button onClick={() => onSubmit(row._id)} type="button" className="btn btn-outline-danger btn-sm" > Delete</button>
                    </Fragment>
                </>
        },
    ];

    const onSubmit = async (id) => {
        // axios.delete("http://localhost:5050/storeAdmin/" + id)
        //     .then((res) => {
        //         alert("Successfully deleted");
        //         const modified = filteredItems.filter(item => item._id !== id);
        //         setFilteredItems(modified);
        //     });
        await Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to delete the selected item?",
            icon: 'warning',
            showDenyButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: `Cancel`,
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(

                    'Deleted!',
                    '',
                    'success',
                    axios.delete("http://localhost:5050/storeAdmin/" + id)
                        .then((res) => {
                            const modified = filteredItems.filter(item => item._id !== id);
                            setFilteredItems(modified);
                        }),
                    )
    } else if (result.isDenied) {
        Swal.fire(
            'Item is not deleted',
            '',
            'error'
        )
    }
})
    }

const getItems = async () => {
    try {
        const response = await axios.get('http://localhost:5050/storeAdmin');
        setItems(response.data);
        setFilteredItems(response.data);
    } catch (err) {
        console.log(err);
    }
}

useEffect(() => {
    getItems();
}, [])

useEffect(() => {
    const result = items.filter((item) => {
        return item.itemName.toLowerCase().match(search.toLowerCase());
    });
    setFilteredItems(result);
}, [search])

const openInsertModal = () => {
    setModal(true);
}

const closeInsertModal = () => setModal(false);

const openUpdateModal = (data) => {
    setUpdateModal(true);
    window.sessionStorage.setItem("item", data);
}

const closeUpdateModal = () => setUpdateModal(false);

const ModalContent = () => {
    return (
        <Modal show={updateModal} onHide={closeUpdateModal} backdrop="static" size="lg">
            <Modal.Header closeButton>
                <Modal.Title>
                    Update Item Details
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
                <UpdateItemModal />
            </Modal.Body>
            {/* <Modal.Footer>
                <Button variant="secondary" onClick={closeUpdateModal}> Close Button </Button>
            </Modal.Footer> */}
        </Modal>
    )
}

const goBack = () => {
    window.location = "/storeAdmindash"
}

const navigateReport = () => {
    window.location = "/storeAdminReport"
}

return (
    <>
        <AdminNav />
        <div className="container bkgrnd">

            <Link onClick={goBack} to="#" className="backLink">
                <FontAwesomeIcon icon={faArrowAltCircleLeft} />
                &nbsp;Go Back
            </Link>
            <h1 className="header">Store Warehouse</h1>
            <div className="tbl">
                <DataTable
                    columns={columns}
                    data={filteredItems}
                    pagination
                    fixedHeader
                    fixedHeaderScrollHeight="500px"
                    highlightOnHover
                    subHeader
                    subHeaderComponent={
                        <>
                            <input
                                type="text"
                                placeholder="Search here.."
                                className="w-25 form-control"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <button className="addBtn btn btn-outline-dark" style={{ width: '100%' }} onClick={openInsertModal}> Add New Item </button>
                        </>
                    }
                />
                {updateModal ? <ModalContent /> : null}
            </div>
            <Modal show={modal} onHide={closeInsertModal} backdrop="static" size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>
                        Insert New Item
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <InsertItemModal />
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button variant="secondary" onClick={closeInsertModal}> Close Button </Button>
                </Modal.Footer> */}
            </Modal>


            <button onClick={() => navigateReport()} className="reportbtn btn btn-dark"> Generate Reports</button>
        </div>

    </>
);

}

export default ItemRetrieve;