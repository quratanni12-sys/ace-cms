import * as migration_20261002_061109_initial from './20261002_061109_initial';
import * as migration_20261002_063406_rename_business from './20261002_063406_rename_business';

export const migrations = [
  {
    up: migration_20261002_061109_initial.up,
    down: migration_20261002_061109_initial.down,
    name: '20261002_061109_initial',
  },
  {
    up: migration_20261002_063406_rename_business.up,
    down: migration_20261002_063406_rename_business.down,
    name: '20261002_063406_rename_business'
  },
];
