import { v4 as uuid } from "uuid";
import db from "../models/db.js";

export function createNegotiation(title = "Negotiation") {
  const id = uuid();
  db.prepare("INSERT INTO sessions (id, title) VALUES (?, ?)").run(id, title);
  return { id, title };
}

export function addMessage(sessionId, message) {
  const stmt = db.prepare(
    `INSERT INTO messages (session_id, party, text, price, laycan) VALUES (?, ?, ?, ?, ?)`
  );
  stmt.run(sessionId, message.party, message.text, message.offer?.price, message.offer?.laycan);

  if (message.offer?.price) upsertTerm(sessionId, "Price", message.offer.price);
  if (message.offer?.laycan) upsertTerm(sessionId, "Laycan", message.offer.laycan);

  return message;
}

export function getLogs(sessionId) {
  return db
    .prepare("SELECT party, text, price, laycan, ts FROM messages WHERE session_id = ? ORDER BY ts ASC")
    .all(sessionId);
}

export function getTerms(sessionId) {
  return db
    .prepare("SELECT key, value, updated_at as updatedAt FROM terms WHERE session_id = ? ORDER BY updated_at DESC")
    .all(sessionId);
}

export function finalizeRecap(sessionId) {
  const session = db.prepare("SELECT * FROM sessions WHERE id = ?").get(sessionId);
  const terms = getTerms(sessionId);
  const logsCount = db.prepare("SELECT COUNT(*) as c FROM messages WHERE session_id = ?").get(sessionId).c;

  return {
    id: session.id,
    title: session.title,
    finalizedAt: new Date().toISOString(),
    terms,
    logsCount,
  };
}

function upsertTerm(sessionId, key, value) {
  const existing = db.prepare("SELECT id FROM terms WHERE session_id = ? AND key = ?").get(sessionId, key);
  if (existing) {
    db.prepare("UPDATE terms SET value = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").run(value, existing.id);
  } else {
    db.prepare("INSERT INTO terms (session_id, key, value) VALUES (?, ?, ?)").run(sessionId, key, value);
  }
}
