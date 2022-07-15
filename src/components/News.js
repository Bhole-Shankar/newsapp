
import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

    static defaultProps = {
        category: 'general',
        country: 'in',
    }
    static propTypes = {
        category: PropTypes.string,
        country: PropTypes.string,
    }
    constructor(props) {
        super(props);
        console.log("constructor");
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
    }

    async updateNews() {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=129ef09201a14958b68fc1d09adaad71&page=${this.state.page}&pageSize=12`;
        
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false, 
        })

    }
    async componentDidMount() {
        this.updateNews();
    }

    handlePrevClick = async () => {
        this.setState({ page: this.state.page - 1 });
        this.updateNews();
    }

    handleNextClick = async () => {
        this.setState({ page: this.state.page + 1 });
        this.updateNews()
    }

    fetchMoreData = async () => {  
        this.setState({page: this.state.page + 1})
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d093053d72bc40248998159804e0e67d&page=${this.state.page}&pageSize=12`;
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults
        })
      };




    render() {
        console.log("render");
        return (
            <div>
                <div className="container my-3" style={{ margintop: "100px" }}>
                    <h3>News Headlines</h3>
                    {/* <div className="d-flex justify-content-center"> { this.state.loading && <Spinner/>}</div> */}
                    <InfiniteScroll 
                    key="bhole"
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length !== this.state.totalResults}
                        loader={<Spinner/>}
                    >
                        <div className="container">
                        <div className="row">
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4 my-2" key={element.urlToImage}>
                                    <Newsitem  title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 85) : ""} imageurl={element.urlToImage} newsurl={element.url} author={element.author ? element.author : "unknown author"} date={element.publishedAt} source={element.source.name} /></div>
                            })}
</div>
                        </div>
                    </InfiniteScroll>

                </div>
               
            </div>


        )
    }
}

export default News
