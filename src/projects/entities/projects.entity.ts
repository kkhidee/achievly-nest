import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '@/users/entities/user.entity';
import { TeamEntity } from '@/teams/entities/team.entity';
import { ProjectColumn } from '@/projects/dto/swagger.dto';
import { PROJECT_TASK_PRIORITY } from '@/projects/constants/projects.constant';
import { MemberDto } from '@/teams/dto/swagger.dto';

@Entity()
class ProjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ type: 'jsonb', nullable: false, default: [] })
  columns: ProjectColumn[];

  @ManyToOne(() => TeamEntity, (team) => team.projects)
  team: TeamEntity;

  @ManyToOne(() => UserEntity, (user) => user.projects)
  user: UserEntity;

  @OneToMany(() => ProjectTaskEntity, (task) => task.project, {
    nullable: true,
  })
  project_tasks: ProjectTaskEntity[] | null;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}

@Entity({ name: 'project_task' })
class ProjectTaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'jsonb', nullable: false })
  column: ProjectColumn;

  @Column({ type: 'jsonb', nullable: false })
  author: MemberDto;

  @Column({ type: 'jsonb', nullable: true })
  executor: MemberDto | null;

  @Column({ type: 'enum', enum: PROJECT_TASK_PRIORITY, nullable: true })
  priority: PROJECT_TASK_PRIORITY | null;

  @Column({ nullable: false })
  list_order: number;

  @Column({ nullable: true, type: 'text' })
  deadline_date: string | null;

  @Column({ nullable: true, type: 'text' })
  done_date: string | null;

  @ManyToOne(() => ProjectEntity, (project) => project.project_tasks)
  project: ProjectEntity;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}

export { ProjectEntity, ProjectTaskEntity };
