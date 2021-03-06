import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {
  heroes: Hero[];
  // data=String;

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    console.log("from heroes.component onInit...");
    this.getHeroes();
    // this.getHeroesDemo();
  }

  getHeroesDemo(): void {
    this.heroService.getPeopleList().subscribe(heroes =>{  
      debugger
      this.heroes =heroes;    
      }) 
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => {
      // debugger
      this.heroes = heroes});
  }

  add(name: string): Hero {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe((hero:Hero) => {
        this.heroes.push(hero),
          console.log("POST call in data", hero);
      },
      
      (error:any)=>console.log("POST call in error", error)
      
      );
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

}