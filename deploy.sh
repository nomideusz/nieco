#!/bin/bash

# Exit on any error
set -e

# Check if caprover CLI is installed
if ! command -v caprover &> /dev/null; then
    echo "caprover CLI is not installed. Installing..."
    npm install -g caprover
fi

# Ask for app name if not provided
if [ -z "$1" ]; then
    read -p "Enter your CapRover app name: " APP_NAME
else
    APP_NAME=$1
fi

# Ask for CapRover server if not already configured
caprover logout || true
read -p "Enter your CapRover server URL (e.g., https://captain.example.com): " CAPTAIN_URL
read -p "Enter your CapRover password: " -s CAPTAIN_PASSWORD
echo ""

# Login to CapRover
caprover login -u $CAPTAIN_URL -p $CAPTAIN_PASSWORD

# Build the application
echo "Building the application..."
pnpm build

# Deploy to CapRover
echo "Deploying to CapRover..."
caprover deploy -a $APP_NAME

echo "Deployment complete! Your app is available at: http://$APP_NAME.$CAPTAIN_URL" 