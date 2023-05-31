import './Main.css';
import { useEffect, useState } from 'react';
import {Navigate } from 'react-router-dom';
import Block from 'components/Block/Block.js';
import Results from 'components/Results/Results.js';
import Header from 'components/Header/Header';
import { useAuth } from 'hooks/use-auth';
import { db } from 'firebase.js';
import {collection, query, where, getDocs, setDoc, doc} from 'firebase/firestore'
import StandingTable from 'components/StandingTable/StandingTable';

function Main() {
  const {isAuth, id} = useAuth();

  const [isPlaying, setIsPlaying] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showBlock, setShowBlock] = useState(false)
  const [delay, setDelay] = useState(null);
  const [score, setScore] = useState(null);
  const [prevMaxScore, setPrevMaxScore] = useState(null);



  function start(){
    setDelay(2000+Math.random()*5000);
    setIsPlaying(true);
    setShowResults(false);
  }
  function endGame(reactionTime){
    setScore(reactionTime)
    setIsPlaying(false);
    setShowBlock(false);
    setShowResults(true);
    if(!prevMaxScore || prevMaxScore>reactionTime) {
      setPrevMaxScore(reactionTime)
    }

  }
  
  useEffect(()=>{
    updateScore();
  }, [prevMaxScore])

  async function updateScore(){
    const q = query(collection(db, "user_results"), where("user", "==", id));
    const user_result = await getDocs(q);
    user_result.forEach(async (d) => {
      const data = d.data()
      const docRef = doc(db, "user_results", d.id);
      if(!!score && (!data.maxScore || data.maxScore<0 || data.maxScore > score)){
        await setDoc(docRef, {...data, maxScore: score})
      }
    });
  }

  return isAuth ? (
    <div className="main">
        <Header />
        <div className='main-inner'>
          <div className='main-content'>
            <h1>Reaction Timer</h1>
            <button onClick={start} disabled={isPlaying}>Play</button>
            { !showBlock && <div className='shadow-block'>{isPlaying ? "Wait...": "Press play"}</div>}
            { isPlaying && <Block delay={delay} end={endGame} visibleBlock={()=>setShowBlock(true)}/>}
            { showResults && <Results score={score}/> }
          </div>
          <StandingTable />
      </div>
    </div>
  ): <Navigate  to="/auth" />;
}

export default Main;
