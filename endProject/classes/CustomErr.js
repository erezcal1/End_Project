class CustomRes {
  static STATUSES = {
    ok: "ok",
    failed: "failed",
  };
  status;
  message;
  constructor(status, message) {
    this.status = status;
    this.message = message;
  }
}

module.exports = CustomRes;
