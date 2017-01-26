// @flow

import superagent from 'superagent';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function getUrl(path = '') {
  return path;
}

function copyHeadersToRequest({request, headers}) {
  Object.keys(headers || {}).forEach(key => request.set(key, headers[key]));
}

export default class ApiClient {
  constructor(req: Object = {}) {
    methods.forEach((method) => {
      (this: Object)[method] = (path, requestData = {}) => {
        const {params, data} = requestData;

        return new Promise((resolve, reject) => {
          const url = getUrl(path);
          const request = superagent[method](url);

          if (params) {
            request.query(params);
          }

          if (__SERVER__) {
            copyHeadersToRequest({request, headers: req.headers});
          }

          request.set('Content-Type', 'application/json');
          request.set('Accept', 'application/json, text/javascript');

          if (data) {
            request.send(data);
          }

          request.end((err, response = {}) => {
            const {body, text} = response;

            if (err) {
              return reject(body || err);
            }

            return resolve(body || text);
          });
        });
      };
    });
  }
}
