import axios from "axios";

class UserService {
  constructor() {
    this.getProfileData = this.getProfileData.bind(this);
  }

  getProfileData(link) {
    console.log("link to get user data is ", link);
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
