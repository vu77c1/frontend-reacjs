import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Form, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBook, addBook, deleteBook, updateBook } from '../../../redux/actions/BookAction'
import { getAllCategory } from '../../../redux/actions/CategoryAction'
import { getAllSupplier } from '../../../redux/actions/SupplierAction'
import validator from 'validator';
import Select from 'react-select'

export default function Book() {
    const dispatch = useDispatch();
    const Book = useSelector(state => state.book.Book);
    const SupplierOption = useSelector(state => state.supplier.SupplierOption);
    const CategoryOption = useSelector(state => state.category.CategoryOption);
    const isLoading = useSelector(state => state.book.isLoading);
    const [hidenForm, sethidenForm] = useState(false);
    const [validationMsg, setValidationMsg] = useState("");
    const [bookId, setbookId] = useState('');
    const [name, setname] = useState('');
    const [publicYear, setpublicYear] = useState('');
    const [publicCompany, setpublicCompany] = useState('');
    const [categoryId, setcategoryId] = useState('');
    const [supplierId, setsupplierId] = useState('');
    const [price, setprice] = useState('');
    const [quantity, setquantity] = useState('');
    const [addOrEdit, setaddOrEdit] = useState(false);

    const validateAll = () => {
        const msg = {};
        if (validator.isEmpty(name)) {
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

        }
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
            const bookObj = { bookId, name, publicYear, publicCompany, categoryId, supplierId, price };
            dispatch(addBook(bookObj));
            refreshFormBook();
        }

    }
    const handleEditBook = () => {
        const bookObj = { bookId, name, publicYear, publicCompany, categoryId, supplierId, price };

        dispatch(updateBook(bookObj));
        refreshFormBook();
        sethidenForm(false);


    }
    const handleFormEdit = (item) => {
        setaddOrEdit(true);
        sethidenForm(true);
        setbookId(item.bookId);
        setcategoryId(item.categoryId);
        setsupplierId(item.supplierId);
        setname(item.name);
        setprice(item.price);
        setpublicCompany(item.publicCompany);
        setpublicYear(item.publicYear);
    }
    const handleBookDelete = (id) => {
        if (window.confirm('Bạn chắc chắn muốn xoá?')) {
            dispatch(deleteBook(id));
        }

    }
    const refreshFormBook = () => {
        setcategoryId('');
        setbookId('');
        setname('');
        setprice('');
        setsupplierId('');
        setpublicCompany('');
        setpublicYear('');

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
        dispatch(getAllBook());
        dispatch(getAllCategory());
        dispatch(getAllSupplier());


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
                                                            addOrEdit && <Form.Group xs={1} as={Col} controlId="bookId">
                                                                <Form.Label>Mã  sách</Form.Label>
                                                                <Form.Control disabled value={bookId} onChange={(e) => setbookId(e.target.value)} type="text" placeholder="" />

                                                            </Form.Group>


                                                        }
                                                        <Form.Group as={Col} controlId="name">
                                                            <Form.Label>Tên sách</Form.Label>
                                                            <Form.Control value={name} onChange={(e) => setname(e.target.value)} type="text" placeholder="" />
                                                            <p className='text-danger'>{validationMsg.name}</p>
                                                        </Form.Group>
                                                        <Form.Group as={Col} className="mb-3" controlId="categoryId">
                                                            <Form.Label for="categoryId">Loại sách</Form.Label>
                                                            <select placeholder='----Chọn nhà loại sách----' onChange={(e) => setcategoryId(e.target.value)} className="form-control" name="categoryId" id="categoryId" value={categoryId}>
                                                                <option>----Chọn loại sách----</option>
                                                                {CategoryOption.map(dep =>
                                                                    <option key={dep.value} value={dep.value}>{dep.label}</option>
                                                                )}
                                                            </select>
                                                            <p className='text-danger'>{validationMsg.categoryId}</p>

                                                        </Form.Group>
                                                        <Form.Group as={Col} className="mb-3" controlId="supplierId">
                                                            <Form.Label for="cheese"> Nhà cung cấp</Form.Label>
                                                            <select placeholder='----Chọn nhà cung cấp----' onChange={(e) => setsupplierId(e.target.value)} className="form-control" name="empDep" id="empDep" value={supplierId}>
                                                                <option>----Chọn loại sách----</option>
                                                                {SupplierOption.map(dep =>
                                                                    <option key={dep.value} value={dep.value}>{dep.label}</option>
                                                                )}
                                                            </select>
                                                            <p className='text-danger'>{validationMsg.supplierId}</p>
                                                        </Form.Group>


                                                    </Row>
                                                    <Row className='mb-3'>
                                                        <Form.Group as={Col} className="mb-3" controlId="publicYear">
                                                            <Form.Label>Năm xuất bản</Form.Label>

                                                            <Form.Control value={publicYear} onChange={(e) => setpublicYear(e.target.value)} type="number" placeholder="" />
                                                            <p className='text-danger'>{validationMsg.publicYear}</p>
                                                        </Form.Group>
                                                        <Form.Group as={Col} className="mb-3" controlId="publicCompany">
                                                            <Form.Label>Tên nhà xuất bản</Form.Label>
                                                            <Form.Control value={publicCompany} onChange={(e) => setpublicCompany(e.target.value)} type="text" placeholder="" />
                                                            <p className='text-danger'>{validationMsg.publicCompany}</p>
                                                        </Form.Group>
                                                        <Form.Group as={Col} className="mb-3" controlId="price">
                                                            <Form.Label>Giá</Form.Label>

                                                            <Form.Control value={price} onChange={(e) => setprice(e.target.value)} type="number" placeholder="" />
                                                            <p className='text-danger'>{validationMsg.price}</p>
                                                        </Form.Group>
                                                    </Row>


                                                </Form>
                                                {addOrEdit === false ? <> <Button onClick={(e) => handleAddBook(e)} variant="success"><i className="fa-solid fa-circle-plus"></i> Thêm mới</Button>{' '}
                                                    <Button onClick={(e) => handleCancel(e)} variant="danger"><i className="fa-sharp fa-regular fa-delete-left"></i>{' '}Huỷ</Button>{' '}</> :
                                                    <> <Button onClick={() => handleEditBook()} variant="warning"><i className="fa-solid fa-pen-to-square"></i>{' '}Cập nhật</Button>{' '}
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
                                                    <th>Mã sách</th>
                                                    <th>Tên sách</th>
                                                    <th>Mã loại sách</th>
                                                    <th>Mã NCC</th>
                                                    <th>Năm XB</th>
                                                    <th>Nhà XB</th>
                                                    <th>Giá sách</th>
                                                    <th>Số lượng</th>
                                                    <th>Action</th>


                                                </tr>
                                            </thead>
                                            <tbody>

                                                {
                                                    Book && Book.length > 0 && Book.map((item, index) => {
                                                        return (

                                                            <tr key={`category-${index}`}>
                                                                <td>{item.bookId}</td>
                                                                <td>{item.name}</td>
                                                                <td>{item.categoryId}</td>
                                                                <td>{item.supplierId}</td>
                                                                <td>{item.publicYear}</td>
                                                                <td>{item.publicCompany}</td>
                                                                <td>{item.price}</td>
                                                                <td>{item.quantity}</td>
                                                                <td>
                                                                    <Button onClick={() => handleBookDelete(item.bookId)} variant="danger"><i className="far fa-trash-alt"></i></Button>{' '}
                                                                    <Button onClick={() => handleFormEdit(item)} variant="warning"><i className="fa-solid fa-pen-to-square"></i> </Button>{' '}

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
