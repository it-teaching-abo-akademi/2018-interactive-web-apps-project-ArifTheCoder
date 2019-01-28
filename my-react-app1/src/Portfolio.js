import React, { Component } from 'react';
import './App.css';
import AddStockToProfile from './AddStockToProfile';
import LineChart from './Line';

class Portfolio extends Component {
  constructor(props){
    super(props);
    this.state={addStockFlag: false,
      stocksListPrime : [],
        symbolData: [],
      isLoaded: false,

      parentKeys:[],
      metaInfoList:[],
      childKeys:[],
      stockPriceDataState:[],
      metaInfo : {},
      meatInfoArry : [],
      consolidatePriceData:[],
      responseList:[],
      stockPriceDataState:{},
      eachDayDateList:[],
      adjustedPrice : 0

    };
    this.onDeleteBtn = this.onDeleteBtn.bind(this);
    this.onAddStockBtn = this.onAddStockBtn.bind(this);
    
    this.addStockToPortfolio =this.addStockToPortfolio.bind(this); 
    this.getAllStocks =this.getAllStocks.bind(this); 
    this.getTotalValue = this.getTotalValue.bind(this);
    this.getArray = this.getArray.bind(this);
    this.convertPrice = this.convertPrice.bind(this);


  }
  onAddStockBtn(){
    console.log('add stock '+this.props.id);
    const{onAddStock,id} = this.props;
    this.setState({addStockFlag:true});
    //onAddStock(id,true);
  }
  //Destruction
  onDeleteBtn(){
    const {onDelete , name} = this.props;
    onDelete(name);
  }


  addStockToPortfolio(name,symbole,volume,stockid){
    console.log('in Portfolio Jsx '+name+' '+symbole +'########'+stockid);
    const{addStockToThePortfolio}=this.props;

    if(null != symbole && stockid>0 ){
      const stockSymbol = symbole;
       console.log('--------#########------loading ');
      const myDataSet = fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol='+stockSymbol+'&outputsize=compact&apikey=AA2QL6SYG2OC5P7T')
      .then(res => res.json())
      .then(json => {
            this.setState({
              isLoaded : true,
              symbolData:json,
              meatInfoArry : this.getArray(Object.keys(json).map(key => json[key])[0],stockSymbol),
              //stockPriceDataState : Object.keys(json).map(key => json[key])[1],
             // eachDayAsKey : Object.keys(Object.keys(json).map(key => json[key])[1]),
              eachDayDateList : this.getArray(Object.keys(json).map(key => json[key])[1],stockSymbol),
            })
          });
       console.log('--------------myDataSet######### '+ myDataSet);
      const unitPrice = this.state.adjustedPrice;
      console.log('--------unitPrice---##########----------' + this.state.adjustedPrice);


    }
  addStockToThePortfolio(this.props.id,name,symbole,this.unitPrice,volume,stockid);
  }
  getAllStocks(){
    const{allStocksList}=this.props;
    console.log('Testing '+allStocksList.length);
  }
  getTotalValue(stockList,portfolioId,stocUnictPrice){
   
    let sum = 0;
    console.log('this.props.stocksList.length +'+stockList);

    if(null != stockList && stockList.length>0 ){
      const sotks = stockList;
      stockList.map((eachStock,key) =>{
        console.log('eachStock.unitValue inside loop');
        if(eachStock.associatedPortfolio === portfolioId && eachStock.stockDeleteSw === 'N'){
          //console.log('eachStock.unitValue '+eachStock.unitValue+' eachStock.tottalValue '+eachStock.quantity);
           sum += stocUnictPrice*eachStock.quantity;
        }
      });

      return <div className="p-3 mb-2 bg-info text-white">Total Stock Value :{sum}</div>;
    }
    return <div className="p-3 mb-2 bg-warning text-dark">Total Stock Value :{sum}</div>;
  }

  getArray(dataObj,symbole){
    let count = 0;
    console.log('countr################# '+symbole +'---------'+dataObj);
    if(null != dataObj){
      const keys = Object.keys(dataObj);
      
      const tempArrDate = keys.map(key => dataObj[key]);
      console.log('--------------inside getArray '+tempArrDate);
      if(tempArrDate[1]===this.symbole){
        console.log('symbole------true'+tempArrDate[1]);
      }else{
        const keyPrice = "5. adjusted close";
        console.log('symbole------else'+tempArrDate[1][keyPrice]);
        if(null != tempArrDate[1][keyPrice]){
           this.setState({adjustedPrice : tempArrDate[1][keyPrice]});
           return tempArrDate[1][keyPrice];
        }
       
      }
     // return tempArrDate;
    }else{
      return null;
    }
  }
  convertPrice(stockList,id,stocUnictPrice){
    return (
      <div className="form-check">
        <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" />
        <label className="form-check-label">
          Exchage To Euro
        </label>
      </div>
    );
  }

  

  render() {
    const {id,name,stockList,onDelete,onAddStock,addStockToThePortfolio,allStocksList} = this.props;
    const myList  = this.getAllStocks();
    let stockForm;
    let totalPrice;
    let stocUnictPrice;
    let graphView;
    let pricConversion;
    //console.log('New Approcah filteredStocks '+filteredStocks.length);
    if(this.state.addStockFlag && this.props.id>0){
      stockForm = <AddStockToProfile
                addStockToPortfolio ={this.addStockToPortfolio}
                id = {this.id}
                name = {this.name}/>;
      graphView = <LineChart/>;
                  
      if(null != this.props.stockList && this.props.stockList.length>0){
        stocUnictPrice =this.state.adjustedPrice;
      }
      pricConversion = this.convertPrice(this.props.stockList,this.props.id,stocUnictPrice);
      console.log('stocUnictPrice--------------'+stocUnictPrice);

      totalPrice = this.getTotalValue(this.props.stockList,this.props.id,stocUnictPrice); 
      
      console.log('total price'+totalPrice);


    }else{
      //stockForm='Click on Add Stock';
      totalPrice = <p >Portfolio has no Stock!</p>;
    }
    return (
       <div className="row">
         <div className="col col-12 border border-success">
               <div className="col"> 
               <span>{name}</span>
                  {' | '}
                 
                  <span><button className="btn btn-outline-danger" onClick = {this.onDeleteBtn}>Delete</button></span>
                  <span><button className="btn btn-outline-primary" onClick = {this.onAddStockBtn}>Add Stock</button></span>
                  
                </div>
                <div className="clearfix"></div>
                
                <div className="col col-12">{stockForm}</div>

               
                
               <table className="table table-bordered">
               <thead>

               <tr>
                <th>Name</th>
                <th>Symbole</th>
                <th>Unit Price</th>
                <th>Volume</th>
                <th>Total Value</th>
                <th>Action</th>

               </tr>

               </thead>
                  <tbody>
                {
                  
                   stockList.map((stockRow,key) =>{
                   //allStocksList.map((stockRow,key) =>{
                    console.log('StockId'+stockRow.portfolioId);
                    console.log('Port ID'+id);
                    
                    if(stockRow.associatedPortfolio===id && stockRow.stockDeleteSw === 'N'){
                      return(

                          <tr key={key}>
                            <td >{stockRow.name}</td>
                            <td >{stockRow.symbole}</td>
                            <td >{stocUnictPrice}</td>
                            <td >{stockRow.quantity}</td>
                            <td >{stockRow.tottalValue + stocUnictPrice*stockRow.quantity}</td>

                            <td><button className="btn btn-outline-danger btn-sm" >Delete</button><button className="btn btn-outline-info btn-sm" >Per Graph</button></td>

                         </tr>

                        );
                    }
           
                  })
   
                }
                </tbody>
              </table>
              <div className='col col-3'>
                {totalPrice}
              </div>
              <div className='col col-3'>
                {pricConversion}
              </div>
              <div className="col">
                  {graphView}
              </div>
          </div>
        </div>
    );
  }
}
// class TotalStockValue extends React.Component {
  
//   render() {
//     const sum = 0;
//     console.log('this.props.stocksList.length +'+this.props.stockList);
//      console.log('this.props.ID +'+this.props.id);
//     if(null != this.props.stockList && this.props.stockList.length>0 ){
//       const sotks = this.props.stockList;
//       this.sotcks.map((eachStock,key) =>{
//         console.log('eachStock.unitValue inside loop');
//         if(eachStock.associatedPortfolio === this.props.portfolioId && eachStock.stockDeleteSw === 'N'){
//           console.log('eachStock.unitValue '+eachStock.unitValue+' eachStock.tottalValue '+eachStock.tottalValue);
//            sum +=(eachStock.unitValue*eachStock.tottalValue);
//         }
//       });
//       return <span>Total Stock Value :  {sum}</span>;
//     }
//     return <span>Total Stock Value :  {sum}</span>;
//   }
// }

export default Portfolio;


