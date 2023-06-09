# Physiotherapist

## SETUP

```
git clone

npm i

# Créer le .env à la racine du projet et dans le dossier packages/physiotherpist-api
# Créer la BDD

# Générer les tables
nx run physiotherapist-api:typeorm-run-migrations

# Lancer le back
nx serve physiotherapist-api


# Lancer le front
nx serve physiotherapist-app
```

## Générer les migrations

```
nx run physiotherapist-api:typeorm-generate-migrations
```
