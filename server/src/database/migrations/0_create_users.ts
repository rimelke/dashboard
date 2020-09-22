import Knex from 'knex'

export async function up(knex: Knex) {
    await knex.schema.createTable('users', tbl => {
        tbl.increments('id').primary()
        tbl.string('username').unique().notNullable()
        tbl.string('password').notNullable()
    })
}

export async function down(knex: Knex) {
    await knex.schema.dropTable('users')
}