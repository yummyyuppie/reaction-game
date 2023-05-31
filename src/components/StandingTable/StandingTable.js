import './StandingTable.css'
import {collection,  getDocs} from 'firebase/firestore'
import { db } from 'firebase.js';
import { useEffect, useState } from 'react';
import goldMedal from 'img/gold-medal.png'

export default function StandingTable(){
    const [standing, setStanding] = useState([])
    async function fetchStanding(){
        let arr = []
        const querySnapshot = await getDocs(collection(db, "user_results"));
        querySnapshot.forEach((doc) => {
            const { username, maxScore} = doc.data();
            if(maxScore>0){
                arr.push({username, maxScore})
            }    
        });
        arr.sort((a, b)=>a.maxScore - b.maxScore)
        setStanding(arr.slice(0, Math.min(arr.length, 5)));
    }

    useEffect(()=>{fetchStanding()}, []);

    
    return !!standing.length && (
        <div className="standings">
            <div id="standing-header">
            <h1>Ranking TOP-{standing.length}</h1>
        </div>
        <div id="leaderboard">
            <div className="ribbon"></div>
            <table>
                <tbody>
                    {standing.map((e, i)=> {
                        return(
                            <tr key={`${i}-${e.username}`}>
                                <td className="number">{i+1}</td>
                                <td className="name">{e.username}</td>
                                <td className="points">
                                {e.maxScore} 
                                { i===0 && <img className="gold-medal" src={goldMedal} alt="gold medal"/>
                                }
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className='refresh_table' onClick={()=>fetchStanding()}>Refresh</div>
        </div>
      </div>
    )
}