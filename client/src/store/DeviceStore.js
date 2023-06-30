import { makeAutoObservable } from 'mobx';

export default class DeviceStore {
  constructor() {
    this._types = [
      {
        id: 2,
        name: 'Холодильники',
      },
      {
        id: 8,
        name: 'Смартфоны',
      },
      {
        id: 10,
        name: 'Стиральные машины',
      },
      {
        id: 11,
        name: 'Телевизоры',
      },
    ];

    this._brands = [
      {
        id: 1,
        name: 'LG',
      },
      {
        id: 2,
        name: 'Samsung',
      },
      {
        id: 3,
        name: 'Apple',
      },
      {
        id: 4,
        name: 'Google',
      },
      {
        id: 5,
        name: 'HTC',
      },
      {
        id: 6,
        name: 'HUAWEI',
      },
    ];

    this._devices = [
      {
        id: 21,
        name: '12 Pro',
        price: 100000,
        rating: 2,
        img: '832a6b0c-523a-47d9-a6c5-344e6b7c4116.jpg',
      },
      {
        id: 23,
        name: 'Maxi',
        price: 35000,
        rating: 4.5,
        img: 'eb13d441-c558-45bf-aea8-ab1dc0271e6d.jpg',
      },
      {
        id: 24,
        name: 'Maxi2',
        price: 35000,
        rating: 9,
        img: '70401d8d-1cd8-48b6-8826-9b533a1fb62b.jpg',
      },
      {
        id: 25,
        name: 'Pixel 7',
        price: 60000,
        rating: 10,
        img: '5cc3c60b-6af5-4f7a-9bb3-bfba6dd126b3.jpg',
      },
      {
        id: 25,
        name: 'Pixel 7',
        price: 60000,
        rating: 10,
        img: '5cc3c60b-6af5-4f7a-9bb3-bfba6dd126b3.jpg',
      },
      {
        id: 25,
        name: 'Pixel 7',
        price: 60000,
        rating: 10,
        img: '5cc3c60b-6af5-4f7a-9bb3-bfba6dd126b3.jpg',
      },
      {
        id: 25,
        name: 'Pixel 7',
        price: 60000,
        rating: 10,
        img: '5cc3c60b-6af5-4f7a-9bb3-bfba6dd126b3.jpg',
      },
      {
        id: 25,
        name: 'Pixel 7',
        price: 60000,
        rating: 10,
        img: '5cc3c60b-6af5-4f7a-9bb3-bfba6dd126b3.jpg',
      },
      {
        id: 25,
        name: 'Pixel 7',
        price: 60000,
        rating: 10,
        img: '5cc3c60b-6af5-4f7a-9bb3-bfba6dd126b3.jpg',
      },
      {
        id: 25,
        name: 'Pixel 7',
        price: 60000,
        rating: 10,
        img: '5cc3c60b-6af5-4f7a-9bb3-bfba6dd126b3.jpg',
      },
    ];

    this._selectedType = {};
    this._selectedBrand = {};

    makeAutoObservable(this);
  }

  setTypes(types) {
    this._types = types;
  }

  setBrands(brands) {
    this._brands = brands;
  }

  setDevices(devices) {
    this._devices = devices;
  }

  setSelectedType(type) {
    this._selectedType = type;
  }

  setSelectedBrand(brand) {
    this._selectedBrand = brand;
  }

  get types() {
    return this._types;
  }

  get brands() {
    return this._brands;
  }

  get devices() {
    return this._devices;
  }

  get selectedType() {
    return this._selectedType;
  }

  get selectedBrand() {
    return this._selectedBrand;
  }
}
