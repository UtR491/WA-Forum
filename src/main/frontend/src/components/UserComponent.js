import React from "react";
import UserService from "../services/UserService";

class UserComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    UserService.getUsers().then((response) => {
      this.setState({ users: response.data });
    });
  }

  render() {
    return (
      <div>
        <h1 className="text-center">Users List</h1>

        <table className="table table-striped">
          <thread>
            <tr>
              <td>User Id</td>
              <td>Regestration Number</td>
              <td>User Name</td>
            </tr>
          </thread>

          <tbody>
            {this.state.users.map((users) => (
              <tr key={users.id}>
                <td>{users.id}</td>
                <td>{users.id}</td>
                <td>{users.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default UserComponent;
