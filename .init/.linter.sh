#!/bin/bash
cd /home/kavia/workspace/code-generation/hackathon-hub-145054-145063/hackathon_landing_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

