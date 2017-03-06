import React from 'react'
import { Button as Btn } from 'reactstrap'

const Button = ({ onClick, className = '', children }) =>
  <Btn
    onClick={onClick}
    className={className}
    type="button"
  >
    {children}
  </Btn>


export default Button
