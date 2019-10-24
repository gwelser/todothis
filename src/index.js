import React from "react";
import ReactDOM from "react-dom";

import {
  AppBar,
  Container,
  CssBaseline,
  FormControl,
  Input,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography
} from "@material-ui/core";

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
      <List>
        {this.props.todos.map((todo, index) => {
          return (
            <ListItem key={index} disableGutters>
              <ListItemText primary={todo} />
            </ListItem>
          );
        })}
      </List>
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
        <FormControl fullWidth>
          <InputLabel htmlFor="add">Add a todo</InputLabel>
          <Input
            id="add"
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </FormControl>
      </form>
    );
  }
}

class ToDoThis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        "A single todo item",
        "A second todo item",
        "This needs to be done",
        "Think about this here",
        "When will you do this thing?",
        "Here is another thing"
      ]
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
      <div>
        <CssBaseline />
        <AppBar color="primary" position="static">
          <Toolbar>
            <Typography variant="h6">ToDoThis</Typography>
          </Toolbar>
        </AppBar>

        <Container
          maxWidth="sm"
          style={{ backgroundColor: "white", marginTop: "1em", padding: "1em" }}
        >
          <ToDoAdd handleSubmit={this.handleNewTodo} />
          <ToDoHome todos={this.state.todos} />
        </Container>
      </div>
    );
  }
}

ReactDOM.render(<ToDoThis />, document.getElementById("root"));
