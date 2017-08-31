const mongoose = require("mongoose");

before(done => {
  mongoose.connect("mongodb://localhost/muber_test", { useMongoClient: true });

  mongoose.connection.once("open", () => done()).on("error", err => {
    console.warn("Warning", error);
  });
});

beforeEach(done => {
  const { drivers, users } = mongoose.connection.collections;
  users.drop()
    .then(() => {
      drivers.drop()
        .then(() => drivers.ensureIndex({ "geometry.coordinates": "2dsphere" }))
        .then(() => done())
        .catch(() => done());
    })
    .catch(() => done());
});
