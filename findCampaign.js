const _ = require("lodash");
const {Campaign} = require("./models");

async function findCampaign(body, model, res) {
   if (model !== Campaign) {
      const id = body.campaignId;
      if (_.isEmpty(body.campaignId)) {
         return res.status(404).send("Missing Campaign Id");
      } else {
         const item = await Campaign.findOne({id: id});
         return item;
      };
   };
};

exports.findCampaign = findCampaign;