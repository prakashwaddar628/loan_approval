from pymongo import MongoClient

try:
    client = MongoClient('mongodb://localhost:27017/')
    db = client["loan_approval"]

    predictions_collection = db["predictions"]
    users_collection = db["users"]

    print("Connected to MongoDB successfully!")

except Exception as e:
    print(f"Error connecting to MongoDB: {e}")