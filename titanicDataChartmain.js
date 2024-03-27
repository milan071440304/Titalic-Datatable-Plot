async function titanicDatas(){
    const fetchTitanicData = await fetch("https://raw.githubusercontent.com/saphalpdyl/express_titanic/main/titanic.json");

    
    const titanicData = await fetchTitanicData.json();
    const titanicnewData = titanicData.data;

    const body = document.querySelector("body");
    const table = document.createElement("table");
    table.classList.add("display");
    table.setAttribute("id", "datas-table");
    

    const tableRows = document.createElement("tr");
    const headingLists = ["Name", "Age", "Fare"];

    const tHead = document.createElement("thead");
    tHead.appendChild(tableRows);

    headingLists.forEach(element => {
       const tableHeadingData = document.createElement("th");
       tableHeadingData.textContent = element;
       tableRows.appendChild(tableHeadingData);
    });

    table.appendChild(tHead);



    const dataPlotting = document.createElement("div");
    dataPlotting.setAttribute("id", "data-plotting");

    const tBody = document.createElement("tbody");


    const newDiedAgeLists = [];
    const newSurvivedAgeLists = [];
    const newDiedFareLists = [];
    const newSurvivedFareLists = [];
    let newSurvivedLists = [];
    const newDiedLists = [];
    
    for (const datas of titanicnewData) {
        const tableDataRows = document.createElement("tr");

        const nameData = datas.Name;
        const seprateName = nameData.split(",");
        const travelerName = seprateName[1];
        let ageData = parseInt(datas.Age);
        if(!ageData){
            ageData ="Age not verified";
        }


        const fareData = parseInt(datas.Fare).toFixed(1);

        const dataLists = [travelerName, ageData, fareData];

        dataLists.forEach(data => {
            const tableDataCows = document.createElement("td");
            tableDataCows.textContent = data;
            tableDataRows.appendChild(tableDataCows);
        });

        const survivedLists = datas.Survived;
  
        if(!survivedLists){
            newDiedAgeLists.push(ageData);
            newDiedFareLists.push(fareData);
            newDiedLists.push(survivedLists);
        }
        else if(survivedLists==1){
            newSurvivedAgeLists.push(ageData);
            newSurvivedFareLists.push(fareData);
            newSurvivedLists.push(survivedLists);
        }

        tBody.appendChild(tableDataRows);
    }


    let trace1_diedList = {
        x: newDiedFareLists,
        y: newDiedAgeLists,
        mode: 'markers',
        name: 'Died',
        marker: { color: "red"}
      };
      
    let trace2_survivedList = {
        x: newSurvivedFareLists,
        y: newSurvivedAgeLists,
        mode: 'markers',
        name: 'Survived',
        marker: { color: "blue"}
      };


      //main          
    const newData = [trace1_diedList, trace2_survivedList];


    let layout = {
        xaxis: {
        range: [ 0, 550 ],
        title:'Fare'
        },
        yaxis: {
        range: [0, 85],
        title:'Age'
        },

        title:'Titanic plot ( Fare vs. Age )',
        width: 1200,
        height: 600

    };

    Plotly.newPlot( dataPlotting, newData, layout);

    table.appendChild(tBody);

    body.prepend(dataPlotting);
    body.prepend(table);

    new DataTable('#datas-table');

}
titanicDatas();