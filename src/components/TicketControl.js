import React from 'react';
import HelpQuestionOne from './HelpQuestionOne';
import HelpQuestionTwo from './HelpQuestionTwo';
import HelpQuestionThree from './HelpQuestionThree';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';

class TicketControl extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      helpQuestionOne: false,
      helpQuestionTwo: false,
      helpQuestionThree: false,
      formVisibleOnPage: false,
      mainTicketList: [],
      selectedTicket: null
    };
  }

  handleClick = () => {
    this.setState(prevState => ({
      formVisibleOnPage: !prevState.formVisibleOnPage
    }));
  }

  handleQOneClick = () => {
    this.setState(prevState => ({
      helpQuestionOne: !prevState.helpQuestionOne
    }));
  }

  handleQ2Click = () => {
    this.setState(prevState => ({
      helpQuestionTwo: !prevState.helpQuestionTwo
    }));
  }

  handleQ3Click = () => {
    this.setState(prevState => ({
      helpQuestionThree: !prevState.helpQuestionThree
    }));
  }

  handleAddingNewTicketToList = (newTicket) => {
    const newMainTicketList = this.state.mainTicketList.concat(newTicket);
    this.setState({
      mainTicketList: newMainTicketList, 
      formVisibleOnPage: false,
      helpQuestionOne: false,
      helpQuestionTwo: false,
      helpQuestionThree: false
    });
  }

  handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.state.mainTicketList.filter(ticket => ticket.id === id)[0];
    this.setState({selectedTicket: selectedTicket});
  }

  formReset = () => {
    this.setState({
      formVisibleOnPage: false,
      helpQuestionOne: false,
      helpQuestionTwo: false,
      helpQuestionThree: false
    });
  }

  render(){
    let currentlyVisibleState = null;
    let button= null;
    let buttonText = null;
    let buttonNo = null;
  
  if (this.state.selectedTicket != null) {
    currentlyVisibleState = <TicketDetail ticket = {this.state.selectedTicket} />
    buttonText = "Return to Ticket List";
  } else if (this.state.formVisibleOnPage) {
      if (!this.state.helpQuestionOne) {
        currentlyVisibleState = <HelpQuestionOne />;
        buttonText = "Yes";
        button = <button onClick={this.handleQOneClick}>{buttonText}</button>;
        buttonNo = <button onClick={this.formReset}>No</button>;
      } else if(!this.state.helpQuestionTwo){
        currentlyVisibleState = <HelpQuestionTwo />;
        buttonText = "Yes";
        button = <button onClick={this.handleQ2Click}>{buttonText}</button>;
        buttonNo = <button onClick={this.formReset}>No</button>;
      } else if(!this.state.helpQuestionThree){
        currentlyVisibleState = <HelpQuestionThree />;
        buttonText = "Yes";
        button = <button onClick={this.handleQ3Click}>{buttonText}</button>;
        buttonNo = <button onClick={this.formReset}>No</button>;
      }
      else {
        currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList} />
        buttonText = "Return to Ticket List";
        button = <button onClick={this.formReset}>{buttonText}</button>;
      }
    } else {
      currentlyVisibleState = <TicketList ticketList={this.state.mainTicketList} />;
      buttonText = "Add Ticket";
      button = <button onClick={this.handleClick}>{buttonText}</button>;
    }

    return (
      <React.Fragment>
        {currentlyVisibleState}
        {button}
        {buttonNo}
      </React.Fragment>
    );
  }
}

export default TicketControl;
