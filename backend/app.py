from flask import Flask, request, jsonify
from flask_cors import CORS  # ✅ Import this
import librosa
import numpy as np
import os
from utils.feature_extractor import extract_features_array
import io
import soundfile as sf

import os
app = Flask(__name__)


app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16 MB


#Enable CORS for your frontend
CORS(app, resources={r"/*": {"origins": "*"}})

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.route("/analyze", methods=["POST"])
def analyze_audio():
    file = request.files["audio"]
    filename = file.filename
    save_path = os.path.join(UPLOAD_FOLDER, filename)

    file.save(save_path)

    #load the saved file with librosa (handles mp3, wav, etc.)
    y, sr = librosa.load(save_path, sr=None)

    # print("done with this")

    # ✅ Extract features
    features = extract_features_array(y, sr)

    # print(features)
    os.remove(save_path)  #Clean up after processing

    return jsonify(features)

if __name__ == "__main__":
    app.run(debug=True)
