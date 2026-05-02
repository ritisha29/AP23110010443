import time
import logging
from fastapi import FastAPI, Request
from starlette.middleware.base import BaseHTTPMiddleware

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

class LoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        start_time = time.time()
        
        # Log the incoming request
        logger.info(f"Incoming Request: {request.method} {request.url.path}")
        
        # Process the request
        response = await call_next(request)
        
        # Calculate execution time
        process_time = time.time() - start_time
        
        # Log the response details
        logger.info(
            f"Completed Request: {request.method} {request.url.path} "
            f"- Status: {response.status_code} "
            f"- Time: {process_time:.4f}s"
        )
        
        return response

# Example Usage:
app = FastAPI()

# Add the middleware to the FastAPI application
app.add_middleware(LoggingMiddleware)

@app.get("/")
async def root():
    return {"message": "Hello, Campus Notifications Microservice!"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    print("Starting server with Logging Middleware on http://127.0.0.1:8000")
    uvicorn.run(app, host="127.0.0.1", port=8000)
