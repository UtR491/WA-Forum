import axios from "axios";

class ProfileService {
  constructor() {
    this.getProfileInformation = this.getProfileInformation.bind(this);
    this.followUser = this.followUser.bind(this);
    this.editProfile = this.editProfile.bind(this);
    this.getFollowers = this.getFollowers.bind(this);
  }

  getProfileInformation(link) {
    return axios({
      url: link,
      method: "GET",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("jwt"),
      },
    });
  }

  followUser(link) {
    return axios({
      url: link,
      method: "POST",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("jwt"),
        "Content-Type": "application/json",
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

  editProfile(deets) {
    return axios({
      url:
        "http://localhost:8080/api/profile/" +
        sessionStorage.getItem("userId") +
        "/edit",
      data: JSON.stringify(deets),
      method: "POST",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
    });
  }
}

export default new ProfileService();
