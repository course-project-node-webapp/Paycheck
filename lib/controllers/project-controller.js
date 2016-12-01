'use strict';

module.exports = function(projectsData) {
    function index(req, res) {
        res.render('./project/index', {
            isAuthenticated: req.isAuthenticated(),
            result: req
        });
    }

    function createProject(req, res) {
        const isAuthenticated = req.isAuthenticated();
        if (!isAuthenticated) {
            return res.redirect('/account/login');
        }

        return projectsData.createProject(req.body)
            .then(res.render('./project/success', {
                result: {
                    user: req.user
                },
                name: req.body.name
            }));
    }

    function search(req, res) {
        const isAuthenticated = req.isAuthenticated();

        projectsData.getProjectsWhichContains(req.query.search)
            .then((projects) => {
                return res
                    .status(200)
                    .render('./project/projects-list', {
                        isAuthenticated,
                        result: {
                            data: projects,
                            user: req.user
                        }
                    });
            });
    }

    function listAllProjects(req, res) {
        return projectsData.getAllProjects()
            .then((data) => {
                res.render('./project/projects-list', {
                    result: {
                        user: req.user,
                        data
                    }
                });
            });
    }

    function listMyProjects(req, res) {
        return projectsData.getAllProjects()
            .then((data) => {
                res.render('./project/my-projects-list', {
                    result: {
                        user: req.user,
                        data
                    }
                });
            });
    }

    function getProjectBySkillWebDeveloping(req, res) {
        return projectsData.getProjectBySkill('webdeveloping')
            .then((data) => {
                res.render('./project/webdeveloper', {
                    result: {
                        user: req.user
                    },
                    data
                });
            });
    }

    function getProjectBySkillMobileDeveloping(req, res) {
        return projectsData.getProjectBySkill('mobiledeveloping')
            .then((data) => {
                res.render('./project/mobiledeveloper', {
                    result: {
                        user: req.user
                    },
                    data
                });
            });
    }

    function addAplyerToProject(req, res) {
        const projectName = req.params.projectname;
        const applyer = req.body.applyer;

        return projectsData.updateProjectByName(projectName, applyer)
            .then(res.redirect('/projects'));
    }

    return {
        index,
        search,
        createProject,
        listAllProjects,
        getProjectBySkillWebDeveloping,
        getProjectBySkillMobileDeveloping,
        addAplyerToProject,
        listMyProjects
    };
};