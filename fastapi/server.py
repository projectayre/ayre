import uvicorn
from fastapi_ayre import app
uvicorn.run("fastapi_ayre:app", host="0.0.0.0", port=8000)