import React from 'react'
import { FloatingLabel, Form } from 'react-bootstrap'

const Input = ({ label, type,font, name, register, rules, errors,onclick }) => {
  
const handleInput = (e) => {

    if (name === "vehicleNumber") {

        let value = e.target.value
            .toUpperCase()
            .replace(/[^A-Z0-9]/g, "");

        value = value.replace(
            /^([A-Z]{2})(\d{1,2})([A-Z]{1,2})(\d{0,4}).*/,
            "$1 $2 $3 $4"
        );

        e.target.value = value.trim();
    }
};

    return (
        <FloatingLabel 
            controlId={name}
            label={label}
            className="mb-3 z-0"
            onClick={onclick}
        >
            <Form.Control
                type={type}
                placeholder=" "  style={{ textTransform: font }}
                onInput={handleInput}
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