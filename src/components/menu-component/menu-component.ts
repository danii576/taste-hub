import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';

interface Dish {
  name: string;
  price: string;
  image: string;
  recipe: string;
  origin: string;
  weight: string | number;
  calories: number;
  protein: number | string;
}

interface Dessert {
  name: string;
  price: string;
  image: string;
  description: string;
  weight: string | number;
  calories: number;
  protein: number | string;
}

@Component({
  selector: 'app-menu-component',
  imports: [CommonModule, TranslatePipe, TranslateModule],
  templateUrl: './menu-component.html',
  styleUrls: ['./menu-component.css'],
  standalone: true, // Add if you are using standalone components in Angular 14+
})
export class MenuComponent {
  dishes: Dish[] = [
    {
      name: 'Bacalhau com Natas',
      price: '€12.50',
      image: 'assets/site-images/menu-pitures/BacalhaucomNatas-1.jpg',
      recipe:
        'Oven-baked codfish with cream, onions, and potatoes / Bacalhau assado no forno com natas, cebolas e batatas',
      origin:
        'Popularized in the 20th century in Lisbon / Popularizado no século XX em Lisboa.',
      weight: '400g',
      calories: 650,
      protein: '35g',
    },
    {
      name: 'Bacalhau à Brás',
      price: '€13.00',
      image: 'assets/site-images/menu-pitures/BacalhauàBrás-2.jpg',
      recipe:
        'Shredded salted cod with onions, potatoes, and eggs / Bacalhau desfiado com cebolas, batatas e ovos',
      origin:
        'A traditional Portuguese dish dating back to the 19th century / Um prato tradicional português que remonta ao século XIX',
      weight: '380g',
      calories: 600,
      protein: '30g',
    },
    {
      name: 'Bacalhau à Gomes de Sá',
      price: '€13.50',
      image: 'assets/site-images/menu-pitures/BacalhauàGomesde Sá-3.jpg',
      recipe:
        'Salted cod casserole with potatoes, onions, and olives / Bacalhau gratinado com batatas, cebolas e azeitonas',
      origin:
        'Named after its creator, Gomes de Sá, from Porto / Nomeado em homenagem ao seu criador, Gomes de Sá, do Porto',
      weight: '400g',
      calories: 620,
      protein: '32g',
    },
    {
      name: 'Bacalhau à Lagareiro',
      price: '€14.00',
      image: 'assets/site-images/menu-pitures/BacalhauàLagareiro-4.jpg',
      recipe:
        'Roasted cod with garlic and olive oil / Bacalhau assado com alho e azeite',
      origin: 'Popular in northern Portugal / Popular no norte de Portugal',
      weight: '350g',
      calories: 580,
      protein: '34g',
    },
    {
      name: 'Polvo à Lagareiro',
      price: '€14.00',
      image: 'assets/site-images/menu-pitures/PolvoàLagareiro-5.jpg',
      recipe:
        'Octopus roasted with garlic and olive oil / Polvo assado com alho e azeite',
      origin:
        'A classic dish from the coastal regions / Um prato clássico das regiões costeiras',
      weight: '350g',
      calories: 520,
      protein: '32g',
    },
    {
      name: 'Arroz de Marisco',
      price: '€14.00',
      image: 'assets/site-images/menu-pitures/ArrozdeMarisco-6.jpg',
      recipe:
        'Rice cooked with seafood broth, clams, shrimp, and crab / Arroz cozinhado com caldo de marisco, amêijoas, camarão e sapateira',
      origin:
        'From the coastal regions of Portugal / Das regiões costeiras de Portugal',
      weight: '450g',
      calories: 580,
      protein: '28g',
    },
    {
      name: 'Arroz de Pato',
      price: '€13.00',
      image: 'assets/site-images/menu-pitures/ArrozdePato-7.jpg',
      recipe:
        'Duck rice baked with chorizo and herbs / Arroz de pato assado com chouriço e ervas aromáticas',
      origin:
        'Traditional dish from northern Portugal / Prato tradicional do norte de Portugal',
      weight: '400g',
      calories: 700,
      protein: '32g',
    },
    {
      name: 'Caldo Verde',
      price: '€5.00',
      image: 'assets/site-images/menu-pitures/CaldoVerde-8.jpg',
      recipe:
        'Kale soup with potatoes, chorizo, and onions / Sopa de couve galega com batata, chouriço e cebola',
      origin:
        'A beloved Portuguese soup / Uma sopa tradicional muito apreciada em Portugal',
      weight: '300g',
      calories: 200,
      protein: '6g',
    },
    {
      name: 'Amêijoas à Bulhão Pato',
      price: '€12.00',
      image: 'assets/site-images/menu-pitures/AmêijoasàBulhãoPato-9.jpg',
      recipe:
        'Clams cooked with garlic, coriander, and white wine / Amêijoas cozinhadas com alho, coentros e vinho branco',
      origin:
        'Named after the poet Bulhão Pato / Nomeado em homenagem ao poeta Bulhão Pato',
      weight: '350g',
      calories: 300,
      protein: '25g',
    },
    {
      name: 'Cataplana de Marisco',
      price: '€16.00',
      image: 'assets/site-images/menu-pitures/CataplanadeMarisco-10.jpg',
      recipe:
        'Seafood stew cooked in a traditional copper pot / Ensopado de marisco cozinhado numa cataplana tradicional',
      origin: 'Popular in the Algarve region / Popular na região do Algarve',
      weight: '500g',
      calories: 600,
      protein: '30g',
    },
    {
      name: 'Peixe Grelhado',
      price: '€11.00',
      image: 'assets/site-images/menu-pitures/PeixeGrelhado-12.jpg',
      recipe:
        'Grilled fish with lemon and olive oil / Peixe grelhado com limão e azeite',
      origin:
        'Simple and fresh coastal dish / Prato simples e fresco das zonas costeiras',
      weight: '300g',
      calories: 400,
      protein: '33g',
    },
    {
      name: 'Lulas Recheadas',
      price: '€12.50',
      image: 'assets/site-images/menu-pitures/LulasRecheadas-13.jpg',
      recipe:
        'Stuffed squid with bread, herbs, and spices / Lulas recheadas com pão, ervas aromáticas e especiarias',
      origin:
        'A favorite from seaside towns / Um prato típico das vilas costeiras',
      weight: '350g',
      calories: 520,
      protein: '28g',
    },
    {
      name: 'Arroz de Polvo',
      price: '€14.50',
      image: 'assets/site-images/menu-pitures/ArrozdePolvo-14.webp',
      recipe:
        'Rice cooked with octopus and tomato sauce / Arroz de polvo cozido com molho de tomate',
      origin:
        'Common in coastal Portugal / Comum nas zonas costeiras de Portugal',
      weight: '400g',
      calories: 540,
      protein: '29g',
    },
    {
      name: 'Sardinhas Assadas',
      price: '€9.00',
      image: 'assets/site-images/menu-pitures/SardinhasAssadas-15.avif',
      recipe:
        'Grilled sardines with sea salt / Sardinhas assadas com sal grosso',
      origin:
        'A classic summer dish, especially on Saint Anthony’s Day / Um prato clássico do verão, especialmente no Dia de Santo António',
      weight: '300g',
      calories: 450,
      protein: '35g',
    },
    {
      name: 'Dourada Assada',
      price: '€12.00',
      image: 'assets/site-images/menu-pitures/DouradaAssada-16.jpg',
      recipe:
        'Roasted gilt-head bream seasoned with herbs / Dourada assada temperada com ervas aromáticas',
      origin: 'Popular fresh fish dish / Prato popular de peixe fresco',
      weight: '350g',
      calories: 460,
      protein: '34g',
    },
    {
      name: 'Salada de Polvo',
      price: '€8.50',
      image: 'assets/site-images/menu-pitures/SaladadePolvo-17.webp',
      recipe:
        'Octopus salad with olive oil and vinegar / Salada de polvo com azeite e vinagre',
      origin: 'Light and refreshing dish / Prato leve e refrescante',
      weight: '250g',
      calories: 280,
      protein: '25g',
    },
    {
      name: 'Ensopado de Peixe',
      price: '€13.50',
      image: 'assets/site-images/menu-pitures/EnsopadodePeixe-18.jpg',
      recipe:
        'Fish stew with tomatoes and herbs / Ensopado de peixe com tomate e ervas aromáticas',
      origin:
        'A comforting coastal dish / Um prato reconfortante das zonas costeiras',
      weight: '450g',
      calories: 520,
      protein: '33g',
    },
    {
      name: 'Caril de Gambas',
      price: '€13.00',
      image: 'assets/site-images/menu-pitures/CarildeGambas-20.webp',
      recipe:
        'Shrimp curry with coconut milk and spices / Caril de gambas com leite de coco e especiarias',
      origin:
        'Influenced by Portuguese colonies / Influenciado pelas antigas colónias portuguesas',
      weight: '400g',
      calories: 570,
      protein: '27g',
    },
    {
      name: 'Frango Piri-Piri',
      price: '€9.50',
      image: 'assets/site-images/menu-pitures/FrangoPiri-Piri-21.jpg',
      recipe:
        'Spicy grilled chicken with piri-piri sauce / Frango grelhado picante com molho piri-piri',
      origin:
        'Popular in Algarve and Mozambique / Popular no Algarve e em Moçambique',
      weight: '350g',
      calories: 580,
      protein: '42g',
    },
    {
      name: 'Sopa de Legumes',
      price: '€4.00',
      image: 'assets/site-images/menu-pitures/SopadeLegumes-22.jpg',
      recipe:
        'Vegetable soup made with seasonal veggies / Sopa de legumes feita com vegetais da época',
      origin:
        'Traditional and healthy starter / Entrada tradicional e saudável',
      weight: '300g',
      calories: 180,
      protein: '4g',
    },
    {
      name: 'Ovos com Bacalhau',
      price: '€11.00',
      image: 'assets/site-images/menu-pitures/OvoscomBacalhau-25.avif',
      recipe: 'Codfish with scrambled eggs / Bacalhau com ovos mexidos',
      origin: 'Rustic homemade dish / Prato caseiro e rústico',
      weight: '350g',
      calories: 540,
      protein: '30g',
    },
    {
      name: 'Salada de Bacalhau',
      price: '€9.50',
      image: 'assets/site-images/menu-pitures/SaladadeBacalhau-23.jpeg',
      recipe:
        'Cold cod salad with onions, peppers, and olives / Salada fria de bacalhau com cebola, pimentos e azeitonas',
      origin: 'Refreshing and popular dish / Prato refrescante e popular',
      weight: '300g',
      calories: 320,
      protein: '28g',
    },
    {
      name: 'Caldeirada de Amêijoas',
      price: '€11.00',
      image: 'assets/site-images/menu-pitures/CaldeiradadeAmêijoas-24.webp',
      recipe:
        'Clam stew with potatoes and herbs / Caldeirada de amêijoas com batatas e ervas aromáticas',
      origin: 'Rustic coastal dish / Prato rústico das zonas costeiras',
      weight: '400g',
      calories: 470,
      protein: '26g',
    },
    {
      name: 'Bacalhau com Natas',
      price: '€12.50',
      image: 'assets/site-images/menu-pitures/BacalhaucomNatas-1.jpg',
      recipe:
        'Oven-baked codfish with cream, onions, and potatoes / Bacalhau assado no forno com natas, cebolas e batatas',
      origin:
        'Popularized in the 20th century in Lisbon / Popularizado no século XX em Lisboa',
      weight: '400g',
      calories: 650,
      protein: '35g',
    },
  ];

