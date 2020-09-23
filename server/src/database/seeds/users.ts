import Knex from 'knex'

export async function seed(knex: Knex) {
    await knex('users').insert([
        {
            username: 'rimas',
            password: '$2a$12$zYTfDgLn0haA69Ey5IZpb.SdhjtnbOGxUpqbbey4GuoAmf3xvGqMu'
        },
        {
            username: 'talas',
            password: '$2a$12$qukCpQJ3HJGJskkCX8kNoeGriUJiIbEogkcc/6QpSvZb2IoRHw2MW'
        },
        {
            username: 'tierres',
            password: '$2a$12$CzYNyEpH1uy0JTe5wLoKO.bbVR4y2QSm/N9SpcNXklS8ySbX12mb6'
        }
    ])
}