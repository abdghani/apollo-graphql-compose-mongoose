const UserTC = require("@app/module/user/types");
const resolvers = require("@app/module/user/resolvers");
const { authMiddleware: middleware } = require("@app/middleware");
const { userValidator: validator } = require("@app/validator");

for (const resolver in resolvers) {
  UserTC.addResolver(resolvers[resolver]);
}

module.exports = {
  tc: UserTC,
  query: {
    user: UserTC.getResolver("user", [middleware.isAuth]),
  },
  mutation: {
    signIn: UserTC.getResolver("signIn", [
      middleware.isGuest,
      validator.signIn,
    ]),
    signUp: UserTC.getResolver("signUp", [
      middleware.isGuest,
      validator.signUp,
    ]),
    logout: UserTC.getResolver("logout", [middleware.isAuth]),
    verifyRequest: UserTC.getResolver("verifyRequest", [
      middleware.isAuth,
      middleware.isUnverfied,
    ]),
    verify: UserTC.getResolver("verify"),
    resetPassword: UserTC.getResolver("resetPassword", [
      middleware.isGuest,
      validator.resetPassword,
    ]),
    newPassword: UserTC.getResolver("newPassword", [
      middleware.isGuest,
      validator.newPassword,
    ]),
    changePassword: UserTC.getResolver("changePassword", [
      middleware.isAuth,
      validator.changePassword,
    ]),
    updateUser: UserTC.getResolver("updateUser", [
      middleware.isAuth,
      validator.updateUser,
    ]),
  },
};
