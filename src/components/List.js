import React from 'react'
import Button from './Button'

import '../styles/List.sass'

const PATH_HN = 'https://news.ycombinator.com'
const PATH_POST = '/item?id='
const PATH_USER = '/user?id='

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
                  {displayItem(item)}
                </a>
              </div>
              <span className="info">by <a href={`${PATH_HN}${PATH_USER}${item.author}`}>{item.author}</a></span>|
              <span className="info"><a href={`${PATH_HN}${PATH_POST}${item.objectID}`}> {item.num_comments} comms</a></span>|
              <span className="info">{item.points} pts</span>
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

function displayItem(item) {
  if (typeof item.title !== "string")
    return ""
  else if (item.title.length > 40)
    return `${item.title.substring(0, 40)}...`
  else
    return item.title
}

export default List
