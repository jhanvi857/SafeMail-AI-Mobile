import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report
import pickle
# data = pd.read_csv("https://raw.githubusercontent.com/dD2405/Twitter_Sentiment_Analysis/master/train.csv")
# Kaggle data added..
data = pd.read_csv("spam_ham_dataset.csv")
data = data.rename(columns={"tweet": "text", "label": "label"})
data = data.sample(5000, random_state=42)

# text processing..
data['text'] = data['text'].str.lower().str.replace(r'[^a-z\s]', '', regex=True)

# splitting the dataset..
X_train, X_test, y_train, y_test = train_test_split(data['text'], data['label'], test_size=0.2, random_state=42)

# text to TF-IDF feature..
vectorizer = TfidfVectorizer(stop_words='english', max_features=5000)
X_train_tfidf = vectorizer.fit_transform(X_train)
X_test_tfidf = vectorizer.transform(X_test)

# Training model..
model = LogisticRegression(max_iter=200)
model.fit(X_train_tfidf,y_train)

# Evaluating..
y_predict = model.predict(X_test_tfidf)
print(classification_report(y_test,y_predict))

# Saving model and vector size..
with open("email_model.pkl","wb") as f:
    pickle.dump(model,f)

with open("tfidf_vectorizer.pkl", "wb") as f:
    pickle.dump(vectorizer, f)

print("Model and vectorized saved successfully !!")