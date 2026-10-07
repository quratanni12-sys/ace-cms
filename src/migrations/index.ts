import * as migration_20261002_061109_initial from './20261002_061109_initial';
import * as migration_20261002_063406_rename_business from './20261002_063406_rename_business';
import * as migration_20261002_091400_add_content_html from './20261002_091400_add_content_html';
import * as migration_20261006_083955_seo_images_upgrade from './20261006_083955_seo_images_upgrade';

export const migrations = [
  {
    up: migration_20261002_061109_initial.up,
    down: migration_20261002_061109_initial.down,
    name: '20261002_061109_initial',
  },
  {
    up: migration_20261002_063406_rename_business.up,
    down: migration_20261002_063406_rename_business.down,
    name: '20261002_063406_rename_business',
  },
  {
    up: migration_20261002_091400_add_content_html.up,
    down: migration_20261002_091400_add_content_html.down,
    name: '20261002_091400_add_content_html',
  },
  {
    up: migration_20261006_083955_seo_images_upgrade.up,
    down: migration_20261006_083955_seo_images_upgrade.down,
    name: '20261006_083955_seo_images_upgrade'
  },
];
