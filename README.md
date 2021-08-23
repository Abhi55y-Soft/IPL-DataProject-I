# IPL Data Project I

This project transforms raw data of IPL to calculate the following stats:

- The number of matches played per year for all the years in IPL.
- The number of matches won per team per year in IPL.
- Extra runs conceded per team in the year 2016
- Top 10 economical bowlers in the year 2015

### Running Locally

Make sure you have [Node.js](https://nodejs.org/en/) installed

```
$ git clone https://github.com/Abhi55y-Soft/IPL-DataProject-I.git # or clone your own fork
$ cd IPL-DataProject-I
$ npm install
$ npm start
```

The data is dumped into the output folder as separate JSON files.

See the JSON files in the output folder for the result.

- mathcesPerYear.json file contains the number of matches played in each Year.
- matchesWonPerTeamPerYear.json file contains the number of matches won by each team in each Year.
- extraRunPerTeamIn2016.json file contains the number of extra runs conceded by each team in year 2016.
- topEconomicalBowlersIn2015.json file contains top Economical Bowlers who conceded fewer runs in year 2015.
