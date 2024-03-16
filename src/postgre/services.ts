import { pool } from "./pool";
import { Pool } from "pg";

class Services {
    private pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }

    public async createUser(username: string, password: string, email: string, name: string): Promise<Boolean> {
        try {
            await this.pool.query("INSERT INTO users(username, password, email, name) VALUES($1, $2, $3, $4)", [username, password, email, name]);
        } catch (e: unknown) {
            return false;
        }
        return true;
    }

    public async checkUserExistence(username: string): Promise<string | null> {
        const res = await this.pool.query("SELECT password FROM users WHERE username = $1", [username]);
        if (res.rows.length == 0) return null;
        return res.rows[0].password;
    }

    public async getUserInformation(username: string, fields: Array<string>): Promise<Object> {
        const res = await this.pool.query(`SELECT ${fields.join()} FROM users WHERE username = $1`, [username]);
        return res.rows[0];
    }

    public async getUserProperty(username: string, fields: Array<string>): Promise<Object> {
        const res = await this.pool.query(`SELECT ${fields.join()} FROM property WHERE username = $1`, [username]);
        return res.rows[0];
    }
}

export default new Services(pool);