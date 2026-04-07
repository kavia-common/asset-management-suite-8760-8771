#!/bin/bash
cd /home/kavia/workspace/code-generation/asset-management-suite-8760-8771/inventory_react_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

