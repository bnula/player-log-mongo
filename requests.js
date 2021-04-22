const _ = require("lodash");
const {isBlank} = require("./isBlank");
const {findCampaign} = require("./findCampaign");

async function putRequest(req, res, model) {
   const body = req.body;
   const id = req.params.id;
   await model.findOne({id: id}, (err, item) => {
      body._id = item._id;
      body.id = item.id;
      if (body.active === undefined || isBlank(body.active)) {
         body.active = item.active
      };
   });
   body.campaign = findCampaign(body, model, res);
   const item = new model({
      ...body
   });
   await model.replaceOne({id: id}, item,
      (err) => {
         if (err) {
            console.log(err);
            res.status(500).send("Something went wrong");
         } else {
            res.status(204).send();
         };
      });
}

async function patchRequest(req, res, model) {
   const body = req.body;
   const id = req.params.id;
   for (const key in body) {
      if (Object.hasOwnProperty.call(body, key)) {
         body[key] = isBlank(body[key]) ? undefined: body[key];
      };
   };
   body.id = undefined;
   await model.updateOne({id: id}, body, {omitUndefined: true},
      (err) => {
         if (err) {
            console.log(err)
            res.status(500).send("Something went wrong");
         } else {
            res.status(204).send();
         };
      });
}

async function deleteOneRequest(req, res, model) {
   const id = req.params.id;
   await model.updateOne({id: id}, {active: false}, (err) => {
      if (err) {
         console.log(err);
         res.status(500).send("Something went wrong");
      } else {
         res.status(204).send();
      };
   });
}

async function getOneRequest(req, res, model) {
   const id = req.params.id;
   await model.findOne({id: id}, (err, data) => {
      if (err) {
         res.status(500).send("Something went wrong..");
      } else {
         res.status(200).send(data);
      };
   });
}

async function getAllRequest(req, res, model) {
   await model.find({}, (err, data) => {
      if (err) {
         res.status(500).send("Something went wrong..");
      } else {
         res.status(200).send(data);
      };
   });
};

async function postRequest(req, res, model) {
   const body = req.body;   
   if (_.isEmpty(body)) {
      res.status(400).send("Empty Post request.");
      return;
   };
   const data = await model.find();
   body.id = data.length + 1;
   body.campaign = await findCampaign(body, model, res);
   const item = new model({
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