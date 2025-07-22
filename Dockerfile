FROM python:3.10-slim
WORKDIR /app
#COPY requirements.txt .
#RUN pip install -r requirements.txt
#COPY . .
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]

# Use official Python image
FROM python:3.10-slim

# Set work directory
WORKDIR /app

# Copy and install dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire backend
COPY backend .

# Expose the correct port
EXPOSE 10000

# Start the app with Gunicorn and Uvicorn worker
CMD ["gunicorn", "app.main:app", "--workers", "4", "--worker-class", "uvicorn.workers.UvicornWorker", "--bind", "0.0.0.0:10000"]


# Run the app with gunicorn
CMD ["gunicorn", "app.main:app", "--workers", "4", "--worker-class", "uvicorn.workers.UvicornWorker", "--bind", "0.0.0.0:10000"]
