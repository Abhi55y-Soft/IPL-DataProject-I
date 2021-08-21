// Function for count the Number of matches played per year for all the years in IPL.
function numberOfMatchesPerYear(matches) {
    let result = {};
    for (let index = 0; index < matches.length; index += 1) {
        if (matches[index].season in result) {
            result[matches[index].season] += 1;
        } else {
            result[matches[index].season] = 1;
        }
    }
    return result;
}

//Function for count the Number of matches won per team per year in IPL.
function numberOfMatchesWonPerTeamPerYear(matches) {
    let result = {};
    let matchesWonPerTeam = {};
    for (let index = 0; index < matches.length; index += 1) {
        if (matches[index].season in result) {  
            if (matches[index].winner in matchesWonPerTeam){ 
                matchesWonPerTeam[matches[index].winner] += 1;
            }
            else{
                matchesWonPerTeam[matches[index].winner] = 1;
            }
            result[matches[index].season] = matchesWonPerTeam;
        }
        else {
            matchesWonPerTeam = {};
            result[matches[index].season] = matchesWonPerTeam;
        }
    }
    return result;
}

//Function for count the Extra runs conceded per team in the year 2016
function extraRunConcededPerTeamIn2016(matches, deliveries){
    let result = {};
    let id = 0;
    for (let index = 0; index < matches.length; index += 1){
        if (matches[index].season == 2016){
            id = matches[index].id;
        }
        for (let innerIndex = 0; innerIndex < deliveries.length; innerIndex += 1){
            if (deliveries[innerIndex].match_id == id){
                if (deliveries[innerIndex].bowling_team in result){
                    result[deliveries[innerIndex].bowling_team] += Number(deliveries[innerIndex].extra_runs);
                }
                else{
                    result[deliveries[innerIndex].bowling_team] = Number(deliveries[innerIndex].extra_runs);
                }
            }
        }
    }
    return result;
}

//Function for get the Top 10 economical bowlers in the year 2015
function top10EconomicalBowlersIn2015(matches, deliveries){
    let result = [];
    let bowlersEconomy = {};
    let id = 0;
    let count = 0;
    for (let index = 0; index < matches.length; index += 1){
        if (matches[index].season == 2015){
            id = matches[index].id;
        }
        for (let innerIndex = 0; innerIndex < deliveries.length; innerIndex += 1){
            if (deliveries[innerIndex].match_id == id){
                if (deliveries[innerIndex].bowler in bowlersEconomy){
                    bowlersEconomy[deliveries[innerIndex].bowler] += Number(deliveries[innerIndex].total_runs);
                }
                else{
                    bowlersEconomy[deliveries[innerIndex].bowler] = Number(deliveries[innerIndex].total_runs);
                }
            }
        }
    }
    let sortedBowlersEconomy = Object.entries(bowlersEconomy).sort((a,b) => a[1]-b[1]);
    sortedBowlersEconomy = Object.fromEntries(sortedBowlersEconomy);
    for (let name in sortedBowlersEconomy){
        if (count <= 10){
            result.push(name);
            count += 1;
        }
        else{
            break;
        }
    }
    return result;
}

module.exports.numberOfMatchesPerYear = numberOfMatchesPerYear;
module.exports.numberOfMatchesWonPerTeamPerYear = numberOfMatchesWonPerTeamPerYear;
module.exports.extraRunConcededPerTeamIn2016 = extraRunConcededPerTeamIn2016;
module.exports.top10EconomicalBowlersIn2015 = top10EconomicalBowlersIn2015;