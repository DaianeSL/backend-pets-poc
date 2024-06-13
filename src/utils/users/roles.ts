import { Roles } from 'src/users/dto/User.dto';

export const checkRole = (role: Roles): Roles => {
  if (role === Roles.ONG) return Roles.ONG;
  if (!role || role === Roles.ADMIN || !(role in Roles)) role = Roles.USER;
};
