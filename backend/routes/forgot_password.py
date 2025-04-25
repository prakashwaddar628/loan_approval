from flask import Blueprint, request, jsonify
from .connection import users_collection
from itsdangerous import URLSafeTimedSerializer
from flask_mail import Message, Mail

forgot_bp = Blueprint("forgotpassword", __name__)

serializer = URLSafeTimedSerializer("YOUR_SECRET_KEY")

mail = Mail()

@forgot_bp.route("/forgotpassword", methods=["POST"])
def forgotpassword():
    data = request.get_json()
    email = data.get("email")

    if not email:
        return jsonify({"error": "Email address is required."}), 400

    user = users_collection.find_one({"email": email})

    if user:
        token = serializer.dumps(user["_id"])
        users_collection.update_one({"_id": user["_id"]}, {"$set": {"reset_token": token}})

        reset_link = f"http://localhost:3000/resetpassword?token={token}"

        msg = Message("Password Reset Request",
                      sender="your_email@example.com",
                      recipients=[email])
        msg.body = f"Please click on the following link to reset your password: {reset_link}"

        try:
            mail.send(msg)
            return jsonify({"message": "Password reset link sent to your email address."}), 200
        except Exception as e:
            print(f"Error sending email: {e}")
            return jsonify({"error": "Failed to send password reset email. Please try again later."}), 500
    else:
        return jsonify({"message": "If an account exists with that email, a reset link has been sent."}), 200


@forgot_bp.route("/resetpassword", methods=["POST"])
def resetpassword():
    data = request.get_json()
    token = data.get("token")
    new_password = data.get("new_password")

    if not token or not new_password:
        return jsonify({"error": "Token and new password are required."}), 400

    try:
        user_id = serializer.loads(token, max_age=3600)
    except:
        return jsonify({"error": "Invalid or expired reset token."}), 400

    user = users_collection.find_one({"_id": user_id, "reset_token": token})

    if user: 
        users_collection.update_one({"_id": user_id}, {"$set": {"password": new_password, "reset_token": None}})
        return jsonify({"message": "Password reset successful."}), 200
    else:
        return jsonify({"error": "Invalid reset token or user not found."}), 400
