# SlavkoKernel Operations Runbook

This document provides step-by-step procedures for common operational tasks and incident response for the SlavkoKernel system.

## Table of Contents

1. [System Overview](#system-overview)
2. [Deployment Procedures](#deployment-procedures)
3. [Monitoring](#monitoring)
4. [Incident Response](#incident-response)
5. [Backup and Recovery](#backup-and-recovery)
6. [Common Tasks](#common-tasks)

## System Overview

SlavkoKernel consists of the following components:

- **Frontend**: Next.js application hosted on Firebase Hosting
- **Backend API**: FastAPI service running on Kubernetes
- **Database**: Firestore for storing translation suggestions and user data
- **Cache**: Redis for caching API responses and AI results
- **Monitoring**: Prometheus and Grafana for metrics, Sentry for error tracking

## Deployment Procedures

### Frontend Deployment

Frontend deployment is handled automatically by GitHub Actions when changes are pushed to the main branch.

Manual deployment:

```bash
cd web
npm run build && npm run export
firebase deploy --only hosting
```

### Backend Deployment

Backend deployment is handled by GitHub Actions which builds and pushes the Docker image, then updates the Kubernetes deployment.

Manual deployment:

```bash
# Build and push Docker image
cd api
docker build -t gcr.io/your-project-id/slavkokernel-api:latest .
docker push gcr.io/your-project-id/slavkokernel-api:latest

# Update Kubernetes deployment
kubectl apply -f k8s/deployment.yml
kubectl rollout status deployment/slavkokernel-api
```

### Rollback Procedures

#### Frontend Rollback

```bash
firebase hosting:clone your-project-id:live your-project-id:live --version=VERSION_ID
```

Where VERSION_ID is the previous version ID from Firebase console.

#### Backend Rollback

```bash
kubectl rollout undo deployment/slavkokernel-api
```

Or to a specific revision:

```bash
kubectl rollout undo deployment/slavkokernel-api --to-revision=2
```

## Monitoring

### Accessing Dashboards

- **Grafana**: https://grafana.your-domain.com (credentials in Secret Manager)
- **Prometheus**: https://prometheus.your-domain.com (internal access only)
- **Sentry**: https://sentry.io/organizations/your-org/ (SSO login)

### Alert Notifications

Alerts are sent to:
- Slack channel: #slavkokernel-alerts
- Email: oncall@your-domain.com
- PagerDuty for critical alerts

## Incident Response

### Incident Severity Levels

- **P0**: Complete service outage or data loss
  - Response: Immediate (24/7)
  - Notification: PagerDuty + Slack + Email
  - Target resolution: < 2 hours

- **P1**: Partial service degradation
  - Response: Within 1 hour during business hours
  - Notification: Slack + Email
  - Target resolution: < 8 hours

- **P2**: Minor issues, non-critical bugs
  - Response: Next business day
  - Notification: Slack
  - Target resolution: < 1 week

### Incident Response Procedure

1. **Acknowledge** the alert and notify the team
2. **Assess** the severity and impact
3. **Investigate** using logs and monitoring dashboards
4. **Mitigate** - apply immediate fixes to restore service
5. **Resolve** the underlying issue
6. **Document** in the post-mortem

### Common Issues and Solutions

#### API Service Unavailable

1. Check Kubernetes pod status:
   ```bash
   kubectl get pods -l app=slavkokernel-api
   ```

2. Check pod logs:
   ```bash
   kubectl logs -l app=slavkokernel-api
   ```

3. Check if Redis is available:
   ```bash
   kubectl exec -it $(kubectl get pod -l app=slavkokernel-api -o jsonpath='{.items[0].metadata.name}') -- redis-cli -h redis ping
   ```

4. Restart the deployment if needed:
   ```bash
   kubectl rollout restart deployment/slavkokernel-api
   ```

#### High Error Rate

1. Check Sentry for error details
2. Check API logs for error patterns
3. Check recent deployments that might have introduced issues
4. Roll back if necessary using the rollback procedure

## Backup and Recovery

### Backup Schedule

- **Firestore**: Daily backups at 2:00 AM UTC
- **Retention**: 30 days for daily backups, 90 days for weekly backups

### Manual Backup

```bash
./scripts/backup-firestore.sh
```

### Restore Procedure

1. Identify the backup to restore:
   ```bash
   gcloud storage ls gs://your-backup-bucket/firestore/
   ```

2. Create a new Firestore database (if restoring to a different project):
   ```bash
   gcloud firestore databases create --project=target-project-id --location=us-central
   ```

3. Import the backup:
   ```bash
   gcloud firestore import gs://your-backup-bucket/firestore/YYYY-MM-DD_HHMMSS --project=your-project-id
   ```

4. Verify the restore:
   - Check document counts in critical collections
   - Verify application functionality

## Common Tasks

### Adding a New Admin User

1. Add the user to Firebase Authentication
2. Set custom claims for admin role:
   ```bash
   firebase functions:shell
   > await admin.auth().setCustomUserClaims('USER_UID', { admin: true })
   ```

### Rotating API Keys

1. Generate new keys in the respective service
2. Update the keys in Secret Manager:
   ```bash
   gcloud secrets versions add api-keys --data-file="/path/to/new/keys.json"
   ```
3. Restart the API deployment to pick up new keys:
   ```bash
   kubectl rollout restart deployment/slavkokernel-api
   ```

### Scaling the API

For temporary scaling:
```bash
kubectl scale deployment/slavkokernel-api --replicas=5
```

For permanent scaling, update the HPA:
```bash
kubectl edit hpa slavkokernel-api-hpa
```

### Viewing Application Logs

```bash
# API logs
kubectl logs -l app=slavkokernel-api --tail=100 -f

# Firebase Functions logs
firebase functions:log

# Frontend logs (from Firebase Hosting)
firebase hosting:log
```