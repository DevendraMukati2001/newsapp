import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } =
      this.props; // destructuring
    return (
      <div>
        <div className="my-3">
          <div className="card">
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                position: "absolute",
                right: 0,
              }}
            >
              <span class="badge rounded pill bg-danger">{source}</span>
            </div>
            <img
              src={
                imageUrl && imageUrl !== "null"
                  ? imageUrl
                  : "https://fox8.com/wp-content/uploads/sites/12/2025/01/GettyImages-2185019030-e1737486563632.jpg?w=1280"
              }
              className="card-img-top"
              alt="news"
            />
            <div className="card-body">
              <h5 className="card-title">
                {title}
                {/* <span class="position-absolute top-0 start-85 translate-middle badge rounded-pill size=50px bg-primary">
                  {source}
                </span> */}
              </h5>
              <p className="card-text">{description}...</p>
              <p className="card-text">
                <small className="text-muted">
                  By {!author ? "unknown" : author} on{" "}
                  {new Date(date).toGMTString()}
                </small>
              </p>
              <a
                rel="noreferrer"
                href={newsUrl}
                target="_blank"
                className="btn btn-sm btn-dark"
              >
                Read More
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
