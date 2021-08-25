// Function for count the Number of matches played per year for all the years in IPL.
function numberOfMatchesPerYear(matches) {
    let result = {};
    matches.forEach(element => {
        if (element.season in result){
            result[element.season] += 1;
        }
        else{
            result[element.season] = 1;
        }
    });
    return result;
}

//Function for count the Number of matches won per team per year in IPL.
function numberOfMatchesWonPerTeamPerYear(matches) {
    let result = {};
    let matchesWonPerTeam = {};
    matches.forEach(element => {
        if (element.season in result){
            if (element.winner in matchesWonPerTeam){
                matchesWonPerTeam[element.winner] += 1;
            }
            else{
                matchesWonPerTeam[element.winner] = 1;
            }
            result[element.season] = matchesWonPerTeam;
        }
        else{
            matchesWonPerTeam = {};
            result[element.season] = matchesWonPerTeam;
        }
    });
    return result;
}

//Function for count the Extra runs conceded per team in the year 2016
function extraRunConcededPerTeamIn2016(matches, deliveries){
    let result = {};
    const matchesIn2016 = matches.filter(element => element.season == 2016);
    matchesIn2016.forEach(element2016 => {
        deliveries.forEach(element => {
            if (element.match_id == element2016.id){
                if (element.bowling_team in result){
                    result[element.bowling_team] += Number(element.extra_runs);
                }
                else{
                    result[element.bowling_team] = Number(element.extra_runs);
                }
            }
        });
    });
    return result;
}

//Function for get the Top 10 economical bowlers in the year 2015
function top10EconomicalBowlersIn2015(matches, deliveries){
    let result = [];
    let bowlersRuns = {};
    let bowlersNumberOfDeliveries = {};
    let count = 0;
    const matchesIn2015 = matches.filter(element => element.season == 2015);
    matchesIn2015.forEach(element2015 => {
        deliveries.forEach(element => {
            if (element.match_id == element2015.id){
                if (element.bowler in bowlersRuns){
                    bowlersRuns[element.bowler] += element.total_runs;
                }
                else{
                    bowlersRuns[element.bowler] = element.total_runs;
                }
                if (element.bowler in bowlersNumberOfDeliveries && !(element.wide_runs) && !(element.noball_runs)){
                    bowlersNumberOfDeliveries[element.bowler] += 1;
                }
                else if (!(element.wide_runs) && !(element.noball_runs)){
                    bowlersNumberOfDeliveries[element.bowler] = 1;
                }
            }
        });
    });
    Object.keys(bowlersRuns).map(key => {
        bowlersRuns[key] = (bowlersRuns[key] / (bowlersNumberOfDeliveries[key] / 6).toFixed(2)).toFixed(2); // (bowlersNumberOfDeliveries[key] / 6) calculate number of overs
    });
    let bowlersEconomy = Object.entries(bowlersRuns).sort((a,b) => a[1]-b[1]);
    bowlersEconomy.forEach(element => {
        if (count <= 10){
            result.push(element[0]);
            count += 1;
        }
    });
    return result;
}

module.exports.numberOfMatchesPerYear = numberOfMatchesPerYear;
module.exports.numberOfMatchesWonPerTeamPerYear = numberOfMatchesWonPerTeamPerYear;
module.exports.extraRunConcededPerTeamIn2016 = extraRunConcededPerTeamIn2016;
module.exports.top10EconomicalBowlersIn2015 = top10EconomicalBowlersIn2015;