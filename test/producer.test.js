
'use strict';

//
// dependencies
const chai    = require('chai');

//
// running local
if (process.env.NODE_ENV === 'local') {
  const path      = require('path');
  var dotEnvPath  = path.resolve('.env');
  require('dotenv').config({ path: dotEnvPath});
}

//
// handler
const handler    = require('../src/controllers/producer/_handler');

let id;

const registerData = {
  name: 'Editar este dado'
};

const registerDataError = {
  uname: 'Editar este dado'
};

describe('XY - Test Case Register Producer through endpoint /producer', () => {
  it('Should register an Producer.', (done) => {
    const event = {
      body: JSON.stringify(registerData)
    };
    handler.registerProducerRoute(event, {})
      .then(res => {
        chai.expect(res.statusCode).eq(201);

        const body = JSON.parse(res.body);

        chai.expect(body).to.be.an('object', 'Your body is not an object!');
        chai.expect(body.name).to.be.a('string', 'The field name is not a string!');

        id = body.id;

        done();
      }).catch(err => {
        return done(err);
      });
  });

  it('Should throw an error when user sent an invalid body.', (done) => {
    const event = {
      body: JSON.stringify(registerDataError)
    };
  
    handler.registerProducerRoute(event, {})
      .then(res => {
        chai.expect(res.statusCode).eq(400);
        done();
      }).catch(err => {
        return done(err);
      });
  });
});


describe('XY - Test Case Edit Producer through endpoint /producer/{id}', () => {
  it('Should edit the field name.', (done) => {
    const event = {
      pathParameters: {
        id: id
      },
      body: JSON.stringify(registerData)
    };
    
    handler.editProducerRoute(event, {})
      .then(res => {
        chai.expect(res.statusCode).eq(200);

        const body = JSON.parse(res.body);

        chai.expect(body).to.be.an('object', 'Your body is not an object!');
        chai.expect(body.name).to.be.a('string', 'The field name is not a string!');

        done();
      }).catch(err => {
        return done(err);
      });
  });

  it(`Should throw an error because the Producer ${id} not found.`, (done) => {
    const event = {
      pathParameters: {
        id: id
      },
      body: JSON.stringify(registerData)
    };

    handler.editProducerRoute(event, {})
      .then(res => {
        chai.expect(res.statusCode).eq(404);
        done();
      }).catch(err => {
        return done(err);
      });
  });

  it('Should throw an error when send an invalid body.', (done) => {
    const event = {
      pathParameters: {
        id: id
      },
      body: JSON.stringify(registerDataError)
    };

    handler.editProducerRoute(event, {})
      .then(res => {
        chai.expect(res.statusCode).eq(400);
        done();
      }).catch(err => {
        return done(err);
      });
  });
});

describe(`XY - Test Case Get Producer id ${id} through endpoint /producer/{id}`, () => {
  it('Should retrieve the register.', (done) => {
    const event = {
      pathParameters: {
        id: id
      }
    };
    
    handler.getProducerByIdRoute(event, {})
      .then(res => {
        chai.expect(res.statusCode).eq(200);
        const body = JSON.parse(res.body);

        chai.expect(body).to.be.an('object', 'Your body is not an object!');
        chai.expect(body.name).to.be.a('string', 'The field name is not a string!');
        done();
      }).catch(err => {
        return done(err);
      });
  });

  it(`Should throw an error because the Producer ${id} was not found.`, (done) => {
    const event = {
      pathParameters: {
        id: 0
      }
    };

    handler.getProducerByIdRoute(event, {})
      .then(res => {
        chai.expect(res.statusCode).eq(404);
        done();
      }).catch(err => {
        return done(err);
      });
  });
});

describe('XY - Test Case Get All Producer through endpoint /producer', () => {
  it('Should retrieve all Producer.', (done) => {
    const event = {
      queryStringParameters: {}
    };
    
    handler.getAllProducerRoute(event, {})
      .then(res => {
        chai.expect(res.statusCode).eq(200);
        const body = JSON.parse(res.body);

        chai.expect(body).to.be.an('object', 'Your body is not an object!');
        chai.expect(body.producer).to.be.an('array', 'The field producer is not an array!');
        chai.expect(body.nextPage).to.exist;
        done();
      }).catch(err => {
        return done(err);
      });
  });
});

describe(`XY - Test Case Delete Producer id ${id} through endpoint /producer/{id}`, () => {
  it('Should delete the register.', (done) => {
    const event = {
      pathParameters: {
        id: id
      }
    };
    
    handler.deleteProducerRoute(event, {})
      .then(res => {
        chai.expect(res.statusCode).eq(200);
        done();
      }).catch(err => {
        return done(err);
      });
  });

  it(`Should throw an error because the Producer ${id} was not found.`, (done) => {
    const event = {
      pathParameters: {
        id: id
      }
    };

    handler.deleteProducerRoute(event, {})
      .then(res => {
        chai.expect(res.statusCode).eq(404);
        done();
      }).catch(err => {
        return done(err);
      });
  });
});