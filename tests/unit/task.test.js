const Task = require('../../src/models/task');

describe('Task Model', () => {
  beforeEach(() => {
    // Vider les tâches avant chaque test
    Task.findAll().length = 0;
    Task.findAll().splice(0);
  });

  test('crée une tâche avec les bons champs', () => {
    const task = Task.create({ description: 'Test task' });
    expect(task).toHaveProperty('id');
    expect(task.description).toBe('Test task');
    expect(task.status).toBe('pending');
    expect(task).toHaveProperty('createdAt');
  });

  test('findAll retourne toutes les tâches', () => {
    Task.create({ description: 'Tâche 1' });
    Task.create({ description: 'Tâche 2' });
    expect(Task.findAll()).toHaveLength(2);
  });

  test('findById retourne la bonne tâche', () => {
    const task = Task.create({ description: 'Tâche ciblée' });
    const found = Task.findById(task.id);
    expect(found).toEqual(task);
  });

  test('findById retourne undefined si id inexistant', () => {
    const found = Task.findById('id-qui-nexiste-pas');
    expect(found).toBeUndefined();
  });

  test('update modifie une tâche existante', () => {
    const task = Task.create({ description: 'A modifier' });
    const updated = Task.update(task.id, { status: 'done' });
    expect(updated.status).toBe('done');
  });

  test('update retourne null si id inexistant', () => {
    const result = Task.update('faux-id', { status: 'done' });
    expect(result).toBeNull();
  });

  test('delete supprime une tâche', () => {
    const task = Task.create({ description: 'A supprimer' });
    const deleted = Task.delete(task.id);
    expect(deleted).toBe(true);
    expect(Task.findById(task.id)).toBeUndefined();
  });

  test('delete retourne false si id inexistant', () => {
    const result = Task.delete('faux-id');
    expect(result).toBe(false);
  });
});