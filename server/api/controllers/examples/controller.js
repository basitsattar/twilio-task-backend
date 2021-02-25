import ExamplesService from '../../services/examples.service';
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
export class Controller {
  getPhoneNumbers(req, res) {
    client
      .availablePhoneNumbers(req.params.code)
      .tollFree.list({ limit: 20 })
      .then((available_phone_number_country) =>
        res
          .status(200)
          .json({ response: available_phone_number_country, success: true })
      )
      .catch((error) =>
        res.status(500).json({ response: null, success: false, error })
      );
  }

  byId(req, res) {
    ExamplesService.byId(req.params.id).then((r) => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  }

  create(req, res) {
    res.status(201).json({ message: 'welcome' });
  }
}
export default new Controller();
