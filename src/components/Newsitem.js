import React, { Component } from 'react'

export class Newsitem extends Component {
  render() {

    let { title, description, imageurl, newsurl, author, date, source } = this.props;
    return (

      <div className="card"  >
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{zindex:"1", left: "86%"}}>
          {source} </span>
        <img src={imageurl ? imageurl : "https://images.hindustantimes.com/img/2022/06/08/550x309/WhatsApp_Image_2021-09-18_at_09.42.18_1631944439782_1654646582608.jpeg"} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title" >{title}...</h5>
          <p className="card-text">{description}...</p>
          <p className="card-text"><small className="text-muted">By {author} on {new Date(date).toGMTString()}</small></p>
          <a href={newsurl} target="_block" className="btn btn-sm btn-primary">Go more</a>
        </div>
      </div>

    )
  }
}
export default Newsitem