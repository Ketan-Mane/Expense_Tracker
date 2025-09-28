import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	route("/login", "routes/auth/login.tsx"),
	route("/signup", "routes/auth/signup.tsx"),
	route("", "./layout/protected-layout.tsx", [index("routes/home.tsx")]),
] satisfies RouteConfig;
