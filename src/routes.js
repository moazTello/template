import React from 'react';
import { Icon } from '@chakra-ui/react';
import { MdHome, MdLock } from 'react-icons/md';

import DashboardsDefault from 'views/admin/dashboards/default';

import SignInCentered from 'views/auth/signIn/SignInCentered';

import Settings from 'views/admin/main/profile/settings';

export const SUBJECTS = {
  all: 'all',
};
export const ACTIONS = {
  manage: 'manage',
  get: 'get',
  add: 'add',
  edit: 'edit',
  delete: 'delete',
};

export const getPermissionKey = (subject, action) => `${subject}_${action}`;

const routes = [
  {
    name: 'Dashboards',
    layout: '/admin',
    path: '/',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <DashboardsDefault />,
  },
  {
    name: 'Authentication',
    path: '/auth',
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    collapse: true,
    isHidden: true,
    items: [
      // --- Sign In ---
      {
        name: 'Sign In',
        path: '/sign-in',
        collapse: true,
        items: [
          {
            name: 'Centered',
            layout: '/auth',
            path: '/sign-in',
            component: <SignInCentered />,
          },
        ],
      },
    ],
  },
  {
    name: 'Profile',
    layout: '/admin',
    path: '/profile',
    isHidden: true,
    component: <Settings />,
  },
];

export function getAllPermissionKeys(routes) {
  const permissionKeys = [];

  function extractPermissions(route) {
    if (route.permission) {
      const permissionKey = route.permission[0];
      if (!permissionKeys.includes(permissionKey)) {
        permissionKeys.push(permissionKey);
      }
    }

    if (route.items) {
      route.items.forEach((subRoute) => extractPermissions(subRoute));
    }
  }

  routes.forEach((route) => extractPermissions(route));

  return permissionKeys;
}

export default routes;
