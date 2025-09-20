<?php

return [
    'resource' => [
        'group' => 'System',
        'sort' => 1,
        'default_sort_column' => 'name',
    ],
   'auth_provider_model' => 'App\\Models\\User',
    'super_admin' => [
        'enabled' => true,
        'name' => 'super_admin',
        'define_via_gate' => false,
        'intercept_gate' => 'before', // after
    ],
    'panel_user' => [
        'enabled' => true,
        'name' => 'club_admin',
    ],
    'permission_prefixes' => [
        'resource' => [
            'view',
            'view_any',
            'create',
            'update',
            'restore',
            'restore_any',
            'replicate',
            'reorder',
            'delete',
            'delete_any',
            'force_delete',
            'force_delete_any',
        ],
        'page' => 'page',
        'widget' => 'widget',
    ],
    'entities' => [
        'pages' => true,
        'widgets' => true,
        'resources' => true,
        'custom_permissions' => false,
    ],
    'generator' => [
        'option' => 'policies_and_permissions',
        'policy_directory' => 'Policies',
        'policy_namespace' => 'Policies',
    ],
    'exclude' => [
        'enabled' => true,
        'pages' => [
            'Dashboard',
        ],
        'widgets' => [
            'AccountWidget', 
            'FilamentInfoWidget',
        ],
        'resources' => [],
    ],
    'register_role_policy' => [
        'enabled' => true,
    ],
    'navigation_group' => 'System',
];