import numpy as np
import librosa

def extract_features_array(y, sr):
    features = {
        "sr": sr,
        "duration_sec": round(len(y) / sr, 2),
        "rms": float(np.mean(librosa.feature.rms(y=y))),
        "zcr": float(np.mean(librosa.feature.zero_crossing_rate(y))),
        "centroid": float(np.mean(librosa.feature.spectral_centroid(y=y, sr=sr))),
        "rolloff": float(np.mean(librosa.feature.spectral_rolloff(y=y, sr=sr))),
        "mfcc": np.mean(librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13), axis=1).tolist(),
    }
    return features

# with open("backend/uploads/censor-beep-1-second-8112.mp3", "rb") as file:
#     x, y = sf.read(io.BytesIO(file.read()))

# print(extract_features_array(x,y))