const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const path = require('path');

const discordWebhookUrl = 'YOUR_URL';
//const message = 'Malicious request detected: /etc/passwd in path value!';
//const data = { content: message };



const elasticsearch = require('elasticsearch');
const host = 'http://elasticsearch:9200'; // Elasticsearch host URL
const indexPattern = 'logstash-*'; // Elasticsearch index pattern
const username = 'elastic'; // Elasticsearch username for basic authentication
const password = 'password'; // Elasticsearch password for basic authentication

const client = new elasticsearch.Client({
    host,
    httpAuth: `${username}:${password}`,
});

const paths = ['/index.php','/etc/passwd','/.git','/.git/config','/config.php','/admin.php','sleep','sysdate','config'];

const query = {
    bool: {
      must: [
        {
          bool: {
            should: paths.map(path => ({
              match_phrase: {
                log: path,
              },
            })),
          },
  
        },
        {
          range: {
            '@timestamp': {
              gte: 'now-15m',
              lte: 'now',
            },
          },
        },
      ],
    },
  };


client.search({
    index: indexPattern,
    body: {
      query,
    },
  }).then(response => {
    console.log(`Found ${response.hits.total.value} logs:`);
  
const realdata = response.hits.hits.map(data=>{
    return data._source.log
})

console.log(realdata)


async function sendToDiscordWebhook(webhookUrl, data) {
  try {
    // Write data to a temporary file
    const tempFilePath = path.join(__dirname, 'temp.txt');
    fs.writeFileSync(tempFilePath, JSON.stringify(data), 'utf-8');

    // Create a FormData instance
    const formData = new FormData();
    formData.append('content', 'Malicios Logs Files');
    formData.append('file', fs.createReadStream(tempFilePath), 'data.txt');

    // Upload the FormData as a multipart/form-data request to Discord webhook
    const response = await axios.post(webhookUrl, formData, {
      headers: formData.getHeaders()
    });

    console.log(`Data sent to Discord webhook successfully. Response: ${response.status} ${response.statusText}`);

    // Delete the temporary file
    fs.unlinkSync(tempFilePath);
    console.log(`Temporary file deleted: ${tempFilePath}`);
  } catch (error) {
    console.error(`Failed to send data to Discord webhook. Error: ${error.message}`);
  }
}

sendToDiscordWebhook(discordWebhookUrl, realdata);

  }).catch(error => {
    console.error(`Error querying Elasticsearch: ${error}`);
});


