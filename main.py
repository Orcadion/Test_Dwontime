from flask import Flask, request, send_from_directory, jsonify
import os

app = Flask(__name__, static_folder='.')

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def static_files(path):
    return send_from_directory('.', path)

@app.route('/submit', methods=['POST'])
def submit():
    data = request.get_json()
    # هنا تقدر تبعت البيانات لجوجل شيت أو تعالجها بأي شكل
    print(data)
    return jsonify({"status": "received"})

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
