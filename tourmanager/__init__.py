from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager

# Initialize extensions

db = SQLAlchemy()
login_manager = LoginManager()


def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'dev'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tourmanager.db'
    db.init_app(app)
    login_manager.init_app(app)

    with app.app_context():
        from . import models
        db.create_all()
        from . import views
        app.register_blueprint(views.bp)

    return app
