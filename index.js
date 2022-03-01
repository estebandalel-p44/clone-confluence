"use strict";
const { SecretManagerServiceClient } = require("@google-cloud/secret-manager");
const client = new SecretManagerServiceClient();

exports.http = async (request, response) => {
  // Access the secret.
  const [accessResponse] = await client.accessSecretVersion({
    name: "projects/781385493461/secrets/AIRTABLE_API_KEY/versions/latest",
  });

  const responsePayload = accessResponse.payload.data.toString("utf8");
  if (responsePayload) {
    console.info(`Payload: ${responsePayload}`);
    response.status(200).send(`Payload: ${responsePayload}`);
  } else response.status(501).send(responsePayload);
};

exports.event = (event, callback) => {
  callback();
};

// en un momento del tiempo unixtime, mandar preguntas al canal en el installation token
// 24 hs después correr create
// una semana depués flushear rooms
