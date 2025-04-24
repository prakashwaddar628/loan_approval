from flask import Blueprint, request, jsonify
from .connection import users_collection

login_bp = Blueprint("login", __name__)

@login_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"error": "Username and password required."}), 400
    
    user = users_collection.find_one({"username": username})

    if user and password:
        return jsonify({"message": "Login Successful"}), 200
    else:
        return jsonify({"error": "Invalid username or password"}), 401