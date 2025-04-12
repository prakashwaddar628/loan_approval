from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load model and scaler
model = joblib.load("model/model.pkl")
scaler = joblib.load("model/preprocessor.pkl")

@app.route("/")
def home():
    return "Loan Approval Prediction API is running! ✅"

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    try:
        # Extract features from request
        input_data = np.array([[
            data["no_of_dependents"],
            data["education"],
            data["self_employed"],
            data["income_annum"],
            data["loan_amount"],
            data["loan_term"],
            data["cibil_score"],
            data["residential_assets_value"],
            data["commercial_assets_value"],
            data["luxury_assets_value"],
            data["bank_asset_value"]
        ]])

        # Preprocess
        input_scaled = scaler.transform(input_data)

        # Predict
        prediction = model.predict(input_scaled)
        result = "Approved" if prediction[0] == 1 else "Rejected"

        return jsonify({"loan_status": result})

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)
