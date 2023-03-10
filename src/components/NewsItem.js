import React, { Component } from 'react'

export default class NewsItem extends Component {

    render() {
        let title, description, imageUrl, newsUrl, author, date, source
        ({ title, description, imageUrl, newsUrl, author, date, source } = this.props)

        return (
            < div className='my-3 mx-2' >
                <div className="card" style={{ width: "25rem", padding: "5px" }}>
                    <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{ left: "90%", zIndex: 1 }}>{source}</span>
                    <img src={imageUrl} className="card-img-top" alt="" />
                    <div className="card-body">
                        <h5 className="card-title">{title} </h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">by {author ? author : "Unknown"} on {new Date(date).toUTCString()}</small></p>
                        <a href={newsUrl} target="_blank" className="btn btn-dark btn-sm" rel="noreferrer">Read More</a>
                    </div>
                </div>
            </div >
        )
    }
}
