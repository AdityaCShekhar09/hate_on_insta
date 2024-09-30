import pandas as pd
from tensorflow.keras.layers import TextVectorization
import speech_recognition as sr
import re
from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from pydub import AudioSegment
import io

df = pd.read_csv('comments.csv')
X = df['comment_text']

MAX_FEATURES = 200000 # number of words in the vocab

vectorizer = TextVectorization(max_tokens=MAX_FEATURES,
                               output_sequence_length=1800,
                               output_mode='int')

vectorizer.adapt(X.values)

app = Flask(__name__)
CORS(app)

# Load your model
model = tf.keras.models.load_model('toxicity.h5')


def preprocess_text(text):
    sentences = re.split(r'(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s', text)
    return sentences

@app.route('/detect', methods=['POST'])
def detect():
    data = request.get_json()
    comments = data['comments']
    
    hate_comments = []
    
    for comment in comments:
        sentences = preprocess_text(comment['text'])
        preprocessed_sentences = [vectorizer([sentence]) for sentence in sentences]
        
        # Predict toxicity for all sentences in the comment
        predictions = model.predict(np.vstack(preprocessed_sentences))
        is_hate_speech = any(prediction[0] > 0.5 for prediction in predictions)  # Adjust based on your model's output shape

        if is_hate_speech:
            hate_comments.append({
                "username": comment['ownerUsername'],
                "text": comment['text']
            })

    return jsonify(hate_comments)

@app.route('/transcribe', methods=['POST'])
def transcribe_audio():
    if 'file' not in request.files:
        return jsonify({"error": "No audio file provided"}), 400

    file = request.files['file']
    
    try:
        # Convert the audio file to WAV format using pydub
        audio = AudioSegment.from_file(file, format="mp3")  # assuming the uploaded file is in mp3
        wav_io = io.BytesIO()
        audio.export(wav_io, format="wav")
        wav_io.seek(0)

        # Use speech recognition to transcribe the converted audio file
        recognizer = sr.Recognizer()
        with sr.AudioFile(wav_io) as source:
            audio_data = recognizer.record(source)
            text = recognizer.recognize_google(audio_data)
            print(text)
            text = preprocess_text(text)
            preprocessed_sentences = [vectorizer([word]) for word in text]
            
            # Predict toxicity for all sentences in the comment
            predictions = model.predict(np.vstack(preprocessed_sentences))
            is_hate_speech = any(prediction[0] > 0.5 for prediction in predictions)
            if is_hate_speech:
                return jsonify({"transcription": text, "result": "Hate Detected"})
            else:
                return jsonify({"transcription": text ,"result":"No Hate Detected"})


        return jsonify({"transcription": "Unable to detect audio"})

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 500
    

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5050)