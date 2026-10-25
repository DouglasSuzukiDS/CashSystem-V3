#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/7c63adc8318106422919571791924c62f8c5a645eff3ef6d485deac8c27e9079/contract';
import startContract from '../../snapshots/7c63adc8318106422919571791924c62f8c5a645eff3ef6d485deac8c27e9079/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/f3a1ed52279e033e361b6cb4f3d7e939f688fbf8d1d88f8fac021f13ff25ac30/contract';
import endContract from '../../snapshots/f3a1ed52279e033e361b6cb4f3d7e939f688fbf8d1d88f8fac021f13ff25ac30/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.alterColumnType({
        schema: 'public',
        table: 'Sales',
        column: 'priceOrder',
        type: 'float8',
        operationClass: 'widening',
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
