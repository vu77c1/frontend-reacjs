
import { useEffect, useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap'
import { toast } from 'react-toastify';
import { updateUser } from '../../../services/UserService'
import validator from 'validator';


function ModelEditUser(props) {
    const { show, handleClose, dataUserEdit, getUsers } = props;
    const [id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fistName, setFistName] = useState("");
    const [lastName, setLastName] = useState("");
    const [validationMsg, setValidationMsg] = useState("");
    useEffect(() => {
        if (show) {
            setId(dataUserEdit.id);
            setEmail(dataUserEdit.email);
            setPassword(dataUserEdit.password)
            setFistName(dataUserEdit.fistName);
            setLastName(dataUserEdit.lastName);

        }

    }, [dataUserEdit])
    const validateAll = () => {
        const msg = {};
        if (validator.isEmpty(email)) {
            msg.email = 'please input your Email';

        }
        else if (!validator.isEmail(email)) {

            msg.email = 'Your email incorrect';
        }
        if (validator.isEmpty(password)) {
            msg.password = 'please input your password ';

        }
        if (validator.isEmpty(fistName)) {
            msg.fistName = 'please input your FistName ';

        }
        if (validator.isEmpty(lastName)) {
            msg.lastName = 'please input your LastName ';

        }
        setValidationMsg(msg);
        if (Object.keys(msg).length > 0) return false;
        return true;
    }
    const handleUpdateUser = async () => {
        const valid = validateAll();
        if (!valid) {
            return;
        }
        else {
            let res = await updateUser(id, email, password, fistName, lastName);
            if (res && res.success == true) {
                toast.success("Edit success! ");
                getUsers(1, "", "");
                handleClose();
            }
        }


    }
    return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
        >
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="Email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control required type="email" placeholder="" value={email} onChange={(event) => setEmail(event.target.value)} />
                            <p className='text-danger'>{validationMsg.email}</p>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="Password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="" value={password} onChange={(event) => setPassword(event.target.value)} />
                            <p className='text-danger'>{validationMsg.password}</p>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="FistName">
                            <Form.Label>FistName</Form.Label>
                            <Form.Control type="text" placeholder="" value={fistName} onChange={(event) => setFistName(event.target.value)} />
                            <p className='text-danger'>{validationMsg.fistName}</p>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="LastName">
                            <Form.Label>LastName</Form.Label>
                            <Form.Control type="text" placeholder="" value={lastName} onChange={(event) => setLastName(event.target.value)} />
                            <p className='text-danger'>{validationMsg.lastName}</p>
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={handleUpdateUser}>
                        Edit
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModelEditUser;