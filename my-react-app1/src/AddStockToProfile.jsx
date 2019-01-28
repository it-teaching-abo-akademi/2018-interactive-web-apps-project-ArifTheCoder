import React, { Component } from 'react';
import './App.css';
var pricekey = "5. adjusted close";
const countr = 0;
class AddStockToProfile extends React.Component{
  constructor(props){
    super(props);
    this.onSubmitStocks = this.onSubmitStocks.bind(this);
    this.getArray = this.getArray.bind(this);
    this.getUnitPriceForStock = this.getUnitPriceForStock.bind(this);
    
    this.state = {
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
      adjustedPrice : 0,
      keyId : 1000
     
    }
  }
  getArray(dataObj){
    let count = 0;
    console.log('countr ' +count++);
    if(null != dataObj){
      const keys = Object.keys(dataObj);
      
      const tempArrDate = keys.map(key => dataObj[key]);
      console.log('--------------inside getArray '+tempArrDate);
      if(tempArrDate[1]==='MSFT'){
        console.log('MSFT------true'+tempArrDate[1]);
      }else{
        const keyPrice = "5. adjusted close";
        console.log('MSFT------else'+tempArrDate[1][keyPrice]);
        if(null != tempArrDate[1][keyPrice]){
           this.setState({adjustedPrice : tempArrDate[1][keyPrice]});
           return tempArrDate[1][keyPrice];
        }
      }
      //return tempArrDate;
    }else{
      return null;
    }
    //return [];

  }
  getUnitPriceForStock(dataObj){
    return this.state.adjustedPrice;
  }
 
  onSubmitStocks(event){
    event.preventDefault();
    console.log('Add Stock Component '+this.stockNameInput.value);
    //alert('Invalid Symbole');
    const key = this.state.keyId-1;
    this.setState({keyId : key});
    this.props.addStockToPortfolio(this.stockNameInput.value,this.symboleInput.value,this.stockVolumeInput.value,this.state.keyId);
    this.stockNameInput.value='';
    this.symboleInput.value='';
    this.stockVolumeInput.value='';
  }
  render(){
    return(
      <form className="form-inline" onSubmit={this.onSubmitStocks}>
        <label>Add Stock : </label>
        <input className="form-control" placeholder="Stock Name" type="Text" required ref={stockNameInput => this.stockNameInput = stockNameInput }/>
        <input className="form-control" placeholder="Stock Symbol" type="Text" required ref={symboleInput => this.symboleInput = symboleInput }/>
        
        <input className="form-control" placeholder="Volume" type="Number" required ref={stockVolumeInput => this.stockVolumeInput = stockVolumeInput }/>
        
    

        <button className="btn btn-outline-primary float-right">Submit</button>
       </form>

      );
    
  }
}
export default AddStockToProfile;