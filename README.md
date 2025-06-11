# IT Asset Tracker

A comprehensive IT asset management system built with Next.js, featuring QR code generation for mobile integration.

## Features

- **Asset Management**: Track PCs, laptops, printers, servers, phones, and other equipment
- **Employee Management**: Manage employee records and asset assignments
- **QR Code Integration**: Generate QR codes for assets (mobile app ready)
- **Admin Dashboard**: Comprehensive overview with statistics and charts
- **Responsive Design**: Works on desktop and mobile devices

## Quick Start

### Using Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd it-asset-tracker
   ```

2. **Run with Docker Compose**
   ```bash
   docker-compose up -d --build
   ```

3. **Access the application**
   - Open your browser and navigate to `http://localhost:9010`
   - Login with demo credentials:
     - Email: `admin@company.com`
     - Password: `admin123`

### Development Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run development server**
   ```bash
   npm run dev
   ```

3. **Access the application**
   - Open `http://localhost:3000`

## Docker Commands

### Build and Run
```bash
# Build the Docker image
docker build -t it-asset-tracker .

# Run the container
docker run -p 9010:9010 it-asset-tracker
```

### Using Docker Compose
```bash
# Start services
docker-compose up -d --build

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild and restart
docker-compose up -d --build --force-recreate
```

### Troubleshooting Docker

If you encounter build issues:

1. **Clean Docker cache and rebuild**
   ```bash
   docker system prune -a
   docker-compose build --no-cache
   docker-compose up -d
   ```

2. **Check build logs**
   ```bash
   docker-compose build --no-cache --progress=plain
   ```

3. **Check container logs**
   ```bash
   docker-compose logs it-asset-tracker
   ```

4. **Remove all containers and rebuild**
   ```bash
   docker-compose down --volumes --remove-orphans
   docker system prune -a
   docker-compose up -d --build
   ```

## Production Deployment

The application is configured for production deployment with:
- Multi-stage Docker build for optimal image size
- Static export for maximum performance
- Security best practices (non-root user)
- Health checks and restart policies
- Efficient caching layers

## Environment Variables

Create a `.env.local` file for custom configuration:

```env
NODE_ENV=production
PORT=9010
NEXT_TELEMETRY_DISABLED=1
```

## API Endpoints (Future Mobile App)

The QR codes generate URLs in the format:
- Asset details: `/asset/{assetId}`
- These endpoints are ready for mobile app integration

## Technology Stack

- **Frontend**: Next.js 13, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Charts**: Recharts
- **QR Codes**: qrcode library
- **Icons**: Lucide React
- **Deployment**: Docker, Docker Compose
- **Server**: serve (for static hosting)

## Architecture

This application uses Next.js static export for optimal performance and easy deployment. The Docker container uses a multi-stage build process:

1. **Dependencies Stage**: Installs all npm dependencies
2. **Builder Stage**: Builds the Next.js application
3. **Runner Stage**: Serves the static files using the `serve` package

The final image is optimized and runs as a non-root user for security.

## Docker Image Details

- **Base Image**: node:20-alpine
- **Final Size**: ~150MB (optimized multi-stage build)
- **Port**: 9010
- **User**: Non-root (nextjs:nodejs)
- **Health Check**: Included for container orchestration

## License

This project is licensed under the MIT License.