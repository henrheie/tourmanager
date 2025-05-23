import requests
from bs4 import BeautifulSoup

from . import db
from .models import Rider, Stage, StageResult

BASE_URL = "https://www.letour.fr/en/rankings"


def scrape_rankings(stage_id):
    """Scrape rankings for a given stage and store StageResult records."""
    url = f"{BASE_URL}/stage-{stage_id}"
    resp = requests.get(url)
    soup = BeautifulSoup(resp.text, 'html.parser')
    # Parsing should be implemented according to letour's HTML structure.
    # This is a placeholder implementation.
    for row in soup.select('table.ranking tbody tr'):
        position = int(row.select_one('.position').text)
        name = row.select_one('.rider').text.strip()
        rider = Rider.query.filter_by(name=name).first()
        if not rider:
            rider = Rider(name=name, category='unknown', cost=0)
            db.session.add(rider)
            db.session.commit()
        result = StageResult(stage_id=stage_id, rider=rider, position=position)
        db.session.add(result)
    db.session.commit()


def scrape_all_riders_with_cost():
    """Fetch general classification and assign a cost based on position."""
    url = BASE_URL
    resp = requests.get(url)
    soup = BeautifulSoup(resp.text, 'html.parser')

    rows = soup.select('table.ranking tbody tr')
    for row in rows:
        name = row.select_one('.rider').text.strip()
        position = int(row.select_one('.position').text)
        cost = max(0, 1000 - position * 10)
        rider = Rider.query.filter_by(name=name).first()
        if not rider:
            rider = Rider(name=name, category='unknown', cost=cost)
            db.session.add(rider)
        else:
            rider.cost = cost
    db.session.commit()
