import React from "react";
import ReactDOM from "react-dom";

class ToDoItem extends React.Component {
  render() {
    return <li>{this.props.todo}</li>;
  }
}

class ToDoListEmpty extends React.Component {
  render() {
    return (
      <div>
        <p>
          <strong>Oh Nos!</strong> You don't have any ToDos. Add some.
        </p>
      </div>
    );
  }
}

class TodoList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.todos.map(todo => {
          return <ToDoItem todo={todo} />;
        })}
      </ul>
    );
  }
}

class ToDoHome extends React.Component {
  render() {
    let message;
    if (0 === this.props.todos.length) {
      message = <ToDoListEmpty />;
    } else {
      message = <TodoList todos={this.props.todos} />;
    }

    return <div>{message}</div>;
  }
}

class ToDoAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleSubmit(this.state.value);
    this.setState({
      value: ""
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="add">Add a todo:</label>{" "}
        <input
          type="text"
          name="add"
          id="add"
          value={this.state.value}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}

class ToDoThis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };

    this.handleNewTodo = this.handleNewTodo.bind(this);
  }

  handleNewTodo(newTodo) {
    let todos = [...this.state.todos];
    todos.push(newTodo);
    this.setState({ todos: todos });
  }

  render() {
    return (
      <div className="todothis">
        <h1>ToDoThis</h1>
        <ToDoAdd handleSubmit={this.handleNewTodo} />
        <ToDoHome todos={this.state.todos} />
      </div>
    );
  }
}

ReactDOM.render(<ToDoThis />, document.getElementById("root"));
