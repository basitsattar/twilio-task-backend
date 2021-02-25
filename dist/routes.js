"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = routes;

var _router = _interopRequireDefault(require("./api/controllers/examples/router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function routes(app) {
  app.use('/api/v1/twilio', _router.default);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NlcnZlci9yb3V0ZXMuanMiXSwibmFtZXMiOlsicm91dGVzIiwiYXBwIiwidXNlIiwiZXhhbXBsZXNSb3V0ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUVlLFNBQVNBLE1BQVQsQ0FBZ0JDLEdBQWhCLEVBQXFCO0FBQ2xDQSxFQUFBQSxHQUFHLENBQUNDLEdBQUosQ0FBUSxnQkFBUixFQUEwQkMsZUFBMUI7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleGFtcGxlc1JvdXRlciBmcm9tICcuL2FwaS9jb250cm9sbGVycy9leGFtcGxlcy9yb3V0ZXInO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByb3V0ZXMoYXBwKSB7XG4gIGFwcC51c2UoJy9hcGkvdjEvdHdpbGlvJywgZXhhbXBsZXNSb3V0ZXIpO1xufVxuIl19