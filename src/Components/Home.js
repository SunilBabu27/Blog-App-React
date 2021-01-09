import React from 'react';
import axios from 'axios';
import '../App.css';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        'background-color': 'antiquewhite'
    }
};

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            blogs: [],
            addModal: false,
            blogAddText: '',
            blogUpdateId: 0,
            blogUpdateText: '',
            updateModal: false
        }
    }

    componentDidMount() {
        axios("http://localhost:8082/blog/getblogs")
            .then(res => this.setState({ blogs: res.data.blog, addModal: false }))
            .catch(err => console.log(err))
    }

    handleDetails = (event) => {
        this.props.history.push(`/details/${event.target.id}`)
    }

    {/*Handles  the deletion of data from the database using the HTTP Delete method
       and the Blog ID that is recorded by the event and identified as event.target.id */}
    handleDelete = (event) => {
        axios({
            method: "DELETE",
            url: `http://localhost:8082/blog/deleteblog/${event.target.id}`,
            headers: { 'Content-Type': 'application/json' }
        }).then(response => axios("http://localhost:8082/blog/getblogs")
            .then(res => this.setState({ blogs: res.data.blog }))
            .catch(err => console.log(err)))
            .catch(err => console.log(err))
    }

{/*Once you have entered your content that you would like to add to a new blog, 
   Set addModal value to true to close your Add blog window and then 
   view the updated table on your web application  */}
    handleAdd = () => {
        this.setState({ addModal: true })
    }
{/*Set addModal value to true to close your Add blog window and then 
 view the updated table on your web application  */}
    handleChangeAddBlog = (event) => {
        this.setState({ blogAddText: event.target.value });
    }
{/*Set blogUpdateText state to contain new data that you have recieved through the update operation  */}
    handleChangeUpdateBlog = (event) => {
        this.setState({ blogUpdateText: event.target.value });
    }
{/*Create a new object to store the data that you have just received. Use Axios to 
handle the HTTP POST method, you can add the new object into your database along with the new blog */}
    handleAddBlog = () => {
        const { blogAddText } = this.state;
        const addObj = {
            "blogMessage": blogAddText
        }
        axios({
            method: 'POST',
            url: `http://localhost:8082/blog/addblog`,
            headers: { 'Content-Type': 'application/json' },
            data: addObj
        }).then(response => axios("http://localhost:8082/blog/getblogs")
            .then(res => this.setState({ blogs: res.data.blog}))
            .catch(err => console.log(err)))
            .catch(err => console.log(err))
    }

    {/*Use the setState method to update the existing this state   */}
    handleUpdate = (event) => {
        this.setState({ blogUpdateId: event.target.id, blogUpdateText: event.target.name, updateModal: true })
    }

    {/*Use this function to update the blog who's id is send received in blogUpdateId
       with the value that is obtained and stored in blogUpdateText using HTTP Put method  */}
    handleUpdateBlog = () => {
        const { blogUpdateId, blogUpdateText } = this.state;
        const updateObj = {
            "blogMessage": blogUpdateText
        };
        axios({
            method: 'PUT',
            url: `http://localhost:8082/blog/updateblog/${blogUpdateId}`,
            headers: { 'Content-Type': 'application/json' },
            data: updateObj
        }).then(response => axios("http://localhost:8082/blog/getblogs")
            .then(res => this.setState({ blogs: res.data.blog, updateModal: false }))
            .catch(err => console.log(err)))
            .catch(err => console.log(err))
    }

    render() {
        const { blogs, addModal, blogAddText, blogUpdateText, updateModal } = this.state;
        return (
            <div>
                <table className="table table-bordered table-hover table-striped">
                    <tbody>
                        <tr>
                            <td className="table-data" colSpan="4">Blogs</td>
                        </tr>
                        <tr className="table-header">
                            <td>S.NO</td>
                            <td>Blogs</td>
                            <td>Details</td>
                            <td>Actions</td>
                        </tr>
                        {blogs.map((item, index) => {
                            return <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.blogMessage}</td>
                                <td><button id={item._id} className="btn btn-warning" onClick={this.handleDetails}>Details</button></td>
                                <td><button id={item._id} name={item.blogMessage} onClick={this.handleUpdate} className="btn btn-primary btn-margin">Update</button>
                                    <button id={item._id} className="btn btn-danger" onClick={this.handleDelete}>Delete</button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
                <button className="btn btn-success" onClick={this.handleAdd}>Add Blog</button>
                <Modal
                    isOpen={addModal}
                    style={customStyles}
                >
                    <div>
                        <div className="modal-header"><h3>Add Blog</h3></div>
                        <label>Blog : </label>
                        <input type="text" value={blogAddText} onChange={this.handleChangeAddBlog}></input>
                        <button className="btn btn-success" style={{ 'margin-left': '5px' }} onClick={this.handleAddBlog}>Add</button>
                    </div>
                </Modal>
                <Modal
                    isOpen={updateModal}
                    style={customStyles}
                >
                    <div>
                        <div className="modal-header"><h3>Update Blog</h3></div>
                        <label>Blog : </label>
                        <input type="text" value={blogUpdateText} onChange={this.handleChangeUpdateBlog}></input>
                        <button className="btn btn-success" style={{ 'margin-left': '5px' }} onClick={this.handleUpdateBlog}>Update</button>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default Home;