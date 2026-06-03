const { v4: uuidv4 } = require('uuid');

let tasks = [];

const Task = {
  findAll: () => tasks,

  findById: (id) => tasks.find(t => t.id === id),

  create: ({ title = '', description, status = 'pending' }) => {
    const now = new Date().toISOString();
    const task = {
      id: uuidv4(),
      title,
      description,
      status,
      createdAt: now,
      updatedAt: now,
    };
    tasks.push(task);
    return task;
  },

  update: (id, { title, description, status }) => {
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return null;
    tasks[index] = {
      ...tasks[index],
      ...(title !== undefined && { title }),
      ...(description !== undefined && { description }),
      ...(status !== undefined && { status }),
      updatedAt: new Date().toISOString(),
    };
    return tasks[index];
  },

  delete: (id) => {
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return false;
    tasks.splice(index, 1);
    return true;
  },
};

module.exports = Task;