import cv2
import numpy as np
from sklearn.cluster import KMeans
from collections import Counter

# Function to load images
def load_image(image_path):
    image = cv2.imread(image_path)
    if image is None:
        raise ValueError(f"Image not found at path: {image_path}")
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    return image

# Function to extract major colors from images
def extract_colors(image, number_of_colors):
    pixels = image.reshape((image.shape[0] * image.shape[1], 3))
    kmeans = KMeans(n_clusters=number_of_colors)
    labels = kmeans.fit_predict(pixels)
    label_counts = Counter(labels)
    total_count = sum(label_counts.values())
    center_colors = kmeans.cluster_centers_
    ordered_colors = [center_colors[i] for i in label_counts.keys()]
    color_frequency = [(label_counts[i] / total_count) for i in label_counts.keys()]
    return ordered_colors, color_frequency

def map_colors_to_emotions(colors, frequencies):
    all_emotions = {
        'Anger': 0,
        'Happy': 0,
        'Sad': 0,
        'Calm': 0,
        'Affection': 0,
        'Royalty': 0,
        'Excitement': 0,
        'Fear': 0,
        'Peace': 0,
        'Neutral': 0,
        'Trust': 0,
        'Warmth': 0,
    }

    color_emotion_map = {
        (255, 0, 0): 'Anger',
        (255, 255, 0): 'Happy',
        (0, 0, 255): 'Sad',
        (0, 255, 0): 'Calm',
        (255, 192, 203): 'Affection',
        (128, 0, 128): 'Royalty',
        (255, 165, 0): 'Excitement',
        (0, 0, 0): 'Fear',
        (255, 255, 255): 'Peace',
        (128, 128, 128): 'Neutral',
        (64, 224, 208): 'Trust',
        (255, 228, 196): 'Warmth',
    }

    color_match_threshold = 60.0

    for color, freq in zip(colors, frequencies):
        matched_emotion = None
        for emotion_color, emotion in color_emotion_map.items():
            color_difference = np.sqrt(np.sum((np.array(emotion_color) - color) ** 2))
            if color_difference < color_match_threshold:
                matched_emotion = emotion
                break

        if matched_emotion:
            all_emotions[matched_emotion] += freq

    return all_emotions

def analyze_image_sentiments(image_path):
    try:
        image = load_image(image_path)
        colors, frequencies = extract_colors(image, number_of_colors=5)
        emotions = map_colors_to_emotions(colors, frequencies)

        return emotions

    except Exception as e:
        print(f"An error occurred: {e}")
        return None

# Run the analysis
result = analyze_image_sentiments('./ade_test1.jpg')

# Output the result dictionary
if result:
    print("Detected emotions and their intensities:")
    for emotion, intensity in result.items():
        print(f"{emotion}: {intensity:.2f}")
else:
    print("No emotions detected from the colors in the image.")