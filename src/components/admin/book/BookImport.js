import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Form, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBookImport, addBookImport, deleteBookImport, updateBookImport } from '../../../redux/actions/BookImportAction'
import { getAllBook } from '../../../redux/actions/BookAction'
import validator from 'validator';
import Select from 'react-select'

export default function BookImport() {
    const dispatch = useDispatch();
    const BookImport = useSelector(state => state.bookimport.BookImport);
    const BookOption = useSelector(state => state.book.BookOption);
    const isLoading = useSelector(state => state.bookimport.isLoading);
    const [hidenForm, sethidenForm] = useState(false);
    const [validationMsg, setValidationMsg] = useState("");
    const [bookImportId, setbookImportId] = useState('');
    const [categoryId, setcategoryId] = useState('');
    const [categoryName, setcategoryName] = useState('');
    const [quantity, setquantity] = useState('');
    const [price, setprice] = useState('');
    const [dateAt, setdateAt] = useState('');
    const [addOrEdit, setaddOrEdit] = useState(false);
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    };
    console.log()
    const validateAll = () => {
        const msg = {};
        /*if (validator.isEmpty(name)) {
            msg.name = 'Tên sách không được để trống';

        }
        if (validator.isEmpty(publicCompany)) {
            msg.publicCompany = 'Nhà xuất bản không được để trống ';

        }
        if (validator.isEmpty(publicYear)) {

            msg.publicYear = 'Năm xuất bản không được để trống ';

        }
        if (validator.isEmpty(price)) {
            msg.price = ' Giá không được để trống ';

        }*/
        /*if (validator.isEmpty(supplierId)) {
            msg.supplierId = ' Nhà cung cấp không được để trống ';

        }
        if (validator.isEmpty(categoryId)) {
            msg.categoryId = ' Loại sách không được để trống ';

        }*/

        setValidationMsg(msg);
        if (Object.keys(msg).length > 0) return false;
        return true;
    }

    const handleAddBook = (e) => {
        e.preventDefault();
        const valid = validateAll();
        if (!valid) {
            return;
        }
        else {
            const bookObj = { categoryId, categoryName, quantity, dateAt, price };
            dispatch(addBookImport(bookObj));
            refreshFormBook();
        }

    }
    const handleEditBookImport = () => {
        const bookObj = { bookImportId, categoryId, categoryName, quantity, price };
        dispatch(updateBookImport(bookObj));
        refreshFormBook();
        sethidenForm(false);
        setaddOrEdit(false);



    }
    const onChangecategory = (item) => {
        const select = item.target;
        const value = select.value;
        const desc = select.selectedOptions[0].text;
        console.log(desc);
        setcategoryName(desc);
        setcategoryId(value)


    }
    const handleFormBookImportEdit = (item) => {
        setaddOrEdit(true);
        sethidenForm(true);
        setbookImportId(item.bookImportId);
        setcategoryId(item.categoryId);
        setcategoryName(item.categoryName);
        setprice(item.price);
        setquantity(item.quantity);

    }
    const handleBookImportDelete = (id) => {
        if (window.confirm('Bạn chắc chắn muốn xoá?')) {
            dispatch(deleteBookImport(id));
        }

    }
    const refreshFormBook = () => {
        setcategoryId('');
        setbookImportId('');
        setcategoryName('');
        setprice('');
        setdateAt('');
        setquantity('');

    }
    const handleCancel = () => {
        sethidenForm(false);
        setaddOrEdit(false);
        refreshFormBook();

    }
    const handleFormAdd = () => {
        sethidenForm(true);

    }

    useEffect(() => {
        dispatch(getAllBookImport());
        dispatch(getAllBook());


    }, [isLoading])
    return (
        <>
            <div className='supplier-container my-3'>


                <Container>
                    {hidenForm &&
                        <>
                            <Row>
                                <Col className='supplier-form' xs={12}>
                                    <Card>
                                        {addOrEdit === false ? <Card.Header>Thêm mới</Card.Header> : <Card.Header>Cập nhật</Card.Header>}

                                        <Card.Body>
                                            <div>
                                                <Form>
                                                    <Row className='mb-3'>
                                                        {
                                                            addOrEdit && <Form.Group xs={1} as={Col} controlId="bookImportId">
                                                                <Form.Label>Mã  sách</Form.Label>
                                                                <Form.Control disabled value={bookImportId} onChange={(e) => setbookImportId(e.target.value)} type="text" placeholder="" />

                                                            </Form.Group>


                                                        }

                                                        <Form.Group as={Col} className="mb-3" controlId="categoryId">
                                                            <Form.Label >Tên sách</Form.Label>
                                                            {/* <Select key={opt => opt.value} defaultValue={categoryId} onChange={(opt) => onChangecategory(opt)} placeholder='----Chọn loại sách----' options={CategoryOption} />*/}
                                                            <select placeholder='----Chọn loại sách----' onChange={(e) => onChangecategory(e)} className="form-control" name="empDep" id="empDep" value={categoryId}>
                                                                <option>----Chọn loại sách----</option>
                                                                {BookOption.map(dep =>
                                                                    <option key={dep.value} value={dep.value}>{dep.label}</option>
                                                                )}
                                                            </select>
                                                            <p className='text-danger'>{validationMsg.categoryId}</p>
                                                        </Form.Group>
                                                        <Form.Group as={Col} controlId="quantity">
                                                            <Form.Label>Số lượng</Form.Label>
                                                            <Form.Control value={quantity} onChange={(e) => setquantity(e.target.value)} type="number" placeholder="" />
                                                            <p className='text-danger'>{validationMsg.price}</p>
                                                        </Form.Group>
                                                        <Form.Group as={Col} controlId="price">
                                                            <Form.Label>Tổng tiền</Form.Label>
                                                            <Form.Control value={price} onChange={(e) => setprice(e.target.value)} type="number" placeholder="" />
                                                            <p className='text-danger'>{validationMsg.price}</p>
                                                        </Form.Group>


                                                    </Row>


                                                </Form>
                                                {addOrEdit === false ? <> <Button onClick={(e) => handleAddBook(e)} variant="success"><i className="fa-solid fa-circle-plus"></i> Thêm mới</Button>{' '}
                                                    <Button onClick={(e) => handleCancel(e)} variant="danger"><i className="fa-sharp fa-regular fa-delete-left"></i>{' '}Huỷ</Button>{' '}</> :
                                                    <> <Button onClick={() => handleEditBookImport()} variant="warning"><i className="fa-solid fa-pen-to-square"></i>{' '}Cập nhật</Button>{' '}
                                                        <Button onClick={(e) => handleCancel(e)} variant="danger"><i className="fa-sharp fa-regular fa-delete-left"></i>{' '}Huỷ</Button>{' '}
                                                    </>
                                                }
                                            </div>
                                        </Card.Body>
                                    </Card>




                                </Col>

                            </Row>
                        </>
                    }
                    <Row>

                        <Col className='supplier-table' xs={12}>
                            <Card>
                                <Card.Header>Loại sách</Card.Header>
                                <Card.Body>
                                    <Card.Title>Danh sách </Card.Title>
                                    <div>
                                        <Button onClick={(e) => handleFormAdd(e)} variant="success"><i className="fa-solid fa-circle-plus"></i> Thêm mới</Button>
                                    </div>

                                    <div>

                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>Id</th>
                                                    <th>Mã sách</th>
                                                    <th>Tên sách</th>
                                                    <th>Ngày nhập</th>
                                                    <th>Số lượng</th>
                                                    <th>Tổng tiền</th>

                                                    <th>Action</th>


                                                </tr>
                                            </thead>
                                            <tbody>

                                                {
                                                    BookImport && BookImport.length > 0 && BookImport.map((item, index) => {
                                                        return (

                                                            <tr key={`category-${index}`}>
                                                                <td>{item.bookImportId}</td>
                                                                <td>{item.categoryId}</td>
                                                                <td>{item.categoryName}</td>

                                                                <td>{formatDate(new Date(item.dateAt))}</td>
                                                                <td>{item.quantity}</td>
                                                                <td>{item.price}</td>
                                                                <td>
                                                                    <Button onClick={() => handleBookImportDelete(item.bookImportId)} variant="danger"><i className="far fa-trash-alt"></i></Button>{' '}
                                                                    <Button onClick={() => handleFormBookImportEdit(item)} variant="warning"><i className="fa-solid fa-pen-to-square"></i> </Button>{' '}

                                                                </td>
                                                            </tr>
                                                        )

                                                    })
                                                }

                                            </tbody>
                                        </Table>
                                    </div>

                                </Card.Body>
                            </Card>



                        </Col>

                    </Row>

                </Container>

            </div >
        </>
    )
}
