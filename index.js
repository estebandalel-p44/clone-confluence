// This code sample uses the 'node-fetch' library:
// https://www.npmjs.com/package/node-fetch
import fetch from "node-fetch";
// this will get this template https://project44.atlassian.net/wiki/spaces/PMO/pages/35540500483/YYYY-MM-DD-title
// it's the official template for PMAs
fetch(
  "https://project44.atlassian.net/wiki/rest/api/content/35540500483?expand=body.storage,space,container,ancestors",
  {
    method: "GET",
    headers: {
      Authorization:
        "Basic ZXN0ZWJhbi5kYY1Qw==",
      Accept: "application/json",
    },
  }
  // the authorization token is a base64 encoding of <yourmail>:<yourAPIkey>
  // in my case: esteban.dalel@project44.com:9QbdZjTA5YnFhPU465C
  //OBVIOUSLY OBFUSCATED by deleting a few chars lol
  // do it with https://www.base64decode.org and https://www.base64encode.org
  // to get you api key https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/
)
  .then((response) => response.json())
  .then((data) => {
    // you should dinamically change the title, maybe with dateISO or something
    let bodyData = {
      title: "testAPI7",
      type: "page",
      space: data.space,
      container: data.container,
      body: data.body,
      ancestors: data.ancestors,
    };
    console.log(data);
    console.log(bodyData);
    //now post all the content we just fetched...
    fetch("https://project44.atlassian.net/wiki/rest/api/content", {
      method: "POST",
      headers: {
        Authorization:
          "Basic ZXN0ZWJhbimRaalRBU9WNDY1Qw==",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    })
      .then((response) => {
        console.log(`Response: ${response.status} ${response.statusText}`);
        return response.json();
      })
      // this will log the url for the created page
      .then((text) => console.log(text._links.self))
      .catch((err) => console.error(err));
  })
  .catch((err) => console.error(err));
