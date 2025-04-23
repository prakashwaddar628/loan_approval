from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS
from pymongo import MongoClient
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# MongoDB connection
client = MongoClient(os.getenv("MONGODB_URI", "mongodb://localhost:27017/"))
db = client["loan_approval"]
predictions_collection = db["predictions"]

# Load model and scaler
model = joblib.load("model/model.pkl")
scaler = joblib.load("model/preprocessor.pkl")

# Categorical encoding maps (must match training encoding)
education_map = {"Graduate": 1, "Not Graduate": 0}
self_employed_map = {"Yes": 1, "No": 0}

@app.route("/")
def home():
    return "Loan Approval Prediction API is running!"

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    try:
        # Encode categorical variables
        education = education_map.get(data["education"], 0)
        self_employed = self_employed_map.get(data["self_employed"], 0)

        # Prepare input array
        input_data = np.array([[ 
            data["no_of_dependents"],
            education,
            self_employed,
            data["income_annum"],
            data["loan_amount"],
            data["loan_term"],
            data["cibil_score"],
            data["residential_assets_value"],
            data["commercial_assets_value"],
            data["luxury_assets_value"],
            data["bank_asset_value"]
        ]])

        # Scale and predict
        input_scaled = scaler.transform(input_data)
        prediction = model.predict(input_scaled)
        result = "Rejected" if prediction[0] == 1 else "Approved"

        # Store prediction in MongoDB
        prediction_entry = {
            "name": data.get("name", "Applicant"),
            "gender": data.get("gender", "N/A"),
            "income": data["income_annum"],
            "status": result
        }
        predictions_collection.insert_one(prediction_entry)

        return jsonify({"loan_status": result})

    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route("/recent-predictions", methods=["GET"])
def get_recent_predictions():
    recent = list(predictions_collection.find().sort("_id", -1).limit(10))
    for doc in recent:
        doc["_id"] = str(doc["_id"]) 
    return jsonify(recent)

@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    name = data.get("name")
    username = data.get("username")
    password = data.get("password")

    if not name or not username or not password:
        return jsonify({"error": "All fields are required."}), 400

    # Check if user already exists
    if users_collection.find_one({"username": username}):
        return jsonify({"error": "Username already exists."}), 409

    # Hash password before saving
    hashed_password = generate_password_hash(password)

    # Save user to database
    users_collection.insert_one({
        "name": name,
        "username": username,
        "password": hashed_password
    })

    return jsonify({"message": "User registered successfully."}), 201

if __name__ == "__main__":
    app.run(debug=True)
