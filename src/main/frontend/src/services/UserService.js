import axios from "axios";

class UserService {
  constructor() {
    this.getProfileData = this.getProfileData.bind(this);
  }

  getProfileData(link) {
    return axios.get(link, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
  }
}

export default new UserService();
