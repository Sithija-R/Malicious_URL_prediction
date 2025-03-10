from flask import Flask, request, jsonify
import pandas as pd
import joblib
import re
from urllib.parse import urlparse
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load models
logit = joblib.load('logistic_regression_model.pkl')
rf = joblib.load('random_forest_model.pkl')


def having_ip_address(url):
    return 1 if re.search(r'(([01]?\d\d?|2[0-4]\d|25[0-5])\.){3}([01]?\d\d?|2[0-4]\d|25[0-5])', url) else 0

def count_dot(url): return url.count('.')
def count_www(url): return url.count('www')
def count_atrate(url): return url.count('@')
def no_of_dir(url): return urlparse(url).path.count('/')
def shortening_service(url): return int(any(domain in url for domain in ['bit.ly', 'goo.gl', 'tinyurl', 'is.gd', 'ow.ly']))
def count_https(url): return url.count('https')
def count_http(url): return url.count('http')
def count_per(url): return url.count('%')
def count_ques(url): return url.count('?')
def count_hyphen(url): return url.count('-')
def count_equal(url): return url.count('=')
def url_length(url): return len(url)
def hostname_length(url): return len(urlparse(url).hostname) if urlparse(url).hostname else 0
def suspicious_words(url): return int(any(term in url.lower() for term in ['paypal', 'login', 'signin', 'bank', 'account', 'update', 'free', 'bonus']))
def digit_count(url): return sum(c.isdigit() for c in url)
def letter_count(url): return sum(c.isalpha() for c in url)
def fd_length(url): return len(urlparse(url).path.split('/')[1]) if len(urlparse(url).path.split('/')) > 1 else 0

def extract_features(url):
    return {
        'use_of_ip': having_ip_address(url),
        'count.': count_dot(url),
        'count-www': count_www(url),
        'count@': count_atrate(url),
        'count_dir': no_of_dir(url),
        'short_url': shortening_service(url),
        'count-https': count_https(url),
        'count-http': count_http(url),
        'count%': count_per(url),
        'count?': count_ques(url),
        'count-': count_hyphen(url),
        'count=': count_equal(url),
        'url_length': url_length(url),
        'hostname_length': hostname_length(url),
        'sus_url': suspicious_words(url),
        'count-digits': digit_count(url),
        'count-letters': letter_count(url),
        'fd_length': fd_length(url)
    }


label_map = {0: 'benign', 1: 'phishing', 2: 'defacement', 3: 'malware'}


@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    
 
    if not data or 'url' not in data:
        return jsonify({'error': 'Please provide a URL'}), 400

   
    url = data['url']
    features = extract_features(url)

    X_new = pd.DataFrame([features])

    y_pred_logit = logit.predict(X_new)[0]
    y_pred_rf = rf.predict(X_new)[0]

    logit_probs = logit.predict_proba(X_new)[0]
    rf_probs = rf.predict_proba(X_new)[0]

    decoded_logit = label_map[y_pred_logit]
    decoded_rf = label_map[y_pred_rf]


    response = {
        'logistic_regression': {
            'predicted_class': decoded_logit,
            'probabilities': {label_map[i]: f"{logit_probs[i]*100:.0f}" for i in range(4)}
        },
        'random_forest': {
            'predicted_class': decoded_rf,
            'probabilities': {label_map[i]: f"{rf_probs[i]*100:.0f}" for i in range(4)}
        }
    }

    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True, port=5555)
