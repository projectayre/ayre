# use all the fucntions in the above cells in a class named SentimentAnalyzer
import json
import numpy as np
from sklearn.cluster import KMeans
from collections import Counter

class SentimentAnalyzer:
    def __init__(self):
        pass

    def extract_colors(self, image, number_of_colors):
        pixels = image.reshape((image.shape[0] * image.shape[1], 3))
        kmeans = KMeans(n_clusters=number_of_colors)
        labels = kmeans.fit_predict(pixels)
        label_counts = Counter(labels)
        total_count = sum(label_counts.values())
        center_colors = kmeans.cluster_centers_
        ordered_colors = [center_colors[i] for i in label_counts.keys()]
        color_frequency = [(label_counts[i] / total_count) for i in label_counts.keys()]
        return ordered_colors, color_frequency

    def map_colors_to_emotions(self, colors, frequencies):
        # Define the color to emotion mappings (RGB format).
        color_emotion_map = {
            (255, 0, 0): 'Anger',      # red
            (255, 255, 0): 'Happy',    # yellow
            (0, 0, 255): 'Sad',        # blue
            (0, 255, 0): 'Calm',       # green
            (255, 192, 203): 'Affection', # pink
            (128, 0, 128): 'Royalty',  # purple
            (255, 165, 0): 'Excitement', # orange
            (0, 0, 0): 'Fear',         # black
            (255, 255, 255): 'Peace',   # white
            (128, 128, 128): 'Neutral', # gray
            (64, 224, 208): 'Trust',   # turquoise
            (255, 228, 196): 'Warmth',  # bisque
            # ... you can continue with other colors
        }
        
        all_emotions = { emotion: 0 for emotion in color_emotion_map.values() }
        
        # Threshold for matching colors (to account for variations in color shades)
        color_match_threshold = 60.0
        
        for color, freq in zip(colors, frequencies):
            matched_emotion = None
            for emotion_color, emotion in color_emotion_map.items():
                # Calculate the difference between the color from the image and the predefined emotion color
                color_difference = np.sqrt(np.sum((np.array(emotion_color) - color) ** 2))
                if color_difference < color_match_threshold:
                    matched_emotion = emotion
                    break

            if matched_emotion:
                # If the color matches, update the emotion intensity based on its frequency
                all_emotions[matched_emotion] += freq
                
        return all_emotions
    
    def analyze_image_sentiments(self, image):
        try:
            # if sending PIL onject only then uncomment the line below
            # image = image.convert('RGB')
            
            # if sending PIL object converted to RGB then uncommnet the line below
            image = np.array(image)
            
            # Extract the major colors and their frequencies
            colors, frequencies = self.extract_colors(image, number_of_colors=5)

            # Map the colors to emotions and calculate intensity
            emotions = self.map_colors_to_emotions(colors, frequencies)

            # Output the emotions and their intensities as a dictionary
            if emotions:
                # format all values to 3 decimal places
                emotions = { k: round(v, 2) for k, v in emotions.items() }
                return json.dumps(emotions, indent=2)
            else:
                print("No emotions detected from the colors in the image.")
                return None

        except Exception as e:
            print(f"An error occurred: {e}")


# from sentimentanalysis import SentimentAnalyzer
# from PIL import Image

# def main():
#     analyzer = SentimentAnalyzer()

#     image = Image.open("C:\\Users\\prate\\Downloads\\ade_test2.png")
#     # convert to RGB
#     image = image.convert('RGB')

#     emotions = analyzer.analyze_image_sentiments(image)

#     print(emotions)

# if __name__ == "__main__":
#     main()

