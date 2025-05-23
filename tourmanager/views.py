from flask import Blueprint, render_template, request, redirect, url_for, flash
from flask_login import login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash

from . import db
from .models import User, Rider, Stage, Team, TeamMember, PointsRule, StageResult

bp = Blueprint('main', __name__)

@bp.route('/')
def index():
    stages = Stage.query.all()
    return render_template('index.html', stages=stages)

@bp.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = generate_password_hash(request.form['password'])
        user = User(username=username, password=password)
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return redirect(url_for('main.index'))
    return render_template('register.html')

@bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = User.query.filter_by(username=username).first()
        if user and check_password_hash(user.password, password):
            login_user(user)
            return redirect(url_for('main.index'))
        flash('Invalid credentials')
    return render_template('login.html')

@bp.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('main.index'))

@bp.route('/stage/<int:stage_id>', methods=['GET', 'POST'])
@login_required
def stage(stage_id):
    stage = Stage.query.get_or_404(stage_id)
    riders = Rider.query.all()
    if request.method == 'POST':
        team = Team.query.filter_by(stage_id=stage.id, user_id=current_user.id).first()
        if not team:
            team = Team(stage=stage, user=current_user, budget=request.form.get('budget',0))
            db.session.add(team)
            db.session.commit()
        # clear previous members
        TeamMember.query.filter_by(team_id=team.id).delete()
        for role in ['captain', 'climber', 'climber2', 'climber3', 'sprinter', 'sprinter2', 'sprinter3', 'young', 'young2', 'young3', 'tt']:
            rid = request.form.get(role)
            if rid:
                member = TeamMember(team=team, rider_id=int(rid), role=role)
                db.session.add(member)
        db.session.commit()
        return redirect(url_for('main.stage', stage_id=stage.id))
    return render_template('stage.html', stage=stage, riders=riders)

@bp.route('/admin/riders', methods=['GET', 'POST'])
@login_required
def admin_riders():
    if request.method == 'POST':
        name = request.form['name']
        category = request.form['category']
        cost = int(request.form['cost'])
        rider = Rider(name=name, category=category, cost=cost)
        db.session.add(rider)
        db.session.commit()
    riders = Rider.query.all()
    return render_template('riders.html', riders=riders)
