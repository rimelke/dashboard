import Knex from 'knex'

export async function seed(knex: Knex) {
    await knex('users').insert([
        {
            username: 'rimas',
            password: '$2a$12$zYTfDgLn0haA69Ey5IZpb.SdhjtnbOGxUpqbbey4GuoAmf3xvGqMu'
        }
    ])
}