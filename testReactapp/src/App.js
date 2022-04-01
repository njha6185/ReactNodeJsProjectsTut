import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from './components/navbar';
import Counters from './components/counters';
import React from 'react';


class App extends React.Component {

  state = {
    counters: [
        { id: 1, value: 0 },
        { id: 2, value: 0 },
        { id: 3, value: 0 },
        { id: 4, value: 0 },
        { id: 5, value: 0 },
    ]
};

handleReset=()=>{
    const counters=this.state.counters.map(
        c=>{
            c.value=0;
            return c;
        }
    );
    this.setState({counters});
}

handleIncrement=counter=>{
    const counters=[...this.state.counters];
    const index=counters.indexOf(counter);
    counters[index]={...counter};
    counters[index].value++;
    this.setState({counters});
}

handleDelete = counterId => {
    console.log("Event Handler Delete", counterId);
    const counters = this.state.counters.filter(
        c => c.id !== counterId
    );
    this.setState({ counters });
}

handleDecrement= counter=>{
  const counters = [...this.state.counters];
  const index = counters.indexOf(counter);
  counters[index]={...counter};
  counters[index].value--;
  this.setState({counters});
}

  render() { 
    return (
      <React.Fragment>
        <NavBar totalNoOfCounter={this.state.counters.filter(c=>c.value>0).length}/>
        <main className="container">
          <Counters 
          counters={this.state.counters}
          onReset={this.handleReset}
          onIncrement={this.handleIncrement}
          onDelete={this.handleDelete}
          onDecrement={this.handleDecrement}
          />
        </main>
      </React.Fragment>
    );
  }
}
 
export default App;