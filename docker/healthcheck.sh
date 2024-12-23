#!/bin/bash

set -o errexit
set -o pipefail
set -o nounset

response=$(curl -s -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","id":1,"method":"getHealth"}' http://localhost:8899)

# Handle empty response
if [[ -z "$response" ]]; then
  echo "Empty response received from getHealth RPC call" >&2
  exit 1
fi

# Check for error in JSON response
if echo "$response" | jq -e '.error' > /dev/null; then
  echo "Error in getHealth response: $(echo "$response" | jq '.error')" >&2
  exit 1
fi

# Check for "ok" in result field
if ! echo "$response" | jq -e '.result | contains("ok")' > /dev/null; then
  echo "getHealth check failed: $(echo "$response" | jq '.result')" >&2
  exit 1
fi

exit 0
