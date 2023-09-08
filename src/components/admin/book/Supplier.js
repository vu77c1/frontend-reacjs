import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Form, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getAllSupplier, addSupplier, deleteSupplier, updateSupplier } from '../../../redux/actions/SupplierAction'
import validator from 'validator';

export default function Supplier() {
    const dispatch = useDispatch();
    const Supplier = useSelector(state => state.supplier.Supplier);
    const isLoading = useSelector(state => state.supplier.isLoading);
    const [validationMsg, setValidationMsg] = useState("");
    const [supplierId, setsupplierId] = useState('');
    const [supplierName, setsupplierName] = useState('');
    const [address, setsaddress] = useState('');
    const [taxCode, setstaxCode] = useState('');
    const [email, setemail] = useState('');
    const [phone, setphone] = useState('');
    const [addOrEdit, setaddOrEdit] = useState(false);
    const validateAll = () => {
        const msg = {};
        if (validator.isEmpty(email)) {
            msg.email = 'Email không được để trống';

        }
        else if (!validator.isEmail(email)) {

            msg.email = 'Sai định dạng email';
        }
        if (validator.isEmpty(supplierName)) {
            msg.supplierName = 'Tên nhà cung cấp không được để trống ';

        }
        if (validator.isEmpty(taxCode)) {
            msg.taxCode = 'Mã số thuế không được để trống ';

        }
        if (validator.isEmpty(address)) {
            msg.address = 'Địa chỉ không được để trống ';

        }
        if (validator.isEmpty(phone)) {
            msg.phone = 'Số điện thoại không được để trống ';

        }
        setValidationMsg(msg);
        if (Object.keys(msg).length > 0) return false;
        return true;
    }

    const handleAddSupplier = (e) => {
        e.preventDefault();
        const valid = validateAll();
        if (!valid) {
            return;
        }
        else {
            const supplierObj = { supplierName, address, taxCode, email, phone }
            dispatch(addSupplier(supplierObj));
            refreshFormSupplier();
        }

    }
    const handleEditSupplier = () => {
        const valid = validateAll();
        if (!valid) {
            return;
        }
        else {
            const supplierObj = { supplierId, supplierName, address, taxCode, email, phone }

            dispatch(updateSupplier(supplierObj));
            refreshFormSupplier();
            setaddOrEdit(false);
        }

    }
    const handleFormEdit = (item) => {
        setaddOrEdit(true)
        setsupplierId(item.supplierId);
        setsupplierName(item.supplierName)
        setsaddress(item.address);
        setphone(item.phone);
        setstaxCode(item.taxCode);
        setemail(item.email)


    }
    const handleSupplierDelete = (id) => {
        if (window.confirm('Bạn chắc chắn muốn xoá?')) {
            dispatch(deleteSupplier(id));
        }


    }
    const refreshFormSupplier = () => {
        setsupplierId('');
        setsupplierName('');
        setemail('');
        setsaddress('');
        setstaxCode('');
        setphone('');
    }
    const handleCancel = () => {
        setaddOrEdit(false);
        refreshFormSupplier();

    }

    useEffect(() => {
        dispatch(getAllSupplier());

    }, [isLoading])
    return (
        <div className='supplier-container my-3'>


            <Container>
                <Row>
                    <Col className='supplier-table' xs={9}>
                        <Card>
                            <Card.Header>Nhà cung cấp</Card.Header>
                            <Card.Body>
                                <Card.Title>Danh sách nhà cung cấp</Card.Title>
                                <div>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Mã NCC</th>
                                                <th>Tên NCC</th>
                                                <th>Địa chỉ</th>
                                                <th>MS Thuế</th>
                                                <th>Email</th>
                                                <th>Số ĐT</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                Supplier && Supplier.length > 0 && Supplier.map((item, index) => {
                                                    return (

                                                        <tr key={`supplier-${index}`}>
                                                            <td>{item.supplierId}</td>
                                                            <td>{item.supplierName}</td>
                                                            <td>{item.address}</td>
                                                            <td>{item.taxCode}</td>
                                                            <td>{item.email}</td>
                                                            <td>{item.phone}</td>
                                                            <td>
                                                                <Button onClick={() => handleSupplierDelete(item.supplierId)} variant="danger"><i className="far fa-trash-alt"></i></Button>{' '}
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
                            {addOrEdit === false ? <Card.Header>Thêm mới nhà cung cấp</Card.Header> : <Card.Header>Sửa nhà cung cấp</Card.Header>}

                            <Card.Body>
                                <div>
                                    <Form>
                                        {
                                            addOrEdit && <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                <Form.Label>Mã nhà cung cấp</Form.Label>
                                                <Form.Control disabled value={supplierId} onChange={(e) => setsupplierId(e.target.value)} type="text" placeholder="" />

                                            </Form.Group>

                                        }

                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label>Tên nhà cung cấp</Form.Label>
                                            <Form.Control value={supplierName} onChange={(e) => setsupplierName(e.target.value)} type="text" placeholder="" />
                                            <p className='text-danger'>{validationMsg.supplierName}</p>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label>Địa chỉ</Form.Label>
                                            <Form.Control value={address} onChange={(e) => setsaddress(e.target.value)} type="text" placeholder="" />
                                            <p className='text-danger'>{validationMsg.address}</p>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label>Mã số thuế</Form.Label>
                                            <Form.Control value={taxCode} onChange={(e) => setstaxCode(e.target.value)} type="text" placeholder="" />
                                            <p className='text-danger'>{validationMsg.taxCode}</p>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control value={email} onChange={(e) => setemail(e.target.value)} type="text" placeholder="" />
                                            <p className='text-danger'>{validationMsg.email}</p>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label>Số điện thoại</Form.Label>
                                            <Form.Control value={phone} onChange={(e) => setphone(e.target.value)} type="number" placeholder="" />
                                            <p className='text-danger'>{validationMsg.phone}</p>
                                        </Form.Group>

                                    </Form>
                                    {addOrEdit === false ? <> <Button onClick={(e) => handleAddSupplier(e)} variant="success"><i className="fa-solid fa-circle-plus"></i> Thêm mới</Button>{' '}</> :
                                        <> <Button onClick={(e) => handleEditSupplier(e)} variant="warning"><i className="fa-solid fa-pen-to-square"></i>{' '}Cập nhật</Button>{' '}
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
    )
}
