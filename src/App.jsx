import { useEffect, useState } from 'react'
import { PieChartInteractions } from './components/PieChartInteractions'
import './App.css'

const INTERACTIONS_ENDPOINT = 'https://substantive.pythonanywhere.com/'

export function App() {
  const [interactions, setInteractions] = useState(null)
  const [interactionsPerSectorId, setInteractionsPerSectorId] = useState([])
  const [interactionsWithPercentage, setInteractionsWithPercentage] = useState(
    []
  )

  useEffect(() => {
    fetch(INTERACTIONS_ENDPOINT)
      .then(res => res.json())
      .then(data => setInteractions(data.interactions))
      .catch(error => console.log('Error fetching data:', error))
  }, [])

  /* console.log(interactions) */
  /* console.log(interactions.length) */

  useEffect(() => {
    if (interactions) {
      const totalInteractionsBySectorId = interactions.reduce(
        (acc, { name }) => {
          acc[name] = (acc[name] || 0) + 1
          return acc
        },
        {}
      )

      setInteractionsPerSectorId(
        Object.entries(totalInteractionsBySectorId).map(([name, count]) => ({
          name,
          count
        }))
      )
    }
  }, [interactions])

  /* console.log(interactionsPerSectorId) */

  useEffect(() => {
    setInteractionsWithPercentage(
      interactionsPerSectorId.map(
        obj =>
          (obj['percentage'] = (
            (obj.count /
              interactionsPerSectorId.reduce(function (acc, obj) {
                return acc + obj.count
              }, 0)) *
            100
          ).toFixed(0))
      )
    )
  }, [interactionsPerSectorId])

  /* console.log(interactionsWithPercentage) */

  return (
    <div className='wrapper'>
      <h1> Research App</h1>
      <div className='wrapper-app'>
        <table>
          <th>Sector Name</th>
          <th>Total Interactions</th>
          <th>Percentage of Interactions</th>
          {interactionsPerSectorId &&
            interactionsPerSectorId.map(interaction => (
              <tr key={interaction.index}>
                <td>{interaction.name}</td>
                <td>{interaction.count}</td>
                <td>{interaction.percentage} %</td>
              </tr>
            ))}
        </table>
        <PieChartInteractions
          interactionsPerSectorId={interactionsPerSectorId}
        />
      </div>
    </div>
  )
}
