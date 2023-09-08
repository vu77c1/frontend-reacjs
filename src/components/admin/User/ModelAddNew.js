
import { useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap'
import { createUser } from '../../../services/UserService'
import { toast } from 'react-toastify';
import validator from 'validator';

function ModelAddNew(props) {
    const { show, handleClose, getUsers } = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fistName, setFistName] = useState("");
    const [lastName, setLastName] = useState("");
    const [validationMsg, setValidationMsg] = useState("");
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
    const handleCreateUser = async () => {
        const valid = validateAll();
        if (!valid) {
            return;
        }
        else {
            let res = await createUser(email, password, fistName, lastName);
            if (res && res.data.id) {
                handleClose();
                setEmail('');
                setFistName('');
                setLastName('');
                setPassword('');
                getUsers(1, "", "")
                toast.success("Created Success!")

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
                    <Modal.Title>Add New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="Email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control required type="email" placeholder="Enter email" value={email} onChange={(event) => setEmail(event.target.value)} />
                            <p className='text-danger'>{validationMsg.email}</p>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="Password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
                            <p className='text-danger'>{validationMsg.password}</p>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="FistName">
                            <Form.Label>FistName</Form.Label>
                            <Form.Control type="text" placeholder="FistName" value={fistName} onChange={(event) => setFistName(event.target.value)} />
                            <p className='text-danger'>{validationMsg.fistName}</p>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="LastName">
                            <Form.Label>LastName</Form.Label>
                            <Form.Control type="text" placeholder="LastName" value={lastName} onChange={(event) => setLastName(event.target.value)} />
                            <p className='text-danger'>{validationMsg.lastName}</p>
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={handleCreateUser}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModelAddNew;