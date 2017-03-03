import React from 'react'
import { Form, FormGroup, Input } from 'reactstrap'
import "../styles/Search.sass"

const Search = ({ value, onChange, className = '', children }) =>
  <Form>
    <FormGroup>
      <Input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search here"
        className={className}
      />
    </FormGroup>
  </Form>

export default Search
