from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)  # Allow React frontend to communicate with backend

# Database connection
def create_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="*****",
        database="billing_db"
    )

# Fetch all billing records
@app.route("/get_bills", methods=["GET"])
def get_bills():
    conn = create_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("""
        SELECT b.id, c.name, c.contact, c.email, b.amount, b.date
        FROM bills b
        JOIN customers c ON b.customer_id = c.id
    """)
    bills = cursor.fetchall()
    conn.close()
    return jsonify(bills)

# Add a new bill
@app.route("/add_bill", methods=["POST"])
def add_bill():
    data = request.json
    name, contact, email, amount = data["name"], data["contact"], data["email"], data["amount"]

    conn = create_connection()
    cursor = conn.cursor()
    
    cursor.execute("INSERT INTO customers (name, contact, email) VALUES (%s, %s, %s)", (name, contact, email))
    customer_id = cursor.lastrowid

    cursor.execute("INSERT INTO bills (customer_id, amount) VALUES (%s, %s)", (customer_id, amount))
    
    conn.commit()
    conn.close()
    return jsonify({"message": "Bill added successfully"}), 201

# Update a bill
@app.route("/update_bill/<int:bill_id>", methods=["PUT"])
def update_bill(bill_id):
    data = request.json
    amount = data["amount"]

    conn = create_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE bills SET amount = %s WHERE id = %s", (amount, bill_id))
    
    conn.commit()
    conn.close()
    return jsonify({"message": "Bill updated successfully"}), 200

# Delete a bill
@app.route("/delete_bill/<int:bill_id>", methods=["DELETE"])
def delete_bill(bill_id):
    conn = create_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM bills WHERE id = %s", (bill_id,))
    
    conn.commit()
    conn.close()
    return jsonify({"message": "Bill deleted successfully"}), 200

if __name__ == "__main__":
    app.run(debug=True)
