# Étape 1 : Build avec TypeScript
FROM node:18-alpine AS builder
WORKDIR /app

# Copier le code source
COPY tsconfig.json ./
COPY package*.json ./
COPY ./src ./src

# Installer les dépendances
RUN npm ci

# Build TypeScript → JavaScript
RUN npm run build

# Étape 2 : Image finale
FROM node:18-alpine AS runner
WORKDIR /app

# Copier uniquement les fichiers nécessaires à l'exécution
COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/public ./public

# Ajout d'un utilisateur non-root avec UID/GID fixes
RUN addgroup -g 1800 -S econorisgroup && adduser -u 1800 -S econorisuser -G econorisgroup
USER econorisuser

# Par défaut : lance le serveur
CMD ["node", "dist/server.js"]