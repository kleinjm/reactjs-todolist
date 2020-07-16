import React, { Component } from 'react';
import TodoItems from "./TodoItems";
import "./TodoList.css"; // css can simply be imported

class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    };

    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  addItem(e) {
    if (this._inputElement.value === "") return;

    let newItem = {
      text: this._inputElement.value,
      key: Date.now() // acts as a unique identifier
    };

    this.setState((prevState) => {
      return { // must return new state
        items: prevState.items.concat(newItem) // avoid mutation directly on the state
      }
    });

    this._inputElement.value = "";

    e.preventDefault();
  }

  deleteItem(key) {
    var filteredItems = this.state.items.filter(function (item) {
      return (item.key !== key)
    });

    this.setState({
      items: filteredItems
    });
  }

  render() {
    return (
      <div className="todoListMain">
        <div className="header">
          <form onSubmit={this.addItem}>
            <input ref={(a) => this._inputElement = a}
              placeholder="enter task"
            ></input>
            <button type="submit">add</button>
          </form>
        </div>
        <TodoItems entries={this.state.items} 
                   delete={this.deleteItem} />
      </div>
    )
  }
}

export default TodoList;