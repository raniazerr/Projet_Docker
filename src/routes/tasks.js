const express = require('express');
const router = express.Router();
const Task = require('../models/task');

// Lister toutes les tâches
router.get('/', (req, res) => {
  res.json(Task.findAll());
});

// Voir une tâche
router.get('/:id', (req, res) => {
  const task = Task.findById(req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
});

// Créer une tâche
router.post('/', (req, res) => {
  const { description, title, status } = req.body;
  if (!description) {
    return res.status(400).json({ error: 'Description is required' });
  }
  const task = Task.create({ title, description, status });
  res.status(201).json(task);
});

// Modifier une tâche
router.put('/:id', (req, res) => {
  const task = Task.update(req.params.id, req.body);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
});

// Supprimer une tâche
router.delete('/:id', (req, res) => {
  const deleted = Task.delete(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Task not found' });
  res.status(204).send();
});

module.exports = router;