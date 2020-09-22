import Knex from 'knex'

export async function up(knex: Knex) {
    await knex.schema.createTable('spents', tbl => {
        tbl.increments('id').primary()
        tbl.integer('user_id')
            .references('users.id')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
            .notNullable()

        tbl.integer('payer_id')
            .references('payers.id')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
            .notNullable()
        tbl.date('date')
            .defaultTo(knex.fn.now())
            .notNullable()
        tbl.string('beneficiary').notNullable()
        tbl.string('resume').notNullable()
        tbl.text('description')
        tbl.string('receipt')
        tbl.decimal('amount').notNullable()
        tbl.timestamps(true, true)
    })
}

export async function down(knex: Knex) {
    await knex.schema.dropTable('spents')
}