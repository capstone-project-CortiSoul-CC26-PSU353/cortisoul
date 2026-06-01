/* eslint-disable camelcase */

export const up = (pgm) => {
  pgm.addColumn('journals', {
    stress_category: {
      type: 'TEXT',
    },
  });

  pgm.createTable('reflections', {
    id: {
      type: 'VARCHAR(30)',
      primaryKey: true,
      notNull: true,
    },
    journal_id: {
      type: 'VARCHAR(30)',
      notNull: true,
      references: 'journals',
      onDelete: 'cascade',
    },
    text: {
      type: 'TEXT',
      notNull: true,
    },
    created_at: {
      type: 'TIMESTAMPTZ',
      notNull: true,
    },
    updated_at: {
      type: 'TIMESTAMPTZ',
      notNull: true,
    },
  });
};

export const down = (pgm) => {
  pgm.dropTable('reflections');
  pgm.dropColumn('journals', 'stress_category');
};
