
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import ReactPaginate from 'react-paginate';
import { fetchAllUser, deleteUser } from '../../../services/UserService'
import ModelAddNew from './ModelAddNew';
import ModelEditUser from './ModelEditUser';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { ExportCSV } from './ExportCSV'
import '../User/TableUser.scss'
import _ from 'lodash'
import { debounce } from 'lodash'


function TableUSers() {
    const [listUSer, setListUser] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [showModelAddNew, setShowModelAddNew] = useState(false);
    const [showModelEditUser, setShowModelEditUser] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({});
    const [sortBy, setSortBy] = useState('');
    const [keyWord, setKeyWord] = useState('');
    const handleClose = () => {
        setShowModelAddNew(false);
        setShowModelEditUser(false);
    }
    const handleSort = (sortBy) => {
        getUsers(1, sortBy, keyWord);
        setSortBy(sortBy);

    }

    const handleShow = () => setShowModelAddNew(true);
    const handleShowEdit = (user) => {
        setDataUserEdit(user);
        setShowModelEditUser(true);

    }
    const handleShowDelete = async (id) => {
        if (window.confirm('Are you sure you wish to delete this item?')) {
            let res = await deleteUser(id);
            if (res && res.success) {
                toast.success("Delete success! ");
                getUsers(1, "", "");
            }

        }

    }
    useEffect(() => {
        getUsers(1, sortBy, keyWord);

    }, []);
    const getUsers = async (page, sortBy, keyWord) => {
        let res = await fetchAllUser(page, sortBy, keyWord);
        if (res && res.data) {
            setTotalUsers(res.totalRecord);
            setTotalPages(res.totalPages)
            setListUser(res.data);
        }


    }
    const handlePageClick = (event) => {
        getUsers(event.selected + 1, sortBy, keyWord);

    };

    const handleSearch = debounce((e) => {
        let value = e.target.value;
        if (value) {
            /*let cloneListUsers = _.cloneDeep(listUSer).filter(k => k.email.includes(value));
        setListUser(cloneListUsers);*/
            getUsers(1, sortBy, value);
            setListUser()




        }
        else {
            getUsers(1, sortBy, keyWord);

        }

    }, 300)
    return (
        <>
            <div className='my-3 add-new d-sm-flex'>
                <span><h3>List User</h3></span>
                <div>
                    <label className='btn btn-secondary' htmlFor='importUser'><i className="fa-solid fa-file-import"></i> Import</label>{' '}
                    <input hidden type='file' id='importUser' />
                    <ExportCSV csvData={listUSer} fileName={'DATA'} /> {' '}
                    <Button onClick={handleShow} variant="success"><i className="fa-solid fa-circle-plus"></i> Add New</Button>{' '}
                </div>


            </div>
            <div className='col-12 col-sm-4 mb-3'>
                <Form.Control onChange={(e) => handleSearch(e)} placeholder='Search User by email...'></Form.Control>

            </div>
            <div className='customize-table'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>
                                <div className='sort-header'>
                                    <span>ID</span>
                                    <span>
                                        <i className="fa-sharp fa-solid fa-arrow-down" onClick={() => handleSort('id_asc')}></i>
                                        <i className="fa-sharp fa-solid fa-arrow-up" onClick={() => handleSort('id_desc')}></i>
                                    </span>

                                </div>

                            </th>
                            <th >
                                <div className='sort-header'>
                                    <span>Email</span>
                                    <span>
                                        <span>
                                            <i className="fa-sharp fa-solid fa-arrow-down" onClick={() => handleSort('email_asc')}></i>
                                            <i className="fa-sharp fa-solid fa-arrow-up" onClick={() => handleSort('email_desc')}></i>
                                        </span>
                                    </span>

                                </div>

                            </th>
                            <th>
                                <div className='sort-header'>
                                    <span>FistName</span>
                                    <span>
                                        <i className="fa-sharp fa-solid fa-arrow-down"></i>
                                        <i className="fa-sharp fa-solid fa-arrow-up"></i>
                                    </span>

                                </div>

                            </th>

                            <th>
                                <div className='sort-header'>
                                    <span>LastName</span>
                                    <span>
                                        <i className="fa-sharp fa-solid fa-arrow-down"></i>
                                        <i className="fa-sharp fa-solid fa-arrow-up"></i>
                                    </span>
                                </div>

                            </th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listUSer && listUSer.length > 0 && listUSer.map((item, index) => {
                                return (

                                    <tr key={`users-${index}`}>
                                        <td>{item.id}</td>
                                        <td>{item.email}</td>
                                        <td>{item.fistName}</td>
                                        <td>{item.lastName}</td>
                                        <td>
                                            <Button onClick={() => handleShowDelete(item.id)} variant="danger"><i className="far fa-trash-alt"></i></Button>{' '}
                                            <Button onClick={() => handleShowEdit(item)} variant="warning"><i className="fa-solid fa-pen-to-square"></i> Edit</Button>{' '}

                                        </td>
                                    </tr>
                                )

                            })
                        }



                    </tbody>
                </Table>
            </div>
            <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={totalPages}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
            />
            <ModelAddNew getUsers={getUsers} show={showModelAddNew} handleClose={handleClose} />
            <ModelEditUser getUsers={getUsers} handleClose={handleClose} show={showModelEditUser} dataUserEdit={dataUserEdit} />
        </>

    );
}

export default TableUSers;