import { Expose } from 'class-transformer';

export class ResGetTask {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  status: boolean;
}
