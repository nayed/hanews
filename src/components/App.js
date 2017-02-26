import React, { Component } from 'react'
import Search from './Search'
import List from './List'

import '../styles/App.sass'

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
  {
    title: 'HaNews',
    url: 'https://nayed.github.io/hanews',
    author: 'Nayed Saïd Ali',
    num_comments: 6,
    points: 2,
    objectID: 2,
  },
]

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      list,
      searchTerm: ''
    }

    this.onDismiss = this.onDismiss.bind(this)
    this.onSearchChange = this.onSearchChange.bind(this)
  }

  onDismiss(id) {
    const isNotId = item => item.objectID !== id
    const updatedList = this.state.list.filter(isNotId)
    this.setState({ list: updatedList })
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value })
  }

  render() {
    const { searchTerm, list } = this.state

    return (
      <div className="container-fluid">
        <div className="App">
          <div className="row">
            <div className="col-sm-4"></div>
            <div className="col-sm-4">
              <Search
                value={searchTerm}
                onChange={this.onSearchChange}
                className="search"
              >
                Search
              </Search>
            </div>
            <div className="col-sm-4"></div>
          </div>

          <List
            list={list}
            pattern={searchTerm}
            onDismiss={this.onDismiss}
          />
        </div>
      </div>
    )
  }
}

export default App