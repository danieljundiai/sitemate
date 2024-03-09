const request = require('supertest');
const app = require('./server'); 

describe('API server', () => {
  let api;

  beforeAll(() => {
    api = app.listen(5000, () => console.log('Test server running on port 5000'));
  });

  afterAll((done) => {
    console.log('Stopping test server');
    api.close(done);
  });

  it('responds to get /item with status 200', async () => {
    const response = await request(api).get('/item');
    expect(response.statusCode).toBe(200);
  });

  it('creates a new item', async () => {
    const response = await request(api)
      .post('/item')
      .send({
        id: 2,
        title: 'Test Title',
        description: 'Test Description'
      });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('title', 'Test Title');
  });
  
  it('deletes an existing item', async () => {
    const newItem = await request(api)
      .post('/item')
      .send({
        id: 2,
        title: 'Title',
        description: 'Description'
      });
        
    const deleteResponse = await request(api)
      .delete(`/item/${newItem.body.id}`);
  
    expect(deleteResponse.statusCode).toBe(204); 
  
    const fetchResponse = await request(api).get(`/item/${newItem.body.id}`);
    expect(fetchResponse.statusCode).toBe(404); 
  });
  

  it('updates an existing item', async () => {
    const newItem = await request(api)
      .post('/item')
      .send({
        id: 2,
        title: 'Title',
        description: 'Description'
      });
  
    const updatedItem = {
      id: 2,
      title: 'Updated Title',
      description: 'Updated Description'
    };
  
    const updateResponse = await request(api)
      .put(`/item/${newItem.body.id}`)
      .send(updatedItem);
  
    expect(updateResponse.statusCode).toBe(200);
    expect(updateResponse.body).toHaveProperty('id', 2);
    expect(updateResponse.body).toHaveProperty('title', 'Updated Title');
    expect(updateResponse.body).toHaveProperty('description', 'Updated Description');
  
  });
  
  
});

