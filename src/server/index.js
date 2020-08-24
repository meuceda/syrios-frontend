/* @flow */

import express from 'express';
import graphqlHTTP from 'express-graphql';
import fetch from 'node-fetch';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import Dataloader from 'dataloader';
import schema from './schema/Schema';

const port = process.env.PORT || 3002;
const app = express();
const cors = require('cors');

async function loadData(url: string) {
  const paging = 0;
  if (paging) {
    // set some variables
    let page = 1;
    // create empty array where we want to store the objects for each loop
    const stuff = [];
    // create a lastResult array which is going to be used to check if there is a next page
    let lastResult = [];
    do {
      // try catch to catch any errors in the async api call
      try {
        console.log(`${url}&page=${page}`);
        // use node-fetch to make api call
        const resp = await fetch(`${url}&page=${page}`);
        const data = await resp.json();
        lastResult = data;
        console.log(lastResult.next);
        stuff.push(data);
        // increment the page with 1 on each loop
        page++;
      } catch (err) {
        console.error(`Oeps, something is wrong ${err}`);
      }
      // keep running until there's no next page
      //  } while (lastResult.next !== null);
    } while (page <= 1);
    // let's log out our new people array
    console.log(stuff);

    return stuff;
  }
  const res = await fetch(url);
  const data = await res.json();
  if (data && data.count && data.results) {
    return data.results;
  }
  console.log(data);
  return data;
}

// setup nodemailer transport - using local sendmail
const transporter = nodemailer.createTransport({
  sendmail: true,
  newline: 'unix',
  path: '/usr/sbin/sendmail',
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// POST route form email sending from download form
app.post('/send', (req, res) => {
  console.log(req.body)
  const mailOptions = {
    from: 'Syrios Site Watcher <dashadmin@uh.edu>',
    to: 'kmneuma2@central.uh.edu',
    subject: 'New entry at Syrios form',
    text: `From: ${req.body.email} \nName: ${req.body.name} \nPhone: ${req.body.phone} \nMessage: ${req.body.writtenMessage}`,
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      res.json({
        status: 'fail',
        error: err,
      });
    } else {
      res.json({
        status: `success ${data}`,
      });
    }
  });
});

app.use(
  '/graphql',
  graphqlHTTP(() => {
    const loader = new Dataloader(keys => Promise.all(keys.map(loadData)));
    return {
      schema,
      graphiql: true,
      context: {
        loader,
      },
    };
  })
);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
  console.log(`Visit http://localhost:${port}`);
});
