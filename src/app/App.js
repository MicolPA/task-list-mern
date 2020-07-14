import React, { Component } from 'react';

class App extends Component {

  constructor(){
    super();
    this.state = {
      _id: '',
      title: '',
      description: '',
      tasks: [],
    }

    this.handleChange = this.handleChange.bind(this);
    this.addTask = this.addTask.bind(this);
  }

  addTask(e){
    if (this.state._id) {

      fetch('/api/task/' + this.state._id, {
        method: 'PUT',
        body: JSON.stringify(this.state),
        headers: {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json'
        }
      }).then(res => res.json())
        .then(data => {
          console.log(data);
          M.toast({html: data.status});
          this.setState({title: '', description: '', _id: ''});
          this.getTasks();
        })

    }else{

      fetch('/api/task', {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json'
        }
      }).then(res => console.log(res))
        .then(data => {
          console.log(data);
          M.toast({html: 'Task Saved'});
          this.setState({title: '', description: ''});
          this.getTasks();
        })
        .catch(err => console.error(err));

    }
    e.preventDefault();
  }

  componentDidMount(){
    this.getTasks();
  }

  deleteTask(id){
    if (confirm('Are you sure you want to delete it?')) {

      fetch('/api/task/' + id, {
        method: 'DELETE',
        headers: {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json'
        }
      }).then(res => res.json())
        .then(data => {
          console.log(data);
          M.toast({html: data.status});
          this.getTasks();
        });

    }

  }

  editTask(id){
    fetch('/api/task/' + id)
    .then(res => res.json())
    .then(data => {
      this.setState({
        _id: data._id,
        title: data.title,
        description: data.description
      })
      console.log(data)
    });
  }

  getTasks(){
    fetch('/api/task')
    .then(res => res.json())
    .then(data => {
      console.log(data);
      this.setState({tasks: data})
      console.log(this.state.tasks);
    })
  }

  handleChange(e){
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  render(){
    return (
      <div>
        <ul id="dropdown1" className="dropdown-content">
          <li><a href="#!"></a></li>
          <li><a href="#!"></a></li>
          <li className="divider"></li>
          <li><a href="#!"></a></li>
        </ul>
        <nav style={{margin:'0px 0px 2rem 0px'}}>
          <div className="nav-wrapper teal lighten-1">
            <div className='container'>
            <a href="#!" className="brand-logo">Rudok Task</a>

            </div>
          </div>
        </nav>

        <div className='container'>
          <div className='row'>
            <div className ='col s4'>
              <div className='card'>
                <div className='card-content'>
                  <form onSubmit={this.addTask}>
                    <div className='row'>
                      <div className='input-field col s12'>
                        <input type='text' name='title' onChange={this.handleChange} placeholder='Title' value={this.state.title} />
                      </div>
                    </div>
                    <div className='row'>
                      <div className='input-field col s12'>
                        <textarea placeholder="Describe your task here..." onChange={this.handleChange} className='materialize-textarea' name='description' value={this.state.description}></textarea>
                      </div>
                    </div>
                    <button type='submit' className='btn btn-blue'> Crear </button>
                  </form>
                </div>
              </div>
            </div>
            <div className ='col s8'>
              <div className='row'>
              {
                this.state.tasks.map(task => {
                  return(
                    <div className='col s4' key={task._id}>
                      <div className='card card-2'>
                        <div className='card-content'>
                          <p className='blue-text'><b>{task.title}</b></p>
                          <p>{task.description}</p>
                          <p>
                            <a className='btn light-blue btn-small' onClick={() => this.editTask(task._id)} style={{margin:'2px'}}><i className='material-icons'>edit</i></a>
                            <a className='btn red lighten-1 btn-small' onClick={() => this.deleteTask(task._id)}><i className='material-icons'>delete</i></a>
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
