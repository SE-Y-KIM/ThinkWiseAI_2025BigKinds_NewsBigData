import os
from dotenv import load_dotenv

# .env 파일 로드
load_dotenv()

# OpenAI 설정
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "sk-your-openai-api-key-here")

# 코스콤 API 설정
KOSCOM_API_KEY = os.getenv("KOSCOM_API_KEY", "your-koscom-api-key-here")

# JWT 보안 설정
SECRET_KEY = os.getenv("SECRET_KEY", "your-very-secret-key")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))

# 애플리케이션 설정
APP_NAME = "ThinkWise AI Backend"
APP_VERSION = "1.0.0"
DEBUG = os.getenv("DEBUG", "False").lower() == "true"
