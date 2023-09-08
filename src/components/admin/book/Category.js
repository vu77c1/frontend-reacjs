import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Form, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategory, addCategory, deleteCategory, updateCategory } from '../../../redux/actions/CategoryAction'
import validator from 'validator';

export default function Category() {
    const dispatch = useDispatch();
    const Category = useSelector(state => state.category.Category);
    const isLoading = useSelector(state => state.category.isLoading);
    const [validationMsg, setValidationMsg] = useState("");
    const [categoryId, setcategoryId] = useState('');
    const [categoryName, setcategoryName] = useState('');
    const [description, setdescription] = useState('');
    const [addOrEdit, setaddOrEdit] = useState(false);
    const validateAll = () => {
        const msg = {};
        if (validator.isEmpty(categoryName)) {
            msg.categoryName = 'Tên loại sách không được để trống';

        }
        if (validator.isEmpty(description)) {
            msg.description = 'Mô tả không được để trống ';

        }

        setValidationMsg(msg);
        if (Object.keys(msg).length > 0) return false;
        return true;
    }

    const handleAddCategory = (e) => {
        e.preventDefault();
        const valid = validateAll();
        if (!valid) {
            return;
        }
        else {
            const categoryObj = { categoryName, description }
            dispatch(addCategory(categoryObj));
            refreshFormCategory();
        }

    }
    const handleEditCategory = () => {
        const valid = validateAll();
        if (!valid) {
            return;
        }
        else {
            const categoryObj = { categoryId, categoryName, description }

            dispatch(updateCategory(categoryObj));
            refreshFormCategory();
            setaddOrEdit(false);
        }

    }
    const handleFormEdit = (item) => {
        setaddOrEdit(true)
        setcategoryId(item.categoryId);
        setcategoryName(item.categoryName)
        setdescription(item.description);

    }
    const handleCategoryDelete = (id) => {
        if (window.confirm('Bạn chắc chắn muốn xoá?')) {
            dispatch(deleteCategory(id));
        }

    }
    const refreshFormCategory = () => {
        setcategoryId('');
        setdescription('');
        setcategoryName('');
    }
    const handleCancel = () => {
        setaddOrEdit(false);
        refreshFormCategory();

    }

    useEffect(() => {
        dispatch(getAllCategory());

    }, [isLoading])
    return (
        <>
            <div className='supplier-container my-3'>


                <Container>
                    <Row>
                        <Col className='supplier-table' xs={9}>
                            <Card>
                                <Card.Header>Loại sách</Card.Header>
                                <Card.Body>
                                    <Card.Title>Danh sách </Card.Title>

                                    <div>
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>Mã loại sách</th>
                                                    <th>Tên loại sách</th>
                                                    <th>Mô tả</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {
                                                    Category && Category.length > 0 && Category.map((item, index) => {
                                                        return (

                                                            <tr key={`category-${index}`}>
                                                                <td>{item.categoryId}</td>
                                                                <td>{item.categoryName}</td>
                                                                <td>{item.description}</td>
                                                                <td>
                                                                    <Button onClick={() => handleCategoryDelete(item.categoryId)} variant="danger"><i className="far fa-trash-alt"></i></Button>{' '}
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
                        <Col className='supplier-form' xs={3}>
                            <Card>
                                {addOrEdit === false ? <Card.Header>Thêm mới</Card.Header> : <Card.Header>Cập nhật</Card.Header>}

                                <Card.Body>
                                    <div>
                                        <Form>
                                            {
                                                addOrEdit && <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>Mã loại sách</Form.Label>
                                                    <Form.Control disabled value={categoryId} onChange={(e) => setcategoryId(e.target.value)} type="text" placeholder="" />

                                                </Form.Group>

                                            }

                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                <Form.Label>Tên loại sách</Form.Label>
                                                <Form.Control value={categoryName} onChange={(e) => setcategoryName(e.target.value)} type="text" placeholder="" />
                                                <p className='text-danger'>{validationMsg.categoryName}</p>
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                <Form.Label>Mô tả</Form.Label>
                                                <Form.Control value={description} onChange={(e) => setdescription(e.target.value)} type="text" placeholder="" />
                                                <p className='text-danger'>{validationMsg.description}</p>
                                            </Form.Group>

                                        </Form>
                                        {addOrEdit === false ? <> <Button onClick={(e) => handleAddCategory(e)} variant="success"><i className="fa-solid fa-circle-plus"></i> Thêm mới</Button>{' '}</> :
                                            <> <Button onClick={(e) => handleEditCategory(e)} variant="warning"><i className="fa-solid fa-pen-to-square"></i>{' '}Cập nhật</Button>{' '}
                                                <Button onClick={(e) => handleCancel(e)} variant="danger"><i className="fa-sharp fa-regular fa-delete-left"></i>{' '}Huỷ</Button>{' '}
                                            </>
                                        }
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
