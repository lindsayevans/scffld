export const sanitisePath = (path: string) => {
  return path.replace(/\.\.\//g, '');
};
