import database

def calculate_similarity(user1, user2, weight_factors):
    total_similarity = 0
    for key, weight in weight_factors.items():
        if user1[key] == user2[key]:
            total_similarity += weight
    return total_similarity

def find_best_matches(user_data, all_users_data, weight_factors):
    # Create a list to store user similarities
    user_similarities = []

    # Calculate similarities between the user and all other users
    for other_user_data in all_users_data:
        similarity = calculate_similarity(user_data, other_user_data, weight_factors)
        user_similarities.append((other_user_data, similarity))

    # Sort the user similarities by the highest similarity first
    user_similarities.sort(key=lambda x: x[1], reverse=True)

    # Return the best matches (e.g., top 5 matches)
    num_matches_to_return = 5
    best_matches = user_similarities[0:num_matches_to_return]
    best_matches_ids = [match[0]['System_Id'] for match in best_matches]
    print('yoo')
    return best_matches_ids
