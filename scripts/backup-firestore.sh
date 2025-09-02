#!/bin/bash
set -e

# Configuration
PROJECT_ID="your-project-id"
BUCKET="gs://your-backup-bucket"
RETENTION_DAYS=30

# Create timestamp
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_PATH="$BUCKET/firestore/$TIMESTAMP"

echo "Starting Firestore backup to $BACKUP_PATH"

# Run backup
gcloud firestore export "$BACKUP_PATH" --project="$PROJECT_ID"

echo "Backup completed successfully"

# Clean up old backups
echo "Cleaning up backups older than $RETENTION_DAYS days..."
gcloud storage ls "$BUCKET/firestore/" | while read -r path; do
    backup_date=$(echo "$path" | grep -Eo '[0-9]{8}_[0-9]{6}')
    if [ -n "$backup_date" ]; then
        backup_timestamp=$(date -d "${backup_date:0:8} ${backup_date:9:2}:${backup_date:11:2}:${backup_date:13:2}" +%s)
        current_timestamp=$(date +%s)
        age_days=$(( (current_timestamp - backup_timestamp) / 86400 ))
        
        if [ "$age_days" -gt "$RETENTION_DAYS" ]; then
            echo "Deleting backup $path (age: $age_days days)"
            gcloud storage rm "$path**" --recursive
        fi
    fi
done

echo "Cleanup completed"