import nltk
from sklearn.feature_extraction.text import TfidfVectorizer
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import string

# Download necessary NLTK data files
nltk.download('punkt')
nltk.download('stopwords')

def extract_keywords(text, num_keywords=10):
    # Tokenize the text into words
    words = word_tokenize(text.lower())

    # Remove punctuation and stop words
    stop_words = set(stopwords.words('english'))
    words = [word for word in words if word.isalnum() and word not in stop_words]

    # Convert the list of words back into a single string
    clean_text = ' '.join(words)

    # Use TfidfVectorizer to find keywords
    vectorizer = TfidfVectorizer(max_features=num_keywords)
    tfidf_matrix = vectorizer.fit_transform([clean_text])
    feature_names = vectorizer.get_feature_names_out()
    
    # Get the scores of the features
    scores = tfidf_matrix.toarray()[0]
    
    # Combine the feature names and their scores
    keyword_scores = dict(zip(feature_names, scores))

    # Sort the keywords by score in descending order
    sorted_keywords = sorted(keyword_scores.items(), key=lambda item: item[1], reverse=True)

    return sorted_keywords

# Example usage
text = """
Natural language processing (NLP) is a subfield of linguistics, computer science, and artificial intelligence concerned with the interactions between computers and human language, in particular how to program computers to process and analyze large amounts of natural language data.
"""
text = "It's a black calculator similar to the one in the picture. I lost it in the reading section of the library."

keywords = extract_keywords(text, num_keywords=5)
print("Keywords:", keywords)
