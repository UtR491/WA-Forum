import axios from "axios";

class UserService {
  constructor() {
    this.getProfileData = this.getProfileData.bind(this);
    this.getFollowers = this.getFollowers.bind(this);
  }

  getProfileData(link) {
    return axios({
      url: link,
      method: "GET",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("jwt"),
      },
    });
  }

  getFollowers(link) {
    return axios({
      url: link,
      method: "GET",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("jwt"),
      },
    });
  }
}

export default new UserService();
