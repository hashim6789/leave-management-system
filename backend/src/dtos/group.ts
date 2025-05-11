import { Group } from '@/types';

export type ICreateGroupDTO = Omit<Group, '_id' | 'createdAt' | 'updatedAt' | 'password'>;
