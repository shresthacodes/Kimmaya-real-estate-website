import { auth } from "express-oauth2-jwt-bearer";

const jwtCheck = auth({
  audience: "https://kimmaya-real-estate-website.vercel.app/",
  issuerBaseURL: "https://dev-113517yyeno8vowx.us.auth0.com",
  tokenSigningAlg: "RS256",
});

export default jwtCheck;
