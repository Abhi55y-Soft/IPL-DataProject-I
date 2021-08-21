const csv = require('csv-parser');
const fs = require('fs');
const { numberOfMatchesPerYear, 
    numberOfMatchesWonPerTeamPerYear, 
    extraRunConcededPerTeamIn2016, 
    top10EconomicalBowlersIn2015 } = require('./ipl');
const matches = [];
const deliveries = [];

fs.createReadStream('/home/abhishek/temp/IPL_DataProject_I/src/data/matches.csv')
    .pipe(csv({}))
    .on('data', (data) => matches.push(data))
    .on('end', () => {
        fs.createReadStream('/home/abhishek/temp/IPL_DataProject_I/src/data/deliveries.csv')
            .pipe(csv({}))
            .on('data', (data) => deliveries.push(data))
            .on('end', () => {
                const matchesPerYear = numberOfMatchesPerYear(matches);
                const matchesWonPerTeamPerYear = numberOfMatchesWonPerTeamPerYear(matches);
                const extraRunPerTeamIn2016 = extraRunConcededPerTeamIn2016(matches, deliveries);
                const topEconomicalBowlersIn2015 = top10EconomicalBowlersIn2015(matches, deliveries);
                
                function dumpData(data, file){
                    const finished = (error) => {
                        if (error){
                            console.log(error);
                            return;
                        }
                    }
                    const jsonData = JSON.stringify(data, null, 2);
                    fs.writeFile(file, jsonData, finished);
                }

                dumpData(matchesPerYear, 'src/public/output/matchesPerYear.json');
                dumpData(matchesWonPerTeamPerYear, 'src/public/output/matchesWonPerTeamPerYear.json');
                dumpData(extraRunPerTeamIn2016, 'src/public/output/extraRunPerTeamIn2016.json');
                dumpData(topEconomicalBowlersIn2015, 'src/public/output/topEconomicalBowlersIn2015.json');

             });
    });