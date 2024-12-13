// interfaces/favorite.ts

export interface IFavorite {
    _id: string;
    userId: string;
    productId: string;
    status: boolean; // true = yêu thích, false = không yêu thích nữa
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface IFavoriteToggle {
    userId: string;
    productId: string|number;
    status: boolean;
  }
  