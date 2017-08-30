
## mocha
  "test": "nodemon --exec 'mocha --recursive -R min'"
  -R min   # use minimum report 

  
## Mock HTTP request
  supertest was used to make fake HTTP request
  npm install -D supertest


## Separate testing database
  In npm script, we can define the environment variables
    "test": "NODE_ENV=test nodemon --exec 'mocha'"    

  Use production db in app
  ```
  if (process.env.NODE_ENV !== "test")
    mongoose.connect("mongodb://localhost/muber", { useMongoClient: true });
  ```

  Use testing db and reset db for each test case



