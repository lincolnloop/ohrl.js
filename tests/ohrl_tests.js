
module('URL Tests');

var ohrlTests = {};
ohrlTests.urls = {
    'dashboard': '/dashboard/',
    'time_edit': '/projects/<project_id>/time/save/<time_id>/',
    'task_edit': '/projects/<project_id>/task/save/<task_id>/'
};

/**
 * Loading sample urls
 */
ohrl.load(ohrlTests.urls);

test('ohrl', function() {
    expect(9);
    equals(ohrl.get('dashboard'), '/dashboard/', 'get() -> Expected value /dashboard/');
    equals(ohrl.get('task_edit', {
        'project_id': 2,
        'task_id': 1
    }), '/projects/2/task/save/1/', 'get() -> Expected value /projects/2/task/save/1/');

    try {
        ohrl.get('invalid-url');
    }
    catch (e) {
        ok(e, 'remove()+get() ->  Expected Error: ' + e);
    }


    same(ohrl.resolve('/dashboard/'), {'name': 'dashboard', 'kwargs': {}}, 'resolve() -> Expected value object');
    same(ohrl.resolve('/projects/453453/time/save/fas12321/'),
            {
                'name': 'time_edit',
                'kwargs': {'project_id': '453453', 'time_id': 'fas12321'}
            }, 'resolve() -> Expected value object');
    equals(ohrl.resolve('/projects/453453/time/push/fas12321/'), undefined, 'resolve() -> Expected value undefined');


    /**
     * Error cheking tests
     */
    try {
        ohrl.get('non-existing-url');
    }
    catch (e) {
        ok(e, 'get() ->  Expected Error: ' + e);
    }


    try {
        ohrl.get('task_edit', {
            'project_id': 2,
            'task_id': 1,
            'task_status': 'test'
        });
    }
    catch (e) {
        ok(e, 'get() ->  Expected Error: ' + e);
    }


    try {
        ohrl.get('task_edit', {
            'project_id': 2
        });
    }
    catch (e) {
        ok(e, 'get() ->  Expected Error: ' + e);
    }

});