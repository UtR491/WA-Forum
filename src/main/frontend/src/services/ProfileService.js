import axios from "axios";

class ProfileService {
  getProfileInformation(link) {
    return axios({
      url: link,
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
  }
}

export default new ProfileService();
