import { PieChart, Pie, Cell, Tooltip } from 'recharts'
import { CustomTooltip } from './CustomTooltip'

const COLORS = [
  '#FF1EA8',
  '#00C49F',
  '#FFBB28',
  '#1EFF37',
  '#0088Fb',
  '#FF5F49',
  '#E13EFF',
  '#3EBDFF',
  '#009015',
  '#FFDA2F',
  '#FF4445'
]

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill='white'
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline='central'
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

export function PieChartInteractions({ interactionsPerSectorId }) {
  return (
    <div>
      <PieChart width={500} height={500}>
        <Pie
          data={interactionsPerSectorId}
          cx='50%'
          cy='50%'
          labelLine={false}
          outerRadius={200}
          label={renderCustomizedLabel}
          fill='#8884d8'
          dataKey='count'
        >
          {interactionsPerSectorId &&
            interactionsPerSectorId.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </div>
  )
}
