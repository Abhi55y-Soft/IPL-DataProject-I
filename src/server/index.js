const csv = require('csv-parser');
const fs = require('fs');
const { numberOfMatchesPerYear, 
    numberOfMatchesWonPerTeamPerYear, 
    extraRunConcededPerTeamIn2016, 
    top10EconomicalBowlersIn2015 } = require('./ipl');
const matches = [];
const deliveries = [];

fs.createReadStream('/home/abhishek/temp/IPL_DataProject_I/src/data/matches.csv')
    .pipe(csv({}))  //pipe it with csv-parser to parse the data as object
    .on('data', (data) => matches.push(data))   //pushung the object data into array to make it array of object   
    .on('end', () => {
        fs.createReadStream('/home/abhishek/temp/IPL_DataProject_I/src/data/deliveries.csv') // nesting readstrem for the both CSV files to read and use the data to perform operations 
            .pipe(csv({}))
            .on('data', (data) => deliveries.push(data))
            .on('end', () => {
                const matchesPerYear = numberOfMatchesPerYear(matches);
                const matchesWonPerTeamPerYear = numberOfMatchesWonPerTeamPerYear(matches);
                const extraRunPerTeamIn2016 = extraRunConcededPerTeamIn2016(matches, deliveries);
                const topEconomicalBowlersIn2015 = top10EconomicalBowlersIn2015(matches, deliveries);
                
                // this function dum data resultent data of function into JSON file
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