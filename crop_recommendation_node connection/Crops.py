import os 
import requests
import sys 
import json
import pickle
import pandas as pd
import numpy as np 
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier 
from sklearn.model_selection import cross_val_score 
from sklearn.metrics import classification_report 
from sklearn import metrics 

machine_learning_model = None

def load_data():
    crop_data = pd.read_csv("Crop_recommendation.csv")
    crop_data.drop_duplicates(inplace=True)
    selected_features = crop_data[['N', 'P', 'K', 'ph', 'temperature']] 
    crops = crop_data['label']
    for feature in selected_features:
        crop_data[feature] = crop_data[feature].fillna(0) 
    return selected_features, crops

def train_model(selected_features, crops):
    x_train, x_test, y_train, y_test = train_test_split(selected_features, crops, test_size=0.2, random_state=3)
    random_forest = RandomForestClassifier(n_estimators=20, random_state=10)  
    random_forest.fit(x_train.values, y_train.values)
    pickle.dump(random_forest, open('modal.pkl','wb'))
    return random_forest, x_test, y_test

# def evaluate_model(model, x_test, y_test):
#     predicted_values = model.predict(x_test) 
#     accuracy = metrics.accuracy_score(y_test, predicted_values)  
#     print("Random Forest's Accuracy is: ", accuracy*100,"%")
#     print(classification_report(y_test, predicted_values))

def predict_crop():
    values = list(sys.argv[1].split(","))
    #print(values)
    #print(type(values))
    data = np.array([values])
    recommended_crop = machine_learning_model.predict(data)
    resp = {
        "response":200, 
        "message":"data from python",
        "Data":recommended_crop.tolist()} # to list when we are trying to dump  in non-json format 
        ### data = recommended_crop.json()
            # print(json.dumps(resp))
    sys.stdout.flush()
    print(recommended_crop)

if __name__ == '__main__':
    selected_features, crops = load_data()
    model, x_test, y_test = train_model(selected_features, crops)
    machine_learning_model = model
    predict_crop()
