import openai
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

# Step 1: Upload your fine-tuning dataset
fine_tuning_data_path = "../server/data/homelistings_fine_tuning.jsonl"

with open(fine_tuning_data_path, "rb") as f:
    file = openai.File.create(file=f, purpose="fine-tune")

print(f"File ID: {file['id']}")

# Step 2: Create the fine-tuning job
fine_tune_job = openai.FineTune.create(
    training_file=file['id'],
    model="gpt-3.5-turbo"  # or another base model you want to fine-tune
)

print(f"Fine-tuning Job ID: {fine_tune_job['id']}")
