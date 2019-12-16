import React from 'react';
import './App.css';
import plus from './images/plus.png'
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      showInput: false,
      items: [],
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }
  componentDidMount() {
    if (localStorage.getItem('todo') != null) {
      this.setState({
        items: JSON.parse(localStorage.getItem('todo')),
      })
    }
  }
  handleChange(e) {
    this.setState({
      value: e.target.value
    })
  }
  // add item 
  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      var data = this.state.value
      if (localStorage.getItem('todo') == null) {
        var list = [];
        list.push(data);
        localStorage.setItem('todo', JSON.stringify(list));
      } else {
        var todoList = JSON.parse(localStorage.getItem('todo'))
        todoList.push(data)
        localStorage.setItem('todo', JSON.stringify(todoList));
      }
      this.setState({
        items: JSON.parse(localStorage.getItem('todo')),
        showInput: false,
        value: ""
      })
    }
  }
  // delete item
  delete(e) {
    e.preventDefault()
    var index = e.target.getAttribute('data-key')
    var list = JSON.parse(localStorage.getItem('todo'))
    list.splice(index, 1)
    this.setState({
      items: list,
    })
    localStorage.setItem('todo', JSON.stringify(list));
  }

  handleButtonClick() {
    this.setState({
      showInput: true
    })
  }

  render() {
    return (
      <div className="container" >
        <div className="content" >
          {/* Header */}
          <div className="header">
            <div className="header_left">
              <div style={{ color: "#FFF" }}> TODO LIST</div>
            </div>
            <div className="header_right">
              <div onClick={this.handleButtonClick} >
                <img src={plus} className="header_logo" alt="+" />
              </div>
            </div>
          </div>
          {this.state.items && this.state.items.length > 0 && (
            this.state.items.map((obj, key) => (
              <div>
                <div className="todo_listitem" style={{ height: 20, display: "flex", alignItems: "center" }} >
                  <div className="circle" onClick={this.delete.bind(this)} data-key={key} />
                  <div className="todo_list" key={key} onClick={this.delete.bind(this)} data-key={key} >
                    {obj}
                  </div>
                </div>
                <hr className="row" />

              </div>
            ))
          )}
          {this.state.showInput && (
            <input type="text" value={this.state.value} onKeyDown={this.handleKeyPress} onChange={this.handleChange} className="input_box" />
          )}
        </div>
      </div>

    )
  }
}

export default App;

