import { Permissions, PermissionType } from '@/types';

// Function to update permissions based on the provided type and value
export function updatePermissions(
    permissions: Permissions,
    type: PermissionType,
    enabled: boolean
): Permissions {
    const newPermissions = { ...permissions };

    if (type.startsWith('write')) {
        const readType = `read${type.slice(5)}` as keyof Permissions;
        if (!enabled) {
            newPermissions[readType] = false;
        } else {
            newPermissions[readType] = true;
        }
    }

    newPermissions[type] = enabled;
    return newPermissions;
}
