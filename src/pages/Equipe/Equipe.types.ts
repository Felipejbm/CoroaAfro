export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photo: string;
}
export type MemberCardProps = {
  member: TeamMember;
  isDev?: boolean;
};
