# Déploiement — U Bagnu

Ce document décrit la configuration de déploiement continu sur VPS OVH
derrière Cloudflare Tunnel.

---

## Pré-requis

| Pré-requis | Détail |
|---|---|
| **Infra provisionnée** | VPS créé via le repo Gitea OpenTofu, tunnel Cloudflare actif |
| **Phase — app infra** | `client-a-infra-outputs` contenant les outputs du provisionnement |
| **Phase — app secrets** | `ubagnu-app` contenant les secrets applicatifs |
| **Runner GitHub** | Runner self-hosted Fluentech enregistré sur le repo, avec Phase CLI installé |
| **Répertoire VPS** | `/opt/ubagnu/` créé, `deploy` user avec accès Docker |

---

## Variables Phase attendues

### App : `client-a-infra-outputs` (env : `production`)

| Variable | Description |
|---|---|
| `VPS_IP` | Adresse IP du VPS OVH |
| `SSH_PORT` | Port SSH du VPS (ex : `2222`) |
| `DEPLOY_SSH_PRIVATE_KEY` | Clé privée SSH ED25519 du user `deploy` |
| `ORIGIN_CERT` | *(à venir)* Certificat Origin CA Cloudflare (PEM) |
| `ORIGIN_KEY` | *(à venir)* Clé privée du certificat Origin CA (PEM) |

### App : `ubagnu-app` (env : `production`)

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL publique du site |
| `POSTGRES_DB` | Nom de la base PostgreSQL |
| `POSTGRES_USER` | Utilisateur PostgreSQL |
| `POSTGRES_PASSWORD` | Mot de passe PostgreSQL |
| `DATABASE_URL` | URL de connexion complète |
| `APP_SECRET_KEY` | Clé secrète applicative |

### GitHub Secrets (repo settings)

| Secret | Description |
|---|---|
| `PHASE_SERVICE_TOKEN_INFRA` | Token de service Phase pour `client-a-infra-outputs` |
| `PHASE_SERVICE_TOKEN_APP` | Token de service Phase pour `ubagnu-app` |

---

## Premier déploiement

```bash
# 1. Préparer le VPS (une seule fois)
ssh deploy@<VPS_IP> -p <SSH_PORT> "mkdir -p /opt/ubagnu/certs"

# 2. Vérifier que le runner GitHub est actif
#    → Settings > Actions > Runners

# 3. Vérifier que les deux apps Phase sont configurées
#    et que les GitHub Secrets sont présents

# 4. Pousser sur main — le workflow se déclenche automatiquement
git push origin main
```

---

## Rollback

En cas de problème après un déploiement, déclencher le workflow **Deploy**
manuellement avec le SHA du dernier déploiement stable :

1. Aller sur **Actions → Deploy → Run workflow**
2. Renseigner le champ `sha` avec le SHA git cible (ex : `090e935`)
3. Lancer le workflow

Le workflow redéploie l'image correspondant à ce SHA.
> L'image doit encore être présente sur le VPS. Si elle a été purgée
> par `docker system prune`, relancer un push sur le SHA concerné.

---

## Dev local

```bash
# Copier les variables d'environnement
cp .env.example .env
# Remplir .env avec les valeurs de dev

# Démarrer la stack complète
docker compose -f deploy/docker-compose.yml up

# Ou simplement le serveur Next.js sans Docker
pnpm dev
```

---

## Architecture

```
GitHub Push (main)
        │
        ▼
GitHub Actions (runner self-hosted)
        │  Phase CLI → secrets infra (VPS_IP, SSH_PORT, DEPLOY_SSH_PRIVATE_KEY)
        │  Phase CLI → secrets app   (ubagnu-app)
        │
        ├── docker build ubagnu-app:<sha>
        ├── docker save | gzip | ssh docker load  (pas de registry)
        ├── scp docker-compose.yml + .env
        └── ssh: docker compose up -d

VPS OVH
  ┌─────────────────────────────────────────────┐
  │  Cloudflare Tunnel (cloudflared)            │
  │       │                                     │
  │       ▼                                     │
  │  [caddy]  →  [app:3000]  →  [postgres:5432] │
  │                                             │
  │  Aucun port entrant exposé (sauf SSH:2222)  │
  └─────────────────────────────────────────────┘
```

---

## Fichiers

| Fichier | Rôle |
|---|---|
| `.github/workflows/deploy.yml` | Workflow de déploiement principal |
| `.github/workflows/healthcheck.yml` | Vérification de disponibilité + alerte |
| `Dockerfile` | Build multi-stage Next.js standalone |
| `deploy/docker-compose.yml` | Stack caddy + app + postgres |
| `deploy/Caddyfile.tpl` | Template Caddy (envsubst) |
| `.env.example` | Modèle des variables d'environnement |
