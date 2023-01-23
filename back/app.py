from flask import Flask, request, jsonify
import csv
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def read_csv(students):
    data = []
    with open(students, 'r') as file:
        reader = csv.reader(file)
        for row in reader:
            data.append(row)
    return data

def write_csv(students,data):
    with open(students, 'w') as file:
        writer = csv.writer(file)
        writer.writerows(data)

@app.route('/add', methods=['POST'])
def create():
    sname = request.json['sname']
    email = request.json['email']
    mathscore = 0
    englishscore = 0
    compscore = 0
    with open('students.csv', 'a') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=['sname', 'email', 'mathscore', 'englishscore', 'compscore'])
        writer.writerow({'sname': sname, 'email': email, 'mathscore':mathscore, 'englishscore':englishscore,'compscore':compscore })
    return 'Data added successfully'

# Read
@app.route('/', methods=['GET'])
def read():
    data = []
    with open('students.csv', 'r') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            data.append(row)
    return jsonify(data)

# Update
@app.route('/addscore/<user_email>', methods=['PUT'])
def update_user(user_email):
    data = request.get_json()
    with open('students.csv', 'r') as file:
        reader = csv.DictReader(file)
        users = [row for row in reader]
    for user in users:
        if user['sname'] == user_email:
            user['email'] == user_email
            user['sname'] = data['sname']
            user['mathscore'] = data['mathscore']
            user['englishscore'] = data['englishscore']
            user['compscore'] = data['compscore']
            with open('students.csv', 'w',) as file:
                fieldnames = ['sname','email', 'mathscore', 'englishscore', 'compscore']
                writer = csv.DictWriter(file, fieldnames=fieldnames)
                writer.writeheader()
                writer.writerows(users)
    else:
        return jsonify({'message': 'user not found'}), 404
 


if __name__ == '__main__':
    app.run(debug=True)