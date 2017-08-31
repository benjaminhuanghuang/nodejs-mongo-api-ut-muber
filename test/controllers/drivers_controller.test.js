const assert = require("assert");
const request = require("supertest");
const mongoose = require("mongoose");
//
const app = require("../../app");
const Driver = mongoose.model("driver");

describe("Drivers controller", () => {
  it("Post to /api/drivers creates a new driver", done => {
    Driver.count().then(count => {
      request(app)
        .post("/api/drivers")
        .send({ email: "test@test.com" })
        .end((err, res) => {
          Driver.count().then(newCount => {
            assert(count + 1 === newCount);
            done();
          });
        });
    });
  });

  it("PUT to /api/drivers/id edit an existing driver", done => {
    const driver = new Driver({ email: "t@t.com", driving: false });
    driver.save().then(count => {
      request(app)
        .put(`/api/drivers/${driver._id}`)
        .send({ driving: true })
        .end(() => {
          Driver.findOne({ email: "t@t.com" }).then(driver => {
            assert(driver.driving === true);
            done();
          });
        });
    });
  });

  it("DELETE to /api/drivers/id deleted a driver", done => {
    const driver = new Driver({ email: "t@t.com", driving: false });
    driver.save().then(count => {
      request(app)
        .delete(`/api/drivers/${driver._id}`)
        .end(() => {
          Driver.findOne({ email: "t@t.com" }).then(driver => {
            assert(driver === null);
            done();
          });
        });
    });
  });

  it("GET to /api/drivers find drivers in a location", done => {
    const seattleDriver = new Driver({
      email: "seattle@t.com",
      geometry: { type: "Point", coordinates: [-122.4759902, 47.61476] }
    });

    const miamiDriver = new Driver({
      email: "miami@t.com",
      geometry: { type: "Point", coordinates: [-80.253, 25.791] }
    });

    Promise.all([seattleDriver.save(), miamiDriver.save()]).then(() => {
      request(app)
        .get("/api/drivers?lng=-80&lat=25")
        .end((err, res) => {
          console.log("body", res.body);
          assert(res.body.length === 1);
          assert(res.body[0].obj.email === "miami@t.com");
        });
    });
  });
});
