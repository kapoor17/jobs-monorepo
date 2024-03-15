const { StatusCodes } = require("http-status-codes");
const Job = require("../models/Job");
const { NotFoundError } = require("../errors");
const { BadRequestError } = require("../errors");

const getAllJobs = async (req, res) => {
    const jobs = await Job.find({
        createdBy: req.user.userID
    })
    res.status(StatusCodes.OK).json({jobs, count: jobs.length})
}

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userID;
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({job})
}

const getJob = async (req, res) => {
    const {params: {id: jobID}, user: {userID}} = req;

    console.log({
        jobID
    })

    const job = await Job.findOne({
        createdBy: userID,
        _id: jobID
    })

    if(!job) throw new NotFoundError('Job does not exist');

    res.status(StatusCodes.OK).json({job})
}

const updateJob = async (req, res) => {
    const {params: {id: jobID}, user: {userID}, body: {company, position}} = req;

    if(!company || !position) throw new BadRequestError('Company or Position cannot be empty');

    const job = await Job.findByIdAndUpdate(
        {
            _id: jobID,
            createdBy: userID
        },
        req.body,
        {
            new: true,
            runValidators: true
        }
    )

    if(!job) throw new NotFoundError('Job does not exist');

    res.status(StatusCodes.OK).json({job})
}

const deleteJob = async (req, res) => {
    const {params: {id: jobID}, user: {userID}} = req;

    const job = await Job.findByIdAndDelete({
        _id: jobID,
        createdBy: userID
    });

    if(!job) throw new NotFoundError('Job does not exist');

    res.status(StatusCodes.OK).send()
}

module.exports = {
    getAllJobs,
    createJob,
    getJob,
    updateJob,
    deleteJob,
}