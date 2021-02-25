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

var _cors = _interopRequireDefault(require("cors"));

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
    app.use((0, _cors.default)());
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NlcnZlci9jb21tb24vc2VydmVyLmpzIl0sIm5hbWVzIjpbImFwcCIsIkV4cHJlc3MiLCJFeHByZXNzU2VydmVyIiwiY29uc3RydWN0b3IiLCJyb290IiwicGF0aCIsIm5vcm1hbGl6ZSIsIl9fZGlybmFtZSIsImFwaVNwZWMiLCJqb2luIiwidmFsaWRhdGVSZXNwb25zZXMiLCJwcm9jZXNzIiwiZW52IiwiT1BFTkFQSV9FTkFCTEVfUkVTUE9OU0VfVkFMSURBVElPTiIsInRvTG93ZXJDYXNlIiwic2V0IiwidXNlIiwiYm9keVBhcnNlciIsImpzb24iLCJsaW1pdCIsIlJFUVVFU1RfTElNSVQiLCJ1cmxlbmNvZGVkIiwiZXh0ZW5kZWQiLCJ0ZXh0IiwiU0VTU0lPTl9TRUNSRVQiLCJzdGF0aWMiLCJPUEVOQVBJX1NQRUMiLCJPcGVuQXBpVmFsaWRhdG9yIiwibWlkZGxld2FyZSIsImlnbm9yZVBhdGhzIiwicm91dGVyIiwicm91dGVzIiwiZXJyb3JIYW5kbGVyIiwibGlzdGVuIiwicG9ydCIsIlBPUlQiLCJ3ZWxjb21lIiwicCIsImwiLCJpbmZvIiwiTk9ERV9FTlYiLCJvcyIsImhvc3RuYW1lIiwiaHR0cCIsImNyZWF0ZVNlcnZlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7OztBQUNBLE1BQU1BLEdBQUcsR0FBRyxJQUFJQyxnQkFBSixFQUFaOztBQUVlLE1BQU1DLGFBQU4sQ0FBb0I7QUFDakNDLEVBQUFBLFdBQVcsR0FBRztBQUNaLFVBQU1DLElBQUksR0FBR0MsSUFBSSxDQUFDQyxTQUFMLENBQWdCLEdBQUVDLFNBQVUsUUFBNUIsQ0FBYjtBQUVBLFVBQU1DLE9BQU8sR0FBR0gsSUFBSSxDQUFDSSxJQUFMLENBQVVGLFNBQVYsRUFBcUIsU0FBckIsQ0FBaEI7QUFDQSxVQUFNRyxpQkFBaUIsR0FBRyxDQUFDLEVBQ3pCQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsa0NBQVosSUFDQUYsT0FBTyxDQUFDQyxHQUFSLENBQVlDLGtDQUFaLENBQStDQyxXQUEvQyxPQUFpRSxNQUZ4QyxDQUEzQjtBQUtBZCxJQUFBQSxHQUFHLENBQUNlLEdBQUosQ0FBUSxTQUFSLEVBQW9CLEdBQUVYLElBQUssUUFBM0I7QUFDQUosSUFBQUEsR0FBRyxDQUFDZ0IsR0FBSixDQUFRLG9CQUFSO0FBQ0FoQixJQUFBQSxHQUFHLENBQUNnQixHQUFKLENBQVFDLFVBQVUsQ0FBQ0MsSUFBWCxDQUFnQjtBQUFFQyxNQUFBQSxLQUFLLEVBQUVSLE9BQU8sQ0FBQ0MsR0FBUixDQUFZUSxhQUFaLElBQTZCO0FBQXRDLEtBQWhCLENBQVI7QUFDQXBCLElBQUFBLEdBQUcsQ0FBQ2dCLEdBQUosQ0FDRUMsVUFBVSxDQUFDSSxVQUFYLENBQXNCO0FBQ3BCQyxNQUFBQSxRQUFRLEVBQUUsSUFEVTtBQUVwQkgsTUFBQUEsS0FBSyxFQUFFUixPQUFPLENBQUNDLEdBQVIsQ0FBWVEsYUFBWixJQUE2QjtBQUZoQixLQUF0QixDQURGO0FBTUFwQixJQUFBQSxHQUFHLENBQUNnQixHQUFKLENBQVFDLFVBQVUsQ0FBQ00sSUFBWCxDQUFnQjtBQUFFSixNQUFBQSxLQUFLLEVBQUVSLE9BQU8sQ0FBQ0MsR0FBUixDQUFZUSxhQUFaLElBQTZCO0FBQXRDLEtBQWhCLENBQVI7QUFDQXBCLElBQUFBLEdBQUcsQ0FBQ2dCLEdBQUosQ0FBUSwyQkFBYUwsT0FBTyxDQUFDQyxHQUFSLENBQVlZLGNBQXpCLENBQVI7QUFDQXhCLElBQUFBLEdBQUcsQ0FBQ2dCLEdBQUosQ0FBUWYsaUJBQVF3QixNQUFSLENBQWdCLEdBQUVyQixJQUFLLFNBQXZCLENBQVI7QUFFQUosSUFBQUEsR0FBRyxDQUFDZ0IsR0FBSixDQUFRTCxPQUFPLENBQUNDLEdBQVIsQ0FBWWMsWUFBWixJQUE0QixPQUFwQyxFQUE2Q3pCLGlCQUFRd0IsTUFBUixDQUFlakIsT0FBZixDQUE3QztBQUNBUixJQUFBQSxHQUFHLENBQUNnQixHQUFKLENBQ0VXLGdCQUFnQixDQUFDQyxVQUFqQixDQUE0QjtBQUMxQnBCLE1BQUFBLE9BRDBCO0FBRTFCRSxNQUFBQSxpQkFGMEI7QUFHMUJtQixNQUFBQSxXQUFXLEVBQUU7QUFIYSxLQUE1QixDQURGO0FBT0Q7O0FBRURDLEVBQUFBLE1BQU0sQ0FBQ0MsTUFBRCxFQUFTO0FBQ2JBLElBQUFBLE1BQU0sQ0FBQy9CLEdBQUQsQ0FBTjtBQUNBQSxJQUFBQSxHQUFHLENBQUNnQixHQUFKLENBQVFnQixjQUFSO0FBQ0EsV0FBTyxJQUFQO0FBQ0Q7O0FBRURDLEVBQUFBLE1BQU0sQ0FBQ0MsSUFBSSxHQUFHdkIsT0FBTyxDQUFDQyxHQUFSLENBQVl1QixJQUFwQixFQUEwQjtBQUM5QixVQUFNQyxPQUFPLEdBQUlDLENBQUQsSUFBTyxNQUNyQkMsZ0JBQUVDLElBQUYsQ0FDRyxxQkFDQzVCLE9BQU8sQ0FBQ0MsR0FBUixDQUFZNEIsUUFBWixJQUF3QixhQUN6QixPQUFNQyxFQUFFLENBQUNDLFFBQUgsRUFBYyxhQUFZTCxDQUFFLEdBSHJDLENBREY7O0FBT0FNLElBQUFBLElBQUksQ0FBQ0MsWUFBTCxDQUFrQjVDLEdBQWxCLEVBQXVCaUMsTUFBdkIsQ0FBOEJDLElBQTlCLEVBQW9DRSxPQUFPLENBQUNGLElBQUQsQ0FBM0M7QUFFQSxXQUFPbEMsR0FBUDtBQUNEOztBQWxEZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCBjb29raWVQYXJzZXIgZnJvbSAnY29va2llLXBhcnNlcic7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0ICogYXMgYm9keVBhcnNlciBmcm9tICdib2R5LXBhcnNlcic7XG5pbXBvcnQgKiBhcyBodHRwIGZyb20gJ2h0dHAnO1xuaW1wb3J0ICogYXMgb3MgZnJvbSAnb3MnO1xuaW1wb3J0IGwgZnJvbSAnLi9sb2dnZXInO1xuaW1wb3J0ICogYXMgT3BlbkFwaVZhbGlkYXRvciBmcm9tICdleHByZXNzLW9wZW5hcGktdmFsaWRhdG9yJztcbmltcG9ydCBlcnJvckhhbmRsZXIgZnJvbSAnLi4vYXBpL21pZGRsZXdhcmVzL2Vycm9yLmhhbmRsZXInO1xuaW1wb3J0IGNvcnMgZnJvbSAnY29ycyc7XG5jb25zdCBhcHAgPSBuZXcgRXhwcmVzcygpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFeHByZXNzU2VydmVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgY29uc3Qgcm9vdCA9IHBhdGgubm9ybWFsaXplKGAke19fZGlybmFtZX0vLi4vLi5gKTtcblxuICAgIGNvbnN0IGFwaVNwZWMgPSBwYXRoLmpvaW4oX19kaXJuYW1lLCAnYXBpLnltbCcpO1xuICAgIGNvbnN0IHZhbGlkYXRlUmVzcG9uc2VzID0gISEoXG4gICAgICBwcm9jZXNzLmVudi5PUEVOQVBJX0VOQUJMRV9SRVNQT05TRV9WQUxJREFUSU9OICYmXG4gICAgICBwcm9jZXNzLmVudi5PUEVOQVBJX0VOQUJMRV9SRVNQT05TRV9WQUxJREFUSU9OLnRvTG93ZXJDYXNlKCkgPT09ICd0cnVlJ1xuICAgICk7XG5cbiAgICBhcHAuc2V0KCdhcHBQYXRoJywgYCR7cm9vdH1jbGllbnRgKTtcbiAgICBhcHAudXNlKGNvcnMoKSk7XG4gICAgYXBwLnVzZShib2R5UGFyc2VyLmpzb24oeyBsaW1pdDogcHJvY2Vzcy5lbnYuUkVRVUVTVF9MSU1JVCB8fCAnMTAwa2InIH0pKTtcbiAgICBhcHAudXNlKFxuICAgICAgYm9keVBhcnNlci51cmxlbmNvZGVkKHtcbiAgICAgICAgZXh0ZW5kZWQ6IHRydWUsXG4gICAgICAgIGxpbWl0OiBwcm9jZXNzLmVudi5SRVFVRVNUX0xJTUlUIHx8ICcxMDBrYicsXG4gICAgICB9KVxuICAgICk7XG4gICAgYXBwLnVzZShib2R5UGFyc2VyLnRleHQoeyBsaW1pdDogcHJvY2Vzcy5lbnYuUkVRVUVTVF9MSU1JVCB8fCAnMTAwa2InIH0pKTtcbiAgICBhcHAudXNlKGNvb2tpZVBhcnNlcihwcm9jZXNzLmVudi5TRVNTSU9OX1NFQ1JFVCkpO1xuICAgIGFwcC51c2UoRXhwcmVzcy5zdGF0aWMoYCR7cm9vdH0vcHVibGljYCkpO1xuXG4gICAgYXBwLnVzZShwcm9jZXNzLmVudi5PUEVOQVBJX1NQRUMgfHwgJy9zcGVjJywgRXhwcmVzcy5zdGF0aWMoYXBpU3BlYykpO1xuICAgIGFwcC51c2UoXG4gICAgICBPcGVuQXBpVmFsaWRhdG9yLm1pZGRsZXdhcmUoe1xuICAgICAgICBhcGlTcGVjLFxuICAgICAgICB2YWxpZGF0ZVJlc3BvbnNlcyxcbiAgICAgICAgaWdub3JlUGF0aHM6IC8uKlxcL3NwZWMoXFwvfCQpLyxcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHJvdXRlcihyb3V0ZXMpIHtcbiAgICByb3V0ZXMoYXBwKTtcbiAgICBhcHAudXNlKGVycm9ySGFuZGxlcik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBsaXN0ZW4ocG9ydCA9IHByb2Nlc3MuZW52LlBPUlQpIHtcbiAgICBjb25zdCB3ZWxjb21lID0gKHApID0+ICgpID0+XG4gICAgICBsLmluZm8oXG4gICAgICAgIGB1cCBhbmQgcnVubmluZyBpbiAke1xuICAgICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WIHx8ICdkZXZlbG9wbWVudCdcbiAgICAgICAgfSBAOiAke29zLmhvc3RuYW1lKCl9IG9uIHBvcnQ6ICR7cH19YFxuICAgICAgKTtcblxuICAgIGh0dHAuY3JlYXRlU2VydmVyKGFwcCkubGlzdGVuKHBvcnQsIHdlbGNvbWUocG9ydCkpO1xuXG4gICAgcmV0dXJuIGFwcDtcbiAgfVxufVxuIl19