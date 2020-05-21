import React, {Component} from 'react';
import cookie from 'react-cookies';
import 'whatwg-fetch';

class PostCreate extends Component{

  constructor(props){
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  createPost(data){
    const endpoint = '/api/posts/'
    const csrfToken = cookie.load('csrftoken')
    if (csrfToken !== undefined){
      let lookupOptions = {
        method: "POST",
        headers: {
          "Content-Type":'application/json',
          "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify(data),
        credentials: 'include',
      }

    fetch(endpoint, lookupOptions)
    .then(function(response){
      return response.json()
    }).then(function(responseData){
         console.log(responseData)
    }).catch(function(error){
         console.log('error', error)
    })
  }}

  handleSubmit(event){
    event.preventDefault()
    let data = this.state
    if (data['draft'] === 'on'){
      data['draft'] = true
    } else {
      data['draft'] = false
    }
    console.log(data)
    this.createPost(data)
  }

  handleInputChange(event){
    event.preventDefault()
    console.log(event.target.name, event.target.value)
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <div className='form-group'>
          <label for='title'>Post Title</label>
          <input type='text' name='title' className='form-control' placeholder='Title' onChange={this.handleInputChange} required='required'/>
        </div>
        <div className='form-group'>
          <label for='body'>Post Content</label>
          <textarea id='content' name='content' className='form-control' placeholder='Content' onChange={this.handleInputChange} required='required'/>
        </div>
        <div className='form-group'>
          <label for='draft'>
          <input type='checkbox' name='draft' className='mr-2' onChange={this.handleInputChange} />
          Draft</label>
        </div>
        <div className='form-group'>
          <label for='publish'>Publish Date</label>
          <input type='date' name='publish' className='form-control' onChange={this.handleInputChange} required='required'/>
        </div>
        <button className='btn btn-primary'>Save</button>
      </form>
    )
  }
}

export default PostCreate;
