const request = require('supertest');
const app = require('../../src/app');

describe('Tasks API', () => {
  let createdId;

  test('GET /health retourne ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('GET /api/tasks retourne un tableau', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /api/tasks crée une tâche', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ description: 'Tâche de test', title: 'Test' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.description).toBe('Tâche de test');
    createdId = res.body.id;
  });

  test('POST /api/tasks sans description retourne 400', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Sans description' });
    expect(res.statusCode).toBe(400);
  });

  test('GET /api/tasks/:id retourne la tâche', async () => {
    const res = await request(app).get(`/api/tasks/${createdId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(createdId);
  });

  test('GET /api/tasks/:id avec faux id retourne 404', async () => {
    const res = await request(app).get('/api/tasks/faux-id');
    expect(res.statusCode).toBe(404);
  });

  test('PUT /api/tasks/:id modifie la tâche', async () => {
    const res = await request(app)
      .put(`/api/tasks/${createdId}`)
      .send({ status: 'done' });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('done');
  });

  test('DELETE /api/tasks/:id supprime la tâche', async () => {
    const res = await request(app).delete(`/api/tasks/${createdId}`);
    expect(res.statusCode).toBe(204);
  });

  test('DELETE /api/tasks/:id avec faux id retourne 404', async () => {
    const res = await request(app).delete('/api/tasks/faux-id');
    expect(res.statusCode).toBe(404);
  });
});