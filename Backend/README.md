## How to run the backend service on your machine?
You will need to run the backend to make any RESTful API request from the frontend.

#### Navigate to the project folder:
```
git checkout master
git pull
```
#### Navigate to the Backend folder:
```
cd Backend
```

#### Set up the mySQL connection configuration file:
Create a file called **db.yaml** with the following content, and fill in info:
```
mysql_host: ''
mysql_user: ''
mysql_password: ''
mysql_db: ''
```

#### You will need python3 and pip3. 
##### Check if you already have them:

```
python3 --version
pip3 --version
```

If they were not installed, the easiest way to get them is through Homebrew
##### Installing Homebrew:

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
##### Install python3 through Homebrew
```
brew install python@3.10
```
#### Running the backend service
```
pip3 install -r requirements.txt
python3 -m venv .venv
source .venv/bin/activate (for MAC)

OR

.venv/Scripts/activate (for Windows)  
```
You will see that you're in the virtual environment at this point. Notice the 
```(.venv) before your command line ```
```
export FLASK_APP=application.py
export FLASK_ENV=development
flask run
```

There you go; it should be up and running at this point.