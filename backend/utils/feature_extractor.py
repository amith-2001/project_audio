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
        "mfcc_mean": np.mean(librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13), axis=1).tolist(),        # same as before
        "mfcc_full": librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13).tolist(), #heatmaap data
    }

        # Ensure JSON-safe structure (converts any remaining np types)
    for k, v in features.items():
        if isinstance(v, (np.ndarray, np.generic)):
            features[k] = np.array(v).tolist()
    return features

# with open("backend/new.mp3", "rb") as file:
#     x, y = sf.read(io.BytesIO(file.read()))

# print(extract_features_array(x,y))