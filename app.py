from flask import Flask, request, jsonify
from flask_cors import CORS
import gspread
from oauth2client.service_account import ServiceAccountCredentials
import hashlib

app = Flask(__name__)
CORS(app)

# Google Sheets Setup
scope = ['https://spreadsheets.google.com/feeds', 'https://www.googleapis.com/auth/drive']
creds = ServiceAccountCredentials.from_json_keyfile_name('path/to/your/credentials.json', scope)
client = gspread.authorize(creds)

# Open the Google Sheet (replace with your sheet name)
sheet = client.open('UserDatabase').sheet1

def hash_password(password):
    """Hash the password using SHA-256."""
    return hashlib.sha256(password.encode()).hexdigest()

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    # Check if username or email already exists
    existing_users = sheet.get_all_records()
    for user in existing_users:
        if user['username'] == username or user['email'] == email:
            return jsonify({'success': False, 'message': 'Username or email already exists'})

    # Hash the password
    hashed_password = hash_password(password)

    # Add user to Google Sheet
    sheet.append_row([username, email, hashed_password])

    return jsonify({'success': True, 'message': 'User registered successfully'})

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    # Hash the input password
    hashed_password = hash_password(password)

    # Check credentials
    users = sheet.get_all_records()
    for user in users:
        if user['username'] == username and user['password'] == hashed_password:
            return jsonify({'success': True, 'message': 'Login successful'})

    return jsonify({'success': False, 'message': 'Invalid username or password'})

if __name__ == '__main__':
    app.run(debug=True)
