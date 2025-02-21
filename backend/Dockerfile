FROM python:3.11-slim

# 作業ディレクトリを作成
WORKDIR /app

RUN apt update && apt install -y procps

# 依存関係をインストール
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# ソースコードをコピー
COPY . /app

# ポートを公開 (例: 5000番を使用)
EXPOSE 5010

# CMD ["python", "app.py"]
CMD ["gunicorn", "-w", "4", "app:app","--bind", "0.0.0.0:5010","--reload"]

