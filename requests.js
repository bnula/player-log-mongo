const {isBlank} = require("./isBlank");

async function putRequest(req, res, mongooseModel) {
   const body = req.body;
   const id = req.params.id;
   await mongooseModel.findOne({id: id}, (err, item) => {
      body._id = item._id;
      body.id = item.id;
   });
   const item = new mongooseModel({
      ...body
   });
   await mongooseModel.replaceOne({id: id}, item,
      (err) => {
         if (err) {
            console.log(err);
            res.status(500).send("Something went wrong");
         } else {
            res.status(204).send();
         };
      });
}

async function patchRequest(req, res, mongooseModel) {
   const body = req.body;
   const id = req.params.id;
   for (const key in body) {
      if (Object.hasOwnProperty.call(body, key)) {
         body[key] = isBlank(body[key]) ? undefined: body[key];
      };
   };
   body.id = undefined;
   await mongooseModel.updateOne({id: id}, body, {omitUndefined: true},
      (err) => {
         if (err) {
            console.log(err)
            res.status(500).send("Something went wrong");
         } else {
            res.status(204).send();
         };
      });
}

async function deleteOneRequest(req, res, mongooseModel) {
   const id = req.params.id;
   await mongooseModel.updateOne({id: id}, {active: false}, (err) => {
      if (err) {
         console.log(err);
         res.status(500).send("Something went wrong");
      } else {
         res.status(204).send();
      };
   });
}

async function getOneRequest(req, res, mongooseModel) {
   const id = req.params.id;
   await mongooseModel.findOne({id: id}, (err, data) => {
      if (err) {
         res.status(500).send("Something went wrong..");
      } else {
         res.status(200).send(data);
      };
   });
}

async function getAllRequest(req, res, mongooseModel) {
   await mongooseModel.find({}, (err, data) => {
      if (err) {
         res.status(500).send("Something went wrong..");
      } else {
         res.status(200).send(data);
      };
   });
};

async function postRequest(req, res, mongooseModel) {
   const body = req.body;
   const data = await mongooseModel.find();
   body.id = data.length + 1;
   const item = new mongooseModel({
      ...body,
      active: true
   });
   item.save((err) => {
      if (err) {
         console.log(err);
         res.status(500).send(err);
      } else {
         res.status(204).send();
      };
   });
};

exports.putRequest = putRequest;
exports.patchRequest = patchRequest;
exports.deleteOneRequest = deleteOneRequest;
exports.getOneRequest = getOneRequest;
exports.getAllRequest = getAllRequest;
exports.postRequest = postRequest;