const line = require('@line/bot-sdk');

const client = new line.messagingApi.MessagingApiClient({
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
});

function reply(event, messages) {
  return client.replyMessage({
    replyToken: event.replyToken,
    messages: [{
      type: 'text',
      text: messages
    }],
  });
}

module.exports = { reply };