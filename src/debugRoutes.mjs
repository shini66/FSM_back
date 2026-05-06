import app from "./app.js";

const routes = [];
app._router.stack.forEach((middleware) => {
  if (middleware.route) {
    // routes registered directly on the app
    routes.push(middleware.route);
  } else if (middleware.name === "router") {
    middleware.handle.stack.forEach((handler) => {
      const route = handler.route;
      route && routes.push(route);
    });
  }
});

for (const r of routes) {
  const methods = Object.keys(r.methods).join(",").toUpperCase();
  console.log(`${methods} ${r.path}`);
}
