# Model predict review film
from tensorflow import keras
from tensorflow.keras.datasets import imdb
from keras.preprocessing import sequence
import numpy as np
import random

model = keras.models.load_model('reviewFilm')

word_index = imdb.get_word_index()

def encode_text(text):
  tokens = keras.preprocessing.text.text_to_word_sequence(text)
  tokens = [word_index[word] if word in word_index else 0 for word in tokens]
  return sequence.pad_sequences([tokens], 250)[0]

# while were at it lets make a decode function

reverse_word_index = {value: key for (key, value) in word_index.items()}

def decode_integers(integers):
    PAD = 0
    text = ""
    for num in integers:
      if num != PAD:
        text += reverse_word_index[num] + " "

    return text[:-1]


def predict(text):
    encoded_text = encode_text(text)
    pred = np.zeros((1,250))
    pred[0] = encoded_text
    result = model.predict(pred) 
    #   print(result[0])
    return result[0]

good_sentence = [
  'Thank you for watching this film. If you don’t want miss good films, subscribe our channel.',
  'Thank you for appreciating film. We hope you will enjoy it.',
  'We are delighted to have helped you find the perfect films for your life. Thank you for trusting and choosing our films.',
  'We are really glad that you found what films you love. We sincerely thank you for visiting and enjoy our films.',
]
bad_sentence = [
  'Thank you for visiting our movies. Through the discussion, we knew we need to improve further. With the motto of always putting customer satisfaction first, we look forward to providing you with even more impressive choices.',
  'Thank you for visiting our movies even though it has not really made you satisfied. We’re thankful your feedback as it will help us to improve in the future. Come back to us!',
  'We sincerely thank you for watching our movies. Your feedbacks are the motivation for us to improve more and more. Once again, we look forward to serving you many more times.',
]


def random_message(ans):
  if ans < .4:
    return random.choice(bad_sentence)
  else:
    return random.choice(good_sentence)