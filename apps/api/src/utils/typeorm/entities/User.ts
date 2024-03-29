import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Message } from './Message';
import { Group } from './Group';
import { Profile } from './Profile';
import { UserPresence } from './UserPresence';
import { Peer } from './Peer';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ select: false })
  @Exclude()
  password: string;

  @OneToOne(() => Profile, { cascade: ['insert', 'update'] })
  @JoinColumn()
  profile: Profile;

  @OneToMany(() => Message, (message) => message.author)
  @JoinColumn()
  messages: Message[];

  @ManyToMany(() => Group, (groupConversation) => groupConversation.users)
  groups: Group[];

  @OneToOne(() => UserPresence, { cascade: ['insert', 'update'] })
  @JoinColumn()
  presence: UserPresence;

  @OneToOne(() => Peer, (peer) => peer.user, {
    cascade: ['update', 'remove', 'insert'],
  })
  @JoinColumn()
  peer: Peer;
}
