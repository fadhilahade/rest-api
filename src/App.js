import React from 'react';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';

export default class ActivityList extends React.Component {
  state = {
    description: '',
    post: [],
    id: '',
    editTodo: false,
    showingTodo: true
  }


  componentDidMount(){
    console.log(process.env)
    axios.get(`${process.env.REACT_APP_API}`)

    .then(res => {
      const post = res.data;
      this.setState({ post });
    })
  }

  handleChange = event => {
    this.setState({ description: event.target.value });
  }


  deleteSubmit = index => {
    axios.delete(`${process.env.REACT_APP_API}/${index}`)
    .then(res => {
      this.setState({
        post : res.data
      })
      if (res.status === 200) {
        alert("data sudah dihapus")
      }
      console.log(res)
    })
  }



  handleSubmit = event => {
    event.preventDefault();

    axios.post(`${process.env.REACT_APP_API}`, { description: this.state.description })
      .then(res => {
        console.log(res);
        this.setState({
          post: res.data
        })
        console.log(res.data);
      })
  }

  toggleEdit = (description, id) => {
    this.setState({
      editTodo: true,
      showingTodo: false,
      description,
      id
    });
  };

  editTodo = index => {
    axios.put(`${process.env.REACT_APP_API}/${index}`, {
        description: this.state.description
      })
      .then(response => {
        this.setState({
          post: response.data,
          editTodo: false,
          showingTodo: true,
          id: ""
        });
        if (response.status === 200) {
          alert("data berhasil diupdate");
        }
      });
  };


  render() {
    return (
    <div style={{margin:"50px", background:"aliceblue" }}>
      <form onSubmit={this.handleSubmit} style={{display: "flex", justifyContent: "center"}}>
          <label>
            Your task today:
            <input type="text" name="description" onChange={this.handleChange} style={{height:"30px"}} />
          </label>
          <button type="submit">Add</button>
        </form>
      <div className="ActivityList" style={{textAlign:"center"}}>
        {this.state.post.map((data, index) => {
          return (
          <div key={index}>
              <ul style={{listStyle:"none"}}>
                <li>
                  {this.state.id === index && (
                    <div>
                      <input
                        value={this.state.description}
                        onChange={this.handleChange}
                        name="description"/>
                    </div>
                  )}
                  {this.state.showingTodo && <div>{data.description} </div>}

                  <div onClick={() => this.deleteSubmit(index)}>delete</div>
                  
                  {this.state.id === index ? (<div onClick={() => this.editTodo(index)}>update</div>) 
                  : (<div onClick={() => this.toggleEdit(data.description, index)}>edit</div>
                  )}
                </li>
              </ul>
            </div>
          );
        })}
        </div>
      </div>      
    )
  }
} 