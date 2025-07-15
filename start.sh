#!/bin/bash

echo "🔍 PATH: $PATH"
echo "🔍 Python location: $(which python)"
echo "🔍 Gunicorn location: $(which gunicorn || echo 'Not found')"

exec gunicorn app.main:app \
  --workers 4 \
  --worker-class uvicorn.workers.UvicornWorker \
  --bind 0.0.0.0:$PORT

