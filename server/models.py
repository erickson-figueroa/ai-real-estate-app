import numpy as np
from sklearn.cluster import KMeans

def get_price_clusters(data, average_price):
    kmeans = KMeans(n_clusters=3, random_state=0)
    data_reshaped = np.array(data).reshape(-1, 1)
    kmeans.fit(data_reshaped)
    labels = kmeans.labels_
    centroids = kmeans.cluster_centers_.flatten()

    # Sort clusters by centroid values
    sorted_indices = np.argsort(centroids)
    sorted_labels = np.zeros_like(labels)

    for new_label, old_label in enumerate(sorted_indices):
        sorted_labels[labels == old_label] = new_label

    # Ensure the clusters reflect "Low," "Medium," and "High" around the average price
    low_threshold = 0.8 * average_price
    high_threshold = 1.2 * average_price

    final_labels = []
    for price, label in zip(data, sorted_labels):
        if price < low_threshold:
            final_labels.append(0)  # Low
        elif low_threshold <= price <= high_threshold:
            final_labels.append(1)  # Medium
        else:
            final_labels.append(2)  # High

    return np.array(final_labels)
