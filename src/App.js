import React, { Component } from 'react';
import './App.css';
import fire from './config/fire';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { messages: [], inputValue: '' };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount() {
    let messagesRef = fire.database()
      .ref('messages')
      .orderByKey()
      .limitToLast(100);

    messagesRef.on('child_added', snapshot => {
      let message = { text: snapshot.val(), id: snapshot.key };
      this.setState({
        messages: [message].concat(this.state.messages)
      });
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    fire.database().ref('messages').push(this.state.inputValue);
    this.setState({ inputValue: '' });
  }
  handleInputChange(e) {
    this.setState({ inputValue: e.target.value });
  }
  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.inputValue}
            onChange={this.handleInputChange}
          />
          <input type="submit" />
          <ul>
            {this.state.messages.map(message =>
              <li key={message.id}>
                {message.text}
              </li>
            )}
          </ul>
        </form>
      </div>
    );
  }
}

export default App;
