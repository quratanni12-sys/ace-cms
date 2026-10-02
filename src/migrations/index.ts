import * as migration_20261002_061109_initial from './20261002_061109_initial';

export const migrations = [
  {
    up: migration_20261002_061109_initial.up,
    down: migration_20261002_061109_initial.down,
    name: '20261002_061109_initial'
  },
];
