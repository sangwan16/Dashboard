import { collectionGroup, getDocs } from 'firebase/firestore';
import { db } from './config';
import type {
  UserInfo,
  MedicalHistory,
  DentalHistory,
  RedFlagHabits,
  ProgressData,
} from '../types';

function getUidFromPath(path: string): string {
  return path.split('/')[1];
}

export async function fetchAllProfileData(): Promise<{
  users: UserInfo[];
  medicalHistory: MedicalHistory[];
  dentalHistory: DentalHistory[];
  redFlagHabits: RedFlagHabits[];
}> {
  const snapshot = await getDocs(collectionGroup(db, 'profile'));

  const users: UserInfo[] = [];
  const medicalHistory: MedicalHistory[] = [];
  const dentalHistory: DentalHistory[] = [];
  const redFlagHabits: RedFlagHabits[] = [];

  for (const docSnap of snapshot.docs) {
    const uid = getUidFromPath(docSnap.ref.path);
    const data = { ...docSnap.data(), uid };

    switch (docSnap.id) {
      case 'userInfo':
        users.push(data as UserInfo);
        break;
      case 'medicalHistory':
        medicalHistory.push(data as MedicalHistory);
        break;
      case 'dentalHistory':
        dentalHistory.push(data as DentalHistory);
        break;
      case 'redFlagHabits':
        redFlagHabits.push(data as RedFlagHabits);
        break;
    }
  }

  return { users, medicalHistory, dentalHistory, redFlagHabits };
}

export async function fetchProgressData(): Promise<ProgressData[]> {
  const snapshot = await getDocs(collectionGroup(db, 'progressData'));
  return snapshot.docs.map((d) => {
    const uid = getUidFromPath(d.ref.path);
    return { ...d.data(), uid } as ProgressData;
  });
}
