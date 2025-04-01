import pandas as pd
import numpy as np

# Constants
NUM_SAMPLES = 5000

# Set random seed for reproducibility
np.random.seed(42)

# Assuming the applicant data is already generated or exists as a DataFrame
# Generate applicant_ids based on existing applicant input dataset
applicant_ids = [f"APP{i:05d}" for i in range(1, NUM_SAMPLES + 1)]

# Generate credit scores (normal distribution, mean 680, std 100)
credit_score = np.random.normal(loc=680, scale=100, size=NUM_SAMPLES).astype(int)
credit_score = np.clip(credit_score, 300, 900)  # Ensure within valid range

# Create the credit score DataFrame
credit_score_data = pd.DataFrame({
    'applicant_id': applicant_ids,
    'credit_score': credit_score
})

# Save the credit score dataset to CSV
credit_score_data.to_csv('credit_score_data.csv', index=False)

# Print the first few rows of the generated data
print(credit_score_data.head())
