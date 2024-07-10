/** Strip all `../` from a path */
export const sanitisePath = (path: string) => {
  return path.replace(/\.\.\//g, '');
};
