import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalizeFirstletter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalizeFirstletter(
      this.props.category
    )}-NewsMonkey`;
  }

  async componentDidMount() {
    this.fetchNews(1);
  }

  fetchMoreData = async () => {
    this.props.setProgress(10); // Start the progress bar
    const nextPage = this.state.page + 1;
    this.setState({ page: nextPage });

    try {
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${nextPage}&pageSize=${this.props.pageSize}`;
      this.props.setProgress(30); // Indicate request is being made

      const response = await fetch(url);
      this.props.setProgress(50); // Request made, waiting for response

      const parsedData = await response.json();
      this.props.setProgress(70); // Parsing data

      this.setState({
        articles: this.state.articles.concat(parsedData.articles || []),
        totalResults: parsedData.totalResults,
        loading: false,
      });

      this.props.setProgress(100); // Finished
    } catch (error) {
      console.error("Failed to fetch news:", error);
      this.props.setProgress(100); // Still finish the progress even on error
    }
  };

  fetchNews = async () => {
    try {
      this.props.setProgress(10); // Start the progress bar
      this.setState({ loading: true });

      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5a29fd8e8e38412bbded29eae26625cb&page=${this.state.page}&pageSize=${this.props.pageSize}`;

      const response = await fetch(url);

      const parsedData = await response.json();

      this.setState({
        articles: parsedData.articles || [],
        totalResults: parsedData.totalResults,
        loading: false,
      });

      this.props.setProgress(100); // Finished
    } catch (error) {
      console.error("Failed to fetch news:", error);
      this.props.setProgress(100); // Still finish the progress even on error
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <>
        <h1 className="text-center" style={{ margin: "35px 0px" }}>
          NewsMoney - Top {this.capitalizeFirstletter(this.props.category)}{" "}
          Headlines
        </h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title || ""}
                    description={element.description || ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              ))}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;
