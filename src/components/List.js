import React from 'react'
import Button from './Button'
import '../styles/List.sass'

const List = ({ list, onDismiss }) => {
  return (
    <div>
      { list.map(item =>
        <div key={item.objectID}>
          <div className="row">
            <div className="col-sm-3"></div>
            <div className="item col-sm-6">
              <span>
                <a href={item.url}>{item.title}</a>
              </span>
              <span>{item.author}</span>
              <span>{item.num_comments}</span>
              <span>{item.points}</span>
              <span>
                <Button onClick={() => onDismiss(item.objectID)} >
                  Dismiss
                </Button>
              </span>
            </div>
            <div className="col-sm-3"></div>
          </div>
        </div>
      )}
    </div>
  )
}

export default List
