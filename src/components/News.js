import React, { Component } from 'react'
import NewsItem from './NewsItem'
import SampleOutput from './../SampleOutput.json'
import Spinner from '../Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


export default class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string

    }
    constructor(props) {
        super(props);
        this.state = {
            status: SampleOutput.status,
            articles: [],
            total: SampleOutput.articles.length,
            loading: true,
            page: 1
        }
        document.title = `${this.capitalize(this.props.category)} - NewsMonkey`
    }
    capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)

    }

    handleNextClick = async () => {


        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
        // this.setState({ loading: true })

        // let data = await fetch(url);
        // let parsedData = await data.json()
        // this.setState({ articles: SampleOutput.articles, page: this.state.page + 1, total: SampleOutput.totalResults, loading: false })
        this.setState({ articles: SampleOutput.articles.slice((this.state.page) * this.props.pageSize, this.props.pageSize * (this.state.page + 1)), page: this.state.page + 1, total: SampleOutput.totalResults, loading: false })



    }
    handlePreviousClick = async () => {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
        // this.setState({ loading: true })
        // let data = await fetch(url);
        // let parsedData = await data.json()
        // this.setState({
        //     articles: SampleOutput.articles,
        //     page: this.state.page - 1,
        //     total: SampleOutput.totalResults,
        //     loading: false
        // })
        this.setState({ articles: SampleOutput.articles.slice((this.state.page - 2) * this.props.pageSize, (this.state.page - 1) * this.props.pageSize), page: this.state.page - 1, total: SampleOutput.totalResults, loading: false })



    }

    async componentDidMount() {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`
        // this.setState({ loading: true })

        // try {
        //     let data = await fetch(url);

        //     let parsedData = await data.json()
        //     this.setState({ articles: parsedData.articles, page: 1, total: parsedData.totalResults, loading: false })

        // }
        // catch {
        //     this.setState({ articles: [], page: 1, total: 0, loading: true })


        // }
        // finally {
        //     this.setState({ articles: [], page: 1, total: 0, loading: false })

        // }
        this.props.setProgress(10)
        this.setState({ loading: true })
        await this.delay(1000)
        this.props.setProgress(40)
        await this.delay(1000)

        this.setState({ articles: SampleOutput.articles.slice(0, this.props.pageSize), page: 1, total: SampleOutput.totalResults, loading: false })
        this.props.setProgress(100)

    }
    delay = ms => new Promise(res => setTimeout(res, ms));
    fetchMoreData = async () => {
        let articleLength = this.state.articles.length
        await this.delay(2000)


        this.setState({
            articles: SampleOutput.articles.slice(0, articleLength + this.props.pageSize)
            , loading: false

        })


    }

    render() {
        const substituteUrl = "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
        return (
            <div className='container my-15'>
                <h1 style={{ textAlign: "center", margin: "30px 0px" }}>NewsMonkey - Top Headlines from {this.capitalize(this.props.category)}</h1>
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length < SampleOutput.articles.length}
                    loader={<Spinner />}

                >
                    {/* {this.state.loading && <Spinner />} */}
                    <div className='container d-flex justify-content-around' style={{ flexWrap: 'wrap' }}>

                        {
                            this.state.articles.map(article => {
                                return <NewsItem key={article.url} title={article.title} description={article.description} imageUrl={article.urlToImage ? article.urlToImage : substituteUrl}
                                    newsUrl={article.url} author={article.author} date={article.publishedAt}
                                    source={article.source.name} />
                            })
                        }
                    </div>
                </InfiniteScroll>
            </div>
        )
    }
}
