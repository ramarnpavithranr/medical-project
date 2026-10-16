FROM python:3.11-slim

WORKDIR /app

# Install system dependencies for imaging libraries (Pillow/ReportLab)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libfreetype6-dev \
    libjpeg-dev \
    zlib1g-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Ensure storage directories exist
RUN mkdir -p uploads reports

EXPOSE 8000

ENV PORT=8000
ENV HOST=0.0.0.0

CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}"]
