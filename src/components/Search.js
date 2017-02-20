import React from 'react'
import { Form, FormGroup, Input } from 'reactstrap'
import "../styles/Search.sass"

const Search = ({ value, onChange, children }) =>
  <Form>
    <FormGroup>
      <Input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search here"
      />
    </FormGroup>
  </Form>

export default Search
