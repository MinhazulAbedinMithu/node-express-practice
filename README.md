# node-express-practice

### Middleware Information:

- 3 types middleware: own, express, Third-party.
- Middleware are function that execute during lifecycle of a request to the server.
- request => Middleware(do something) => response
- we can define outside and require to use it.
- use middleware with app.use(middleWareName). It's working all the routes in below.
- app.use("path", middleware) : also can use path, where need to work middleware. like, app.use("/api", authorize) : It's working on /api/\* routes.
- use multiple middleware: [middlewareOne, middlewareTwo] > work in order.
