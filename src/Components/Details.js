import React from 'react';
import axios from 'axios';

class Details extends React.Component {
    constructor() {
        super();
        this.state = {
            blog: {}
        }
    }

    componentDidMount() {
        axios(`http://localhost:8082/blog/getblog/${this.props.match.params.Id}`)
            .then(res => this.setState({ blog: res.data.blog }))
            .catch(err => console.log(err))
    }

    back = () => {
        this.props.history.push("/");
    }

    render() {
        const { blog } = this.state;
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
                        </tr>
                        <tr>
                            <td>{blog._id}</td>
                            <td>{blog.blogMessage}</td>
                        </tr>
                    </tbody>
                </table>
                <button className="btn btn-warning" onClick={this.back}>Back</button>
            </div>
        )
    }
}

export default Details;