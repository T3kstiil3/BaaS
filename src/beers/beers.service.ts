import { Injectable } from '@nestjs/common';

import beersJson from './../../static/data/beers.json';
import { Beer } from './beer.dto.js';

@Injectable()
export class BeersService {
  beers: Beer[] = beersJson;

  findOneById(id: number): Beer {
    return this.beers.find(beer => beer.id === id);
  }

  findAll(): Beer[] {
    return this.beers;
  }

  add(beer: Beer) {
    this.beers.push(beer);
  }

  update(beerToUpdate): Beer {
    const beerIndex = this.beers.findIndex(
      (beer: Beer) => beer.id === beerToUpdate.id,
    );
    this.beers[beerIndex] = beerToUpdate;
    return beerToUpdate;
  }

  isStockAvailable(id: number): Beer {
    return this.beers.find(beer => beer.id === id && beer.stock > 0);
  }

  decreaseStock(id: number): Beer | boolean {
    const beerIndex = this.beers.findIndex((beer: Beer) => beer.id === id);

    if (beerIndex > -1) {
      this.beers[beerIndex].stock = this.beers[beerIndex].stock - 1;
      return this.beers[beerIndex];
    } else {
      return false;
    }
  }

  delete(id: number): string {
    this.beers = this.beers.filter(beer => beer.id !== id);
    return 'OK';
  }
}
