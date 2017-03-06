import React from 'react'
import Button from './Button'

import '../styles/List.sass'

const List = ({ list, onDismiss }) => {
  return (
    <div>
      { list.map(item =>
        <div key={item.objectID}>
          <div className="row">
            <div className="col-sm-3 col-md-4"></div>
            <div className="item col-sm-6 col-md-4">
              <div className="title">
                <a href={item.url} data-toggle="tooltip" title={item.title}>
                  {item.title.length > 40 ? `${item.title.substring(0, 40)}...` : item.title}
                </a>
              </div>
              <span>by {item.author}</span>|
              <span>{item.num_comments} comms</span>|
              <span>{item.points} pts</span>
              <span>
                <Button className="btn-dismiss" onClick={() => onDismiss(item.objectID)} >
                  X
                </Button>
              </span>
            </div>
            <div className="col-sm-3 col-md-4"></div>
          </div>
        </div>
      )}
    </div>
  )
}

export default List
