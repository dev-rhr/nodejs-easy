var FormData = require('form-data')
const http = require('https')

class Easy {

    constructor(hostname, port, path){
      this.hostname = hostname
      this.port = port
      this.path = path
    }

    async upload(fileKey, file, metadata){
      let form = new FormData();
      form.append(fileKey, file)
      Object.keys(metadata).forEach(key => {
        form.append(key, metadata[key])
      })
      let options = {
        hostname: this.hostname,
        port: this.port,
        path: this.path,
        method: 'POST',
        headers: form.getHeaders()
      }
      let getURLPromise = new Promise(function (resolve, error) {
        const req = http.request(options, (res) => {
          var buffer = "";
          res.on('data', function(chunk) {
              buffer += chunk;
          });
          res.on('end', function() {
            if(res.statusCode === 200){
              let entities = JSON.parse(buffer.toString());
              resolve(entities);
            } else {
              error(buffer.toString())
            }
          });
        })
        req.on('error', (e) => {
          error(e)
        })
        form.pipe(req)                  
      })
      return await getURLPromise
    }

}

module.exports = Easy