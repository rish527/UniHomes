import mysql.connector

# Connect to the SQLite database (you can use a different database system if needed)
conn=mysql.connector.connect(host="localhost",username="root",password="2005",database="unihomes")
cursor = conn.cursor()




def get_user_data(user_id):
    # Implement code to fetch user data from the database based on the user_id
    cursor.execute("SELECT * FROM userdata WHERE  System_Id=%s", (user_id,))
    user_data = cursor.fetchone()
    if user_data:
        # Convert the database result to a dictionary
        user_dict = {
            "Name":user_data[0],
            "System_Id":user_data[1],
            "Course": user_data[2],
            "Branch": user_data[3],
            "Year": user_data[4],
            "State": user_data[5],
            "Religion": user_data[6],
            "Food": user_data[7],
            "Language": user_data[8],
            "Sleep": user_data[9],
            "Smoke_Drink": user_data[10],
            "Shared_Room_Before": user_data[11],
            "Cleanliness": user_data[12]
        }
        print(user_dict);
        return user_dict
    else:
        return None


def get_all_users_data(exclude_user_id):
    # Implement code to fetch data of all users from the database, excluding the user with exclude_user_id
    cursor.execute("SELECT * FROM userdata WHERE System_Id != %s", (exclude_user_id,))
    all_users_data = cursor.fetchall()
    all_users_data_list = []
    for user_data in all_users_data:
        user_data_dict = {
            "Name":user_data[0],
            "System_Id":user_data[1],
            "Course": user_data[2],
            "Branch": user_data[3],
            "Year": user_data[4],
            "State": user_data[5],
            "Religion": user_data[6],
            "Food": user_data[7],
            "Language": user_data[8],
            "Sleep": user_data[9],
            "Smoke_Drink": user_data[10],
            "Shared_Room_Before": user_data[11],
            "Cleanliness": user_data[12]
        }
        all_users_data_list.append(user_data_dict)
    
    return all_users_data_list

def store_best_matches(user_id, top_matches):
    try:
        # Prepare the SQL statement to insert data into the user_matches table
        insert_query = "INSERT INTO user_matches (user_id, match1, match2, match3, match4, match5) VALUES (%s, %s, %s, %s, %s, %s)"

        # Execute the SQL statement for the given user_id and top_matches
        cursor.execute(insert_query, (user_id, *top_matches))

        # Commit the changes to the database
        conn.commit()

        print(f"Best matches for user {user_id} successfully stored in the database.")

    except mysql.connector.Error as e:
        print(f"Error: {e}")

# print(get_all_users_data("2022548738"))

