import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AddPortfolio from './AddPortfolio';
import Portfolio from './Portfolio';
import AddStockToProfile from './AddStockToProfile';


const myAppTitle = 'SPMS';
//const portfolios = '';
const portfolioList = [];
const defaultStockObj = 
      [{
        name : 'name',
        symbole : 'symbole',
        unitValue : 10,
        quantity : 1,
        tottalValue:0,
        associatedPortfolio:200,
        stockDeleteSw:'Y'

      }];
localStorage.setItem('portfolioList',JSON.stringify(portfolioList));
localStorage.setItem('allStocks',JSON.stringify(defaultStockObj));

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      portfolios: JSON.parse(localStorage.getItem('portfolioList')),
      stockList1:[],
      stocksList:JSON.parse(localStorage.getItem('allStocks')),
      addStock : false
    };
    this.onDelete = this.onDelete.bind(this);
    this.onAddPortfolio = this.onAddPortfolio.bind(this);
    this.onAddStock = this.onAddStock.bind(this);
    this.addStockToThePortfolio = this.addStockToThePortfolio.bind(this);
  }
  componentWillMount(){
    const portfoliosTemp = this.getPortfolios();
    this.setState( {portfolios: portfoliosTemp} );
  }
  //Returns the list of portfolio
  getPortfolios(){
    return this.state.portfolios;
  }
  getPortfolio(portfolioId){

    const portfolioTempList = this.getPortfolios();
    const filteredPortfolioList = portfolioTempList.filter(portfolio => {
      return portfolio.id === portfolioId;
    });
    console.log('Portfolio ID in App '+filteredPortfolioList[0]);
    return filteredPortfolioList[0];
  }
  //The function will delete the portfolio and will be called from portfolio
  onDelete(name){
    console.log('isDeleting '+name);
    //to delete, getting list of portfolio and then filter the list 
    //and return all the portfolio except the on passed for deletion. 
    const portfolioTempList = this.getPortfolios();
    const filteredPortfolioList = portfolioTempList.filter(portfolio => {
      return portfolio.name !== name;
    });
    this.setState({portfolios:filteredPortfolioList});
  }
  //tsst this
  testFunc =() =>{
    this.setState({tempVal : true});
  }
  onAddPortfolio(name,id,stocks){
    console.log('ADD '+name);
    let stockList = [];
    let deleteFlag ='N';
    if(isNaN(stocks)){
      console.log('InANA '+stocks);
     
    }
    const currentPortfolioes = this.getPortfolios();
    //console.log('data from sate '+currentPortfolioes);
    //console.log('data from state portfolios '+this.state.portfolios[1].stockList[0]);
    currentPortfolioes.push({
      name,
      id,
      deleteFlag,
      stockList,

    });
    this.setState({portfolios:currentPortfolioes});
    localStorage.setItem('portfolioList',JSON.stringify(this.state.portfolios));
   // console.log('data from state portfolios afetr add '+this.state.portfolios[2].stockList[0]);

  }
  addStockToThePortfolio(portoflioId,name,symbole,nunitPrice,volume,stockid){
    //console.log(portoflioId+ 'in App Jsx '+name+' '+stockid);
    const portfolioObj = this.getPortfolio(portoflioId);
    console.log('single portfolio nunitPrice------------------------ '+nunitPrice);
    const stoksForThePortFolio = portfolioObj.stockList;
    console.log('stokks for the portfolio '+stoksForThePortFolio.length);
    let stockDeleteSw = 'N';
    const newStockObj = 
      {
        name : name,
        symbole : symbole,
        unitValue : nunitPrice,
        quantity : volume,
        tottalValue:0,
        associatedPortfolio:portoflioId,
        stockDeleteSw:stockDeleteSw

      };
    const allStocks= JSON.parse(localStorage.getItem('allStocks'));
    
    console.log('stokks for the allStocks from local storgae'+allStocks.length);
    allStocks.push(
        newStockObj

      );
    console.log('stokks for the updatedStocksList after add '+allStocks.length);
    this.setState({stocksList : allStocks});
    localStorage.setItem('allStocks',JSON.stringify(this.state.stocksList));
    stoksForThePortFolio.push(newStockObj);

    console.log('stokks for the portfolio after add'+stoksForThePortFolio.length);
    console.log('stokks for the stocksList after add'+this.state.stocksList.length);

  }
  updatePortfolio(){

  }
  onAddStock(id,flag){
    console.log('Add Stock in App'+id+' '+flag);
    this.setState({addStock:flag});

  }
  render() {
    const allStocksList = this.state.stocksList;
    return (
      <div className="App">
      <h1>{myAppTitle}</h1>
      
        

        <div className="container">
        <AddPortfolio
          onAddPortfolio ={this.onAddPortfolio}


        />

        
     
        {
           
          this.state.portfolios.map((portfolioObj,i) => {
            console.log(portfolioObj.name);
            console.log('in retunr '+allStocksList.length);
           // console.log(portfolioObj.stockList.length);
           // const tempRowStock = portfolioObj.stockList;
          return(

              <Portfolio
                key = {portfolioObj.name}
                {...portfolioObj}
                onDelete = {this.onDelete}
                onAddStock = {this.onAddStock}
                addStockToThePortfolio = {this.addStockToThePortfolio}
                allStocksList = {allStocksList}


              />
            );
            // if(isNaN(portfolioObj.stockList)){
            //   return(<div>not in list</div>);
            // }else{
            //   console.log(portfolioObj.stockList);
            //   return(<div>Not Null {portfolioObj.stockList[0].name}</div>)
            // }
          })
        }
        
      
        </div>
       
        
      </div>
    );
  }
}
class AddStockToProfileStateLess extends React.Component{
  constructor(props){
    super(props);
  }
  onSubmit(event){
    event.preventDefault();
    console.log('Add Stock Component '+this.stockNameInput.value);
  }
  render(){
    return(
      <form onSubmit={this.onSubmit}>
        <label>Add Stock : </label>
        <input placeholder="Stock Name" ref={stockNameInput => this.stockNameInput = stockNameInput }/>
        <input placeholder="Stock Symbol" ref={symboleInput => this.symboleInput = symboleInput }/>
        <input placeholder="Unit Price" ref={unitPriceInput => this.unitPriceInput = unitPriceInput }/>
        <input placeholder="Volume" ref={stockVolumeInput => this.stockVolumeInput = stockVolumeInput }/>
        <input placeholder="ID" ref={stockIdInput => this.stockIdInput = stockIdInput} />

        <button>Add Stock</button>
       </form>

      );
    
  }
}
class ApiTester extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        items: [],
        isLoaded: false,
        stockHistoryValuation:[],
        isStokcHistoryLoaded:false
      }
    }
    componentDidMount(){
    
      fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json()).then(json => {
          this.setState({
            isLoaded : true,
            items:json
          })
        });
      // fetch(('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=MSFT&outputsize=compact&apikey=AA2QL6SYG2OC5P7T')
      //   .then(res=>res.json()).then(json=>{
      //     this.setState({
      //       isStokcHistoryLoaded:true,
      //       isStokcHistoryLoaded:json

      //     })
      //   }));
    }
    render(){
      var {isLoaded,items} = this.state;
      if(!isLoaded){
        return (<div>Loading......</div>);
      }else{
        return (
        <div>
          <p>Loaded from API</p>
          <ul>
            {items.map((item,i) =>
              <li key = {item.id}>
                Name: {item.name} | email: {item.email}
              </li>
            )}
          </ul>
        
        </div>
        );
      }
      
    }
  } 

export default App;
