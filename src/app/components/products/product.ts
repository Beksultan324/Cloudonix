export interface Product {
  id: number;
  name: string;
  description: string;
  sku: string;
  cost: number;
  profile?: {
    type?: ProfileTypeEnum;
    available?: boolean
  };
}

export enum ProfileTypeEnum {
  Furniture = 'furniture',
  Equipment = 'equipment',
  Stationar = 'stationary',
  Part = 'part',
}

export const ELEMENT_DATA: Product[] = [
  {
    id: 1,
    name: 'name',
    description: 'description',
    sku: 'sku',
    cost: 1,
    profile: { type: ProfileTypeEnum.Furniture },
  },
];
