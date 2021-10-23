const { userService } = require('@app/module/user/service/userService')
const { createToken } = require('@app/module/user/service/token')
module.exports = { userService, createToken }
