/* eslint-disable no-unused-expressions */
const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;
const pokemon = require('../routes/pokemon');

chai.use(chaiHttp);

describe('Read (getting all)', () => {
  it('Should get all Pokemon', () => {
    chai
      .request('http://localhost:3000')
      .get('/pokemon')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
      });
  });
});
