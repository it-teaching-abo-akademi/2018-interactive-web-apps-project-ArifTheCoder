import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
const myAppTitle = 'SPMS';
//const portfolios = '';
const portfolioList = [
  {
    id:1,
    name: 'Portfolio1',
    stockList: [
      {
        name : 'Nokia',
        symbole : 'NOK',
        unitValue : 4.70,
        quantity : 10,
        tottalValue:0
      },
      {
        name : 'Microsoft',
        symbole : 'MSFT',
        unitValue : 80.70,
        quantity : 5,
        tottalValue:0
      }

    ]
  },
  {
    id:2,
    name: 'Portfolio2',
    stockList: [
      {
        name : 'Nokia',
        symbole : 'NOK',
        unitValue : 4.70,
        quantity : 8,
        tottalValue:0
      },
      {
        name : 'Apple',
        symbole : 'APPL',
        unitValue : 120.70,
        quantity : 7,
        tottalValue:0

      }

    ]
  }

];
localStorage.setItem('portfolioList',JSON.stringify(portfolioList));
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      portfolios: [],
      stockList1:[]
    };
  }
  componentWillMount(){
    this.getPortfolios();
    // const portfolios = JSON.parse(localStorage.getItem('portfolioList'));
    // this.setState( {portfolios} );
    // console.log(portfolios);
  }
  getPortfolios(){
    const portfolios = JSON.parse(localStorage.getItem('portfolioList'));
    this.setState( {portfolios} );
    console.log(portfolios);
  }
  render() {
    
    return (
      <div className="App">
      <h1>{myAppTitle}</h1>
        

        <div>
        {
          this.state.portfolios.map((rowdata,i)=>{
            console.log(rowdata.name);
            console.log(rowdata.stockList.length);
            const tempRowStock = rowdata.stockList;
          return(
            <div key={rowdata.id}>
              <span>{rowdata.name}</span>
              {' | '}
              <span>{rowdata.id}</span>
              {' | '}
              <span><button>Delete</button></span>
              <hr></hr>
              {
                
               
                tempRowStock.map((stockRow,key)=>{
                  console.log(stockRow.name);
                  return(
                    <div key={key}>
                      <div>
                      <table>
                        <tbody>
                          <tr key={key}>
                            <td >{stockRow.name}</td>
                            <td >{stockRow.symbole}</td>
                            <td >{stockRow.unitValue}</td>
                            <td >{stockRow.quantity}</td>
                            <td >{stockRow.tottalValue + stockRow.unitValue*stockRow.quantity}</td>
                            <td><button>Delete</button></td>
                         </tr>
                        </tbody>
                      </table>
                      </div>
                    </div>

                    );
                 

                })
              }
            </div>
            );
            if(isNaN(rowdata.stockList)){
              return(<div>not in list</div>);
            }else{
              console.log(rowdata.stockList);
              return(<div>Not Null {rowdata.stockList[0].name}</div>)
            }
            

    
          })
        }
        
        <ApiTester/>
        </div>
       
        
      </div>
    );
  }
}
class ApiTester extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        items: [],
        isLoaded: false,
      }
    }
    componentDidMount(){
    
      fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json()).then(json => {
          this.setState({
            isLoaded : true,
            items:json
          })
        });
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
            {items.map((item,i)=>
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
