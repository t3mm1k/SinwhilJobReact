# test.py
import os
from dotenv import load_dotenv

load_dotenv()

TEST_VAR = os.getenv("MONGODB_URL")

if TEST_VAR:
    print(f"TEST_VAR: {TEST_VAR}")
else:
    print("TEST_VAR не установлен!")