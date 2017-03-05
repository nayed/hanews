import React, { Component } from 'react'
import Search from './Search'
import List from './List'
import Button from './Button'

import '../styles/App.sass'

const DEFAULT_QUERY = 'ruby'
const DEFAULT_PAGE = 0

const PATH_BASE = 'https://hn.algolia.com/api/v1'
const PATH_SEARCH = '/search'
const PARAM_SEARCH = 'query='
const PARAM_PAGE = 'page='

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY
    }

    this.setSearchTopStories = this.setSearchTopStories.bind(this)
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this)
    this.onDismiss = this.onDismiss.bind(this)
    this.onSearchChange = this.onSearchChange.bind(this)
    this.onSearchSubmit = this.onSearchSubmit.bind(this)
  }

  setSearchTopStories(result) {
    this.setState({ result })
  }

  fetchSearchTopStories(searchTerm, page) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
  }

  componentDidMount() {
    const { searchTerm } = this.state
    this.fetchSearchTopStories(searchTerm, DEFAULT_PAGE)
  }

  onDismiss(id) {
    const isNotId = item => item.objectID !== id
    const updateHits = this.state.result.hits.filter(isNotId)
    this.setState({
      result: { ...this.state.result, hits: updateHits }
    })
  }

  onSearchChange(e) {
    this.setState({ searchTerm: e.target.value })
  }

  onSearchSubmit(e) {
    const { searchTerm } = this.state
    this.fetchSearchTopStories(searchTerm, DEFAULT_PAGE)
    e.preventDefault()
  }

  render() {
    const { searchTerm, result } = this.state
    const page = (result && result.page) || 0

    if (!result) return null

    return (
      <div className="container-fluid">
        <div className="App">
          <div className="row">
            <div className="col-sm-4"></div>
            <div className="col-sm-4">
              <Search
                value={searchTerm}
                onChange={this.onSearchChange}
                onSubmit={this.onSearchSubmit}
                className="search"
              >
                Search
              </Search>
            </div>
            <div className="col-sm-4"></div>
          </div>

          { result &&
            <List
              list={result.hits}
              onDismiss={this.onDismiss}
            />
          }

          <div>
            <Button onClick={() => this.fetchSearchTopStories(searchTerm, page + 1)}>More</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default App
