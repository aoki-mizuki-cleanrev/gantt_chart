from flask import Flask, jsonify
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)  # 全てのドメインからのアクセスを許可


def format_task(task):
    """ タスクのデータを適切な形式に変換 """
    return {
        "id": task["id"],
        "name": task["name"],
        "type": task["type"],
        "start": task["start"].isoformat(),
        "end": task["end"].isoformat(),
        "progress": task["progress"],
        "isDisabled": bool(task["isDisabled"]),
        "styles": task["styles"],
        "dependencies": task.get("dependencies", [])
    }


@app.route('/')
def index():
    tasks = [
        {
            "start": datetime(2020, 1, 1),
            "end": datetime(2020, 1, 31),
            "name": "Project1",
            "id": "p_1",
            "type": "project",
            "progress": 10,
            "isDisabled": True,
            "styles": {
                "progressColor": "#ffbb54",
                "progressSelectedColor": "#ff9e0d"
            },
        },
        {
            "start": datetime(2020, 1, 1),
            "end": datetime(2020, 1, 1),
            "name": "start",
            "id": "m_1",
            "type": "milestone",
            "progress": 10,
            "isDisabled": True,
            "styles": {
                "progressColor": "#ffbb54",
                "backgroundColor": "#07dbee"
            },
        },
        {
            "start": datetime(2020, 1, 20),
            "end": datetime(2020, 1, 20),
            "name": "E2E test",
            "id": "m_2",
            "type": "milestone",
            "progress": 10,
            "isDisabled": True,
            "styles": {
                "progressColor": "#ffbb54",
                "backgroundColor": "#07dbee"
            },
        },
        {
            "start": datetime(2020, 1, 2),
            "end": datetime(2020, 1, 5),
            "name": "Task 1",
            "id": "t_1",
            "type": "task",
            "progress": 45,
            "isDisabled": True,
            "styles": {
                "progressColor": "#ffbb54",
                "progressSelectedColor": "#ff9e0d"
            },
        },
        {
            "start": datetime(2020, 1, 6),
            "end": datetime(2020, 1, 10),
            "name": "Task 2",
            "id": "t_2",
            "type": "task",
            "progress": 25,
            "isDisabled": True,
            "dependencies": ["t_1"],
            "styles": {
                "progressColor": "#ffbb54",
                "progressSelectedColor": "#ff9e0d"
            },
        },
        {
            "start": datetime(2020, 1, 11),
            "end": datetime(2020, 1, 15),
            "name": "Task 3",
            "id": "t_3",
            "type": "task",
            "progress": 0,
            "isDisabled": True,
            "dependencies": ["t_2"],
            "styles": {
                "progressColor": "#ffbb54",
                "progressSelectedColor": "#ff9e0d"
            },
        },
    ]

    return jsonify([format_task(task) for task in tasks])


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5010, debug=True)
