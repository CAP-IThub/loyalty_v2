#!/bin/bash

# === CONFIGURATIONS ===
LOCAL_BUILD_DIR=~/loyalty-app-v2/dist
REMOTE_USER=duluxcapici
REMOTE_HOST=192.1.2.204

# === DESTINATIONS ===
TARGET_DIRS=(
  /var/www/loyalty.capplc.com/
  /var/www/loyalty.capplc.com/rep-login
  /var/www/loyalty.capplc.com/admin-login
)

# === DEPLOY ===
echo "🚀 Starting deployment to $REMOTE_HOST..."

for DIR in "${TARGET_DIRS[@]}"; do
  echo "→ Pushing build to $DIR"
  ssh ${REMOTE_USER}@${REMOTE_HOST} "mkdir -p $DIR"
  scp -r ${LOCAL_BUILD_DIR}/* ${REMOTE_USER}@${REMOTE_HOST}:${DIR}
done

echo "✅ All deployments completed!"

