import './Results.css';

export default function Results({score}){
    
    function getRank(){
        if(score<250) return 'Master'
        if(score<400) return 'Expert'
        if(score<700) return 'Average'
        if(score<1000) return 'Beginner'
        return 'Newbie'
    }
    return (
    <div>
        <p>Reaction Time: { score } ms</p>
        <div className="rank">
            { getRank() }
        </div>
    </div>)
}