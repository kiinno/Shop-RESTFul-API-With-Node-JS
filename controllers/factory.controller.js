const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const QueryFilter = require("../utils/filter");

/**
 * MIDDLEWARE NOT FIXED WAIT FOT IT
 * @param {Mongoose.model} Model
 * @httpReqParams {id: MongoId}
 * @returns Express Controller Middleware
 */

module.exports.getAllDocuments = (Model) =>
  asyncHandler(async (req, res, next) => {
    const query = Model.find(req.filterObj || {});
    const filter = new QueryFilter(query, req);
    const queryFilterResault = await filter.query;

    const documents = filter.pagenation(queryFilterResault);
    res.status(200).json(documents);
  });

/**
 * Create an middleware that can communicate with the database and return a specific document to the user
 * @param {Mongoose.model} Model
 * @httpReqParams {id: MongoId}
 * @returns Express Controller Middleware
 */
module.exports.getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findById(id, { __v: 0 });
    if (!document) return next(new ApiError(`item not exists '${id}'`, 400));
    res.status(200).json(document);
  });

/**
 * Create an middleware that can communicate with the database and delete & return deleted document to the user
 * @param {Mongoose.model} Model
 * @httpReqParams {id: MongoId}
 * @returns Express Controller Middleware
 */
module.exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id);
    if (!document) return next(new ApiError(`item not exists '${id}'`, 400));
    res.status(200).json(document);
  });

/**
 * Create an middleware that can communicate with the database and update & return updated document to the user
 * @param {Mongoose.model} Model
 * @httpReqParams {id: MongoId}
 * @returns Express Controller Middleware
 */
module.exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const newDocument = await Model.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!newDocument) return next(new ApiError(`item not exists ${id}`, 400));
    res.status(200).json(newDocument);
  });

/**
 * Create an middleware that can communicate with the database and create & return created document to the user
 * @param {Mongoose.model} Model
 * @httpReqParams {id: MongoId}
 * @returns Express Controller Middleware
 */
module.exports.createOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const newDocument = await Model.create(req.body);
    res.status(200).json(newDocument);
  });
