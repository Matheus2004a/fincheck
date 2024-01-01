import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'IS_PUBLIC';

export const isPublic = () => SetMetadata(IS_PUBLIC_KEY, true);
