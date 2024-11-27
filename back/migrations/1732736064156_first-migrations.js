exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('users', {
        id: 'id',
        email: { type: 'varchar(100)', notNull: true },
        username: { type: 'varchar(100)', notNull: true },
        hashedPassword: { type: 'varchar(1000)', notNull: true },
        createdAt: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        }
    })
    pgm.createTable('groups', {
        id: 'id',
        name: { type: 'varchar(100)', notNull: true },
        createdAt: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        }
    })
    pgm.createTable('sessions', {
        id: 'id',
        groupId: {
            type: 'integer',
            notNull: true,
            references: '"groups"',
            onDelete: 'cascade'
          },
        flimTitle: { type: 'varchar(100)', notNull: true },
        createdAt: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
        startedAt: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
        finishedAt: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        }
    })
    pgm.createTable('tiles', {
        id: 'id',
        groupId: {
            type: 'integer',
            notNull: true,
            references: '"groups"',
            onDelete: 'cascade'
        },
        userId: {
            type: 'integer',
            notNull: false,
            references: '"users"'
        },
        text: { type: 'varchar(1000)', notNull: true },
        createdAt: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        }
    })
    pgm.createTable('bingos', {
        id: 'id',
        userId: {
            type: 'integer',
            notNull: false,
            references: '"users"'
        },
        sessionId: {
            type: 'integer',
            notNull: true,
            references: '"sessions"',
            onDelete: 'cascade',
        },
        validated: 'boolean'
    })
    pgm.createTable('user_group_rel', {
        user_Id: {
            type: 'integer',
            notNull: true,
            references: '"users"',
            onDelete: 'cascade',
        },
        groupId: {
            type: 'integer',
            notNull: true,
            references: '"groups"',
            onDelete: 'cascade',
        }
    })
    pgm.createTable('user_session_rel', {
        userId: {
            type: 'integer',
            notNull: true,
            references: '"users"',
            onDelete: 'cascade',
        },
        sessionId: {
            type: 'integer',
            notNull: true,
            references: '"sessions"',
            onDelete: 'cascade',
        }
    })
    pgm.createTable('bingo_tile_rel', {
        bingoId: {
            type: 'integer',
            notNull: true,
            references: '"bingos"',
            onDelete: 'cascade',
        },
        tileId: {
            type: 'integer',
            notNull: true,
            references: '"tiles"',
            onDelete: 'cascade',
        },
        position: 'integer'
    })
};

exports.down = (pgm) => {
    pgm.dropTable('users')
    pgm.dropTable('groups')
    pgm.dropTable('sessions')
    pgm.dropTable('tiles')
    pgm.dropTable('bingos')
    pgm.dropTable('user_session_rel')
    pgm.dropTable('bingo_tile_rel')
};
