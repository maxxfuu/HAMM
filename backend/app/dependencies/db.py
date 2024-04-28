import libsql_experimental as libsql
import json
import os

url = os.getenv("TURSO_DB_URL")
auth_token = os.getenv("TURSO_AUTH_TOKEN")


def update_meeting(meeting_id, summary, definitions):
    conn = libsql.connect("hamm-dev.db", sync_url=url, auth_token=auth_token)
    conn.sync()
    conn.execute(
        "UPDATE meetings SET status = ?, summary = ?, definitions = ? WHERE id = ?;",
        ("processed", summary, json.dumps(definitions), meeting_id),
    )

    conn.commit()
