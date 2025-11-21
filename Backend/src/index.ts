import { Hono } from "hono";
import { factory } from "./lib/factory";
import { createAuth } from "./lib/auth";
import customCors from "./middlewares/cors";
import patientRoute from "./routes/patients.route";
import hmoRoute from "./routes/hmo.route";
import hospitalRoute from "./routes/hospital.route";
import appointmentRoute from "./routes/appointments.route";

// Create app instance using factory
const app = factory
  .createApp({ strict: false })
  .basePath("/api")
  // Add global middleware
  .use("*", customCors);

app.on(["POST", "GET"], "/auth/*", async (c) => {
  const auth = c.get("auth");
  return auth.handler(c.req.raw);
});
export const routes = app
  .route("/patient", patientRoute)
  .route("/hmos", hmoRoute)
  .route("/hospitals", hospitalRoute)
  .route("/appointments", appointmentRoute);
export default {
  // The Hono app handles regular HTTP requests
  fetch: app.fetch,
};
