import React, {Component} from 'react';
import cookie from 'react-cookies';
import 'whatwg-fetch';
import moment from 'moment';

class PostCreate extends Component{

  constructor(props){
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.clearForm = this.clearForm.bind(this)
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
         if (this.props.newPostItemCreated){
           this.props.newPostItemCreated(responseData)
         }
         this.clearForm()
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

  clearForm(event){
    if (event){
      event.preventDefault()
    }
    this.postCreateForm.reset()
  }

  componentDidMount(){
    this.setState({
      draft: false,
      title: null,
      content:null,
      publish: moment().format('YYYY-MM-DD')
    })
  }

  render(){
    const {publish} = this.state
    return(
      <form onSubmit={this.handleSubmit} ref={(el) => this.postCreateForm = el} >
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
          <input type='date' name='publish' className='form-control' onChange={this.handleInputChange} required='required' value={publish}/>
        </div>
        <button className='btn btn-primary'>Save</button>
        <button className='btn btn-secondary' onClick={this.clearForm}>Cancel</button>
      </form>
    )
  }
}

export default PostCreate;
