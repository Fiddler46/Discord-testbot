const express = require('express');

const app = express() ;
let db ;

//Weekly Routes
app.get('/weeklyreports', (req, res) => {
  let reports = []
  db.collection('standups')
    .find() // returns cursor 
    .forEach(report => {
      reports.push(report)
    })
    .then(() => {
      res.status(200).json(reports)
    })
    .catch(() => {
      res.status(500).json({"Error": "Could not fetch standups"})
    })
})