from flask import Flask
from flask_cors import CORS
from routes import register_routes
import joblib

app = Flask(__name__)
CORS(app)

# Load model and scaler
model = joblib.load("model/model.pkl")
scaler = joblib.load("model/preprocessor.pkl")

# Make model and scaler accessible globally if needed
app.config["MODEL"] = model
app.config["SCALER"] = scaler

# Register routes
register_routes(app)

@app.route("/")
def home():
    return "Loan Approval Prediction API is running!"

if __name__ == "__main__":
    app.run(debug=True)
