import numpy as np
import librosa

def compute_stft_or_mel(filepath, n_fft=1024, hop_length=256, mode="stft"):
    y, sr = librosa.load(filepath, sr=None, mono=True)

    if mode == "mel":
        S = librosa.feature.melspectrogram(y=y, sr=sr, n_fft=n_fft, hop_length=hop_length, n_mels=128)
        S_db = librosa.power_to_db(S, ref=np.max)
        freqs = librosa.mel_frequencies(n_mels=128, fmin=0, fmax=sr/2)
    else:
        S = np.abs(librosa.stft(y, n_fft=n_fft, hop_length=hop_length))
        S_db = librosa.amplitude_to_db(S, ref=np.max)
        freqs = librosa.fft_frequencies(sr=sr, n_fft=n_fft)

    times = librosa.frames_to_time(np.arange(S_db.shape[1]), sr=sr, hop_length=hop_length)

    return {
        "sr": sr,
        "mode": mode,
        "n_fft": n_fft,
        "hop_length": hop_length,
        "freqs": freqs.tolist(),
        "times": times.tolist(),
        "S_db": S_db.tolist(),
    }



