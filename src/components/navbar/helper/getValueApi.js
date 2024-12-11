import { getStoreById } from 'apis/stores';
import { getStoreItem } from 'apis/storeItems';
import { getItemEmployeeById } from 'apis/items';
import { getRoleById, getPermissionById, getEmployeeById } from 'apis';
import { getStoreEmployeeBranchById } from 'apis/branches';
import { getClientById } from 'apis/client';
import { getEmployeeOrderById } from 'apis/orders';

export const getValueApi = async (identifier, id, location, storeRequired) => {
  try {
    let response;
    switch (identifier) {
      case 'stores':
        response = await getStoreById(id);
        break;
      case 'items':
        if (location.includes('store')) {
          response = await getStoreItem({ itemId: id });
        } else {
          response = await getItemEmployeeById({ itemId: id });
        }
        break;
      case 'branches':
        response = await getStoreEmployeeBranchById({ storeId: storeRequired, branchId: id });
        break;
      case 'store-item-variant':
        return 'Question';
      case 'roles':
        response = await getRoleById(id);
        return response.data.name;
      case 'permissions':
        response = await getPermissionById(id);
        return response.data.action;
      case 'employees':
        response = await getEmployeeById(id);
        return `${response.data.firstName} ${response.data.lastName}`;
      case 'clients':
        response = await getClientById(id);
        return `${response.data.firstName} ${response.data.lastName}`;
      case 'orders':
        response = await getEmployeeOrderById(id);
        return `${response.data.referenceNumber}`;
      default:
        return id;
    }
    if (!response || !response.data || !response.data.name) {
      return id;
    }
    return response.data.name.enName;
  } catch (error) {
    console.error(`Failed to fetch data for identifier ${identifier} with id ${id}`, error);
    return id;
  }
};
