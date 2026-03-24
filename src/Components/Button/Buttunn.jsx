import React from 'react'
import { Button } from 'react-bootstrap'

const Buttunn = ({ name, value,bgcolor ,type}) => {
  return (
    <div>
      <Button style={{backgroundColor:bgcolor}} name={name} value={value} type={type}>
        {value}
      </Button>
    </div>
  )
}

export default Buttunn