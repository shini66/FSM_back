import routerUser from "./routers/user.routes.js";

try {
  const rk = routerUser.stack
    ? routerUser.stack.map(
        (s) =>
          s.route &&
          Object.keys(s.route.methods).join(",").toUpperCase() +
            " " +
            s.route.path,
      )
    : routerUser;
  console.log("inspectRouter stack:", rk);
} catch (e) {
  console.error("Error inspecting router:", e);
}
