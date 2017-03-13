import React from 'react'
import Button from './Button'
import { Form, FormGroup, Input } from 'reactstrap'

import "../styles/Search.sass"

const Search = ({ value, onChange, onSubmit, className = '', children }) =>
  <Form onSubmit={onSubmit}>
    <FormGroup className="search-area">
      <Input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search here"
        className={className}
      />
      <Button type="submit" className="btn-search" onClick={onSubmit}></Button>
    </FormGroup>
  </Form>

export default Search
