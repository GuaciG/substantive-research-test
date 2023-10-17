import './CustomTooltip.css'

export const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className='tooltip-box'>
        <p>{`Sector ID: ${data.name}`}</p>
        <p>{`Interactions: ${data.count}`}</p>
      </div>
    )
  }
  return null
}
