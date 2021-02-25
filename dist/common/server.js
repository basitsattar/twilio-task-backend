"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var path = _interopRequireWildcard(require("path"));

var bodyParser = _interopRequireWildcard(require("body-parser"));

var http = _interopRequireWildcard(require("http"));

var os = _interopRequireWildcard(require("os"));

var _logger = _interopRequireDefault(require("./logger"));

var OpenApiValidator = _interopRequireWildcard(require("express-openapi-validator"));

var _error = _interopRequireDefault(require("../api/middlewares/error.handler"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = new _express.default();

class ExpressServer {
  constructor() {
    const root = path.normalize(`${__dirname}/../..`);
    const apiSpec = path.join(__dirname, 'api.yml');
    const validateResponses = !!(process.env.OPENAPI_ENABLE_RESPONSE_VALIDATION && process.env.OPENAPI_ENABLE_RESPONSE_VALIDATION.toLowerCase() === 'true');
    app.set('appPath', `${root}client`);
    app.use(bodyParser.json({
      limit: process.env.REQUEST_LIMIT || '100kb'
    }));
    app.use(bodyParser.urlencoded({
      extended: true,
      limit: process.env.REQUEST_LIMIT || '100kb'
    }));
    app.use(bodyParser.text({
      limit: process.env.REQUEST_LIMIT || '100kb'
    }));
    app.use((0, _cookieParser.default)(process.env.SESSION_SECRET));
    app.use(_express.default.static(`${root}/public`));
    app.use(process.env.OPENAPI_SPEC || '/spec', _express.default.static(apiSpec));
    app.use(OpenApiValidator.middleware({
      apiSpec,
      validateResponses,
      ignorePaths: /.*\/spec(\/|$)/
    }));
  }

  router(routes) {
    routes(app);
    app.use(_error.default);
    return this;
  }

  listen(port = process.env.PORT) {
    const welcome = p => () => _logger.default.info(`up and running in ${process.env.NODE_ENV || 'development'} @: ${os.hostname()} on port: ${p}}`);

    http.createServer(app).listen(port, welcome(port));
    return app;
  }

}

exports.default = ExpressServer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NlcnZlci9jb21tb24vc2VydmVyLmpzIl0sIm5hbWVzIjpbImFwcCIsIkV4cHJlc3MiLCJFeHByZXNzU2VydmVyIiwiY29uc3RydWN0b3IiLCJyb290IiwicGF0aCIsIm5vcm1hbGl6ZSIsIl9fZGlybmFtZSIsImFwaVNwZWMiLCJqb2luIiwidmFsaWRhdGVSZXNwb25zZXMiLCJwcm9jZXNzIiwiZW52IiwiT1BFTkFQSV9FTkFCTEVfUkVTUE9OU0VfVkFMSURBVElPTiIsInRvTG93ZXJDYXNlIiwic2V0IiwidXNlIiwiYm9keVBhcnNlciIsImpzb24iLCJsaW1pdCIsIlJFUVVFU1RfTElNSVQiLCJ1cmxlbmNvZGVkIiwiZXh0ZW5kZWQiLCJ0ZXh0IiwiU0VTU0lPTl9TRUNSRVQiLCJzdGF0aWMiLCJPUEVOQVBJX1NQRUMiLCJPcGVuQXBpVmFsaWRhdG9yIiwibWlkZGxld2FyZSIsImlnbm9yZVBhdGhzIiwicm91dGVyIiwicm91dGVzIiwiZXJyb3JIYW5kbGVyIiwibGlzdGVuIiwicG9ydCIsIlBPUlQiLCJ3ZWxjb21lIiwicCIsImwiLCJpbmZvIiwiTk9ERV9FTlYiLCJvcyIsImhvc3RuYW1lIiwiaHR0cCIsImNyZWF0ZVNlcnZlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7OztBQUVBLE1BQU1BLEdBQUcsR0FBRyxJQUFJQyxnQkFBSixFQUFaOztBQUVlLE1BQU1DLGFBQU4sQ0FBb0I7QUFDakNDLEVBQUFBLFdBQVcsR0FBRztBQUNaLFVBQU1DLElBQUksR0FBR0MsSUFBSSxDQUFDQyxTQUFMLENBQWdCLEdBQUVDLFNBQVUsUUFBNUIsQ0FBYjtBQUVBLFVBQU1DLE9BQU8sR0FBR0gsSUFBSSxDQUFDSSxJQUFMLENBQVVGLFNBQVYsRUFBcUIsU0FBckIsQ0FBaEI7QUFDQSxVQUFNRyxpQkFBaUIsR0FBRyxDQUFDLEVBQ3pCQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsa0NBQVosSUFDQUYsT0FBTyxDQUFDQyxHQUFSLENBQVlDLGtDQUFaLENBQStDQyxXQUEvQyxPQUFpRSxNQUZ4QyxDQUEzQjtBQUtBZCxJQUFBQSxHQUFHLENBQUNlLEdBQUosQ0FBUSxTQUFSLEVBQW9CLEdBQUVYLElBQUssUUFBM0I7QUFDQUosSUFBQUEsR0FBRyxDQUFDZ0IsR0FBSixDQUFRQyxVQUFVLENBQUNDLElBQVgsQ0FBZ0I7QUFBRUMsTUFBQUEsS0FBSyxFQUFFUixPQUFPLENBQUNDLEdBQVIsQ0FBWVEsYUFBWixJQUE2QjtBQUF0QyxLQUFoQixDQUFSO0FBQ0FwQixJQUFBQSxHQUFHLENBQUNnQixHQUFKLENBQ0VDLFVBQVUsQ0FBQ0ksVUFBWCxDQUFzQjtBQUNwQkMsTUFBQUEsUUFBUSxFQUFFLElBRFU7QUFFcEJILE1BQUFBLEtBQUssRUFBRVIsT0FBTyxDQUFDQyxHQUFSLENBQVlRLGFBQVosSUFBNkI7QUFGaEIsS0FBdEIsQ0FERjtBQU1BcEIsSUFBQUEsR0FBRyxDQUFDZ0IsR0FBSixDQUFRQyxVQUFVLENBQUNNLElBQVgsQ0FBZ0I7QUFBRUosTUFBQUEsS0FBSyxFQUFFUixPQUFPLENBQUNDLEdBQVIsQ0FBWVEsYUFBWixJQUE2QjtBQUF0QyxLQUFoQixDQUFSO0FBQ0FwQixJQUFBQSxHQUFHLENBQUNnQixHQUFKLENBQVEsMkJBQWFMLE9BQU8sQ0FBQ0MsR0FBUixDQUFZWSxjQUF6QixDQUFSO0FBQ0F4QixJQUFBQSxHQUFHLENBQUNnQixHQUFKLENBQVFmLGlCQUFRd0IsTUFBUixDQUFnQixHQUFFckIsSUFBSyxTQUF2QixDQUFSO0FBRUFKLElBQUFBLEdBQUcsQ0FBQ2dCLEdBQUosQ0FBUUwsT0FBTyxDQUFDQyxHQUFSLENBQVljLFlBQVosSUFBNEIsT0FBcEMsRUFBNkN6QixpQkFBUXdCLE1BQVIsQ0FBZWpCLE9BQWYsQ0FBN0M7QUFDQVIsSUFBQUEsR0FBRyxDQUFDZ0IsR0FBSixDQUNFVyxnQkFBZ0IsQ0FBQ0MsVUFBakIsQ0FBNEI7QUFDMUJwQixNQUFBQSxPQUQwQjtBQUUxQkUsTUFBQUEsaUJBRjBCO0FBRzFCbUIsTUFBQUEsV0FBVyxFQUFFO0FBSGEsS0FBNUIsQ0FERjtBQU9EOztBQUVEQyxFQUFBQSxNQUFNLENBQUNDLE1BQUQsRUFBUztBQUNiQSxJQUFBQSxNQUFNLENBQUMvQixHQUFELENBQU47QUFDQUEsSUFBQUEsR0FBRyxDQUFDZ0IsR0FBSixDQUFRZ0IsY0FBUjtBQUNBLFdBQU8sSUFBUDtBQUNEOztBQUVEQyxFQUFBQSxNQUFNLENBQUNDLElBQUksR0FBR3ZCLE9BQU8sQ0FBQ0MsR0FBUixDQUFZdUIsSUFBcEIsRUFBMEI7QUFDOUIsVUFBTUMsT0FBTyxHQUFJQyxDQUFELElBQU8sTUFDckJDLGdCQUFFQyxJQUFGLENBQ0cscUJBQ0M1QixPQUFPLENBQUNDLEdBQVIsQ0FBWTRCLFFBQVosSUFBd0IsYUFDekIsT0FBTUMsRUFBRSxDQUFDQyxRQUFILEVBQWMsYUFBWUwsQ0FBRSxHQUhyQyxDQURGOztBQU9BTSxJQUFBQSxJQUFJLENBQUNDLFlBQUwsQ0FBa0I1QyxHQUFsQixFQUF1QmlDLE1BQXZCLENBQThCQyxJQUE5QixFQUFvQ0UsT0FBTyxDQUFDRixJQUFELENBQTNDO0FBRUEsV0FBT2xDLEdBQVA7QUFDRDs7QUFqRGdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgY29va2llUGFyc2VyIGZyb20gJ2Nvb2tpZS1wYXJzZXInO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCAqIGFzIGJvZHlQYXJzZXIgZnJvbSAnYm9keS1wYXJzZXInO1xuaW1wb3J0ICogYXMgaHR0cCBmcm9tICdodHRwJztcbmltcG9ydCAqIGFzIG9zIGZyb20gJ29zJztcbmltcG9ydCBsIGZyb20gJy4vbG9nZ2VyJztcbmltcG9ydCAqIGFzIE9wZW5BcGlWYWxpZGF0b3IgZnJvbSAnZXhwcmVzcy1vcGVuYXBpLXZhbGlkYXRvcic7XG5pbXBvcnQgZXJyb3JIYW5kbGVyIGZyb20gJy4uL2FwaS9taWRkbGV3YXJlcy9lcnJvci5oYW5kbGVyJztcblxuY29uc3QgYXBwID0gbmV3IEV4cHJlc3MoKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXhwcmVzc1NlcnZlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnN0IHJvb3QgPSBwYXRoLm5vcm1hbGl6ZShgJHtfX2Rpcm5hbWV9Ly4uLy4uYCk7XG5cbiAgICBjb25zdCBhcGlTcGVjID0gcGF0aC5qb2luKF9fZGlybmFtZSwgJ2FwaS55bWwnKTtcbiAgICBjb25zdCB2YWxpZGF0ZVJlc3BvbnNlcyA9ICEhKFxuICAgICAgcHJvY2Vzcy5lbnYuT1BFTkFQSV9FTkFCTEVfUkVTUE9OU0VfVkFMSURBVElPTiAmJlxuICAgICAgcHJvY2Vzcy5lbnYuT1BFTkFQSV9FTkFCTEVfUkVTUE9OU0VfVkFMSURBVElPTi50b0xvd2VyQ2FzZSgpID09PSAndHJ1ZSdcbiAgICApO1xuXG4gICAgYXBwLnNldCgnYXBwUGF0aCcsIGAke3Jvb3R9Y2xpZW50YCk7XG4gICAgYXBwLnVzZShib2R5UGFyc2VyLmpzb24oeyBsaW1pdDogcHJvY2Vzcy5lbnYuUkVRVUVTVF9MSU1JVCB8fCAnMTAwa2InIH0pKTtcbiAgICBhcHAudXNlKFxuICAgICAgYm9keVBhcnNlci51cmxlbmNvZGVkKHtcbiAgICAgICAgZXh0ZW5kZWQ6IHRydWUsXG4gICAgICAgIGxpbWl0OiBwcm9jZXNzLmVudi5SRVFVRVNUX0xJTUlUIHx8ICcxMDBrYicsXG4gICAgICB9KVxuICAgICk7XG4gICAgYXBwLnVzZShib2R5UGFyc2VyLnRleHQoeyBsaW1pdDogcHJvY2Vzcy5lbnYuUkVRVUVTVF9MSU1JVCB8fCAnMTAwa2InIH0pKTtcbiAgICBhcHAudXNlKGNvb2tpZVBhcnNlcihwcm9jZXNzLmVudi5TRVNTSU9OX1NFQ1JFVCkpO1xuICAgIGFwcC51c2UoRXhwcmVzcy5zdGF0aWMoYCR7cm9vdH0vcHVibGljYCkpO1xuXG4gICAgYXBwLnVzZShwcm9jZXNzLmVudi5PUEVOQVBJX1NQRUMgfHwgJy9zcGVjJywgRXhwcmVzcy5zdGF0aWMoYXBpU3BlYykpO1xuICAgIGFwcC51c2UoXG4gICAgICBPcGVuQXBpVmFsaWRhdG9yLm1pZGRsZXdhcmUoe1xuICAgICAgICBhcGlTcGVjLFxuICAgICAgICB2YWxpZGF0ZVJlc3BvbnNlcyxcbiAgICAgICAgaWdub3JlUGF0aHM6IC8uKlxcL3NwZWMoXFwvfCQpLyxcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHJvdXRlcihyb3V0ZXMpIHtcbiAgICByb3V0ZXMoYXBwKTtcbiAgICBhcHAudXNlKGVycm9ySGFuZGxlcik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBsaXN0ZW4ocG9ydCA9IHByb2Nlc3MuZW52LlBPUlQpIHtcbiAgICBjb25zdCB3ZWxjb21lID0gKHApID0+ICgpID0+XG4gICAgICBsLmluZm8oXG4gICAgICAgIGB1cCBhbmQgcnVubmluZyBpbiAke1xuICAgICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WIHx8ICdkZXZlbG9wbWVudCdcbiAgICAgICAgfSBAOiAke29zLmhvc3RuYW1lKCl9IG9uIHBvcnQ6ICR7cH19YFxuICAgICAgKTtcblxuICAgIGh0dHAuY3JlYXRlU2VydmVyKGFwcCkubGlzdGVuKHBvcnQsIHdlbGNvbWUocG9ydCkpO1xuXG4gICAgcmV0dXJuIGFwcDtcbiAgfVxufVxuIl19