import http from "./http-common";

class TransactionDataService {
  get(id) {
    return http.get(`/transaction/${id}`);
  }

  findBy(descrition, date, income, outflow) {
    return http.delete(`/transaction/${descrition}/${date}/${income}/${outflow}`);
  }

  create(data) {
    return http.post("/transaction", data);
  }

  update(data) {
    return http.update("/transaction", data);
  }

  delete(id) {
    return http.delete("/transaction", id);
  }

}

export default new TransactionDataService();