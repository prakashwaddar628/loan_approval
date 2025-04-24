from flask import Blueprint, request, jsonify
import numpy as np
import joblib
from .connection import predictions_collection

predict_bp = Blueprint("predict", __name__)

model = joblib.load("model/model.pkl")
scaler = joblib.load("model/preprocessor.pkl")

education_map = {"Graduate": 1, "Not Graduate": 0}
self_employed_map = {"Yes": 1, "No": 0}

@predict_bp.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    try:
        education = education_map.get(data["education"], 0)
        self_employed = self_employed_map.get(data["self_employed"], 0)

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

        input_scaled = scaler.transform(input_data)
        prediction = model.predict(input_scaled)
        result = "Rejected" if prediction[0] == 1 else "Approved"

        predictions_collection.insert_one({
            "name": data.get("name", "Applicant"),
            "gender": data.get("gender", "N/A"),
            "income": data["income_annum"],
            "status": result
        })

        return jsonify({"loan_status": result})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 400