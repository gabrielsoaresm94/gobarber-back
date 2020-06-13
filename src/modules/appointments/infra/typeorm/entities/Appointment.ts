import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import User from '../../../../users/infra/typeorm/entities/User';

/**
 * Um pra Um (OneToOne)
 * Um pra Muitos (OneToMany)
 * Muitos pra Muitos (ManyToMany)
 */

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  // Indica uma coluna no Banco de Dados
  @Column()
  user_id: string;

  // Relacionamento a nível de aplicação
  @ManyToOne(() => User) // Muitos para um - Vários agendamentos para um usuário
  @JoinColumn({ name: 'user_id' }) // Coluna que faz o o relacionamento - user_id
  user: User;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
