import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: 'in',
    PageSize: 8,
    category: 'general'
  }
  static propTypes = {
    country: PropTypes.string,
    PageSize: PropTypes.number,
    category: PropTypes.string,
  }
  articles = [
    {
      source: {
        id: "bbc-sport",
        name: "BBC Sport",
      },
      author: null,
      title:
        "Namibia vs England LIVE: ICC T20 World Cup 2024 - cricket score, commentary, video highlights & updates",
      description:
        "England face Namibia in the Men's T20 World Cup in Antigua - follow text updates, in-play video highlights and radio commentary.",
      url: "http://www.bbc.co.uk/sport/cricket/live/cd11ljyzlr2t",
      urlToImage:
        "https://static.files.bbci.co.uk/ws/simorgh-assets/public/sport/images/metadata/poster-1024x576.png",
      publishedAt: "2024-06-15T16:37:14.5757034Z",
      content:
        "Well, well, what a situation.\r\nIf England beat Namibia in Antigua then they know they're in the box set to progress to the Super 8s at the expense of Scotland.\r\nBut they're at the mercy of the weathe… [+225 chars]",
    },

    {
      source: {
        id: "espn-cric-info",
        name: "ESPN Cric Info",
      },
      author: null,
      title:
        "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
      description:
        "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
      url: "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
      urlToImage:
        "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
      publishedAt: "2020-04-27T11:41:47Z",
      content:
        "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]",
    },
    {
      source: {
        id: "espn-cric-info",
        name: "ESPN Cric Info",
      },
      author: null,
      title:
        "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
      description:
        "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
      url: "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
      urlToImage:
        "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
      publishedAt: "2020-03-30T15:26:05Z",
      content:
        "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]",
    },
  ];
  constructor() {
    super();
    console.log("this is news cpmponent");
    this.state = {
      articles: this.articles,
      loading: false,
      page : 1,
      totalResults: 0
    };
  }
  async updateNews(pageNo){
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=dbe57b028aeb41e285a226a94865f7a7&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false
    })
}
  async componentDidMount() {
    this.updateNews();
  }

 handlePrevclick = async ()=>{
  this.setState({ page: this.state.page - 1 });
  this.updateNews();
}

handleNextclick = async ()=>{
  this.setState({ page: this.state.page + 1 });
  this.updateNews();
}

fetchMoreData = async () => {
  this.setState({ page: this.state.page + 1 })
  const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=dbe57b028aeb41e285a226a94865f7a7&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  let data = await fetch(url);
  let parsedData = await data.json()
  this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
  })
};

  render() {
    return (
      <>
  
        <h2 className="text-center" style={{margin : '35px 0px' , marginTop: '90px'}}>monkeynews-Top headlines</h2>
        {/* {this.state.loading && <Spinner/>} */}
       
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<spinner/>}
        >
          <div className="container">
        <div className="row my-3">
          

          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  tittle={element.title ? element.title.slice(0, 18)  : ""}
                  description={element.description ? element.description.slice(0, 88)  : ""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date= {element.publishedAt}
                  source={element.source.name}
                />
              </div>
            );
            
            
          })}
        </div>
        </div>
        </InfiniteScroll>
      
      </>
    );
  }
}

export default News;
