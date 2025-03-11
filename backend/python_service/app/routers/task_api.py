from flask import Blueprint, jsonify
from datetime import datetime
# DB ----------------------
import mysql.connector
from mysql.connector import Error
import os
from dotenv import load_dotenv
# log --------------------
import logging
import pytz
# ------


api = Blueprint("api", __name__)
# 環境変数
load_dotenv(dotenv_path="../config.env", override=True)

# Debug --------------------------------


class JSTFormatter(logging.Formatter):
    """日本時間のフォーマッター"""

    def formatTime(self, record, datefmt=None):
        jst = pytz.timezone("Asia/Tokyo")
        dt = datetime.fromtimestamp(record.created, tz=jst)
        if datefmt:
            return dt.strftime(datefmt)
        return dt.isoformat()


# ログの設定
fmt = "[%(asctime)s] [line_%(lineno)d] [%(levelname)s] %(name)s :%(message)s"
datefmt = "%Y-%m-%d %H:%M:%S"  # 日本時間のフォーマット
formatter = JSTFormatter(fmt, datefmt)

handler = logging.StreamHandler()
handler.setFormatter(formatter)

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
logger.addHandler(handler)
# --------------------------------------


def get_db_connection():
    try:
        conn = mysql.connector.connect(
            host=os.getenv("HOST"),
            user=os.getenv("USER"),
            password=os.getenv("PASSWORD"),
            database=os.getenv("DATABASE"),
            port=3306,
            charset="utf8mb4",
        )
        if conn.is_connected():
            print("MySQLに接続しました")
            return conn
    except Error as e:
        print(f"Error while connecting to MySQL: {e}")
        return None


@api.route("/",)
def api_root():
    conn = get_db_connection()
    if conn is None:
        return {"error": "Failed to connect DB"}, 500
    tasks = []
    try:
        cursor = conn.cursor()
        select_tasks_query = """
        SELECT * FROM tasks;
        """
        cursor.execute(select_tasks_query,)
        tasks = cursor.fetchall()
        logger.info('%s', tasks)

        return jsonify({'res': tasks})

    except Error as e:
        print(f"Error inserting photo: {e}")
        logger.error("Errorっす: %s", e)
        return {"error": "Failed to process"}, 500
    finally:
        cursor.close()
        conn.close()


@api.route("/tasks", methods=["GET"])
def get_tasks():
    tasks = [
        {
            "start": datetime(2025, 2, 1),
            "end": datetime(2025, 2, 28),
            "name": "Project1 aaa",
            "id": "p_1",
            "type": "project",
            "progress": 10,
            "isDisabled": False,
            "styles": {
                "progressColor": "#ffbb54",
                "progressSelectedColor": "#ff9e0d"
            },
            "hideChildren": False
        },
        {
            "start": datetime(2025, 3, 1),
            "end": datetime(2025, 3, 31),
            "name": "Project2",
            "id": "p_2",
            "type": "project",
            "progress": 0,
            "isDisabled": False,
            "styles": {
                "progressColor": "#ffbb54",
                "progressSelectedColor": "#ff9e0d"
            },
        },
        {
            "start": datetime(2025, 2, 1),
            "end": datetime(2025, 2, 1),
            "name": "start",
            "id": "m_1",
            "type": "milestone",
            "progress": 10,
            "isDisabled": False,
            "styles": {
                "progressColor": "#ffbb54",
                "backgroundColor": "#07dbee"
            },
        },
    ]

    return jsonify(tasks)
