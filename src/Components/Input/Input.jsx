import React from 'react'
import { FloatingLabel, Form } from 'react-bootstrap'

const Input = ({ label, type, name, register, rules, errors,onclick }) => {
    return (
        <FloatingLabel 
            controlId={name}
            label={label}
            className="mb-3 z-0"
            onClick={onclick}
        >
            <Form.Control
                type={type}
                placeholder=" "
                {...(register ? register(name, rules) : {})}
                isInvalid={!!errors?.[name]}   // ✅ SAFE ACCESS
            />

            <Form.Control.Feedback type="invalid">
                {errors?.[name]?.message}     {/* ✅ SAFE ACCESS */}
            </Form.Control.Feedback>
        </FloatingLabel>
    )
}

export default Input