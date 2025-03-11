import mysql.connector
import os
# from glob import glob

# `.env` を使う場合は dotenv をインストール
from dotenv import load_dotenv
load_dotenv(dotenv_path="./config.env", override=True)

# MySQL に接続
conn = mysql.connector.connect(
    host=os.getenv("HOST"),
    user=os.getenv("USER"),
    password=os.getenv("PASSWORD"),
    port=3306,
    charset="utf8mb4",
)
cursor = conn.cursor()


# # `.sql` ファイルを読み込んで実行
with open("./schema/schema.sql", "r", encoding="utf-8") as file:
    sql_script = file.read()

# # `;` で区切られた複数の SQL 文を順番に実行
for statement in sql_script.split(";"):
    statement = statement.strip()
    if statement:
        cursor.execute(statement)

# # コミットして接続を閉じる
conn.commit()
conn.close()

print("✅ All `.sql` files executed successfully!")
