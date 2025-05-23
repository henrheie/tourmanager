from tourmanager import create_app
from tourmanager.scraper import scrape_all_riders_with_cost

app = create_app()

if __name__ == "__main__":
    with app.app_context():
        scrape_all_riders_with_cost()
