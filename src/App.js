import React, { useEffect, useState } from "react";

const API_URL = 'https://cpool-api.thmarinho.dev'

const App = () => {
  const [isLoading, setisLoading] = useState(true)

  const [teams, setTeams] = useState([])
  const [points, setPoints] = useState([])

  const formatTeam = (raw) => {
    return ({
      name: raw.name,
      color: raw.color,
      logo: raw.logo.data.attributes.url
    })
  }

  const formatPoints = (raw) => {
    return ({
      team: raw.team.data.attributes.name,
      reason: raw.reason,
      points: raw.points,
      updatedAt: raw.updatedAt
    })
  }

  useEffect(() => {
    (async () => {
      await fetch(`${API_URL}/api/teams?populate=*`)
        .then(res => res.json())
        .then(res => res.data.map(team => formatTeam(team.attributes)))
        .then(data => setTeams(data))
      await fetch(`${API_URL}/api/points?populate=*`)
        .then(res => res.json())
        .then(res => res.data.map(entry => formatPoints(entry.attributes)))
        .then(data => data.sort((a, b) => a.updatedAt > b.updatedAt ? -1 : ((a.updatedAt < b.updatedAt) ? 1 : 0)))
        .then(data => setPoints(data))
    })().then(() => setisLoading(false))
  }, [])

  if (isLoading)
    return (<div>loading...</div>)

  return (
    <div className="h-screen w-screen bg-gray-50 grid grid-cols-12">

      {/* Teams & logo */}
      <div className="col-span-9 h-full relative">
        <img src="/logo.png" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/4" alt="" />
        <div className="grid grid-cols-2 h-full">
          {teams.map((team, idx) => (
            <div className="flex flex-col items-center justify-center gap-2" style={{ backgroundColor: team.color }} key={team.name}>
              <img className="h-24 aspect-square object-cover" src={`${API_URL}${team.logo}`} alt="" />
              <p className="text-xl font-bold">{team.name}</p>
              <p>{points.filter(point => point.team === team.name).reduce((a, b) => a + b.points, 0)} points</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <div className="grid col-span-3">
        <div className="max-w-[25vw] text-ellipsis p-3 max-h-screen overflow-auto">
        <h1 className="font-bold uppercase text-center mb-3">Points obtenus</h1>
          {points.map((point, idx) => {
            const relatedTeam = teams.find(team => team.name === point.team)
            return (
              <div key={idx} className="p-3 bg-white-700 rounded-md text-center flex justify-between items-center shadow-lg mb-3" style={{ backgroundColor: relatedTeam.color }}>
                <div className="flex items-center gap-3 overflow-hidden">
                  <img src={`${API_URL}${relatedTeam.logo}`} alt="" className="h-9 aspect-square object-cover" />
                  <p className="whitespace-nowrap overflow-hidden text-ellipsis">{point.reason}</p>
                </div>
                <p className="ml-3">{point.points}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
