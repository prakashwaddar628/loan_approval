from flask import Blueprint, jsonify
from .connection import predictions_collection

recent_prediction_bp = Blueprint("recent_predictions", __name__)

@recent_prediction_bp.route("/recent-predictions", methods=["GET"])
def get_recent_predictions():
    recent = list(predictions_collection.find().sort("_id", -1).limit(10))
    for doc in recent:
        doc["_id"] = str(doc["_id"]) 
    return jsonify(recent)