  rows: Dish[][] = [];
  layoutPattern = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];
  selectedDish: Dish | null = null;

  drinks = [
    { name: 'Iced Tea', price: '€2.00' },
    { name: 'Lemonade', price: '€2.20' },
    { name: 'Cola', price: '€1.80' },
    { name: 'Orange Juice', price: '€2.50' },
    { name: 'Mineral Water', price: '€1.00' },
    { name: 'Sparkling Water', price: '€1.50' },
    { name: 'Mango Smoothie', price: '€3.00' },
    { name: 'Strawberry Milkshake', price: '€3.20' },
    { name: 'Coconut Water', price: '€2.70' },
    { name: 'Choco Shake', price: '€3.00' },
  ];
  desserts = [
    {
      name: 'Chocolate Cake',
      price: '€3.50',
      image: 'assets/site-images/desserts/ChocolateCake-1.jpg',
      description:
        'Rich and moist chocolate cake with ganache frosting / Bolo de chocolate rico e húmido com cobertura de ganache',
      weight: '150g',
      calories: 450,
      protein: '5g',
    },
    {
      name: 'Tiramisu',
      price: '€4.00',
      image: 'assets/site-images/desserts/Tiramisu-2.jpg',
      description:
        'Layered Italian dessert with coffee-soaked biscuits and mascarpone / Sobremesa italiana em camadas com biscoitos embebidos em café e mascarpone',
      weight: '180g',
      calories: 410,
      protein: '6g',
    },
    {
      name: 'Ice Cream (3 scoops)',
      price: '€3.00',
      image: 'assets/site-images/desserts/IceCream(3 scoops)-3.jpg',
      description:
        'Three scoops of mixed flavor ice cream / Três bolas de gelado de sabores variados',
      weight: '180g',
      calories: 330,
      protein: '4g',
    },
    {
      name: 'Fruit Salad',
      price: '€2.50',
      image: 'assets/site-images/desserts/Fruit Salad-4.jpg',
      description:
        'Mixed seasonal fruits with a hint of citrus / Fruta da época variada com um toque de citrinos',
      weight: '200g',
      calories: 120,
      protein: '2g',
    },
    {
      name: 'Pudding',
      price: '€2.80',
      image: 'assets/site-images/desserts/Pudding-5.jpg',
      description:
        'Creamy vanilla pudding topped with caramel / Pudim cremoso de baunilha coberto com caramelo',
      weight: '160g',
      calories: 280,
      protein: '4g',
    },
  ];
  selectedDessert: Dessert | null = null;

  showScrollToTop = false;
  showScrollToDown = true;

  constructor(private router: Router) {
    this.generateRows();
  }

  generateRows() {
    let index = 0;
    this.rows = [];
    for (const count of this.layoutPattern) {
      this.rows.push(this.dishes.slice(index, index + count));
      index += count;
    }
  }

  openModal(dish: Dish) {
    this.selectedDish = dish;
  }

  closeModal() {
    this.selectedDish = null;
  }

  openDessertModal(dessert: Dessert) {
    this.selectedDessert = dessert;
  }

  closeDessertModal() {
    this.selectedDessert = null;
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const scrollTop =
      window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;

    this.showScrollToTop = scrollTop > 50;

    const nearBottom =
      window.innerHeight + scrollTop >= document.documentElement.scrollHeight - 30;
    this.showScrollToDown = !nearBottom;
  }

  goToContact() {
    this.router.navigate(['/contact']);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  scrollToDown() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }
}