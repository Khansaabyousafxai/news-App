import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'

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
      page : 1
    };
  }
  async componentDidMount() {
    let url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3dbf1f4b17e04f66b7733e31e5774167&page=1&pagesize=${this.props.PageSize}`;
      this.setState({loading : true});
      let data = await fetch(url);
    let parsedata = await data.json();
    this.setState({ articles: parsedata.articles,
       totalResults:parsedata.totalResults,
       loading : false
       });
  }

 handlePrevclick = async ()=>{
console.log("hi")
let url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3dbf1f4b17e04f66b7733e31e5774167&page=${this.state.page-1}&pagesize=${this.props.PageSize}`;
      this.setState({loading : true});
      let data = await fetch(url);
    let parsedata = await data.json();
    this.setState({
        page : this.state.page-1,
       articles: parsedata.articles,
       loading : false
       });
}

handleNextclick = async ()=>{
console.log("hellonext")
if(!(this.state.page + 1> Math.ceil(this.state.totalResults/this.props.PageSize)))
  {
    {
      let url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3dbf1f4b17e04f66b7733e31e5774167&page=${this.state.page+1}&pagesize=${this.props.PageSize}`;
      this.setState({loading : true}); 
      let data = await fetch(url);
       let parsedata = await data.json();
       this.setState({
        page : this.state.page + 1,
       articles: parsedata.articles,
       loading : false
       });
    }
    
  }


}


  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center" style={{margin : '35px 0px'}}>monkeynews-Top headlines</h2>
        {this.state.loading && <Spinner/>}
        <div className="row my-3">
          {!this.state.loading && this.state.articles.map((element) => {
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
        <div className="d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevclick}>
          &larr; Previous
          </button>
          <button disabled={(this.state.page + 1> Math.ceil(this.state.totalResults/this.props.PageSize))} type="button" className="btn btn-dark" onClick={this.handleNextclick}>
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
