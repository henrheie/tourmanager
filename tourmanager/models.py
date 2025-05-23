from datetime import datetime
from . import db, login_manager
from flask_login import UserMixin

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

class Rider(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    category = db.Column(db.String(50), nullable=False)  # climber, sprinter, etc.
    cost = db.Column(db.Integer, default=0)

class Stage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120))
    date = db.Column(db.Date, default=datetime.utcnow)

class Team(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    stage_id = db.Column(db.Integer, db.ForeignKey('stage.id'))
    budget = db.Column(db.Integer, default=0)
    user = db.relationship('User', backref='teams')
    stage = db.relationship('Stage', backref='teams')

class TeamMember(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    team_id = db.Column(db.Integer, db.ForeignKey('team.id'))
    rider_id = db.Column(db.Integer, db.ForeignKey('rider.id'))
    role = db.Column(db.String(50))  # captain, climber, sprinter, young, tt
    team = db.relationship('Team', backref='members')
    rider = db.relationship('Rider')

class PointsRule(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    role = db.Column(db.String(50))  # rider role
    position = db.Column(db.Integer)  # ranking position
    points = db.Column(db.Integer)

class StageResult(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    stage_id = db.Column(db.Integer, db.ForeignKey('stage.id'))
    rider_id = db.Column(db.Integer, db.ForeignKey('rider.id'))
    position = db.Column(db.Integer)
    stage = db.relationship('Stage', backref='results')
    rider = db.relationship('Rider')

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))
