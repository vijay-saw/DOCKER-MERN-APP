import React, { useState } from 'react';
import { Form, Button, FloatingLabel, Alert } from 'react-bootstrap';
// import axios from 'axios';

const UserForm = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setSubmitError('');

        const newErrors = {};
        if (!name) newErrors.name = 'Name is required';
        if (!phone) newErrors.phone = 'Phone number is required';
        if (!email || !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'A valid email is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            await onSubmit({ name, phone, email });
            setName('');
            setPhone('');
            setEmail('');
        } catch (err) {
            setSubmitError('Failed to submit user details.');
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <FloatingLabel controlId="floatingName" label="Name" className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.name}
                </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel controlId="floatingPhone" label="Phone Number" className="mb-3">
                <Form.Control
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    isInvalid={!!errors.phone}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.phone}
                </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel controlId="floatingEmail" label="Email address" className="mb-3">
                <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.email}
                </Form.Control.Feedback>
            </FloatingLabel>
            {submitError && <Alert variant="danger">{submitError}</Alert>}
            <Button variant="primary" type="submit" className="w-100">
                Submit
            </Button>
        </Form>
    );
};

export default UserForm;
