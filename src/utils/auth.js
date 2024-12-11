export const getAuthToken = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    return null;
  }

  return token;
};

export const hasPermission = (permissionNeeded, userPermission) => {
  if (!userPermission) return false;
  if (!permissionNeeded || !permissionNeeded.length) return true;

  userPermission = userPermission.map((e) => `${e.subject}_${e.action}`);

  // Handle Super Admin
  const isAdmin = userPermission?.find((e) => e === 'all_manage');
  if (isAdmin) return true;

  // Handle Super Subject All
  const managePermission = [...new Set(permissionNeeded.map((e) => `${e.split('_')[0]}_manage`))];
  const isSubjectManager = userPermission.some((str2) => managePermission.includes(str2));
  if (isSubjectManager) return true;

  // Handle permission && subject
  const isSubjectActionManager = userPermission.some((str2) => permissionNeeded.includes(str2));

  if (isSubjectActionManager) return true;

  return false;
};
