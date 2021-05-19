from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from flask_cors import CORS

from bson import ObjectId

app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb+srv://admin:qMt1mG7ygIsCaJ1l@cluster0.snh9g.mongodb.net/companies_db?retryWrites=true&w=majority'
mongo = PyMongo(app)

CORS(app)

db = mongo.db.companies

@app.route('/companies', methods=['POST'])
def createCompany():
    _id = db.insert({
        'name': request.json['name'],
        'address': request.json['address'],
        'numberphone': request.json['numberphone'],
        'nit': request.json['nit']
    })
    return jsonify(str(_id))

@app.route('/companies', methods=['GET'])
def getCompanies():
    companies = []
    for doc in db.find():
        companies.append({
            '_id': str(ObjectId(doc['_id'])),
            'name': doc['name'],
            'address': doc['address'],
            'numberphone': doc['numberphone'],
            'nit': doc['nit']
        })
    return jsonify(companies)

@app.route('/companies/<id>', methods=['GET'])
def getCompany(id):
    company = db.find_one({'_id': ObjectId(id)})
    return jsonify({
        '_id': str(ObjectId(company['_id'])),
        'name': company['name'],
        'address': company['address'],
        'numberphone': company['numberphone'],
        'nit': company['nit']
    })

@app.route('/companies/<id>', methods=['DELETE'])
def deleteCompany(id):
    db.delete_one({'_id': ObjectId(id)})
    return jsonify({'msg':'Empresa eliminada'})

@app.route('/companies/<id>', methods=['PUT'])
def updateCompany(id):
    db.update_one({'_id': ObjectId(id)}, {'$set': {
        'name': request.json['name'],
        'address': request.json['address'],
        'numberphone': request.json['numberphone'],
        'nit': request.json['nit']
    }})
    return jsonify({'msg':'Empresa actualizada'})


if __name__ == "__main__":
    app.run(debug=True)
