export interface UserInfo {
  id: number;
  uid: string;
  name: string;
  age: number;
  sex: string;
  address: string;
  city: string;
  createdAt: string;
  updatedAt: string;
}

export interface MedicalHistory {
  id: number;
  uid: string;
  thyroid: boolean;
  diabetes: boolean;
  hypertension: boolean;
  others: string;
  createdAt: string;
  updatedAt: string;
}

export interface DentalHistory {
  id: number;
  uid: string;
  fillings: boolean;
  extraction: boolean;
  rootCanal: boolean;
  removableDentures: boolean;
  others: string;
  createdAt: string;
  updatedAt: string;
}

export interface RedFlagHabits {
  id: number;
  uid: string;
  smoking: boolean;
  vapping: boolean;
  chewTobacco: boolean;
  alcohol: boolean;
  others: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProgressData {
  id: number;
  uid: string;
  score: number;
  iurl: string;
  flossing: boolean;
  brushing: 'once' | 'twice' | 'none';
  mouthwash: boolean;
  grade?: 'low' | 'moderate' | 'high';
  year: number;
  month: number;
  week: number;
  day: number;
  createdAt: string;
}
