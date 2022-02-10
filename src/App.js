import React, { Component } from 'react';
import "./style.css"

class App extends Component {
  constructor(props){
    super(props);

    this.state={
      newItemFirstName : "",
      newItemLastName : "",
      newItemAge : 0,
      list : []
    }
  }

  updateInput(key, value){
    //update react state
    this.setState({
      [key]: value
    });
  }

  addItem(){
    //create item with unique id
    const newItem={
      id: 1 + Math.random(),
      value: [this.state.newItemFirstName.slice(), this.state.newItemLastName.slice(), this.state.newItemAge.slice()]
    };

    //copy of current list of items

    const list = [...this.state.list];

    //add new item to list
    list.push(newItem);

    //update state with new list and reset newItem input
    this.setState({
      list,
      newItemFirstName:"",
      newItemLastName:"",
      newItemAge:0
    });
  }

  deleteItem(id){
    //copy current list of items
    const list = [...this.state.list];

    //filter out item being deleted
    const updatedList = list.filter(item => item.id !== id)

    this.setState({list: updatedList})
  }

  changeItem(num) {
    // get copy of list
    const list = [...this.state.list];

    const idIndex = list.findIndex(item => item.id === num);

    const newItem = {
      id: num,
      value: [this.state.newItemFirstName.slice(), this.state.newItemLastName.slice(), this.state.newItemAge.slice()]
    };

    list[idIndex] = newItem;

    this.setState({
      list,
      newItemFirstName:"",
      newItemLastName:"",
      newItemAge:0
    })
  }

  AgeAscending( a, b ) {
    return a.value[2] - b.value[2]
  }

  FNameAscending(a, b) {
    if (a.value[0] > b.value[0]) {
      return 1
    } else if (a.value[0] < b.value[0]) {
      return -1
    } else {
      return 0
    }
  }

  LNameAscending(a, b) {
    if (a.value[1] > b.value[1]) {
      return 1
    } else if (a.value[1] < b.value[1]) {
      return -1
    } else {
      return 0
    }
  }

  sortAge() {
    const list = [...this.state.list];
    const ascendingList = list.sort(this.AgeAscending)

    this.setState({list : ascendingList})
  }

  sortFName() {
    const list = [...this.state.list];
    const newList = list.sort(this.FNameAscending)

    this.setState({list : newList})
  }

  sortLName() {
    const list = [...this.state.list];
    const newList = list.sort(this.LNameAscending)

    this.setState({list : newList})
  }

  render() {
    return (
      <div className="App">
        <h1>List of People</h1>
        <div className='boxed'>
          <br />
          <div className='center'>
            <div className='inputs'>
            <input 
          type="text"
          placeholder="First name"
          value={this.state.newItemFirstName}
          onChange={e => this.updateInput("newItemFirstName", e.target.value)}
          />
          <input 
          type="text"
          placeholder="Surname"
          value={this.state.newItemLastName}
          onChange={e => this.updateInput("newItemLastName", e.target.value)}
          />
          <input 
          type="number"
          placeholder="Age"
          min={0}
          value={this.state.newItemAge}
          onChange={e => this.updateInput("newItemAge", e.target.value)}
          />
          <button
          onClick={() => this.addItem()}
          >
            Add
          </button>
            </div>
          
          
          <br />

          <p className='centered'>
            To change a person's information, input the changed information into the fields above and press the 'change' button next to the persons information on the list.
          </p>

          <div className='flex'>
          <button onClick={() => this.sortFName()}>
            Sort by First Name
          </button>

          <button onClick={() => this.sortLName()}>
            Sort by Last Name
          </button>

          <button onClick={() => this.sortAge()}>
            Sort by Age
          </button>
          
          </div>
          
          </div>
          
          </div>
          <br />
          <div className='smallboxed'>
          <table>
            {this.state.list.map(item => (
              <tr key={item.id}>
                <td>
                  {item.value[0]}
                </td>

                <td>
                  {item.value[1]} -
                </td>

                <td>
                  {item.value[2]}            
                </td>

                <td className='right'>
                  <button style={{ margin: 3 }} onClick={() => this.changeItem(item.id, this.state.newItemFirstName, this.state.newItemLastName, this.state.newItemAge)}>Change</button>
                </td>

                <td>
                  <button style={{ margin: 3 }} onClick={() => this.deleteItem(item.id)}>Delete</button>
                </td>

              </tr>
            ))}
          </table>
          </div>
          
        
      </div>
    );
  }
}

export default App;
