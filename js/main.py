import mysql.connector
from mysql.connector import Error

def connect():
    try:
        connection = mysql.connector.connect(
            host='localhost',
            database='main',
            user='root',
            password='9FmAb#12KnNIFUvi2!'
        )
        if connection.is_connected():
            print("Connected to MySQL database")

            cursor = connection.cursor()
            cursor.execute("SELECT DATABASE();")
            db = cursor.fetchone()
            print(f"You're connected to database: {db}")

            # Example query
            cursor.execute("SHOW TABLES;")
            tables = cursor.fetchall()
            print("Tables:", tables)

            cursor.close()
            connection.close()
            print("MySQL connection is closed")

    except Error as e:
        print("Error while connecting to MySQL", e)

if __name__ == "__main__":
    connect()
