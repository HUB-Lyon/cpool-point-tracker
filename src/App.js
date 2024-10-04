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
    // eslint-disable-next-line no-multi-str
    console.log(" \n\
⡴⠑⡄⠀⠀⠀⠀⠀⠀⠀⣀⣀⣤⣤⣤⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀  \n\
⠸⡇⠀⠿⡀⠀⠀⠀⣀⡴⢿⣿⣿⣿⣿⣿⣿⣿⣷⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀  \n\
⠀⠀⠀⠀⠑⢄⣠⠾⠁⣀⣄⡈⠙⣿⣿⣿⣿⣿⣿⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀  \n\
⠀⠀⠀⠀⢀⡀⠁⠀⠀⠈⠙⠛⠂⠈⣿⣿⣿⣿⣿⠿⡿⢿⣆⠀⠀⠀⠀⠀⠀⠀  \n\
⠀⠀⠀⢀⡾⣁⣀⠀⠴⠂⠙⣗⡀⠀⢻⣿⣿⠭⢤⣴⣦⣤⣹⠀⠀⠀⢀⢴⣶⣆  \n\
⠀⠀⢀⣾⣿⣿⣿⣷⣮⣽⣾⣿⣥⣴⣿⣿⡿⢂⠔⢚⡿⢿⣿⣦⣴⣾⠁⠸⣼⡿  \n\
⠀⢀⡞⠁⠙⠻⠿⠟⠉⠀⠛⢹⣿⣿⣿⣿⣿⣌⢤⣼⣿⣾⣿⡟⠉⠀⠀⠀⠀⠀  \n\
⠀⣾⣷⣶⠇⠀⠀⣤⣄⣀⡀⠈⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀  \n\
⠀⠉⠈⠉⠀⠀⢦⡈⢻⣿⣿⣿⣶⣶⣶⣶⣤⣽⡹⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀  \n\
⠀⠀⠀⠀⠀⠀⠀⠉⠲⣽⡻⢿⣿⣿⣿⣿⣿⣿⣷⣜⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀  \n\
⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣷⣶⣮⣭⣽⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀  \n\
⠀⠀⠀⠀⠀⠀⣀⣀⣈⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠇⠀⠀⠀⠀⠀⠀⠀  \n\
⠀⠀⠀⠀⠀⠀⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀  \n\
⠀⠀⠀⠀⠀⠀⠀⠹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀  \n\
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠻⠿⠿⠿⠿⠛⠉ \n\
Slt, viens chercher des points en pp, c'est cadeau !\n\
")
  }, [])

  useEffect(() => {
    (async () => {
      await fetch(`${API_URL}/api/teams?populate=*`)
        .then(res => res.json())
        .then(res => res.data.map(team => formatTeam(team.attributes)))
        .then(data => setTeams(data))
      await fetch(`${API_URL}/api/points?populate=*&pagination[limit]=100`)
        .then(res => res.json())
        .then(res => res.data.map(entry => formatPoints(entry.attributes)))
        .then(data => data.sort((a, b) => a.updatedAt > b.updatedAt ? -1 : ((a.updatedAt < b.updatedAt) ? 1 : 0)))
        .then(data => setPoints(data))
    })().then(() => setisLoading(false))
  }, [])

  if (isLoading)
    return (<div>loading...</div>)

  const POINTS = [
    "absolute bottom-0 right-0 rounded-tl-full aspect-square",
    "absolute bottom-0 left-0 rounded-tr-full aspect-square",
    "absolute top-0 right-0 rounded-bl-full aspect-square",
    "absolute top-0 left-0 rounded-br-full aspect-square",
  ]

  const TEAMS = [
    "p-8 z-10 gap-4 flex items-center flex-col md:flex-row absolute top-0 left-0",
    "p-8 z-10 gap-4 flex items-center flex-col md:flex-row-reverse absolute top-0 right-0",
    "p-8 z-10 gap-4 flex items-center flex-col-reverse md:flex-row absolute bottom-0 left-0",
    "p-8 z-10 gap-4 flex items-center flex-col-reverse md:flex-row-reverse absolute bottom-0 right-0",
  ]

  const maxPoints = Math.max(...Object.values(points.reduce((acc, { team, points }) => ({ ...acc, [team]: (acc[team] || 0) + points }), {})));


  return (
    <div className="h-screen w-screen bg-gray-50 grid grid-cols-12 select-none">

      {/* Teams & logo */}
      <div className="col-span-12 md:col-span-9 h-full relative">
        <img src="/logo.png" className="z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/4" alt="" />
        <div className="grid grid-cols-2 h-full">
          {teams.map((team, idx) => {
            const teamPoints = points.filter(point => point.team === team.name).reduce((a, b) => a + b.points, 0)

            return (
              <div className="flex flex-col items-center justify-center gap-2 relative" key={team.name}>
                <div className={POINTS[idx]} style={{ backgroundColor: team.color, [window.innerWidth < 768 ? "width" : "height"]: `${(teamPoints * 60 / maxPoints) + 30}%`, }}></div>
                <div className={TEAMS[idx]}>
                  <img className="h-24 aspect-square object-cover" src={`${API_URL}${team.logo}`} alt="" />
                  <div>
                    <p className="hidden md:block text-2xl font-bold">{team.name}</p>
                    <p className="text-xl">{teamPoints} points</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Sidebar */}
      <div className="hidden md:grid col-span-3 shadow-lg z-10">
        <div className="max-w-[25vw] text-ellipsis py-6 px-4 max-h-screen overflow-auto">
          <h1 className="font-bold text-xl text-center mb-6">Points obtenus</h1>
          {points.map((point, idx) => {
            const relatedTeam = teams.find(team => team.name === point.team)
            return (
              <div key={idx} className="p-3 rounded-md text-center flex justify-between items-center shadow-lg mb-3" style={{ backgroundColor: relatedTeam.color }}>
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
