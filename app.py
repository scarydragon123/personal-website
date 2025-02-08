from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
import hashlib
from datetime import datetime

app = Flask(__name__)
CORS(app)

USERS_FILE = 'users.json'

def load_users():
    """Load users from JSON file."""
    if not os.path.exists(USERS_FILE):
        return []
    
    with open(USERS_FILE, 'r') as f:
        return json.load(f)

def save_users(users):
    """Save users to JSON file."""
    with open(USERS_FILE, 'w') as f:
        json.dump(users, f, indent=4)

def hash_password(password):
    """Hash the password using SHA-256."""
    return hashlib.sha256(password.encode()).hexdigest()

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    first_name = data.get('firstName')
    last_name = data.get('lastName')
    country = data.get('country')
    phone = data.get('phone')
    birthdate = data.get('birthdate')

    # Load existing users
    users = load_users()

    # Check if username or email already exists
    for user in users:
        if user['username'] == username or user['email'] == email:
            return jsonify({'success': False, 'message': 'Username or email already exists'})

    # Hash the password
    hashed_password = hash_password(password)

    # Create new user with additional details
    new_user = {
        'username': username,
        'email': email,
        'password': hashed_password,
        'firstName': first_name,
        'lastName': last_name,
        'country': country,
        'phone': phone,
        'birthdate': birthdate,
        'created_at': datetime.now().isoformat()
    }

    # Add user to list and save
    users.append(new_user)
    save_users(users)

    return jsonify({'success': True, 'message': 'User registered successfully'})

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    # Hash the input password
    hashed_password = hash_password(password)

    # Load users and check credentials
    users = load_users()
    for user in users:
        if user['username'] == username and user['password'] == hashed_password:
            # Remove sensitive information before sending
            user_details = user.copy()
            user_details.pop('password', None)
            
            return jsonify({
                'success': True, 
                'message': 'Login successful',
                'username': username,
                'userDetails': user_details
            })

    return jsonify({'success': False, 'message': 'Invalid username or password'})

if __name__ == '__main__':
    app.run(debug=True)
