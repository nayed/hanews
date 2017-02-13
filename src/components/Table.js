import React, { Component } from 'react'

class Table extends Component {
  render() {
    const { list, pattern, onDismiss } = this.props
    const isSearched = searchTerm => item =>
      !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase())
      
    return (
      <div>
        { list.filter(isSearched(pattern)).map(item =>
          <div key={item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
            <span>
              <button
                onClick={() => this.onDismiss(item.objectID)}
                type="button"
              >
                Dismiss
              </button>
            </span>
          </div>
        )}
      </div>
    )
  }
}

export default Table
