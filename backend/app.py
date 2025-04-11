from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

model = joblib.load('model/model.pkl')
scaler = joblib.load('model/preprocessor.pkl')

@app.route("/")
def home():
    return "Loan Approval Prediction API is running!"