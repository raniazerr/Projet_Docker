# Todo API 📝
 
API REST de gestion de tâches construite avec Node.js et Express, entièrement dockerisée.
 
---
 
## Stack technique
 
- **Runtime** : Node.js 18
- **Framework** : Express 4
- **Containerisation** : Docker + Docker Compose
- **Tests** : Jest + Supertest
---
 
## Lancer le projet
 
### Prérequis
 
- [Node.js 18+](https://nodejs.org/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
### Sans Docker (développement)
 
```bash
# Installer les dépendances
npm install
 
# Lancer en mode développement (hot reload)
npm run dev
```
 
L'API est accessible sur `http://localhost:3000`
 
### Avec Docker
 
```bash
# Build et démarrage
docker compose up --build
 
# En arrière-plan
docker compose up --build -d
 
# Arrêter
docker compose down
```
 
L'API est accessible sur `http://localhost:3000`
 
---
 
## Scripts disponibles
 
| Commande | Description |
|----------|-------------|
| `npm run dev` | Démarre le serveur avec hot reload (nodemon) |
| `npm start` | Démarre le serveur en production |
| `npm test` | Lance tous les tests |
 
---
 
## Endpoints
 
| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/health` | Health check |
| GET | `/api/tasks` | Lister toutes les tâches |
| GET | `/api/tasks/:id` | Récupérer une tâche par ID |
| POST | `/api/tasks` | Créer une nouvelle tâche |
| PUT | `/api/tasks/:id` | Modifier une tâche existante |
| DELETE | `/api/tasks/:id` | Supprimer une tâche |
 
---
 
## Modèle de données
 
```json
{
  "id": "uuid-v4",
  "title": "string (optionnel)",
  "description": "string (requis)",
  "status": "pending | in-progress | done",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```
 
---
 
## Exemples de requêtes
 
### Créer une tâche
 
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Ma tâche", "description": "Description de la tâche", "status": "pending"}'
```
 
### Lister les tâches
 
```bash
curl http://localhost:3000/api/tasks
```
 
### Modifier une tâche
 
```bash
curl -X PUT http://localhost:3000/api/tasks/<id> \
  -H "Content-Type: application/json" \
  -d '{"status": "done"}'
```
 
### Supprimer une tâche
 
```bash
curl -X DELETE http://localhost:3000/api/tasks/<id>
```
 
---
 
## Tests
 
```bash
npm test
```
 
Les tests couvrent :
- **Tests unitaires** (`tests/unit/`) : modèle Task (create, findAll, findById, update, delete)
- **Tests d'intégration** (`tests/integration/`) : tous les endpoints de l'API

<img width="298" height="82" alt="image" src="https://github.com/user-attachments/assets/8219ed9b-e933-497d-9824-f8a556c58c89" />



---
 
## Structure du projet
 
```
todo-api/
├── src/
│   ├── routes/
│   │   └── tasks.js        # Routes CRUD
│   ├── models/
│   │   └── task.js         # Modèle de données (stockage en mémoire)
│   ├── middleware/
│   │   └── errorHandler.js # Gestion des erreurs
│   └── app.js              # Point d'entrée Express
├── tests/
│   ├── unit/
│   │   └── task.test.js    # Tests unitaires
│   └── integration/
│       └── api.test.js     # Tests d'intégration
├── Dockerfile
├── .dockerignore
├── docker-compose.yml
├── package.json
└── README.md
```
 
---
 
## Gestion de projet
 
Le projet est suivi via **GitHub Projects** en méthode Kanban.
 
Colonnes : `Todo` → `In Progress` → `Done`
 
