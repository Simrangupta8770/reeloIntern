const express = require('express');
const bodyParser = require('body-parser');
const {topics,ques}=require('./questions')
const app = express();
const PORT = 3000;
app.use(bodyParser.json());
const tot=100;
const easyPer=20;
const medPer=50;
const hardPer=30;



let easyMarks=0;
let medMarks=0;
let hardMarks=0;

let noOfEasy=0;
let noOfMed=0;
let noOfHard=0;
let quesPerTopic=[];
const q = new Map();
const t = new Map();
const quesPaper=[];
    const format={
      'question': 0,
      'subject': 1, 
      'topic': 2,
      'difficulty': 3,
    }
const perOfEachTopic=[50,50];
const calc=(tot,easyPer,medPer,hardPer)=>{
    easyMarks=((easyPer/100)*tot);
    medMarks=((medPer/100)*tot);
    hardMarks=((hardPer/100)*tot);


    for(var j=1;j<easyMarks;j++){
      if(easyMarks%j==0){

        noOfEasy=j;
      }
    }


    if(noOfEasy==0 || noOfEasy==1){
      noOfEasy=easyMarks;
    }

    for(var j=noOfEasy-1;j>1;j--){
      if(medMarks%j==0 && (medMarks/j >easyMarks/noOfEasy)){
        
          noOfMed=j;
          break;
        
      }
    }
    if (noOfMed==0){
      if(easyMarks/noOfEasy < medMarks/noOfMed){
        noOfMed=noOfEasy;
      }else{
        noOfMed=1;
      }
    }

    for(var j=noOfMed-1;j>1;j--){
      
        if(hardMarks%j==0 && (hardMarks/j > medMarks/noOfMed)){
          noOfHard=j;
          break;
        }
          
    }

    if(noOfHard==0){
      if(medMarks/noOfMed < hardMarks/noOfMed){
        noOfHard=noOfMed;
      }else{
        noOfHard=1;
      }
      
    }
    const totques=noOfEasy+noOfMed+noOfHard;
    
    quesPerTopic=[(totques*perOfEachTopic[0])/100,(totques*perOfEachTopic[1])/100];


    
    t.set(topics[0],quesPerTopic[0]);
    t.set(topics[1],quesPerTopic[1]);

    
    q.set('easy',noOfEasy);
    q.set('med',noOfMed);
    q.set('hard',noOfHard);
}

app.get('/', async (req, res) => {
  calc(req.body.tot,req.body.easyPer,req.body.medPer,req.body.hardPer);
  for(var i=0;i<ques.length;i++){
     if(ques[i][format.difficulty]=="Easy" && t.get(ques[i][format.topic])!=0 && q.get('easy')!=0){
      q.set('easy',q.get('easy')-1);
      t.set(ques[i][format.topic],t.get(ques[i][format.topic])-1);
      ques[i].push(easyMarks/noOfEasy);
      quesPaper.push(
        ques[i]
      );
     }

     if(ques[i][format.difficulty]=="Moderate" && t.get(ques[i][format.topic])!=0 && q.get('med')!=0){
      q.set('med',q.get('med')-1);
      t.set(ques[i][format.topic],t.get(ques[i][format.topic])-1);
      ques[i].push(medMarks/noOfMed);
      quesPaper.push(
        ques[i]
      );
     }
     
     if(ques[i][format.difficulty]=="Hard" && t.get(ques[i][format.topic])!=0 && q.get('hard')!=0){
      q.set('hard',q.get('hard')-1);
      t.set(ques[i][format.topic],t.get(ques[i][format.topic])-1);
      ques[i].push(hardMarks/noOfHard);
      quesPaper.push(
        ques[i]
      );
     }
  }
  
  res.status(200).json({ quesPaper });  
});

app.listen(PORT,()=>{
  console.log('server started');
})