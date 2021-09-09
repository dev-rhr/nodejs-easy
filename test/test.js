var assert = require('assert')
const fs = require('fs')
const Easy = require('../easy.js')

describe('upload', function () {
  this.timeout(4000);
  // please fill the hostname, port and uri, since i haven't got my own mock server
  const easy = new Easy("<<some-api.com>>", 443, "/some-uri")
  it('Should be able to get "ok" from status value', async () => {
    const entity = await easy.upload("file", fs.createReadStream("./test/payload/id-document.png"), 
    {
      "some_metadata": "123123"
    })
    assert.strictEqual(entity.status, 'ok')
  });
});
