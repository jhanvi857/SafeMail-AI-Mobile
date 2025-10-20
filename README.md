# SafeMail-AI 🛡

Secure AI-powered email protection system that connects to Gmail, scans messages for fraud or phishing attempts, and alerts users instantly.  
Built with **Node.js + Flask + Expo (React Native)**.

---

## What It Does  🚀 
1. Secure Google OAuth login  
2. Fetches unread inbox emails  
3. Classifies them as **Safe / Fraudulent** using a trained ML model  
4. Sends notifications for suspicious messages  
5. Lets users **paste & test custom email text** for live predictions  

---

## Key Features ✨
- Secure Google OAuth2 login  
- Read-only Gmail fetch (no email deletion)  
- ML model trained on phishing datasets (TF-IDF + classifier)  
- Notifications for flagged or risky emails  
- Manual email text analyzer for instant results  
- Clean, modern Expo + React Native UI  

---

## Tech Stack 🏗️ 
| Layer | Tech |
|-------|------|
| **Frontend** | React Native, React Router |
| **Backend** | Node.js, Express.js, Passport (Google OAuth2) |
| **ML Service** | Flask, scikit-learn, TF-IDF vectorizer |

---

## Local Setup ⚙️ 

### 1. Clone repo
```bash
git clone https://github.com/jhanvi857/SafeMail-AI-Mobile.git
cd SafeMail-AI
```
### 2. Start the ML Service
```bash
cd ml-service
pip install -r requirements.txt
python app.py
```
### 3. Start the Backend
```bash
cd ../backend
npm install
node app.js
```
### 4. Start the Frontend
```bash
cd ../frontend
npm install
npm run web
```
### 5. Scan the QR code with Expo Go (for mobile) or open in web preview.
---
# Security & Privacy 🔐
- Uses read-only Gmail scope (gmail.readonly). never deletes or modifies emails
- Tokens stored securely

---
# 🔥 “Not just an app - your AI bodyguard for the inbox.”
