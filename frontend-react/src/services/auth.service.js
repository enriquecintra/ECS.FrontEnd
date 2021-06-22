import http from "./http-common";

class AuthDataService {
  authorized() {
    return http.get(`/auth`);
  }

  authorize(data) {
    
    return http.post("/auth", data);
  }
}

export default new AuthDataService();