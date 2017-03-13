import React, { Component } from 'react'
import Search from './Search'
import List from './List'
import Button from './Button'

import '../styles/App.sass'
import '../styles/Button.sass'

const DEFAULT_QUERY = 'react'
const DEFAULT_PAGE = 0
const DEFAULT_HPP = '20'

const PATH_BASE = 'https://hn.algolia.com/api/v1'
const PATH_SEARCH = '/search'
const PARAM_SEARCH = 'query='
const PARAM_PAGE = 'page='
const PARAM_HPP = 'hitsPerPage='

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY
    }

    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this)
    this.setSearchTopStories = this.setSearchTopStories.bind(this)
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this)
    this.onDismiss = this.onDismiss.bind(this)
    this.onSearchChange = this.onSearchChange.bind(this)
    this.onSearchSubmit = this.onSearchSubmit.bind(this)
  }

  needsToSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm]
  }

  setSearchTopStories(result) {
    const { hits, page } = result
    const { searchKey, results } = this.state

    const oldHits = results && results[searchKey] ? results[searchKey].hits : []

    const updateHits = [...oldHits, ...hits]

    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updateHits, page }
      }
    })
  }

  fetchSearchTopStories(searchTerm, page) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
  }

  componentDidMount() {
    const { searchTerm } = this.state
    this.setState({ searchKey: searchTerm })
    this.fetchSearchTopStories(searchTerm, DEFAULT_PAGE)
  }

  onDismiss(id) {
    const { searchKey, results } = this.state
    const { hits, page } = results[searchKey]

    const isNotId = item => item.objectID !== id
    const updateHits = hits.filter(isNotId)

    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updateHits, page }
      }
    })
  }

  onSearchChange(e) {
    this.setState({ searchTerm: e.target.value })
  }

  onSearchSubmit(e) {
    const { searchTerm } = this.state

    this.setState({ searchKey: searchTerm })

    if (this.needsToSearchTopStories(searchTerm))
      this.fetchSearchTopStories(searchTerm, DEFAULT_PAGE)

    e.preventDefault()
  }

  render() {
    const { searchTerm, results, searchKey } = this.state
    const page = (results && results[searchKey] && results[searchKey].page) || 0
    const list = (results && results[searchKey] && results[searchKey].hits) || []

    if (!results) return null

    return (
      <div className="container-fluid">
        <div className="App">
          <h1 className="hanews">HaNews</h1>
          <p>Search topic and find the most popular posts in <span className="hide-link"><a href="https://news.ycombinator.com/">Hacker News</a></span> history</p>
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

          <List
            list={list}
            onDismiss={this.onDismiss}
          />

          <div>
            <Button className="btn-more" onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>More</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default App
