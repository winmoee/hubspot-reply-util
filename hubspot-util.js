function print(str) {
    console.log(str);
  }
  const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
   // test import

  // API documentation for conversation
  // https://developers.hubspot.com/docs/api/conversations/conversations

  // Function to get agent id & agent name given an agent email

  /* FUNCTION: to close a conversation given a conversation id */
  async function closeChat(conversationId, hubspotApiKey) {
    const headers = {
      'Authorization': 'Bearer ' + hubspotApiKey,
      'Content-Type': 'application/json',
    };
    const options = {
      headers,
      method: 'DELETE',
    };
    const threadId = conversationId;
    const res = await fetch(`https://api.hubspot.com/conversations/v3/conversations/threads/` + threadId, options);
    }

  /* FUNCTION: reply to a conversation given a conversation id */
  async function replyToConversation(conversationId, hubspotApiKey, message) {
    const headers = {
      'Authorization': 'Bearer ' + hubspotApiKey,
      'Content-Type': 'application/json',
    };
    const options = {
      headers,
      method: 'POST',
    };
    const body = {
      type: "MESSAGE",
      text: message,
      recipients: [ {
        actorId: "A-50243016",
      }
      ],
      // this body isn't working properly
      senderActorId: "A-50243016",
      channelId: 1000,
      channelAccountId: 244825059,
    }

    options.body = JSON.stringify(body);
    const threadId = conversationId;
    const res = await fetch(`https://api.hubspot.com/conversations/v3/conversations/threads/` + threadId + `/messages`, options);
    }

  /* FUNCTION: Get last time (timestamp) an admin replied (so that we can close chats based on inactivity) */
  async function getLastTimeAdminReplied(conversationId, hubspotApiKey) {
    const headers = {
      'Authorization': 'Bearer ' + hubspotApiKey,
      'Content-Type': 'application/json',
    };
    const options = {
      headers,
      method: 'GET',
    };
    const threadId = conversationId;
    // fetching the conversation
    const res = await fetch(`https://api.hubspot.com/conversations/v3/conversations/threads/` + threadId + `/messages`, options);
    const json = await res.json();
    // first message that appears is the latest message.
    const latestMessage = json.results[0];
    const latestMessageTime = latestMessage.createdAt;
    print(latestMessageTime);
    return latestMessageTime;
  }


  /* FUNCTION: Webhook function for listening to new conversation and new message */

    
  /* TEST CASES */
  const hubspotApiKey = 'hubspotapikey'; // my hubspot api key
    // replace with the conversation ID you want to retrieve
    // closeChat('4148027700', hubspotApiKey);
    // getLastTimeAdminReplied('4157246071', hubspotApiKey);
    // replyToConversation('4157246071', hubspotApiKey, "LOLOLOLOL IT FINALLY WORKS ADJSLFHLASDFJL");
    // helper(hubspotApiKey);

    
// DEVELOPER ACCOUNT FUNCTIONS

// get subscriptions
async function getSubscriptions(appId) {
  const headers = {
    'Authorization': 'Bearer ' + hubspotApiKey,
    'Content-Type': 'application/json',
  };
  const options = {
    headers,
    // temporary deletion
    // method: 'GET',
  };
  const res = await fetch(`https://api.hubspot.com/webhooks/v3/` + appId + `/subscriptions`, options);
  const json = await res.json();
  print(json);
  return json;
}
    // const appId = 1491840;
    // getSubscriptions(appId);



/* HELPER FUNCTIONS */
async function helper(hubspotApiKey) {
  const headers = {
    'Authorization': 'Bearer ' + hubspotApiKey,
    'Content-Type': 'application/json',
  };
  const options = {
    headers,
    // temporary deletion
    // method: 'GET',
  }
  // const res = await fetch(`https://api.hubspot.com/conversations/v3/conversations/threads/4157246071`, options);
  const res = await fetch(`https://api.hubspot.com/conversations/v3/conversations/channel-accounts`, options);
  const json = await res.json();
  print(json);
  return json;  
  
};



//================================//
//   Running the OAuth 2.0 Flow   //
//================================//

// Step 1
// Build the authorization URL to redirect a user
// to when they choose to install the app


//// Build the auth URL

let SCOPES = ['conversations.read'];
if (process.env.SCOPE) {
    SCOPES = (process.env.SCOPE.split(/ |, ?|%20/)).join(' ');
}

// On successful install, users will be redirected to /oauth-callback
const REDIRECT_URI = `http://localhost`;
let CLIENT_ID = `866b9069-4119-484a-8df8-57b65068549e`
 
const authUrl =
  'https://app.hubspot.com/oauth/authorize' +
  `?client_id=${encodeURIComponent(CLIENT_ID)}` + // app's client ID
  `&scope=${encodeURIComponent(SCOPES)}` + // scopes being requested by the app
  `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`; // where to send the user after the consent page

print(authUrl);


// make the scopes list into a single string separated by %20


// Redirect the user
// return res.redirect(authUrl);



