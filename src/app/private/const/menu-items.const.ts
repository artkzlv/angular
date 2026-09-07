export interface IMenu {
  text: string;
  iconUrl: string;
  iconUrlActive: string;
  link: string;
  id: string;
  disabled: boolean;
}

export const NAV_CONST: IMenu[] = [
  {
    text: 'Главная',
    iconUrl: 'menu/home.svg',
    iconUrlActive: 'menu/home-active.svg',
    link: '/private/home',
    id: 'home',
    disabled: false,
  },
  {
    text: 'Избранное',
    iconUrl: 'menu/favorites.svg',
    iconUrlActive: 'menu/favorites-active.svg',
    link: '/private/favorites',
    id: 'favorites',
    disabled: false,
  },
];
