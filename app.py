from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/score/<int:points>")
def save_score(points):
    with open("scores.txt", "a") as file:
        file.write(f"{points}\n")
    return {"message": "Score saved!"}

@app.route("/highscore")
def get_highscore():
    try:
        with open("scores.txt", "r") as file:
            scores = [int(line.strip()) for line in file.readlines()]
        highscore = max(scores) if scores else 0
        return {"highscore": highscore}
    except FileNotFoundError:
        return {"highscore": 0}

if __name__ == "__main__":
    app.run(debug=True)
