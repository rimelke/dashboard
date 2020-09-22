import path from 'path'

const knexConfig = {
    development: {
        client: 'sqlite3',
        connection: {
            filename: path.resolve(__dirname, '..', 'database', 'database.sqlite')
        },
        migrations: {
            directory: path.resolve(__dirname, '..', 'database', 'migrations')
        },
        seeds: {
            directory: path.resolve(__dirname, '..', 'database', 'seeds')
        },
        useNullAsDefault: true,
        pool: {
            afterCreate(conn: { run: (sql: string, cb: any) => void }, cb: any) {
                conn.run('PRAGMA foreign_keys = ON', cb)
            }
        }
    },
    production: {
        
    },
    test: {
        client: 'sqlite3',
        connection: ':memory:',
        migrations: {
            directory: path.resolve(__dirname, '..', 'database', 'migrations')
        },
        seeds: {
            directory: path.resolve(__dirname, '..', 'database', 'seeds')
        },
        useNullAsDefault: true,
        pool: {
            afterCreate(conn: { run: (sql: string, cb: any) => void }, cb: any) {
                conn.run('PRAGMA foreign_keys = ON', cb)
            }
        }
    }
}

export default knexConfig

module.exports = knexConfig