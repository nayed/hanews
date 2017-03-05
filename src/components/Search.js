import React from 'react'
import Button from './Button'
import { Form, FormGroup, Input } from 'reactstrap'
import "../styles/Search.sass"

const Search = ({ value, onChange, onSubmit, className = '', children }) =>
  <Form onSubmit={onSubmit}>
    <FormGroup>
      <Input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search here"
        className={className}
      />
      <Button type="submit">{children}</Button>
    </FormGroup>
  </Form>

export default Search
