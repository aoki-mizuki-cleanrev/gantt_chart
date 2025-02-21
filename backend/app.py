from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # 全てのドメインからのアクセスを許可


@app.route('/')
def index():
    return jsonify({
        "message": "Hello from Flask + Gunicorn!",
        "id": 5
    })


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5010, debug=True)
