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
   docker-compose up -d
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
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild and restart
docker-compose up -d --build
```

## Production Deployment

The application is configured for production deployment with:
- Optimized Next.js standalone build
- Multi-stage Docker build for smaller image size
- Security best practices (non-root user)
- Health checks and restart policies

## Environment Variables

Create a `.env.local` file for custom configuration:

```env
NODE_ENV=production
PORT=9010
HOSTNAME=0.0.0.0
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

## License

This project is licensed under the MIT License.