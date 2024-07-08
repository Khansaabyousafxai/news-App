import React, { Component } from 'react'

export class NewsItem extends Component {
    
  render() {

    let {tittle , description ,imageUrl ,newsUrl ,author ,date ,source} = this.props;

    return (
      <div>
        <div className="card">
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            position: 'absolute',
            right: '0'
          }}>
  <span className=" badge rounded-pill bg-danger">
    {source}
    
  </span>
  </div>
  <img src={!imageUrl?"https://images.news18.com/webstories/uploads/2024/06/cropped-66727fc83148a-oneplus-nord-ce-4-lite-5g-19504728-16x9-2024-06-a99827189d5d72e61534bffb4764ce9b.jpg" : imageUrl} className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">{tittle}
</h5>
    <p className="card-text">
      {description}
    </p>
    <p className="card-text">
  <small className="text-muted">by {!author? "unknown" : author} on {new Date(date).toGMTString()}</small>
</p>

    <a href={newsUrl} target='_blank' className="btn btn-sm btn-dark">
      read more
    </a>
  </div>
</div>

      </div>
    )
  }
}

export default NewsItem
