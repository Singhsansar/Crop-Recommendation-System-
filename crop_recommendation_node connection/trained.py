#training model and making use of pickle file will make it faster to predict the output 
import json
import pickle
import sys
import requests
import numpy as np

def predict():
        f = open('modal.pkl', 'rb')
        # values = [23,2,96,4,36]
        values = list(sys.argv[1].split(","))
        data = np.array([values])
        model = pickle.load(f)
        y_pred = model.predict(data)
        crop = y_pred.tolist()[0]
        resp = {
            "response":200, 
             "message":"data from python",
            "Data":crop}
            ### data = recommended_crop.json()
            # print(json.dumps(resp))
        print(json.dumps(resp))
        # print(resp)
        # sys.stdout.flush()

if __name__ == '__main__':
    predict()

