from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
import logging
import sentry_sdk
from prometheus_client import make_asgi_app
import os

from app.routers import health, suggestions

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
)
logger = logging.getLogger(__name__)

# Initialize Sentry if DSN is provided
sentry_dsn = os.getenv("SENTRY_DSN")
if sentry_dsn:
    sentry_sdk.init(
        dsn=sentry_dsn,
        traces_sample_rate=0.2,
        profiles_sample_rate=0.1,
    )

app = FastAPI(
    title="SlavkoKernel API",
    version="0.1.0",
    description="API for SlavkoKernel translation suggestions"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://slavkokernel.web.app",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add trusted host middleware
app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=["api.slavkokernel.com", "localhost", "127.0.0.1"]
)

# Create metrics endpoint for Prometheus
metrics_app = make_asgi_app()
app.mount("/metrics", metrics_app)

# Include routers
app.include_router(health.router)
app.include_router(suggestions.router, prefix="/suggestions")

@app.on_event("startup")
async def startup_event():
    logger.info("Starting SlavkoKernel API")

@app.on_event("shutdown")
async def shutdown_event():
    logger.info("Shutting down SlavkoKernel API")