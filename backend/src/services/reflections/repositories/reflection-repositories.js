import { nanoid } from 'nanoid';
import pool from '../../../config/database.js';

class ReflectionRepositories {
  constructor() {
    this._pool = pool;
  }

  async addReflection({ journalId, text }) {
    const id = `reflect-${nanoid(16)}`;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: `INSERT INTO reflections(id, journal_id, reflection_text, created_at, updated_at)
              VALUES($1, $2, $3, $4, $5)
              RETURNING id, journal_id, reflection_text, created_at, updated_at`,
      values: [id, journalId, text, createdAt, updatedAt],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async getReflectionByJournalId(journalId) {
    const query = {
      text: 'SELECT * FROM reflections WHERE journal_id = $1',
      values: [journalId],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }
}

export default new ReflectionRepositories();
