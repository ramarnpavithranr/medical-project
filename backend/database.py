import os
import sqlite3
import json
from typing import List, Optional, Dict, Any
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(__file__), "cardiology.db")
MONGODB_URI = os.getenv("MONGODB_URI", "")

class Database:
    def __init__(self):
        self.is_mongo = bool(MONGODB_URI)
        self.mongo_client = None
        self.mongo_db = None
        self._init_db()

    def _init_db(self):
        if self.is_mongo:
            try:
                from pymongo import MongoClient
                self.mongo_client = MongoClient(MONGODB_URI, serverSelectionTimeoutMS=2000)
                self.mongo_client.server_info()
                self.mongo_db = self.mongo_client["nuvica_cardiology"]
                print("[DATABASE] Connected to MongoDB successfully.")
                return
            except Exception as e:
                print(f"[DATABASE] MongoDB connection failed ({e}). Falling back to SQLite local persistence.")
                self.is_mongo = False

        # SQLite initialization
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS analysis_records (
                id TEXT PRIMARY KEY,
                modality TEXT NOT NULL,
                modality_name TEXT NOT NULL,
                status TEXT NOT NULL,
                created_at TEXT NOT NULL,
                model_name TEXT NOT NULL,
                model_version TEXT NOT NULL,
                filename TEXT NOT NULL,
                file_size_kb REAL NOT NULL,
                preview_url TEXT,
                heatmap_url TEXT,
                predictions TEXT NOT NULL,
                explanation TEXT,
                clinical_guidance TEXT,
                risk_assessment TEXT
            )
        """)
        conn.commit()
        conn.close()
        print(f"[DATABASE] Initialized SQLite database at {DB_PATH}")

    def save_record(self, record_dict: Dict[str, Any]) -> bool:
        if self.is_mongo and self.mongo_db is not None:
            try:
                self.mongo_db["records"].update_one(
                    {"id": record_dict["id"]},
                    {"$set": record_dict},
                    upsert=True
                )
                return True
            except Exception as e:
                print(f"[DATABASE] MongoDB save error: {e}")

        try:
            conn = sqlite3.connect(DB_PATH)
            cursor = conn.cursor()
            cursor.execute("""
                INSERT OR REPLACE INTO analysis_records (
                    id, modality, modality_name, status, created_at,
                    model_name, model_version, filename, file_size_kb,
                    preview_url, heatmap_url, predictions, explanation,
                    clinical_guidance, risk_assessment
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                record_dict["id"],
                record_dict["modality"],
                record_dict["modality_name"],
                record_dict["status"],
                record_dict["created_at"],
                record_dict["model_name"],
                record_dict["model_version"],
                record_dict["filename"],
                record_dict["file_size_kb"],
                record_dict.get("preview_url"),
                record_dict.get("heatmap_url"),
                json.dumps(record_dict.get("predictions", {})),
                json.dumps(record_dict.get("explanation", {})),
                json.dumps(record_dict.get("clinical_guidance", {})),
                json.dumps(record_dict.get("risk_assessment", {}))
            ))
            conn.commit()
            conn.close()
            return True
        except Exception as e:
            print(f"[DATABASE] SQLite save error: {e}")
            return False

    def get_record(self, record_id: str) -> Optional[Dict[str, Any]]:
        if self.is_mongo and self.mongo_db is not None:
            try:
                doc = self.mongo_db["records"].find_one({"id": record_id}, {"_id": 0})
                if doc:
                    return doc
            except Exception as e:
                print(f"[DATABASE] MongoDB find error: {e}")

        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM analysis_records WHERE id = ?", (record_id,))
        row = cursor.fetchone()
        conn.close()

        if not row:
            return None

        data = dict(row)
        for field in ["predictions", "explanation", "clinical_guidance", "risk_assessment"]:
            if data.get(field):
                try:
                    data[field] = json.loads(data[field])
                except Exception:
                    pass
        return data

    def list_records(self, modality: Optional[str] = None, status: Optional[str] = None, limit: int = 50) -> List[Dict[str, Any]]:
        if self.is_mongo and self.mongo_db is not None:
            try:
                query = {}
                if modality and modality != "all":
                    query["modality"] = modality
                if status and status != "all":
                    query["status"] = status
                cursor = self.mongo_db["records"].find(query, {"_id": 0}).sort("created_at", -1).limit(limit)
                return list(cursor)
            except Exception as e:
                print(f"[DATABASE] MongoDB list error: {e}")

        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()

        sql = "SELECT * FROM analysis_records WHERE 1=1"
        params = []
        if modality and modality != "all":
            sql += " AND modality = ?"
            params.append(modality)
        if status and status != "all":
            sql += " AND status = ?"
            params.append(status)
        sql += " ORDER BY created_at DESC LIMIT ?"
        params.append(limit)

        cursor.execute(sql, tuple(params))
        rows = cursor.fetchall()
        conn.close()

        results = []
        for row in rows:
            data = dict(row)
            for field in ["predictions", "explanation", "clinical_guidance", "risk_assessment"]:
                if data.get(field):
                    try:
                        data[field] = json.loads(data[field])
                    except Exception:
                        pass
            results.append(data)
        return results

db = Database()
