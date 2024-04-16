mongoimport --uri "mongodb://ac-ezuz9la-shard-00-00.1norfz0.mongodb.net:27017,ac-ezuz9la-shard-00-01.1norfz0.mongodb.net:27017,ac-ezuz9la-shard-00-02.1norfz0.mongodb.net:27017/qkart?replicaSet=atlas-8ttk4n-shard-0" --ssl --authenticationDatabase admin --username admin --password p@ssword123 --drop --collection products --file data/export_qkart_users.json
mongoimport --uri "mongodb://ac-ezuz9la-shard-00-00.1norfz0.mongodb.net:27017,ac-ezuz9la-shard-00-01.1norfz0.mongodb.net:27017,ac-ezuz9la-shard-00-02.1norfz0.mongodb.net:27017/qkart?replicaSet=atlas-8ttk4n-shard-0" --ssl --authenticationDatabase admin --username admin --password p@ssword123 --drop --collection products --file data/export_qkart_products.json


