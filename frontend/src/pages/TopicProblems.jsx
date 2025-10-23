import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import problemService from '../services/problemService';
import userService from '../services/userService';
import ProblemCard from '../components/ProblemCard';


export default function TopicProblems(){
const { topicId } = useParams();
const [problems, setProblems] = useState([]);
const [solvedSet, setSolvedSet] = useState(new Set());


useEffect(()=>{
problemService.getProblemsByTopic(topicId).then(res => setProblems(res.data)).catch(()=>setProblems([]));
userService.getSolvedProblems().then(res => setSolvedSet(new Set(res.data.map(p=>p.problemId)))).catch(()=>{});
}, [topicId]);


const handleMarkSolved = async (problemId) =>{
try{
await problemService.markSolved(problemId);
setSolvedSet(prev => new Set(prev).add(problemId));
}catch(err){
alert('Could not mark solved');
}
};


return (
<div>
<h2>Problems</h2>
<div className="list">
{problems.map(p => (
<ProblemCard
key={p.id}
problem={p}
onMarkSolved={handleMarkSolved}
solved={solvedSet.has(p.id)}
/>
))}
</div>
</div>
);
}