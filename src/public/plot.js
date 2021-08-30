const jsonFile1 = 'output/matchesPerYear.json';
const jsonFile2 = 'output/matchesWonPerTeamPerYear.json';
const jsonFile3 = 'output/extraRunPerTeamIn2016.json';
const jsonFile4 = 'output/topEconomicalBowlersIn2015.json';

// Number of matches played per year for all the years in IPL
function plotMatchesPerYear(data){
  let yearInIpl = [];
  let numberOfMatches = [];
  Object.entries(data).forEach(element => {
      yearInIpl.push(element[0]);
      numberOfMatches.push(element[1]);
  });
  const chart = Highcharts.chart('plotMatchesPerYear', {
    chart: {
      type: 'column',
      styledMode: true,
      options3d: {
        enabled: true,
        alpha: 15,
        beta: 15,
        depth: 50
      }
    },
    title: {
      text: 'Number of matches played per year for all the years in IPL'
    },
    plotOptions: {
      column: {
        depth: 35
      }
    },
    xAxis: {

      categories: yearInIpl
    },
    yAxis: {
      title: {
          text: 'Matches'
      }
    },
    series: [{
      showInLegend: false,
      name: 'Matches',
      data: numberOfMatches,
      colorByPoint: false
    }]
  });
}

// Number of matches won per team per year in IPL.
function plotMatchesWonPerTeamPerYear(data){
  let yearInIpl = [];
  let teamNamesDistinct = [];
  let teamData = [];
  
  Object.entries(data).forEach(element => {
    yearInIpl.push(element[0]);
    Object.entries(element[1]).forEach(element2 => {
      teamData.push((element2[0]));
    });
  });
  function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
  }
  teamNamesDistinct = uniq(teamData);
  teamNamesDistinct.pop();

  function collectData (data, teamNamesDistinct){
    let arr = [];
    let mainData = [];
    Object.entries(data).forEach(element => {
      teamNamesDistinct.forEach(elementTeams => {
        if (elementTeams in element[1]){
          arr.push(element[1][elementTeams]);
        }
        else{
          arr.push(0);
        }
      });
      mainData.push(arr);
      arr = [];
    });
    return mainData;
  }
  let mainData = collectData(data, teamNamesDistinct);

  const chart = Highcharts.chart('plotMatchesWonPerTeamPerYear', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Number of matches won per team per year in IPL.'
    },
    xAxis: {
        categories: teamNamesDistinct,
        crosshair: true
    },
    yAxis: {
        title: {
            text: 'Winning Matches'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y} wins</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [{
        name: '2008',
        data: mainData[0]

    }, {
        name: '2009',
        data: mainData[1]

    }, {
        name: '2010',
        data: mainData[2]

    }, {
        name: '2011',
        data: mainData[3]

    }, {
        name: '2012',
        data: mainData[4]

    }, {
        name: '2013',
        data: mainData[5]

    }, {
        name: '2014',
        data: mainData[6]

    }, {
        name: '2015',
        data: mainData[7]

    }, {
        name: '2016',
        data: mainData[8]

    }, {
        name: '2017',
        data: mainData[9]

    }]
  });
}

// Extra runs conceded per team in the year 2016
function plotExtraRunPerTeamIn2016(data){
  let teamNames = [];
  let numberOfMatches = [];
  Object.entries(data).forEach(element => {
    teamNames.push(element[0]);
    numberOfMatches.push(element[1]);
  });
  const chart = Highcharts.chart('plotExtraRunPerTeamIn2016', {
    chart: {
      type: 'column',
      styledMode: true,
      options3d: {
        enabled: true,
        alpha: 15,
        beta: 15,
        depth: 50
      }
    },
    title: {
      text: 'Extra runs conceded per team in the year 2016'
    },
    plotOptions: {
      column: {
        depth: 35
      }
    },
    xAxis: {

      categories: teamNames
    },
    yAxis: {
      title: {
          text: 'Extra Runs'
      }
    },
    series: [{
      showInLegend: false,
      name: 'Runs Conceded',
      data: numberOfMatches,
      colorByPoint: true
    }]
  });
}

// Top 10 economical bowlers in the year 2015
function plotTopEconomicalBowlersIn2015(data){
  let playersName = [];
  let playerRank = [];
  Object.entries(data).forEach(element => {
    playersName.push(element[0]);
    playerRank.push(Number(element[1]));
  });
  const chart = Highcharts.chart('plotTopEconomicalBowlersIn2015', {
    chart: {
      type: 'column',
      styledMode: true,
      options3d: {
        enabled: true,
        alpha: 15,
        beta: 15,
        depth: 50
      }
    },
    title: {
      text: 'Top 10 economical bowlers in the year 2015'
    },
    plotOptions: {
      column: {
        depth: 35
      }
    },
    xAxis: {

      categories: playersName
    },
    yAxis: {
      min: 0,
      title: {
          text: 'Economy'
      }
    },
    series: [{
      showInLegend: false,
      name: 'Economy',
      data: playerRank,
      colorByPoint: true
    }]
  });
}

function fetchAll(jsonFile1, jsonFile2, jsonFile3, jsonFile4){
  fetch(jsonFile1)
    .then(response => response.json())
    .then(data => plotMatchesPerYear(data))
  fetch(jsonFile2)
    .then(response => response.json())
    .then(data => plotMatchesWonPerTeamPerYear(data))
  fetch(jsonFile3)
    .then(response => response.json())
    .then(data => plotExtraRunPerTeamIn2016(data))
  fetch(jsonFile4)
    .then(response => response.json())
    .then(data => plotTopEconomicalBowlersIn2015(data))
}

fetchAll(jsonFile1, jsonFile2, jsonFile3, jsonFile4);
