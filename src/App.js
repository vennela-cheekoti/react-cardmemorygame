import React, { Component } from 'react'
import './App.css'

export default class App extends Component {

    state={
        prevselectedCard: null,
        prevselectedCardindex: null,
        flipCardIndex: null,
        shuffledCards: this.duplicateCard().sort(()=> Math.random()-0.5),
        count: 0,
        winCount: 0
    }
     duplicateCard(){
        const cardName=[1,2,3,4,5,6] //wanna add cards?? change this array
        return cardName.concat(cardName)
    }
    handleClick(data,index){
        if(this.state.count===0){
            this.setState({
                prevselectedCard: data,
                prevselectedCardindex:index,
                flipCardIndex: index,
                count: this.state.count+1
            });
        } 
        if(this.state.count===1){
            this.setState({
                count: 0,
                flipCardIndex: index
            })
            const newcard=data;
            const newcardindex=index;
            this.checkCards(this.state.prevselectedCard, newcard, this.state.prevselectedCardindex, newcardindex)
            console.log("new card is",newcard, this.state.prevselectedCard);
        }
    }
    checkCards=(ocard, ncard, ocardi, ncardi)=>{
        if(ocard===ncard){
            const removecards= this.state.shuffledCards.slice();
            removecards[ocardi]= "MATCH!!";
            removecards[ncardi]= "MATCH!!";
            this.setState({
                shuffledCards: removecards,
                winCount: this.state.winCount+1
            })
        }
    }
    render() {
        console.log(this.state.shuffledCards)
        return (
            <div>
                <p className="pStyling">win count: {this.state.winCount}</p>
                <div className="contentStyling">
                <div className="row mt-3">
                {this.state.shuffledCards.map((d,i)=>{
                    return(
                        <div className="col-sm-12 col-md-6 col-lg-3">
                            <div className="card boxDesign">
                            {this.state.flipCardIndex===i || d==="MATCH!!" ? <div className="flipCard"><div className="dataStyling">{d}</div></div>:
                                 <img src="/assets/card.jpg" height="180px" onClick={this.handleClick.bind(this,d,i)} key={i} alt=""/>}
                            </div>
                        </div>
                    )
                })}
                </div>
                </div>
            </div>
        )
    }
}
