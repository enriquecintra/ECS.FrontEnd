import http from "./http-common";

class UserDataService {
  get(id) {
    return http.get(`/user/${id}`);
  }

  create(data) {
    return http.post("/user", data);
  }
}

export default new UserDataService();