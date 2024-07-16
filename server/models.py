import numpy as np
from sklearn.cluster import KMeans

def get_price_clusters(data):
    kmeans = KMeans(n_clusters=3)
    kmeans.fit(np.array(data).reshape(-1, 1))
    return kmeans.labels_
