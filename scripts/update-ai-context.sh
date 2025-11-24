#!/bin/bash

# Update AI Context Script
# Usage: ./update-ai-context.sh "Description of change"

DESCRIPTION="$1"

if [ -z "$DESCRIPTION" ]; then
  echo "❌ Error: Description required"
  echo "Usage: ./update-ai-context.sh 'Description of change'"
  exit 1
fi

# Update timestamp in all context files
TIMESTAMP=$(date -u +%Y-%m-%dT%H:%M:%SZ)

echo "📝 Updating AI context..."

# Update recent_changes.json
CHANGES_FILE=".github/ai-context/metadata/recent_changes.json"
if [ -f "$CHANGES_FILE" ]; then
  # Add new change entry (requires jq for JSON manipulation)
  if command -v jq &> /dev/null; then
    TEMP=$(mktemp)
    jq --arg ts "$TIMESTAMP" --arg desc "$DESCRIPTION" \
      '.last_updated = $ts | .changes += [{date: $ts, type: "update", description: $desc}]' \
      "$CHANGES_FILE" > "$TEMP"
    mv "$TEMP" "$CHANGES_FILE"
  else
    echo "⚠️  jq not installed, skipping JSON update"
  fi
fi

# Git commit
git add .github/ai-context/
git commit -m "docs(ai-context): $DESCRIPTION"

echo "✅ AI context updated and committed"
echo "📅 Timestamp: $TIMESTAMP"
echo "📄 Description: $DESCRIPTION"
