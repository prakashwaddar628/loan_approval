from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash
from .connection import users_collection

register_bp = Blueprint("register", __name__)

@register_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    name = data.get("name")
    username = data.get("username")
    password = data.get("password")

    if not name or not username or not password:
        return jsonify({"error": "All fields are required."}), 400

    if users_collection.find_one({"username": username}):
        return jsonify({"error": "Username already exists."}), 409

    hashed_password = generate_password_hash(password)
    users_collection.insert_one({
        "name": name,
        "username": username,
        "password": hashed_password
    })

    return jsonify({"message": "User registered successfully."}), 201