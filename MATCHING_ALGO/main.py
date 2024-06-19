import database
import algo
from flask import Flask, request, jsonify
from flask_cors import CORS 

app = Flask(__name__)
CORS(app)

def matching(user_id):
    try:
        user_data = database.get_user_data(user_id)
        
        if user_data is not None:
            print("User Data:")
            print(user_data)
            
            all_users_data = database.get_all_users_data(user_id)

            weight_factors = { 
                "Food": 3, 
                "Language": 2,  
                "Sleep": 3,
                "Smoke_Drink": 1,
                "Shared_Room_Before": 2,
                "Cleanliness": 10,  
            }

            best_matches = algo.find_best_matches(user_data, all_users_data, weight_factors)
            print('yooo')
            print("\nBest Matches:", best_matches)
            result = best_matches
        else:
            result = f"User with System_Id {user_id} not found in the database."
    except Exception as e:
        print(f"Error: {str(e)}")
        result = {"error": "Internal Server Error"}

    return result

@app.route('/api/find/<user_id>', methods=['GET'])
def send_matches(user_id):
    match = matching(user_id)
    response_data = {'result': match}
    return jsonify(response_data)

if __name__ == "__main__":
    app.run(port=9000, debug=True)
