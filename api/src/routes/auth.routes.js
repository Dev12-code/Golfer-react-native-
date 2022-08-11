const { verifySignUp } = require("../middleware");
const { authJwt } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );
  
  app.post(
    "/test/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/test/api/auth/signin", controller.signin);
  app.post("/test/api/auth/signin", controller.signin);
  app.get("/test/api/auth/me", [authJwt.verifyToken], controller.me);
  app.post("/test/api/auth/verify/email", controller.verifyEmail);
  app.post("/test/api/auth/verify/code", controller.verifyCode);
  app.post("/test/api/auth/reset", controller.forgotPassword);
  app.post("/test/api/profile/reset", [authJwt.verifyToken], controller.resetPassword);

  app.post("/api/auth/signin", controller.signin);
  app.get("/api/auth/me", [authJwt.verifyToken], controller.me);
  app.post("/api/auth/verify/email", controller.verifyEmail);
  app.post("/api/auth/verify/code", controller.verifyCode);
  app.post("/api/auth/reset", controller.forgotPassword);
  app.post("/api/profile/reset", [authJwt.verifyToken], controller.resetPassword);
};