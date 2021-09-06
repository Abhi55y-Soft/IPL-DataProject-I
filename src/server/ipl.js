// Function for count the Number of matches played per year for all the years in IPL.
function numberOfMatchesPerYear(matches) {
    let result = {};
    matches.reduce((matchPerYear, {season}) => {
        season in result ? result[season] += 1 : result[season] = 1;
    });
    return result;
}

//Function for count the Number of matches won per team per year in IPL.
function numberOfMatchesWonPerTeamPerYear(matches) {
    let result = {};
    let matchesWonPerTeam = {};
    matches.reduce((matchPerYear, {season, winner}) => {
        season in result ? 
        winner in matchesWonPerTeam ? matchesWonPerTeam[winner] += 1
        : winner ? matchesWonPerTeam[winner] = 1
        : 
        result[season] = matchesWonPerTeam
        : matchesWonPerTeam = {};
        result[season] = matchesWonPerTeam;
    });
    return result;
}

//Function for count the Extra runs conceded per team in the year 2016
function extraRunConcededPerTeamIn2016(matches, deliveries){
    let result = {};
    matches.filter(({season}) => season == 2016)
    .reduce((match2016, {id}) => {
        deliveries.reduce((delivery, {match_id, extra_runs, bowling_team}) => {
           match_id == id ? bowling_team in result ? result[bowling_team] += Number(extra_runs)
            : result[bowling_team] = Number(extra_runs)
            : {}; 
        });
    });
    return result;
}

//Function for get the Top 10 economical bowlers in the year 2015
function top10EconomicalBowlersIn2015(matches, deliveries){
    let result = {};
    let bowlersRuns = {};
    let bowlersNumberOfDeliveries = {};
    let count = 0;
    matches.filter(({season}) => season == 2015)
    .reduce((match2016, {id}) => {
        deliveries.reduce((delivery, {match_id, bowler, total_runs, wide_runs, noball_runs}) => {
            if (match_id == id){
                bowler in bowlersRuns ? bowlersRuns[bowler] += Number(total_runs) 
                : bowlersRuns[bowler] = Number(total_runs)
                bowler in bowlersNumberOfDeliveries && wide_runs == 0 && noball_runs == 0 ? bowlersNumberOfDeliveries[bowler] += 1
                : wide_runs == 0 && noball_runs == 0 ? bowlersNumberOfDeliveries[bowler] = 1
                : {};
            }
        })
    })

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