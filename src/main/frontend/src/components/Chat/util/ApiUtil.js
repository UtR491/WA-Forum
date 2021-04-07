const AUTH_SERVICE = "http://localhost:8080/api";
const CHAT_SERVICE = "http://localhost:8080/api";

const request = (options) => {
  const headers = new Headers();

  if (options.setContentType !== false) {
    headers.append("Content-Type", "application/json");
  }

  if (localStorage.getItem("jwt")) {
    headers.append(
      "Authorization",
      "Bearer " + localStorage.getItem("jwt")
    );
  }

  const defaults = { headers: headers };
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options).then((response) =>
    response.json().then((json) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
  );
};

// export function login(loginRequest) {
//   return request({
//     url: AUTH_SERVICE + "/login",
//     method: "POST",
//     body: JSON.stringify(loginRequest),
//   });
// }

// export function signup(signupRequest) {
//   return request({
//     url: AUTH_SERVICE + "/signup",
//     method: "POST",
//     body: JSON.stringify(signupRequest),
//   });
// }

export function getCurrentUser() {
  if (!localStorage.getItem("jwt")) {
    return Promise.reject("No access token set.");
  }

  return request({
    url: AUTH_SERVICE + "/users/me",
    method: "GET",
  });
}

export function getUsers() {
  if (!localStorage.getItem("jwt")) {
    return Promise.reject("No access token set.");
  }
  return request({
    url: AUTH_SERVICE + "/users/summaries",
    method: "GET",
  });
}

export function countNewMessages(senderId, recipientId) {
  if (!localStorage.getItem("jwt")) {
    return Promise.reject("No access token set.");
  }

  return request({
    url: CHAT_SERVICE + "/messages/" + senderId + "/" + recipientId + "/count",
    method: "GET",
  });
}

export function findChatMessages(senderId, recipientId) {
  if (!localStorage.getItem("jwt")) {
    return Promise.reject("No access token set.");
  }

  return request({
    url: CHAT_SERVICE + "/messages/" + senderId + "/" + recipientId,
    method: "GET",
  });
}

export function findChatMessage(id) {
  if (!localStorage.getItem("jwt")) {
    return Promise.reject("No access token set.");
  }

  return request({
    url: CHAT_SERVICE + "/messages/" + id,
    method: "GET",
  });
}
