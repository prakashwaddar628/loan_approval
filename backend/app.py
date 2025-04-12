from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load model and scaler
model = joblib.load("model/model.pkl")
scaler = joblib.load("model/preprocessor.pkl")

# Store recent predictions in-memory
recent_predictions = []

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
        result = "Approved" if prediction[0] == 1 else "Rejected"

        # Store recent prediction
        recent_predictions.append({
            "name": data.get("name", "Applicant"),
            "gender": data.get("gender", "N/A"),
            "income": data["income_annum"],
            "status": result
        })

        return jsonify({"loan_status": result})

    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route("/recent-predictions", methods=["GET"])
def get_recent_predictions():
    return jsonify(recent_predictions[-10:])  # Last 10 predictions

if __name__ == "__main__":
    app.run(debug=True)
