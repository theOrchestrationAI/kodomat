# SlavkoKernel - Upute za Deploy

Ovaj dokument sadrži detaljne upute za deploy SlavkoKernel aplikacije na Vercel i Firebase.

## Preduvjeti

- Node.js 18 ili noviji
- npm 8 ili noviji
- Vercel račun
- Firebase račun
- GitHub račun

## 1. Postavljanje okruženja

### 1.1. Kloniranje repozitorija

```bash
git clone https://github.com/theOrchestrationAI/v0-slavkokernellaunchkit.git
cd v0-slavkokernellaunchkit
```

### 1.2. Instalacija ovisnosti

```bash
npm install
```

### 1.3. Postavljanje environment varijabli

Kopirajte `.env.local.example` u `.env.local` i popunite potrebne vrijednosti:

```bash
cp .env.local.example .env.local
```

## 2. Deploy na Vercel

### 2.1. Povezivanje s Vercel računom

```bash
npm install -g vercel
vercel login
```

### 2.2. Konfiguracija Vercel projekta

```bash
vercel
```

Slijedite upute za povezivanje s GitHub repozitorijem.

### 2.3. Postavljanje environment varijabli na Vercel

U Vercel dashboardu:
1. Odaberite svoj projekt
2. Idite na "Settings" > "Environment Variables"
3. Dodajte sve potrebne varijable iz `.env.production`

### 2.4. Deploy na produkciju

```bash
vercel --prod
```

## 3. Deploy na Firebase

### 3.1. Inicijalizacija Firebase projekta

```bash
npm install -g firebase-tools
firebase login
firebase use --add
```

Odaberite svoj Firebase projekt.

### 3.2. Deploy Firebase konfiguracije

```bash
firebase deploy --only firestore:rules,firestore:indexes
```

### 3.3. Deploy Firebase funkcija

```bash
firebase deploy --only functions
```

### 3.4. Deploy na Firebase Hosting

```bash
npm run build
npm run export
firebase deploy --only hosting
```

## 4. Kontinuirani deploy s GitHub Actions

### 4.1. Postavljanje GitHub Secrets

U GitHub repozitoriju:
1. Idite na "Settings" > "Secrets" > "Actions"
2. Dodajte sljedeće tajne:
   - `VERCEL_TOKEN`: Vaš Vercel token
   - `VERCEL_ORG_ID`: ID vaše Vercel organizacije
   - `VERCEL_PROJECT_ID`: ID vašeg Vercel projekta
   - `FIREBASE_SERVICE_ACCOUNT`: JSON sadržaj Firebase service account ključa
   - `FIREBASE_PROJECT_ID`: ID vašeg Firebase projekta

### 4.2. Aktivacija GitHub Actions workflowa

GitHub Actions workflow će se automatski pokrenuti pri svakom push na `main` granu.

## 5. Provjera deploya

### 5.1. Vercel

Posjetite URL vaše Vercel aplikacije (npr. `https://slavkokernel.vercel.app`).

### 5.2. Firebase

Posjetite URL vaše Firebase aplikacije (npr. `https://slavkokernel.web.app`).

## 6. Monitoring i održavanje

### 6.1. Vercel Analytics

Pratite performanse aplikacije u Vercel Analytics dashboardu.

### 6.2. Firebase Performance Monitoring

Pratite performanse Firebase funkcija i hostinga u Firebase konzoli.

### 6.3. Sentry

Pratite greške i probleme u Sentry dashboardu.

## 7. Rješavanje problema

### 7.1. Vercel deploy problemi

Provjerite build logove u Vercel dashboardu.

### 7.2. Firebase deploy problemi

Provjerite Firebase deploy logove:

```bash
firebase deploy --debug
```

### 7.3. GitHub Actions problemi

Provjerite GitHub Actions logove u "Actions" tabu GitHub repozitorija.