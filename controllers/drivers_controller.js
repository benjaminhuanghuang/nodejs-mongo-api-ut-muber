const Driver = require("../models/driver");

module.exports = {
  greeting(req, res) {
    res.send({ hi: "there" });
  },

  index(req, res, next) {
    const { lng, lat } = req.query;

    Driver.geoNear({ type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] }, 
    { spherical: true, maxDistance:200000})  //meters
    .then(drivers => res.send(drivers))
    .catch(next);
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
    Driver.findByIdAndUpdate({ _id: driverId }, driverProps, { new: true })
      .then(driver => res.send(driver))
      .catch(next);
  },

  // for /driver/:id
  delete(req, res, next) {
    const driverId = req.params.id;
    const driverProps = req.body;

    // new : bool  true to return the modified document rather than the original. defaults to false
    Driver.findByIdAndRemove({ _id: driverId })
      .then(driver => res.status(204).send(driver))
      .catch(next);
  }
};
