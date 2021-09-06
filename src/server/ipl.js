// Function for count the Number of matches played per year for all the years in IPL.
function numberOfMatchesPerYear(matches) {
    let result = {};
    matches.forEach(element => element.season in result ? result[element.season] += 1 : result[element.season] = 1);
    return result;
}

//Function for count the Number of matches won per team per year in IPL.
function numberOfMatchesWonPerTeamPerYear(matches) {
    let result = {};
    let matchesWonPerTeam = {};
    matches.forEach(element => {
        element.season in result ? 
        element.winner in matchesWonPerTeam ? matchesWonPerTeam[element.winner] += 1
        : element.winner ? matchesWonPerTeam[element.winner] = 1
        : 
        result[element.season] = matchesWonPerTeam
        : matchesWonPerTeam = {};
            result[element.season] = matchesWonPerTeam;
    });
    return result;
}

//Function for count the Extra runs conceded per team in the year 2016
function extraRunConcededPerTeamIn2016(matches, deliveries){
    let result = {};
    matches.filter(element => element.season == 2016)
    .forEach(element2016 =>{
        deliveries.forEach(element => {
            element.match_id == element2016.id ? element.bowling_team in result ? result[element.bowling_team] += Number(element.extra_runs)
            : result[element.bowling_team] = Number(element.extra_runs)
            : {};
        })
    })
    return result;
}

//Function for get the Top 10 economical bowlers in the year 2015
function top10EconomicalBowlersIn2015(matches, deliveries){
    let result = {};
    let bowlersRuns = {};
    let bowlersNumberOfDeliveries = {};
    let count = 0;
    matches.filter(element => element.season == 2015)
    .forEach(element2015 => {
        deliveries.forEach(element => {
            if (element.match_id == element2015.id){
                element.bowler in bowlersRuns ? bowlersRuns[element.bowler] += Number(element.total_runs) 
                : bowlersRuns[element.bowler] = Number(element.total_runs)
                element.bowler in bowlersNumberOfDeliveries && element.wide_runs == 0 && element.noball_runs == 0 ? bowlersNumberOfDeliveries[element.bowler] += 1
                : element.wide_runs == 0 && element.noball_runs == 0 ? bowlersNumberOfDeliveries[element.bowler] = 1
                : {};
            }
        });
    });
    Object.keys(bowlersRuns).map(key => {
        bowlersRuns[key] = (bowlersRuns[key] / (bowlersNumberOfDeliveries[key] / 6)).toFixed(2); // (bowlersNumberOfDeliveries[key] / 6) calculate number of overs
    })
    Object.entries(bowlersRuns).sort((a,b) => a[1]-b[1])
    .forEach(element => {
        if (count < 10){
            result[element[0]] = element[1];
            count += 1;
        }
    })
    return result;
}

module.exports = {numberOfMatchesPerYear, numberOfMatchesWonPerTeamPerYear, extraRunConcededPerTeamIn2016, top10EconomicalBowlersIn2015};