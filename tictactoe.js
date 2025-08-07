const cells=document.querySelectorAll(".cell")
const stat=document.querySelector("#status")
const resetbutton=document.querySelector("#resetbtn")
const wincond=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
let options=["","","","","","","","",""];
let cplayer="X";
let runn=false;

initg();

function initg(){
    cells.forEach(cell=>cell.addEventListener("click",cellclick));
    resetbutton.addEventListener("click",restartgame);
    stat.textContent=`${cplayer}'s turn`;
    runn=true;
}
function cellclick(){
    const cellIndex=this.getAttribute("cellIndex");
    if(options[cellIndex]!="" || !runn){
        return;
    }
    updatecell(this,cellIndex);
    checkwinner();
}
function updatecell(cell,index){
    options[index]=cplayer;
    cell.textContent=cplayer;
}
function changeplayer(){
    cplayer=(cplayer=="X")?"O":"X";
    stat.textContent=`${cplayer}'s turn`
}
function checkwinner(){
    let roundwon=false;
    for(i=0;i<wincond.length;i++){
        const cond=wincond[i];
        const cellA=options[cond[0]];
        const cellB=options[cond[1]];
        const cellc=options[cond[2]];
        if(cellA==""||cellB==""||cellc==""){
            continue
        }
        if(cellA==cellB && cellB ==cellc){
            roundwon=true;
            break;
        }
    }
    if(roundwon){
        stat.textContent=`${cplayer} WINS!`
        runn=false;
    }
    else if(!options.includes("")){
        stat.textContent="DRAW!"
        runn=false;
    }
    else{
        changeplayer();
    }
}
function restartgame(){
    cplayer="X";
    options=["","","","","","","","",""];
    stat.textContent=`${cplayer}'s turn`;
    cells.forEach(cell=>cell.textContent="");
    runn=true;
}

