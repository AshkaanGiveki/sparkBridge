// export interface Product {
//     id: string;
//     name: string;
//     description: string;
//     price: number;
//     images?: string[];
//     brand?: { name: string };
//     category?: {
//       name: string;
//       options: {
//         name: string;
//         values: { value: string }[];
//       }[];
//     };
//     selectedOptions?: {
//       value: { option: { name: string }; value: string };
//     }[];
//   }
  

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    images?: {
      id: string;
      imageName: string;
      productId: string;
    }[];
    brand?: { name: string };
    category?: {
      name: string;
      options: {
        name: string;
        values: { value: string }[];
      }[];
    };
    selectedOptions?: {
      value: { option: { name: string }; value: string };
    }[];
  }
  