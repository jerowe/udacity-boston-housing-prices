from flask import Flask
from flask import jsonify, request
from flask_cors import CORS
import json
import functools
from .data_bp import data_bp
from .model_bp import model_bp

app = Flask(__name__)
CORS(app, allow_headers=['Content-Type', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Headers',
                         'Access-Control-Allow-Methods'])


@app.after_request
def apply_caching(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response


app.register_blueprint(data_bp)
app.register_blueprint(model_bp)


@app.route('/hello', methods=['POST'])
def hello():
  data = json.loads(request.data.decode('utf-8'))
  return jsonify(data)


@functools.lru_cache(maxsize=100)
def model_learning(max_depth):
  return 1

# if __name__ == "__main__":
#     app.run(host='0.0.0.0')
