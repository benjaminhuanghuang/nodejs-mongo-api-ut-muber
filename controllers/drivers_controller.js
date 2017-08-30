const Driver = require("../models/driver");

module.exports = {
  greeting(req, res) {
    res.send({ hi: "there" });
  },

  create(req, res, next) {
    const driverProps = req.body;
    Driver.create(driverProps)
      .then(driver => res.send(driver))
      .catch(next);
  },

  // for /driver/:id
  edit(req, res, next) {
    const driverId = req.params.id;
    const driverProps = req.body;

    // new : bool  true to return the modified document rather than the original. defaults to false
    Driver.findByIdAndUpdate({_id: driverId}, driverProps, {new: true})
      .then(driver => res.send(driver))
      .catch(next);
  },
};
 