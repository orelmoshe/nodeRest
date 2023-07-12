import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

import server from '../api/index.js';
import { resetStorage } from '../api/services/storage.js';

chai.use(chaiHttp);
chai.should();
describe('nodeRest', () => {
	before(async (done) => {
		await resetStorage();
		done();
	});

	after(async (done) => {
		await resetStorage();
		done();
	});

	describe('/api request', () => {
		it('it should GET the health', (done) => {
			chai
				.request(server)
				.get('/api/health')
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(200);
					res.body.should.be.eql({ data: 'isAlive' });
					done();
				});
		});

		it('it should POST a create-entities', (done) => {
			let body = {
				numOfEntities: 10,
			};
			chai
				.request(server)
				.post('/api/create-entities')
				.send(body)
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(200);
					done();
				});
		});

		it('it should GET the actionIds', (done) => {
			chai
				.request(server)
				.get('/api/get-actionIds')
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(200);
					done();
				});
		});

		it('it should POST a upload csv', (done) => {
			let body = {};
			chai
				.request(server)
				.post('/api/csv')
				.send(body)
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(200);
					done();
				});
		});
	});
});
