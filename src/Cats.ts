export interface CatProps {
  name: string;
  backgroundColor: string;
  color: string;
  srcName: string;
  className: string;
  lost?: boolean; // Added when cat removed
}

export const Cats: CatProps[] = [
  {
    name: 'Mr. Fluffles',
    backgroundColor: '#c0a33f',
    color: '#000',
    srcName: 'creamBeigeCat',
    className: 'cat',
  },
  {
    name: 'Frida',
    backgroundColor: '#937f7a',
    color: '#F9F4DA',
    srcName: 'blackCat',
    className: 'cat',
  },
  {
    name: 'Bella',
    backgroundColor: '#eca703',
    color: '#1E1E1E',
    srcName: 'hairlessCat',
    className: 'cat',
  },
  {
    name: 'Simba',
    backgroundColor: '#bebe9f',
    color: '#1E1E1E',
    srcName: 'silverCat',
    className: 'cat',
  },
  {
    name: 'Chairman Meow',
    backgroundColor: '#595959',
    color: '#F9F4DA',
    srcName: 'yellowWhiteCat',
    className: 'cat',
  },
  {
    name: 'Temperance',
    backgroundColor: '#e3d9bf',
    color: '#F9F4DA',
    srcName: 'blueBlackCat',
    className: 'cat',
  },
  {
    name: 'Professor Whiskerson',
    backgroundColor: '#af7a8f',
    color: '#1E1E1E',
    srcName: 'whiteCat',
    className: 'cat',
  },
  {
    name: 'Sushi',
    backgroundColor: '#f5cba7',
    color: '#F9F4DA',
    srcName: 'stripeyCat',
    className: 'cat',
  },
  {
    name: 'Vince the Impailer',
    backgroundColor: '#873714',
    color: '#F9F4DA',
    srcName: 'spider',
    className: 'spider',
  },
];
