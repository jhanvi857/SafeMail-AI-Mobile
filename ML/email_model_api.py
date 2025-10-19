# from flask import Flask,request, jsonify
# import pickle
# from sklearn.feature_extraction.text import TfidfVectorizer

# app = Flask(__name__)

# with open("email_model.pkl", "rb") as f:
#     model = pickle.load(f)

# with open("tfidf_vectorizer.pkl", "rb") as f:
#     vectorizer = pickle.load(f)

# @app.route("/predict", methods=["POST"])
# def predict():
#     try:
#         data = request.json
#         email_text = data.get("email") or data.get("emailText", "")
#         print("Recieved email = ",email_text)
#         if not email_text.strip():
#             return jsonify({"error": "Empty email text"}), 400
#         X = vectorizer.transform([email_text])
#         prediction = model.predict(X)[0]

#         # Map prediction to label
#         label = "fraudulent" if prediction == 1 else "safe"
#         return jsonify({"prediction": int(prediction), "label": label})
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=5000)

# app.py
from flask import Flask, request, jsonify
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
import re

app = Flask(__name__)

# Load model and vectorizer
with open("email_model.pkl", "rb") as f:
    model = pickle.load(f)

with open("tfidf_vectorizer.pkl", "rb") as f:
    vectorizer = pickle.load(f)

def preprocess_email(text):
    text = text.lower()
    # Replace URLs with a placeholder
    text = re.sub(r'http\S+|www\S+|https\S+', 'url', text)
    # Replace numbers with a placeholder
    text = re.sub(r'\d+', 'number', text)
    # Keep letters and spaces only (basic cleanup)
    text = re.sub(r'[^a-z\s]', '', text)
    return text

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        email_text = data.get("email", "")
        if not email_text.strip():
            return jsonify({"error": "Empty email text"}), 400

        processed_text = preprocess_email(email_text)
        X = vectorizer.transform([processed_text])
        prob = model.predict_proba(X)[0][1]
        prediction = model.predict(X)[0]

        threshold = 0.7
        if prob > threshold:
            label = "fraudulent"
        else:
            label = "safe"
        return jsonify({"prediction": float(prob), "label": label})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
