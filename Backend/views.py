from time import clock_getres
from unicodedata import category
from flask import Flask, render_template, request, jsonify, abort, make_response
from flask_cors import cross_origin
import json, hashlib, secrets
from flask_socketio import SocketIO, send, emit, join_room, leave_room

def init(app, mysql, socketio):
    @app.route('/', methods=['GET', 'POST'])
    def index():
        if request.method == 'POST':
            # Fetch Form Data
            user_details = request.form

            employee_id = user_details['Employee ID Number']
            password = user_details['Password']

            cur = mysql.connection.cursor()
            cur.execute("INSERT INTO Employee(eID, password) VALUES(%s,%s)",
                        (employee_id, password))

            mysql.connection.commit()
            cur.close()
            return 'success'
        
        return render_template('index.html')
    
    @app.route("/auth", methods=['POST', 'GET'])
    @cross_origin(supports_credentials=True)
    def authentication():
        if request.method == 'POST':
            data = json.loads(request.data)

            employeeID = data.get('employeeID') # Extract employeeID
            print(employeeID)
            password = data.get('password') # Extract password
            print(password)

            encrypted = hashlib.sha1(password.encode('utf-8')).hexdigest()

            cur = mysql.connection.cursor()
            query = f'SELECT * FROM Employee WHERE eID = {employeeID} AND ' \
                    f'password = "{encrypted}";'

            result = cur.execute(query)

            cur.close()

            if result > 0:
                return json.dumps({"employeeID": employeeID})

            return json.dumps({"response": False})
    
    @app.route("/registration", methods=['POST', 'GET'])
    @cross_origin(supports_credentials=True)
    def registration():
        if request.method == 'POST':

            data = json.loads(request.data)

            employeeID = data.get('employeeID')
            password = data.get('password')
            encrypted = hashlib.sha1(password.encode('utf-8')).hexdigest()

            cur = mysql.connection.cursor()
            cur.execute("INSERT INTO Employee(eID, password) VALUES(%s,%s)",
                        (employeeID, encrypted))

            mysql.connection.commit()
            cur.close()

        return {"response": "success"}

    @app.route('/users')
    def users():
        cur = mysql.connection.cursor()
        result = cur.execute("SELECT * FROM users")
        if result > 0:
            user_details = cur.fetchall();
            return render_template('users.html', user_details=user_details)

    # Get all categories
    @app.route('/categories', methods=['GET'])
    def getAllCategories():
        cur = mysql.connection.cursor()
        querry = "SELECT * FROM Categories"
        cur.execute(querry)
        result = cur.fetchall()
        json_data = []
        for _,categories_name in result:
            json_data.append(categories_name)
        return json.dumps(json_data)
    
    # Get all tables, isOccupied = 1 means True, isOccupied = 0 means False
    @app.route('/tables/', defaults={'isOccupied': 2}, methods=['GET'])
    @app.route('/tables/<isOccupied>', methods=['GET'])
    def getAllTables(isOccupied):
        cur = mysql.connection.cursor()
        querry = """
            SELECT * 
            FROM Restaurant_Table 
            """
        print(isOccupied)
        if isOccupied == "1":
            querry += "WHERE status = 1;"
        elif isOccupied == "0":
            querry += "WHERE status = 0;"
        else:
            querry += ";"
            
        print("QUERRY: ", querry)

        cur.execute(querry)
        result = cur.fetchall()
        json_data = []
        for _,table_number,status in result:
            json_data.append({
                'table_number': table_number,
                'status': status 
            })
        return json.dumps(json_data)

    # Get all items from Items table
    @app.route('/menu', methods=['GET'])
    def getAllItems():
        cur = mysql.connection.cursor()
        querry = """
            SELECT 
                I.item_name,
                I.item_description,
                I.item_price,
                I.item_quantity,
                I.calories,
                P.url,
                C.name,
                I.id
            FROM Items I
            JOIN Photos P ON I.photoID=P.ID
            JOIN Categories C ON I.categoryID=C.ID
            ;
        """

        cur.execute(querry)
        result = cur.fetchall()
        # print(result)
        json_data = []
        print(len(result[0]))
        for i in result:
            print(i)
            item = {
                'name':i[0],
                'desc':i[1],
                'price':i[2],
                'quantity':i[3],
                'calories':i[4],
                'url':i[5],
                'category':i[6],
                'item_Id': i[7]
            }

            json_data.append(item)
        return jsonify(json_data)
    
    #CREATE A NEW ORDER
    @app.route('/t=<table_id>/create', methods=['GET','POST'])
    def createOrder(table_id):
        """
        [
            {
                table_id,
                item_id,
                quantity
            },
            {

            },
            {
                
            }
        ]
        """
       
        #check if table_id is valid
        if not table_id: return abort(404, description="Missing table id in the request.")

        cur = mysql.connection.cursor()
        check_id_querry = f"SELECT EXISTS(SELECT * FROM Restaurant_Table WHERE ID='{table_id}');"
        cur.execute(check_id_querry)
        result = cur.fetchall()

        if(result[0][0] == 0): return abort(404, description="Invalid table ID")

        if request.method == 'POST':

            get_a_new_order_no_querry = f"SELECT order_no FROM Orders ORDER BY order_no DESC LIMIT 1;"

            cur.execute(get_a_new_order_no_querry)
            result = cur.fetchall()
            new_order_no = result[0][0] + 1
            cur.close()

            data = json.loads(request.data)
            print('\n\n\nDATA: ', data)

            item_id_list = data['item_id']
            quantity_list = data['quantity']
            table_id = data['table_id']
            create_a_new_order_querry = "INSERT INTO Orders(item_id, quantity, table_id, order_no)\n VALUE" 
            for item_id, quantity in zip(item_id_list, quantity_list):
                tmp_sub_querry = f'({item_id}, {quantity}, {table_id}, {new_order_no}),'
                create_a_new_order_querry +=  '\n   ' + tmp_sub_querry

            create_a_new_order_querry =create_a_new_order_querry[:-1] + '\n;'
            
            try:
                new_cur = mysql.connection.cursor()
                new_cur.execute(create_a_new_order_querry)
                mysql.connection.commit()
                new_cur.close()
                data = {'order_no': f'{new_order_no}', 'code': 'SUCCESS'}
                return make_response(jsonify(data), 201)
            except Exception as e:
                return abort(404, description=f'Error. {e}')
    
    #CREATE A NEW ORDER
    @app.route('/t=<table_id>/create2', methods=['GET','POST'])
    def createOrder2(table_id):
       
        #check if table_id is valid
        if not table_id: return abort(404, description="Missing table id in the request.")

        cur = mysql.connection.cursor()
        check_id_querry = f"SELECT EXISTS(SELECT * FROM Restaurant_Table WHERE ID='{table_id}');"
        cur.execute(check_id_querry)
        result = cur.fetchall()

        if(result[0][0] == 0): return abort(404, description="Invalid table ID")

        if request.method == 'POST':

            get_a_new_order_no_querry = f"SELECT order_no FROM Orders ORDER BY order_no DESC LIMIT 1;"

            cur.execute(get_a_new_order_no_querry)
            result = cur.fetchall()
            new_order_no = result[0][0] + 1
            cur.close()

            data = json.loads(request.data)

            item_id_list, quantity_list = [], []
            for key in data.keys():
                item_id_list.append(int(key))
                quantity_list.append(data[key]['quantity'])

            create_a_new_order_querry = "INSERT INTO Orders(item_id, quantity, table_id, order_no)\n VALUE" 
            for item_id, quantity in zip(item_id_list, quantity_list):
                tmp_sub_querry = f'({item_id}, {quantity}, {table_id}, {new_order_no}),'
                create_a_new_order_querry +=  '\n   ' + tmp_sub_querry

            create_a_new_order_querry =create_a_new_order_querry[:-1] + '\n;'
            
            try:
                new_cur = mysql.connection.cursor()
                new_cur.execute(create_a_new_order_querry)
                mysql.connection.commit()
                new_cur.close()
                data = {'order_no': f'{new_order_no}', 'code': 'SUCCESS'}
                return make_response(jsonify(data), 201)
            except Exception as e:
                return abort(404, description=f'Error. {e}')
    
    #UPDATE AN EXISTING ORDER
    @app.route('/t=<table_id>/update', methods=['PATCH'])
    def updateAnOrder(table_id):
        if not table_id: return abort(404, description="Missing table id in the request.")

        cur = mysql.connection.cursor()
        check_id_querry = f"SELECT EXISTS(SELECT * FROM Restaurant_Table WHERE ID='{table_id}');"
        cur.execute(check_id_querry)
        result = cur.fetchall()

        if(result[0][0] == 0): return abort(404, description="Invalid table ID")

        update_an_order_querry = f""

    #Get all items from a specific table_id
    @app.route('/t=<table_id>/getAllItems', methods=['GET','POST'])
    def getAllItemsByTableId(table_id):
        cur = mysql.connection.cursor()

        #check if table_id is an valid id in the Restaurant_tables table
        check_id_querry = f"""
            SELECT EXISTS(
                SELECT * 
                from Restaurant_Table 
                WHERE ID='{table_id}');
        """
        cur.execute(check_id_querry)
        result = cur.fetchall()

        if(result[0][0] == 0):
            return abort(404, description="Invalid table ID")
        
        get_all_items_by_table_id_querry = f"""
            SELECT 
                Photos.url,
                item_name,
                quantity,
                ROUND(item_price * quantity, 2) as total
            FROM Orders
            JOIN Items ON Orders.item_ID = Items.ID
            JOIN Photos ON Photos.ID = Items.photoID
            WHERE Orders.table_ID = '{table_id}'
            ;
        """
        try:
            cur.execute(get_all_items_by_table_id_querry)
            result = cur.fetchall()
            print(result)
            json_data = []
            for i in result:
                item = {
                    'url':i[0],
                    'name': i[1],
                    'quantity':i[2],
                    'total': i[3]
                }
                json_data.append(item)

            return jsonify(json_data)
        except Exception as e:
            return abort(404, description=f'Error getting items by a specific table ID, {e}')

    @socketio.on('message')
    def message(data):
        print(f'\n\n{data}\n\n')
        send("I am the server")
    
    #store order history of each table
    # cart_hitory = {
    #   1: {
    #      [item1, item 2, item 3] 
    #   }
    #   2: {
    #       [item2, item5, item7]
    #   }
    # }
    cart_history = {}

    @socketio.on('join')
    def on_join(data):
        table = data['table']
        items = data['item']
        cart_history[table]
