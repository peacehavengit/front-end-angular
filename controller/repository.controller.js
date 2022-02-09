const RepositoryModel = require("../models/createrepo");

let repoController = {};

repoController.getUserRepo = (req, res) => {
    try {
        let userid = req.payload._id;
        if (typeof userid !== 'undefined' && userid && userid !== '') {
            RepositoryModel.find({ userid: userid }).then((repo) => {
                res.status(200).json({ success: true, message: 'repo found', data: repo })
            }).catch((error) => {
                res.status(500).json({ success: false, message: "Something went wrong", type: "error in find repo" });
            })
        } else {
            res.status(200).json({ success: false, message: "Something went wrong", type: "User id not found" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong", type: "Error in main catch" });
    }

}


repoController.checkDuplicateRepo = (req, res) => {
    try {
        let userid = req.payload._id;
        let reponame = req.query.Repo;
        console.log(userid, reponame, req.query);
        if (typeof userid !== 'undefined' && userid && userid !== '') {
            RepositoryModel.findOne({ userid: userid, reponame: reponame }).then((repo) => {
                if (repo != null) {
                    res.status(200).json({ success: true, message: 'repo found', data: true })
                } else {
                    res.status(200).json({ success: false, message: 'repo found', data: false })
                }
            }).catch((error) => {
                res.status(500).json({ success: false, message: "Something went wrong", type: "error in find repo" });
            })
        } else {
            res.status(200).json({ success: false, message: "Something went wrong", type: "User id not found" });
        }

    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong", type: "Error in main catch" });
    }

}

module.exports = repoController;    