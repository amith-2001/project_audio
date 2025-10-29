from flask import Flask, request, jsonify
from flask_cors import CORS  
import librosa
import numpy as np
import os
from utils.feature_extractor import extract_features_array
import io
import soundfile as sf
from utils.stft_extractor import compute_stft_or_mel
import os
import tempfile
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

    # Extract features
    features = extract_features_array(y, sr)

    # print(features)
    os.remove(save_path)  #Clean up after processing

    return jsonify(features)



@app.route("/stft", methods=["POST"])
def stft_analysis():
    try:
        file = request.files["audio"]
        with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as temp:
            file.save(temp.name)
            filepath = temp.name

        n_fft = int(request.form.get("n_fft", 1024))
        hop_length = int(request.form.get("hop_length", 256))
        mode = request.form.get("mode", "stft")

        result = compute_stft_or_mel(filepath, n_fft, hop_length, mode)
        os.remove(filepath)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    



if __name__ == "__main__":
    from flask_cors import CORS
    app.run(host="0.0.0.0", port=5000)
