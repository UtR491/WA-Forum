import axios from "axios";

class UserService {
  constructor() {
    this.getProfileData = this.getProfileData.bind(this);
  }

  getProfileData(link) {
    console.log("the link to get user data was ", link);
    return axios.get(link, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
  }
}

export default new UserService();
