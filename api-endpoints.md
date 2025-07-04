# API Endpoints pour Erlang-Calc

## Modèles Prisma

```prisma
// Modèles de base
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  simulations      Simulation[]
  favorites        Simulation[]  @relation("UserFavorites")
  comments         Comment[]
  notificationSettings NotificationSettings?
}

model Simulation {
  id          String   @id @default(cuid())
  name        String
  description String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  parameters  Json    // Stocke les paramètres de simulation
  results     Json    // Stocke les résultats calculés

  userId      String
  user        User     @relation(fields: [userId], references: [id])
  
  favoritedBy User[]   @relation("UserFavorites")
  comments    Comment[]
  shares      SimulationShare[]

  @@index([userId])
}

model SimulationShare {
  id           String     @id @default(cuid())
  simulationId String
  simulation   Simulation @relation(fields: [simulationId], references: [id])
  sharedWithEmail String
  permission   String     // 'view' ou 'edit'
  createdAt    DateTime   @default(now())

  @@index([simulationId])
  @@index([sharedWithEmail])
}

model Comment {
  id           String     @id @default(cuid())
  content      String
  createdAt    DateTime   @default(now())
  updatedAt    DateTime   @updatedAt
  
  simulationId String
  simulation   Simulation @relation(fields: [simulationId], references: [id])
  
  userId       String
  user         User       @relation(fields: [userId], references: [id])

  @@index([simulationId])
  @@index([userId])
}

model NotificationSettings {
  id        String   @id @default(cuid())
  userId    String   @unique
  user      User     @relation(fields: [userId], references: [id])

  // Notifications par email
  emailSimulationShared Boolean @default(true)
  emailNewComment       Boolean @default(true)

  // Notifications push
  pushNotificationLevel String  @default("all") // 'all', 'important', 'none'

  @@index([userId])
}
```

## Simulations

### GET /api/simulations
Récupère la liste des simulations de l'utilisateur connecté.

**Query Parameters:**
- `page`: number (default: 1)
- `limit`: number (default: 10)
- `search`: string (optionnel)
- `sortBy`: 'date' | 'name' (default: 'date')
- `sortOrder`: 'asc' | 'desc' (default: 'desc')
- `favorite`: boolean (optionnel) - filtre les favoris uniquement

**Response:**
```typescript
{
  data: {
    id: string
    name: string
    description: string
    createdAt: Date
    updatedAt: Date
    isFavorite: boolean
    parameters: {
      traffic: number
      holdTime: number
      targetBlockingRate: number
      agentsCount: number
      workingHours: {
        start: string // format: "HH:mm"
        end: string // format: "HH:mm"
      }
    }
    results: {
      recommendedAgents: number
      blockingRate: number
      utilizationRate: number
      averageWaitTime: number
    }
  }[]
  meta: {
    total: number
    page: number
    lastPage: number
  }
}
```

### GET /api/simulations/:id
Récupère les détails d'une simulation spécifique.

**Response:** Même structure qu'un élément de la liste ci-dessus

### POST /api/simulations
Crée une nouvelle simulation et calcule immédiatement les résultats.

**Body:**
```typescript
{
  name: string
  description?: string
  parameters: {
    traffic: number // Trafic en Erlangs
    holdTime: number // Temps moyen de traitement en secondes
    targetBlockingRate: number // Taux de blocage cible en pourcentage
    agentsCount: number // Nombre d'agents initial
    workingHours: {
      start: string // format: "HH:mm"
      end: string // format: "HH:mm"
    }
  }
}
```

### PUT /api/simulations/:id
Met à jour une simulation existante.

**Body:** Même structure que POST avec tous les champs optionnels

### DELETE /api/simulations/:id
Supprime une simulation.

### POST /api/simulations/:id/favorite
Ajoute/retire une simulation des favoris.

**Body:**
```typescript
{
  favorite: boolean
}
```

### POST /api/simulations/:id/share
Partage une simulation avec d'autres utilisateurs.

**Body:**
```typescript
{
  users: {
    email: string
    permission: 'view' | 'edit'
  }[]
}
```

## Commentaires

### GET /api/simulations/:id/comments
Récupère les commentaires d'une simulation.

**Query Parameters:**
- `page`: number (default: 1)
- `limit`: number (default: 20)

**Response:**
```typescript
{
  data: {
    id: string
    content: string
    createdAt: Date
    updatedAt: Date
    user: {
      id: string
      name: string
      avatar?: string
    }
  }[]
  meta: {
    total: number
    page: number
    lastPage: number
  }
}
```

### POST /api/simulations/:id/comments
Ajoute un commentaire à une simulation.

**Body:**
```typescript
{
  content: string
}
```

### PUT /api/simulations/:id/comments/:commentId
Modifie un commentaire.

**Body:**
```typescript
{
  content: string
}
```

### DELETE /api/simulations/:id/comments/:commentId
Supprime un commentaire.

## Notifications

### GET /api/notifications/settings
Récupère les paramètres de notification de l'utilisateur.

**Response:**
```typescript
{
  emailSimulationShared: boolean
  emailNewComment: boolean
  pushNotificationLevel: 'all' | 'important' | 'none'
}
```

### PUT /api/notifications/settings
Met à jour les paramètres de notification.

**Body:**
```typescript
{
  emailSimulationShared?: boolean
  emailNewComment?: boolean
  pushNotificationLevel?: 'all' | 'important' | 'none'
}
```

## Statistiques Dashboard

### GET /api/dashboard/stats
Récupère les statistiques pour le dashboard.

**Query Parameters:**
- `period`: 'day' | 'week' | 'month' | 'year' (default: 'week')

**Response:**
```typescript
{
  simulationsCount: {
    total: number
    favorites: number
  }
  averageMetrics: {
    blockingRate: number
    utilizationRate: number
    waitTime: number
  }
  timeline: {
    date: string // format: "YYYY-MM-DD"
    simulations: number
  }[]
  recentSimulations: {
    id: string
    name: string
    date: Date
    isFavorite: boolean
  }[]
}
```

## Zones Géographiques

### GET /api/zones
Récupère la liste des zones géographiques disponibles.

**Response:**
```typescript
{
  data: {
    id: string
    name: string
    code: string
    coordinates: {
      lat: number
      lng: number
    }
    bounds: {
      north: number
      south: number
      east: number
      west: number
    }
    metrics: {
      population: number
      density: number
      businessCount: number
    }
  }[]
}
```

### GET /api/zones/:id/traffic
Récupère les données de trafic historiques pour une zone.

**Query Parameters:**
- `startDate`: string // format: "YYYY-MM-DD"
- `endDate`: string // format: "YYYY-MM-DD"

**Response:**
```typescript
{
  data: {
    date: string // format: "YYYY-MM-DD"
    hourly: {
      hour: number // 0-23
      traffic: number // en Erlangs
      calls: number
      averageHoldTime: number // en secondes
    }[]
  }[]
}
``` 