import Knex from 'knex'

export async function up(knex: Knex) {
    await knex.schema.createTable('payers', tbl => {
        tbl.increments('id').primary()
        tbl.string('name').unique().notNullable()
        tbl.decimal('balance')
    })
}

export async function down(knex: Knex) {
    await knex.schema.dropTable('payers')
}