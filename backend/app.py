from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Import routes
from api.routes_wave import wave_bp
from api.routes_fft import fft_bp
from api.routes_stft import stft_bp
from api.routes_mel import mel_bp
from api.routes_noise import noise_bp
from api.routes_model import model_bp

# Register Blueprints
app.register_blueprint(wave_bp, url_prefix="/api/wave")
app.register_blueprint(fft_bp, url_prefix="/api/fft")
app.register_blueprint(stft_bp, url_prefix="/api/stft")
app.register_blueprint(mel_bp, url_prefix="/api/mel")
app.register_blueprint(noise_bp, url_prefix="/api/noise")
app.register_blueprint(model_bp, url_prefix="/api/model")

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
